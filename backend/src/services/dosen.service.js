import db from "../config/database.js";
import * as dosenRepo from '../repositories/dosen.repository.js';

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
