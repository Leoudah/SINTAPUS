import db from "../config/database.js";
import * as publicRepo from '../repositories/public.repository.js';

export const getDosenCards = async (page) => {
  return publicRepo.dosenCard(page);
}

<<<<<<< HEAD
export const getDosenDetail = async (id) => {
  return publicRepo.dosenById(id);
=======
export const getDosenPage = async (id) => {
  return publicRepo.dosenPage(id);
}

export const getDosenPublicationsPage = async (id_dosen, page) => {
  return publicRepo.dosenPublicationsPage(id_dosen, page);
>>>>>>> 1c59374cf8f11d8c0e8fd0b009c9aca0e74a7387
}

