import db from '../config/database.js';

class PublicationRepository {

  async findByEid(eid) {
    const query = `SELECT * FROM publikasi WHERE eid = ? LIMIT 1`;
    const [rows] = await db.execute(query, [eid]);
    return rows[0];
  }

  async createPublication(data, connection) {
    // FIX: Added id_jurnal to INSERT statement
    const query = `
      INSERT INTO publikasi 
      (eid, doi, judul, creator, tahun, jenis, link_publikasi, source, citation_count, id_jurnal, status, is_public, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'verified', 0, NOW())
    `;

    // FIX: Added data.id_jurnal to parameters
    const [result] = await connection.execute(query, [
      data.eid,
      data.doi || null,
      data.judul || 'Untitled',
      data.creator || 'Unknown',
      data.tahun || null,
      data.jenis || 'Other',
      data.link_publikasi || null,
      data.source || null,
      data.citation_count || 0,
      data.id_jurnal // This is now guaranteed by SyncService
    ]);

    return result.insertId;
  }

  async updatePublication(id_publikasi, data, connection) {
    // Note: We usually don't update id_jurnal on sync unless strictly required, 
    // keeping it simple to avoid jumping journals if metadata is messy.
    const query = `
      UPDATE publikasi 
      SET 
        doi = ?, 
        judul = ?,
        creator = ?, 
        tahun = ?, 
        jenis = ?, 
        link_publikasi = ?,
        source = ?,
        citation_count = ?,
        status = 'verified', 
        is_public = 0,
        verification_note = 'Metadata updated via Scopus Sync'
      WHERE id_publikasi = ?
    `;

    await connection.execute(query, [
      data.doi || null,
      data.judul || 'Untitled',
      data.creator || 'Unknown',
      data.tahun || null,
      data.jenis || 'Other',
      data.link_publikasi || null,
      data.source || null,
      data.citation_count || 0,
      id_publikasi
    ]);
  }

  async linkAuthor(id_publikasi, id_dosen, namaPenulis, id_afiliasi, connection) {
    const query = `
      INSERT IGNORE INTO penulis_publikasi 
      (id_publikasi, id_dosen, nama_penulis, urutan, id_afiliasi)
      VALUES (?, ?, ?, 1, ?)
    `;
    await connection.execute(query, [id_publikasi, id_dosen, namaPenulis || 'Unknown', id_afiliasi]);
  }

  async createManualPublication(data, id_dosen, connection) {
    // Validate source enum (can be null)
    const validSources = ['scopus', 'rama', 'garuda', 'google_scholar'];
    if (data.source && !validSources.includes(data.source)) {
      throw new Error(`Invalid source. Must be one of: ${validSources.join(', ')} or null`);
    }

    const query = `
      INSERT INTO publikasi 
      (eid, doi, judul, creator, tahun, jenis, link_publikasi, citation_count, id_jurnal, source, status, is_public, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'draft', 0, NOW())
    `;

    // Generate a unique EID for manual entries (using timestamp + random)
    const eid = `manual-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const [result] = await connection.execute(query, [
      eid,
      data.doi || null,
      data.judul,
      data.creator || 'Unknown',
      data.tahun || null,
      data.jenis || 'Other',
      data.link_publikasi || null,
      data.citation_count || 0,
      data.id_jurnal,
      data.source || null
    ]);

    return result.insertId;
  }

  async updateManualPublication(id_publikasi, data, connection) {
    const query = `
      UPDATE publikasi 
      SET 
        judul = ?,
        doi = ?,
        creator = ?,
        tahun = ?,
        jenis = ?,
        link_publikasi = ?,
        citation_count = ?,
        id_jurnal = ?,
        source = ?,
        status = 'submitted'
      WHERE id_publikasi = ?
    `;

    await connection.execute(query, [
      data.judul,
      data.doi || null,
      data.creator || 'Unknown',
      data.tahun || null,
      data.jenis || 'Other',
      data.link_publikasi || null,
      data.citation_count || 0,
      data.id_jurnal,
      data.source || null,
      id_publikasi
    ]);
  }

  async deletePublication(id_publikasi, connection) {
    // First delete from penulis_publikasi
    const deleteAuthorsQuery = `DELETE FROM penulis_publikasi WHERE id_publikasi = ?`;
    await connection.execute(deleteAuthorsQuery, [id_publikasi]);

    // Then delete the publication
    const deletePublicationQuery = `DELETE FROM publikasi WHERE id_publikasi = ?`;
    await connection.execute(deletePublicationQuery, [id_publikasi]);
  }
}

export default new PublicationRepository();