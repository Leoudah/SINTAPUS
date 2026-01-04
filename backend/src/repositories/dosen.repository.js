import db from '../config/database.js';

  /**
   * Find a lecturer by Scopus Author ID.
   * Required to link the publication to the internal user system.
   */
  export const findByScopusID = async(scopusAuthorId) => {
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

  export const updateProfile = async(id_dosen, profileData) => {
    const {
      scopus_author_id,
      id_afiliasi,
      citizenship,
      link_foto
    } = profileData;

    const query = `
      UPDATE dosen
      SET scopus_author_id = ?, id_afiliasi = ?, citizenship = ?, link_foto = ?
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


//KALAU SEMPAT NGERJAIN YANG INI

  export const addDosenTag = async(id_dosen, tag) => {
    const query = `
      INSERT INTO dosen_tag (id_dosen, tag)
      VALUES (?, ?)
    `;
    const [result] = await db.execute(query, [id_dosen, tag]);
    return result;
  }

  export const removeDosenTag = async(id_dosen, tag) => {
    const query = `
      DELETE FROM dosen_tag
      WHERE id_dosen = ? AND tag = ?
    `;
    const [result] = await db.execute(query, [id_dosen, tag]);
    return result;
  }

  export const getDosenTags = async(id_dosen) => {
    const query = `
      SELECT tag
      FROM dosen_tag
      WHERE id_dosen = ?
    `;
    const [rows] = await db.execute(query, [id_dosen]);
    return rows;
  }

  export const getDosenById = async(id_dosen) => {
    const query = `
      SELECT id_dosen, nama_dosen, scopus_author_id, id_afiliasi, citizenship, link_foto
      FROM dosen
      WHERE id_dosen = ?
      LIMIT 1
    `;
    const [rows] = await db.execute(query, [id_dosen]);
    return rows[0];
  }

