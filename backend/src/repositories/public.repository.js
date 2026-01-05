import db from '../config/database.js';

export const DOSEN_PER_PAGE = 4; // single source for pagination size
export const AFILIASI_PER_PAGE = 10;

export const dosenCard = async (page = 1, q = '') => {
  const perPage = DOSEN_PER_PAGE;
  const offset = (page - 1) * perPage;
  const keyword = `%${q}%`;
  let sql = `
    SELECT 
    d.id_dosen,
    d.foto_profil,
    d.nama,
    d.nidn,
    a.institusi,
    c.name AS negara,
    COUNT(DISTINCT CASE WHEN p.is_public = 1 AND p.status = 'verified' THEN pp.id_publikasi END) AS total_publikasi,
    GROUP_CONCAT(DISTINCT t.nama SEPARATOR ', ') AS tag_nama
    FROM user u 
    LEFT JOIN dosen d ON u.id_dosen = d.id_dosen
    LEFT JOIN afiliasi a ON d.id_afiliasi = a.id_afiliasi 
    LEFT JOIN countries c ON d.citizenship = c.id
    LEFT JOIN penulis_publikasi pp ON pp.id_dosen = d.id_dosen
    LEFT JOIN publikasi p ON p.id_publikasi = pp.id_publikasi
    LEFT JOIN dosen_tag dt ON dt.id_dosen = d.id_dosen
    LEFT JOIN tag t ON t.id_tag = dt.id_tag
    WHERE u.role = 'Dosen'
    ${q ? `AND (d.nama LIKE ? OR d.nidn LIKE ? OR a.institusi LIKE ? OR t.nama LIKE ?)` : ''}
    GROUP BY d.id_dosen
    ORDER BY d.nama
    LIMIT ? OFFSET ?;
  `;

  const params = q ? [keyword, keyword, keyword, keyword, perPage, offset] : [perPage, offset];
  const [rows] = await db.query(sql, params);
  return rows;
};

export const dosenPage = async (id) => {
  let sql = `
    SELECT 
    d.id_dosen,
    d.foto_profil,
    d.nama,
    d.nidn,
    a.institusi,
    c.name AS negara,
    COUNT(DISTINCT CASE WHEN p.is_public = 1 AND p.status = 'verified' THEN pp.id_publikasi END) AS total_publikasi,
    GROUP_CONCAT(DISTINCT t.nama SEPARATOR ', ') AS tag_nama
    FROM user u 
    LEFT JOIN dosen d ON u.id_dosen = d.id_dosen
    LEFT JOIN afiliasi a ON d.id_afiliasi = a.id_afiliasi 
    LEFT JOIN countries c ON d.citizenship = c.id
    LEFT JOIN penulis_publikasi pp ON pp.id_dosen = d.id_dosen
    LEFT JOIN publikasi p ON p.id_publikasi = pp.id_publikasi
    LEFT JOIN dosen_tag dt ON dt.id_dosen = d.id_dosen
    LEFT JOIN tag t ON t.id_tag = dt.id_tag
    WHERE u.role = 'Dosen' AND d.id_dosen = ?
    GROUP BY d.id_dosen
    ORDER BY d.nama;
  `;

  const params = [id];
  const [rows] = await db.query(sql, params);
  return rows;
};

export const dosenPublicationsPage = async (id_dosen, page = 1) => {
  const offset = (page - 1) * 20;
  const sql = `
    SELECT
      p.id_publikasi,
      p.judul,
      p.creator,
      p.tahun,
      p.link_publikasi,
      p.citation_count,
      j.nama_jurnal as jurnal
    FROM penulis_publikasi pp
    LEFT JOIN publikasi p ON pp.id_publikasi = p.id_publikasi
    LEFT JOIN dosen d ON pp.id_dosen = d.id_dosen
    LEFT JOIN jurnal j ON p.id_jurnal = j.id_jurnal
    WHERE d.id_dosen = ? AND p.is_public = 1 AND p.status = 'verified'
    GROUP BY p.id_publikasi, p.judul, p.creator, p.tahun, j.nama_jurnal
    ORDER BY p.tahun DESC
    LIMIT 20 OFFSET ?;
  `;

  const [rows] = await db.query(sql, [id_dosen, offset]);
  return rows;
};

