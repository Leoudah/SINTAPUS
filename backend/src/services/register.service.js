import bcrypt from "bcryptjs";
import db from "../config/database.js";
import { findUserByEmail } from "../models/user.model.js";

export const registerDosen = async ({ email, password, nama, nidn, afiliasi, scopus_author_id, citizenship }) => {
  // 1. Cek email
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("Email already registered");
  }

  // 2. Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // 2,1. Find Cetizenship
  const [countryRows] = await db.query(
    `SELECT id FROM countries WHERE name = ? LIMIT 1`,
    [citizenship]
  );

  const id_citizenship = countryRows[0].id;

    // 2,2. Find Afiliasi
  const [afiliasiRows] = await db.query(
    `SELECT id_afiliasi FROM afiliasi WHERE institusi = ? LIMIT 1`,
    [afiliasi]
  );
  
  const id_afiliasi = afiliasiRows[0].id_afiliasi;

  // 3. Insert dosen
  const [dosenResult] = await db.query(
    `INSERT INTO dosen (nama, nidn, scopus_author_id, id_afiliasi, citizenship, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
    [nama, nidn, scopus_author_id, id_afiliasi, id_citizenship]
  );

  const idDosen = dosenResult.insertId;

  // 4. Insert user
  await db.query(
    `INSERT INTO user 
      (email, password_hash, role, id_dosen, status, created_at, updated_at)
     VALUES (?, ?, 'Dosen', ?, 'submitted', NOW(), NOW())`,
    [email, passwordHash, idDosen]
  );

  return {
    message: "Registration successful, waiting for verification",
  };
};


