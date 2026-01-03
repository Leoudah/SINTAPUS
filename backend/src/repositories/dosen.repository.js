import db from '../config/database.js';

class DosenRepository {
  /**
   * Find a lecturer by Scopus Author ID.
   * Required to link the publication to the internal user system.
   */
  async findByScopusId(scopusAuthorId) {
    const query = `
      SELECT id_dosen, scopus_author_id, id_afiliasi 
      FROM dosen 
      WHERE scopus_author_id = ? 
      LIMIT 1
    `;
    const [rows] = await db.execute(query, [scopusAuthorId]);
    return rows[0];
  }

  async findDosenByName(name) {
    const query = `
      SELECT id_dosen, nama_dosen
      FROM dosen
      WHERE nama_dosen LIKE CONCAT('%', ?, '%')
      ORDER BY nama_dosen
      LIMIT 10;
    `;
    const [rows] = await db.execute(query, [name]);
    return rows[0];
  }

  async findDosenCard(name) {
    const query = `
      SELECT 
        d.id_dosen,
        d.nama_dosen,
        d.afiliansi,
        COUNT(p.id_publikasi) AS total_publikasi
      FROM dosen d
      LEFT JOIN publikasi p ON p.id_dosen = d.id_dosen
      WHERE d.nama_dosen LIKE CONCAT('%', ?, '%')
      GROUP BY d.id_dosen
      ORDER BY d.nama_dosen
      LIMIT 20;
    `;
    const [rows] = await db.execute(query, [name]);
    return rows[0];
  }

}

export default new DosenRepository();
