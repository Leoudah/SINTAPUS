import db from "../config/database.js";

export const getAllUsersWithDosen = async () => {
  const [rows] = await db.query(`
    SELECT 
      u.id_user,
      u.email,
      u.role,
      u.is_verified,
      u.created_at,
      d.id_dosen,
      d.nama,
      d.nidn,
      d.id_card,
      d.id_afiliasi,
      d.citizenship
    FROM user u
    LEFT JOIN dosen d ON u.id_dosen = d.id_dosen
  `);

  return rows;
};
