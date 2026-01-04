import db from "../config/database.js";
import * as publicRepo from '../repositories/public.repository.js';

export const getDosenCards = async (page) => {
  return publicRepo.dosenCard(page);
}

export const getDosenDetail = async (id) => {
  return publicRepo.dosenById(id);
}
export const getDosenPage = async (id) => {
  return publicRepo.dosenPage(id);
}

export const getDosenPublicationsPage = async (id_dosen, page) => {
  return publicRepo.dosenPublicationsPage(id_dosen, page);
}

export const getCountries = async () => {
  const [rows] = await db.query('SELECT id, name FROM countries ORDER BY name');
  return rows;
};

export const getAfiliasi = async () => {
  const [rows] = await db.query('SELECT id_afiliasi, institusi FROM afiliasi ORDER BY institusi');
  return rows;
};

