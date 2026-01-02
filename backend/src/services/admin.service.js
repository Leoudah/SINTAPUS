import db from "../config/database.js";
import * as adminRepo from '../repositories/admin.repository.js';

export const getAccountsByStatus = async (status) => {
  return adminRepo.findAll(status);
};

export const getAccountDetail = async (id) => {
  return adminRepo.findById(id);
};

export const updateAccountStatus = async (id, status, note, adminId) => {
  const account = await adminRepo.findById(id);
  if (!account) {
    throw new Error('Account not found');
  }

  if (account.status === 'verified' && status === 'verified') {
    throw new Error('Account already verified');
  }

  return adminRepo.updateStatus(id, status, note, adminId);
};

export const getPublicationsByStatus = async (status) => {
  return adminRepo.findAllPublications(status);
};

export const getPublicationDetail = async (id) => {
  return adminRepo.findPublicationById(id);
};

export const updatePublicationStatus = async (id, status, note, adminId) => {
  const pub = await adminRepo.findPublicationById(id);
  if (!pub) {
    throw new Error('Publication not found');
  }

  if (pub.status === 'verified' && status === 'verified') {
    throw new Error('Publication already verified');
  }

  return adminRepo.updatePublicationStatus(id, status, note, adminId);
};

export const getAllUsersWithDosen = async () => {
  const [rows] = await db.query(`
    SELECT 
      u.id_user,
      u.email,
      u.role,
      u.is_verified,
      u.created_at,
      d.id_dosen,
      d.nama,
      d.nidn,
      d.id_card,
      d.id_afiliasi,
      d.citizenship
    FROM user u
    LEFT JOIN dosen d ON u.id_dosen = d.id_dosen
  `);

  return rows;
};
