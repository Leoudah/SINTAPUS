import db from '../config/database.js';

// Publikasi Database
// 
// CREATE TABLE `jurnal` (
//   `id_jurnal` int NOT NULL,
//   `nama_jurnal` varchar(255) NOT NULL,
//   `issn` varchar(32) DEFAULT NULL,
//   `publisher` varchar(128) DEFAULT NULL,
//   `quartile` varchar(4) DEFAULT NULL
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

// CREATE TABLE `penulis_publikasi` (
//   `id_publikasi` int NOT NULL,
//   `id_dosen` int DEFAULT NULL,
//   `nama_penulis` varchar(128) NOT NULL,
//   `urutan` int NOT NULL,
//   `id_afiliasi` int DEFAULT NULL
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

// CREATE TABLE `publikasi` (
//   `id_publikasi` int NOT NULL,
//   `eid` varchar(64) NOT NULL,
//   `doi` varchar(128) DEFAULT NULL,
//   `judul` varchar(255) NOT NULL,
//   `tahun` int DEFAULT NULL,
//   `jenis` varchar(64) DEFAULT NULL,
//   `link_publikasi` text,
//   `citation_count` int DEFAULT '0',
//   `id_jurnal` int NOT NULL,
//   `status` enum('draft','submitted','verified','rejected') DEFAULT 'draft',
//   `is_public` tinyint(1) DEFAULT '0',
//   `verified_by` int DEFAULT NULL,
//   `verified_at` timestamp NULL DEFAULT NULL,
//   `verification_note` text,
//   `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
// ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

export const findAll = async (status) => {
  let sql = `
    SELECT 
      u.id_user,
      u.email,
      u.role,
      u.status,
      u.verification_note,
      u.created_at,
      d.nama,
      d.nidn
    FROM user u
    LEFT JOIN dosen d ON u.id_dosen = d.id_dosen
    WHERE u.role = 'Dosen'
  `;

  const params = [];

  if (status) {
    sql += ' AND u.status = ?';
    params.push(status);
  }

  sql += ' ORDER BY u.created_at DESC';

  const [rows] = await db.query(sql, params);
  return rows;
};

export const findById = async (id) => {
  const [rows] = await db.query(
    `
    SELECT 
      u.id_user,
      u.email,
      u.role,
      u.status,
      u.verification_note,
      u.created_at,
      d.id_dosen,
      d.nama,
      d.nidn,
      d.scopus_author_id,
      d.bio_singkat
    FROM user u
    LEFT JOIN dosen d ON u.id_dosen = d.id_dosen
    WHERE u.id_user = ?
    `,
    [id]
  );

  return rows[0];
};

export const updateStatus = async (id, status, note, adminId) => {
  return db.query(
    `
    UPDATE user
    SET 
      status = ?,
      verification_note = ?,
      verified_by = ?,
      verified_at = NOW()
    WHERE id_user = ?
    `,
    [status, note, adminId, id]
  );
};

// Publikasi repository
export const findAllPublications = async (status) => {
  let sql = `
    SELECT
      p.id_publikasi,
      p.eid,
      p.doi,
      p.judul,
      p.tahun,
      p.jenis,
      p.link_publikasi,
      p.citation_count,
      p.id_jurnal,
      j.nama_jurnal,
      p.status,
      p.is_public,
      p.verified_by,
      p.verified_at,
      p.verification_note,
      p.created_at,
      GROUP_CONCAT(CONCAT(pp.urutan,':',pp.nama_penulis) ORDER BY pp.urutan SEPARATOR '||') AS penulis
    FROM publikasi p
    LEFT JOIN jurnal j ON p.id_jurnal = j.id_jurnal
    LEFT JOIN penulis_publikasi pp ON p.id_publikasi = pp.id_publikasi
    WHERE 1=1
  `;

  const params = [];
  if (status) {
    sql += ' AND p.status = ?';
    params.push(status);
  }

  sql += ' GROUP BY p.id_publikasi ORDER BY p.created_at DESC';

  const [rows] = await db.query(sql, params);
  return rows;
};

export const findPublicationById = async (id) => {
  const [rows] = await db.query(
    `
    SELECT
      p.id_publikasi,
      p.eid,
      p.doi,
      p.judul,
      p.tahun,
      p.jenis,
      p.link_publikasi,
      p.citation_count,
      p.id_jurnal,
      j.nama_jurnal,
      p.status,
      p.is_public,
      p.verified_by,
      p.verified_at,
      p.verification_note,
      p.created_at,
      GROUP_CONCAT(CONCAT(pp.urutan,':',pp.nama_penulis) ORDER BY pp.urutan SEPARATOR '||') AS penulis
    FROM publikasi p
    LEFT JOIN jurnal j ON p.id_jurnal = j.id_jurnal
    LEFT JOIN penulis_publikasi pp ON p.id_publikasi = pp.id_publikasi
    WHERE p.id_publikasi = ?
    GROUP BY p.id_publikasi
    `,
    [id]
  );

  return rows[0];
};

export const updatePublicationStatus = async (id, status, note, adminId) => {
  return db.query(
    `
    UPDATE publikasi
    SET
      status = ?,
      verification_note = ?,
      verified_by = ?,
      verified_at = NOW()
    WHERE id_publikasi = ?
    `,
    [status, note, adminId, id]
  );
};

