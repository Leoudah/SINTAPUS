import db from "../config/database.js";
import * as publicRepo from '../repositories/public.repository.js';

export const getDosenCards = async (page) => {
  return publicRepo.dosenCard(page);
}

export const getDosenDetail = async (id) => {
  return publicRepo.dosenById(id);
}

