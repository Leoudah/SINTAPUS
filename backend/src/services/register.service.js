import bcrypt from "bcryptjs";
import db from "../config/database.js";
import { findUserByEmail } from "../models/user.model.js";

export const registerDosen = async ({ email, password, nama, nidn, id_card, id_afiliasi, scopus_author_id, citizenship }) => {
  // 1. Cek email
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("Email already registered");
  }

  // 2. Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // 3. Insert dosen
  const [dosenResult] = await db.query(
    `INSERT INTO dosen (nama, nidn, id_card, id_afiliasi, scopus_author_id, created_at, updated_at, citizenship)
     VALUES (?, ?, ?, ?, ?, NOW(), NOW(), ?)`,
    [nama, nidn, id_card, id_afiliasi, scopus_author_id, citizenship]
  );

  const idDosen = dosenResult.insertId;

  // 4. Insert user
  await db.query(
    `INSERT INTO user 
      (email, password_hash, role, id_dosen, is_verified, created_at, updated_at)
     VALUES (?, ?, 'Dosen', ?, 'Proses', NOW(), NOW())`,
    [email, passwordHash, idDosen]
  );

  return {
    message: "Registration successful, waiting for verification",
  };
};


