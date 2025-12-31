import db from '../config/database.js';

class SyncRepository {
  
  async createLog(id_user, connection) {
    const query = `
      INSERT INTO sinkronisasi 
      (id_user, waktu_sinkron, status, total_ditemukan, publikasi_baru, publikasi_diupdate)
      VALUES (?, NOW(), 'Running', 0, 0, 0)
    `;
    const [result] = await connection.execute(query, [id_user]);
    return result.insertId;
  }

  async updateLog(id_sinkron, status, stats, errorMsg, connection) {
    const query = `
      UPDATE sinkronisasi s
      SET 
        status = ?, 
        total_ditemukan = ?, 
        publikasi_baru = ?, 
        publikasi_diupdate = ?,
        pesan_error = ?
      WHERE id_sinkron = ?
    `;
    await connection.execute(query, [
      status, 
      stats.total, 
      stats.new, 
      stats.updated, 
      errorMsg || null,
      id_sinkron
    ]);
  }
}
export default new SyncRepository();