export const dosenById = async (id_dosen) => {
  const sql = `
    SELECT 
      d.id_dosen,
      d.foto_profil,
      d.nama,
      d.nidn,
      a.institusi,
      c.name AS negara,
      COUNT(DISTINCT CASE WHEN p.is_public = 1 AND p.status = 'verified' THEN pp.id_publikasi END) AS total_publikasi,
      GROUP_CONCAT(DISTINCT t.nama SEPARATOR ', ') AS tag_nama
    FROM user u
    LEFT JOIN dosen d ON u.id_dosen = d.id_dosen
    LEFT JOIN afiliasi a ON d.id_afiliasi = a.id_afiliasi
    LEFT JOIN countries c ON d.citizenship = c.id
    LEFT JOIN penulis_publikasi pp ON pp.id_dosen = d.id_dosen
    LEFT JOIN publikasi p ON p.id_publikasi = pp.id_publikasi
    LEFT JOIN dosen_tag dt ON dt.id_dosen = d.id_dosen
    LEFT JOIN tag t ON t.id_tag = dt.id_tag
    WHERE u.role = 'Dosen' AND (d.id_dosen = ? OR d.nidn = ?)
    GROUP BY d.id_dosen, d.foto_profil, d.nama, d.nidn, a.institusi, c.name;
  `;

  const [rows] = await db.query(sql, [id_dosen, id_dosen]);
  return rows[0] ?? null;
};

export const countTotalDosen = async (q = '') => {
  const sql = `
    SELECT COUNT(DISTINCT d.id_dosen) AS total
    FROM user u 
    LEFT JOIN dosen d ON u.id_dosen = d.id_dosen
    LEFT JOIN afiliasi a ON d.id_afiliasi = a.id_afiliasi
    LEFT JOIN dosen_tag dt ON dt.id_dosen = d.id_dosen
    LEFT JOIN tag t ON t.id_tag = dt.id_tag
    WHERE u.role = 'Dosen'
    ${q ? `AND (d.nama LIKE ? OR d.nidn LIKE ? OR a.institusi LIKE ? OR t.nama LIKE ?)` : ''};
  `;
  const keyword = `%${q}%`;
  const params = q ? [keyword, keyword, keyword, keyword] : [];
  const [rows] = await db.query(sql, params);
  return rows[0].total;
};

export const listAfiliasi = async (page = 1, q = '') => {
  const perPage = AFILIASI_PER_PAGE;
  const offset = (page - 1) * perPage;
  const keyword = `%${q}%`;
  const sql = `
    SELECT 
      a.id_afiliasi,
      a.institusi,
      a.singkatan,
      a.alamat,
      COUNT(DISTINCT d.id_dosen) AS total_dosen,
      COUNT(DISTINCT CASE WHEN p.is_public = 1 AND p.status = 'verified' THEN p.id_publikasi END) AS total_publikasi
    FROM afiliasi a
    LEFT JOIN dosen d ON d.id_afiliasi = a.id_afiliasi
    LEFT JOIN penulis_publikasi pp ON pp.id_afiliasi = a.id_afiliasi
    LEFT JOIN publikasi p ON p.id_publikasi = pp.id_publikasi
    WHERE 1=1
    ${q ? `AND (a.institusi LIKE ? OR a.singkatan LIKE ? OR a.alamat LIKE ?)` : ''}
    GROUP BY a.id_afiliasi, a.institusi, a.singkatan, a.alamat
    ORDER BY a.institusi
    LIMIT ? OFFSET ?;
  `;
  const params = q ? [keyword, keyword, keyword, perPage, offset] : [perPage, offset];
  const [rows] = await db.query(sql, params);
  return rows;
};

