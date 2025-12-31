import db from '../config/database.js';
import { findUserByEmail } from '../models/user.model.js';

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
}

export default new DosenRepository();
