import db from '../config/database.js';

/**
 * Find a lecturer by Scopus Author ID.
 * Required to link the publication to the internal user system.
 */
export const findByScopusID = async (scopusAuthorId) => {
  const query = `
      SELECT id_dosen, scopus_author_id, id_afiliasi 
      FROM dosen 
      WHERE scopus_author_id = ? 
      LIMIT 1
    `;
  const [rows] = await db.execute(query, [scopusAuthorId]);
  return rows[0];
}

//INSERT INTO `dosen` (`id_dosen`, `nama`, `nidn`, `scopus_author_id`, `id_afiliasi`, `citizenship`, `foto_profil`, `created_at`, `updated_at`)
//INSERT INTO `dosen_tag` (`id_dosen`, `tag`)

export const updateProfile = async (id_dosen, profileData) => {
  const {
    scopus_author_id,
    id_afiliasi,
    citizenship,
    link_foto
  } = profileData;

  const query = `
      UPDATE dosen
      SET scopus_author_id = ?, id_afiliasi = ?, citizenship = ?, foto_profil = ?
      WHERE id_dosen = ?
    `;
  const [result] = await db.execute(query, [
    scopus_author_id,
    id_afiliasi,
    citizenship,
    link_foto,
    id_dosen
  ]);
  return result;
}

//INSERT INTO `jurnal` (`id_jurnal`, `nama_jurnal`, `issn`, `publisher`, `quartile`)
//INSERT INTO `publikasi` (`id_publikasi`, `eid`, `doi`, `judul`, `creator`, `tahun`, `jenis`, `link_publikasi`, `citation_count`, `id_jurnal`, `status`, `is_public`, `verified_by`, `verified_at`, `verification_note`, `created_at`) VALUES
export const findMyPublications = async (id_dosen) => {
  const query = `
      SELECT p.id_publikasi, p.judul, p.tahun, p.doi, p.creator, p.link_publikasi, p.citation_count, p.is_public, p.status, p.verification_note, j.nama_jurnal
      FROM publikasi p
      JOIN penulis_publikasi pp ON p.id_publikasi = pp.id_publikasi
      JOIN jurnal j ON p.id_jurnal = j.id_jurnal
      WHERE pp.id_dosen = ?
      ORDER BY p.tahun DESC
    `;
  const [rows] = await db.execute(query, [id_dosen]);
  return rows;
}


//KALAU SEMPAT NGERJAIN YANG INI

export const addDosenTag = async (id_dosen, tag) => {
  const query = `
      INSERT INTO dosen_tag (id_dosen, tag)
      VALUES (?, ?)
    `;
  const [result] = await db.execute(query, [id_dosen, tag]);
  return result;
}

export const removeDosenTag = async (id_dosen, tag) => {
  const query = `
      DELETE FROM dosen_tag
      WHERE id_dosen = ? AND tag = ?
    `;
  const [result] = await db.execute(query, [id_dosen, tag]);
  return result;
}

export const getDosenTags = async (id_dosen) => {
  const query = `
      SELECT tag
      FROM dosen_tag
      WHERE id_dosen = ?
    `;
  const [rows] = await db.execute(query, [id_dosen]);
  return rows;
}

export const getDosenById = async (id_dosen) => {
  const query = `
      SELECT id_dosen, nama_dosen, scopus_author_id, id_afiliasi, citizenship, link_foto
      FROM dosen
      WHERE id_dosen = ?
      LIMIT 1
    `;
  const [rows] = await db.execute(query, [id_dosen]);
  return rows[0];
}

export const togglePublicationStatus = async (id_publikasi, is_public) => {
  const query = `
      UPDATE publikasi
      SET is_public = ?
      WHERE id_publikasi = ?
    `;
  const [result] = await db.execute(query, [is_public, id_publikasi]);
  return result;
};

export const getPublicationStats = async (id_dosen) => {
  const query = `
    SELECT 
      COUNT(*) as total,
      SUM(CASE WHEN p.is_public = 0 THEN 1 ELSE 0 END) as hidden,
      SUM(CASE WHEN p.is_public = 1 THEN 1 ELSE 0 END) as public,
      SUM(CASE WHEN p.status = 'verified' THEN 1 ELSE 0 END) as verified,
      SUM(CASE WHEN p.status = 'rejected' THEN 1 ELSE 0 END) as rejected
    FROM publikasi p
    JOIN penulis_publikasi pp ON p.id_publikasi = pp.id_publikasi
    WHERE pp.id_dosen = ?
  `;
  const [rows] = await db.execute(query, [id_dosen]);
  return rows[0];
};