export const countAfiliasi = async (q = '') => {
  const sql = `
    SELECT COUNT(*) AS total
    FROM afiliasi a
    WHERE 1=1
    ${q ? `AND (a.institusi LIKE ? OR a.singkatan LIKE ? OR a.alamat LIKE ?)` : ''};
  `;
  const keyword = `%${q}%`;
  const params = q ? [keyword, keyword, keyword] : [];
  const [rows] = await db.query(sql, params);
  return rows[0]?.total || 0;
};

export const afiliasiDetail = async (id_afiliasi) => {
  const sql = `
    SELECT 
      a.id_afiliasi,
      a.institusi,
      a.singkatan,
      a.alamat,
      COUNT(DISTINCT d.id_dosen) AS total_dosen,
      COUNT(DISTINCT CASE WHEN p.is_public = 1 AND p.status = 'verified' THEN p.id_publikasi END) AS total_publikasi
    FROM afiliasi a
    LEFT JOIN dosen d ON d.id_afiliasi = a.id_afiliasi
    LEFT JOIN penulis_publikasi pp ON pp.id_afiliasi = a.id_afiliasi
    LEFT JOIN publikasi p ON p.id_publikasi = pp.id_publikasi
    WHERE a.id_afiliasi = ?
    GROUP BY a.id_afiliasi, a.institusi, a.singkatan, a.alamat;
  `;
  const [rows] = await db.query(sql, [id_afiliasi]);
  return rows[0] || null;
};

export const afiliasiDosens = async (id_afiliasi) => {
  const sql = `
    SELECT 
      d.id_dosen,
      d.foto_profil,
      d.nama,
      d.nidn,
      c.name AS negara,
      COUNT(DISTINCT CASE WHEN p.is_public = 1 AND p.status = 'verified' THEN pp.id_publikasi END) AS total_publikasi,
      GROUP_CONCAT(DISTINCT t.nama SEPARATOR ', ') AS tag_nama
    FROM dosen d
    LEFT JOIN user u ON u.id_dosen = d.id_dosen
    LEFT JOIN countries c ON d.citizenship = c.id
    LEFT JOIN penulis_publikasi pp ON pp.id_dosen = d.id_dosen
    LEFT JOIN publikasi p ON p.id_publikasi = pp.id_publikasi
    LEFT JOIN dosen_tag dt ON dt.id_dosen = d.id_dosen
    LEFT JOIN tag t ON t.id_tag = dt.id_tag
    WHERE d.id_afiliasi = ? AND u.role = 'Dosen'
    GROUP BY d.id_dosen, d.foto_profil, d.nama, d.nidn, c.name
    ORDER BY d.nama;
  `;
  const [rows] = await db.query(sql, [id_afiliasi]);
  return rows;
};

export const afiliasiPublikasi = async (id_afiliasi) => {
  const sql = `
    SELECT
      p.id_publikasi,
      p.judul,
      p.creator,
      p.tahun,
      p.link_publikasi,
      p.citation_count,
      j.nama_jurnal as jurnal,
      GROUP_CONCAT(DISTINCT d.nama SEPARATOR ', ') AS dosen_names
    FROM publikasi p
    LEFT JOIN penulis_publikasi pp ON pp.id_publikasi = p.id_publikasi
    LEFT JOIN jurnal j ON p.id_jurnal = j.id_jurnal
    LEFT JOIN dosen d ON pp.id_dosen = d.id_dosen
    WHERE pp.id_afiliasi = ? AND p.is_public = 1 AND p.status = 'verified'
    GROUP BY p.id_publikasi, p.judul, p.creator, p.tahun, p.link_publikasi, p.citation_count, j.nama_jurnal
    ORDER BY p.tahun DESC;
  `;
  const [rows] = await db.query(sql, [id_afiliasi]);
  return rows;
};