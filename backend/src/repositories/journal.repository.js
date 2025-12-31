import db from '../config/database.js';

class JournalRepository {
  
  /**
   * Finds a journal by ISSN or Name, or creates it if it doesn't exist.
   * Returns the id_jurnal.
   */
  async findOrCreate(namaJurnal, issn, connection) {
    // 1. Try to find by ISSN (most accurate)
    if (issn) {
      const queryIssn = `SELECT id_jurnal FROM jurnal WHERE issn = ? LIMIT 1`;
      const [rows] = await connection.execute(queryIssn, [issn]);
      if (rows.length > 0) return rows[0].id_jurnal;
    }

    // 2. Try to find by Name (fallback)
    // Clean the name to avoid issues
    const cleanName = (namaJurnal || 'Unknown Journal').trim();
    const queryName = `SELECT id_jurnal FROM jurnal WHERE nama_jurnal = ? LIMIT 1`;
    const [rowsName] = await connection.execute(queryName, [cleanName]);
    if (rowsName.length > 0) return rowsName[0].id_jurnal;

    // 3. Create new Journal if not found
    const insertQuery = `
      INSERT INTO jurnal (nama_jurnal, issn, publisher, quartile)
      VALUES (?, ?, 'Unknown', NULL)
    `;
    const [result] = await connection.execute(insertQuery, [cleanName, issn || null]);
    
    return result.insertId;
  }
}

export default JournalRepository;