import db from '../config/database.js';

export const dosenCard = async (page = 1) => {
  const offset = (page - 1) * 20;
  let sql = `
    SELECT 
    d.id_dosen,
    d.foto_profil,
    d.nama,
    d.nidn,
    a.institusi,
    c.name AS negara,
    COUNT(DISTINCT pp.id_publikasi) AS total_publikasi,
    GROUP_CONCAT(DISTINCT t.nama SEPARATOR ', ') AS tag_nama
    FROM user u 
    LEFT JOIN dosen d ON u.id_dosen = d.id_dosen
    LEFT JOIN afiliasi a ON d.id_afiliasi = a.id_afiliasi 
    LEFT JOIN countries c ON d.citizenship = c.id
    LEFT JOIN penulis_publikasi pp ON pp.id_dosen = d.id_dosen
    LEFT JOIN dosen_tag dt ON dt.id_dosen = d.id_dosen
    LEFT JOIN tag t ON t.id_tag = dt.id_tag
    WHERE u.role = 'Dosen'
    GROUP BY d.id_dosen
    ORDER BY d.nama
    LIMIT 20 OFFSET ?;
  `;

  const params = [offset];
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
    COUNT(DISTINCT pp.id_publikasi) AS total_publikasi,
    GROUP_CONCAT(DISTINCT t.nama SEPARATOR ', ') AS tag_nama
    FROM user u 
    LEFT JOIN dosen d ON u.id_dosen = d.id_dosen
    LEFT JOIN afiliasi a ON d.id_afiliasi = a.id_afiliasi 
    LEFT JOIN countries c ON d.citizenship = c.id
    LEFT JOIN penulis_publikasi pp ON pp.id_dosen = d.id_dosen
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
      p.tahun,
      p.link_publikasi,
      p.jurnal
    FROM penulis_publikasi pp
    LEFT JOIN publikasi p ON pp.id_publikasi = p.id_publikasi
    LEFT JOIN dosen d ON pp.id_dosen = d.id_dosen
    WHERE d.id_dosen = ? AND p.is_public = 1
    GROUP BY p.id_publikasi, p.judul, p.tahun, p.jurnal
    ORDER BY p.tahun DESC
    LIMIT 20;
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
      COUNT(DISTINCT pp.id_publikasi) AS total_publikasi,
      GROUP_CONCAT(DISTINCT t.nama SEPARATOR ', ') AS tag_nama
    FROM user u
    LEFT JOIN dosen d ON u.id_dosen = d.id_dosen
    LEFT JOIN afiliasi a ON d.id_afiliasi = a.id_afiliasi
    LEFT JOIN countries c ON d.citizenship = c.id
    LEFT JOIN penulis_publikasi pp ON pp.id_dosen = d.id_dosen
    LEFT JOIN dosen_tag dt ON dt.id_dosen = d.id_dosen
    LEFT JOIN tag t ON t.id_tag = dt.id_tag
    WHERE u.role = 'Dosen' AND (d.id_dosen = ? OR d.nidn = ?)
    GROUP BY d.id_dosen, d.foto_profil, d.nama, d.nidn, a.institusi, c.name;
  `;

  const [rows] = await db.query(sql, [id_dosen, id_dosen]);
  return rows[0] ?? null;
};