import db from '../config/database.js';

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
