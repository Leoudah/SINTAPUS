import db from "../config/database.js";
import * as dosenRepo from '../repositories/dosen.repository.js';
import publicationRepo from '../repositories/publication.repository.js';

export const getDosenByScopusID = async (scopusAuthorId) => {
  return await dosenRepo.findByScopusID(scopusAuthorId);
}
export const updateDosenProfile = async (id_dosen, profileData) => {
  return await dosenRepo.updateProfile(id_dosen, profileData);
}
export const getDosenPublications = async (id_dosen) => {
  return await dosenRepo.findMyPublications(id_dosen);
}

export const getPublicationStats = async (id_dosen) => {
  return await dosenRepo.getPublicationStats(id_dosen);
};

export const createManualPublication = async (id_dosen, publicationData) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // Validate required fields
    if (!publicationData.judul || !publicationData.id_jurnal) {
      throw new Error('Missing required fields: judul and id_jurnal are required');
    }

    // Get dosen info for author linking
    const dosen = await dosenRepo.getDosenById(id_dosen);
    if (!dosen) {
      throw new Error('Dosen not found');
    }

    // Create the publication
    const id_publikasi = await publicationRepo.createManualPublication(
      publicationData,
      id_dosen,
      connection
    );

    // Link the dosen as author
    await publicationRepo.linkAuthor(
      id_publikasi,
      id_dosen,
      publicationData.creator || dosen.nama,
      dosen.id_afiliasi,
      connection
    );

    await connection.commit();

    return {
      id_publikasi,
      message: 'Manual publication created successfully'
    };

  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const updatePublication = async (id_dosen, id_publikasi, publicationData) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // Validate required fields
    if (!publicationData.judul || publicationData.judul.trim() === '') {
      throw new Error('Judul is required');
    }

    if (!publicationData.id_jurnal || publicationData.id_jurnal === '' || publicationData.id_jurnal === '0') {
      throw new Error('Jurnal is required');
    }

    // Verify the publication belongs to this dosen
    const [rows] = await connection.execute(
      'SELECT pp.id_dosen FROM penulis_publikasi pp WHERE pp.id_publikasi = ? LIMIT 1',
      [id_publikasi]
    );

    if (!rows[0] || parseInt(rows[0].id_dosen) !== parseInt(id_dosen)) {
      throw new Error('Publication not found or does not belong to this dosen');
    }

    // Update the publication
    await publicationRepo.updateManualPublication(id_publikasi, publicationData, connection);

    await connection.commit();

    return {
      id_publikasi,
      message: 'Publication updated successfully. Status changed to draft for re-verification.'
    };

  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const deletePublication = async (id_dosen, id_publikasi) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // Verify the publication belongs to this dosen
    const [rows] = await connection.execute(
      'SELECT pp.id_dosen FROM penulis_publikasi pp WHERE pp.id_publikasi = ? LIMIT 1',
      [id_publikasi]
    );

    if (!rows[0] || parseInt(rows[0].id_dosen) !== parseInt(id_dosen)) {
      throw new Error('Publication not found or does not belong to this dosen');
    }

    // Delete the publication
    await publicationRepo.deletePublication(id_publikasi, connection);

    await connection.commit();

    return {
      message: 'Publication deleted successfully'
    };

  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};
