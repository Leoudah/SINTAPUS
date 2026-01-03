import db from '../config/database.js';
import elsevierService from '../integrations/elsevier.service.js';
import publicationRepo from '../repositories/publication.repository.js';
import dosenRepo from '../repositories/dosen.repository.js';
import syncRepo from '../repositories/sync.repository.js';
import journalRepo from '../repositories/journal.repository.js';

class SyncService {

  async syncScopusPublications(userId, scopusAuthorId) {
    const connection = await db.getConnection();
    let id_sinkron = null;
    let stats = { total: 0, new: 0, updated: 0 };

    try {
      const dosen = await dosenRepo.findByScopusId(scopusAuthorId);
      if (!dosen) throw new Error(`Dosen with Scopus ID ${scopusAuthorId} not found.`);

      await connection.beginTransaction();
      id_sinkron = await syncRepo.createLog(userId, connection);
      await connection.commit();

      let start = 0;
      const count = 25;
      let hasMore = true;

      while (hasMore) {
        const apiResult = await elsevierService.fetchAuthorPublications(scopusAuthorId, start, count);
        const { totalResults, entries } = apiResult;
        stats.total = totalResults;

        if (!entries || entries.length === 0) {
          hasMore = false;
          break;
        }

        await connection.beginTransaction();
        try {
          for (const entry of entries) {
            await this.processEntry(entry, dosen, stats, connection);
          }
          await connection.commit();
        } catch (batchError) {
          await connection.rollback();
          throw batchError;
        }

        start += count;
        if (start >= totalResults) hasMore = false;
      }

      await syncRepo.updateLog(id_sinkron, 'Success', stats, null, connection);
      return { success: true, stats };

    } catch (error) {
      if (connection) try { await connection.rollback(); } catch (e) { }

      if (id_sinkron) {
        const logConnection = await db.getConnection();
        try {
          await syncRepo.updateLog(id_sinkron, 'Failed', stats, error.message, logConnection);
        } finally {
          logConnection.release();
        }
      }
      throw error;
    } finally {
      if (connection) connection.release();
    }
  }

  async processEntry(entry, dosen, stats, connection) {
    const mappedData = this.mapScopusData(entry);

    // Safety check
    if (!mappedData.eid) return;

    // FIX: Access 'creator' directly (stripped prefix)
    const authorName = entry.creator || dosen.nama;

    const journalId = await journalRepo.findOrCreate(
      mappedData.journal_name,
      mappedData.issn,
      connection
    );
    mappedData.id_jurnal = journalId;

    const existingPub = await publicationRepo.findByEid(mappedData.eid);

    if (!existingPub) {
      const newId = await publicationRepo.createPublication(mappedData, connection);
      await publicationRepo.linkAuthor(newId, dosen.id_dosen, authorName, dosen.id_afiliasi, connection);
      stats.new++;
    } else {
      const hasChanged = this.hasMetadataChanged(existingPub, mappedData);
      if (hasChanged) {
        await publicationRepo.updatePublication(existingPub.id_publikasi, mappedData, connection);
        await publicationRepo.linkAuthor(existingPub.id_publikasi, dosen.id_dosen, authorName, dosen.id_afiliasi, connection);
        stats.updated++;
      }
    }
  }

  mapScopusData(entry) {
    // FIX 1: Handle date keys
    const coverDate = entry.coverDate || entry['prism:coverDate'] || entry.coverDisplayDate || entry['prism:coverDisplayDate'];
    const year = coverDate ? new Date(coverDate).getFullYear() : null;

    // FIX 2: Handle creator keys (prefixed vs non-prefixed)
    let rawCreator = entry.creator || entry['dc:creator'];

    // Convert array to string if necessary
    if (Array.isArray(rawCreator)) {
      rawCreator = rawCreator.join(', ');
    }

    // FIX 3: Prevent database error by truncating if you keep VARCHAR(255)
    // Ideally, change DB column to TEXT. If you can't, use this:
    if (rawCreator && rawCreator.length > 255) {
      rawCreator = rawCreator.substring(0, 252) + '...';
    }

    return {
      eid: entry.eid || entry['dc:identifier'] || null,
      doi: entry.doi || entry['prism:doi'] || null,
      judul: entry.title || entry['dc:title'] || 'Untitled',
      creator: rawCreator || null, // Now using the resolved variable
      tahun: year || null,
      jenis: this.normalizeAggregationType(entry.aggregationType || entry['prism:aggregationType']),
      link_publikasi: this.findScopusLink(entry),
      citation_count: parseInt(entry['citedby-count'] || entry['prism:citedby-count'] || 0),
      journal_name: entry.publicationName || entry['prism:publicationName'] || null,
      issn: entry.issn || entry['prism:issn'] || entry.eIssn || entry['prism:eIssn'] || null
    };
  }

  findScopusLink(entry) {
    // FIX: With mergeAttrs=true, entry.link is an array of objects like { ref: '...', href: '...' }
    if (entry.link) {
      const links = Array.isArray(entry.link) ? entry.link : [entry.link];

      // Look for ref="scopus"
      const scopusLink = links.find(l => l.ref === 'scopus');
      if (scopusLink && scopusLink.href) return scopusLink.href;

      // Fallback to ref="self"
      const selfLink = links.find(l => l.ref === 'self');
      if (selfLink && selfLink.href) return selfLink.href;
    }

    // Fallback to prism:url which becomes 'url'
    return entry.url || null;
  }

  normalizeAggregationType(type) {
    if (!type) return 'Other';
    const t = type.toLowerCase();
    if (t.includes('journal')) return 'Journal';
    if (t.includes('conference') || t.includes('proceeding')) return 'Conference Proceeding';
    if (t.includes('book')) return 'Book Chapter';
    return 'Other';
  }

  hasMetadataChanged(existing, incoming) {
    if (existing.judul !== incoming.judul) return true;
    if ((existing.doi || '') !== (incoming.doi || '')) return true;
    if (existing.citation_count !== incoming.citation_count) return true;
    if ((existing.creator || '') !== (incoming.creator || '')) return true;
    return false;
  }
}

export default new SyncService();
