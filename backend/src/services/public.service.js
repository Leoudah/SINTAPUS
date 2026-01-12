import db from "../config/database.js";
import * as publicRepo from '../repositories/public.repository.js';
import { DOSEN_PER_PAGE, AFILIASI_PER_PAGE } from '../repositories/public.repository.js';

export const getDosenCards = async (page, q = '') => {
  const perPage = DOSEN_PER_PAGE;
  const dosenCards = await publicRepo.dosenCard(page, q);
  const total = await publicRepo.countTotalDosen(q);
  const lastPage = Math.ceil(total / perPage);
  return {
    data: dosenCards,
    meta: {
      current_page: page,
      per_page: perPage,
      total: total,
      last_page: lastPage
    }
  };
}

export const getDosenDetail = async (id) => {
  const dosen = await publicRepo.dosenById(id);
  if (!dosen) return null;

  const stats = await publicRepo.getDosenPublicationStats(id);
  return { ...dosen, publicationStats: stats };
}
export const getDosenPage = async (id) => {
  return publicRepo.dosenPage(id);
}

export const getDosenPublicationsPage = async (id_dosen, page, source = null) => {
  return publicRepo.dosenPublicationsPage(id_dosen, page, source);
}

export const getCountries = async () => {
  const [rows] = await db.query('SELECT id, name FROM countries ORDER BY name');
  return rows;
};

export const getAfiliasi = async () => {
  // default list without pagination (legacy use)
  const [rows] = await db.query('SELECT id_afiliasi, institusi FROM afiliasi ORDER BY institusi');
  return rows;
};

export const getAfiliasiPaged = async (page = 1, q = '') => {
  const perPage = AFILIASI_PER_PAGE;
  const data = await publicRepo.listAfiliasi(page, q);
  const total = await publicRepo.countAfiliasi(q);
  const lastPage = Math.ceil(total / perPage) || 1;
  return {
    data,
    meta: {
      current_page: page,
      per_page: perPage,
      total,
      last_page: lastPage,
    },
  };
};

export const getAfiliasiDetail = async (id_afiliasi, source = null) => {
  const detail = await publicRepo.afiliasiDetail(id_afiliasi);
  if (!detail) return null;

  const dosens = await publicRepo.afiliasiDosens(id_afiliasi);
  const publikasi = await publicRepo.afiliasiPublikasi(id_afiliasi, source);
  const stats = await publicRepo.getAfiliasiPublicationStats(id_afiliasi);

  return {
    ...detail,
    dosens,
    publikasi,
    publicationStats: stats
  };
};

export const getAllJournals = async () => {
  return publicRepo.getAllJournals();
};
