import db from "../config/db.js";

export const findUserByEmail = async (email) => {
  const [rows] = await db.query(
    "SELECT * FROM user WHERE email = ? LIMIT 1",
    [email]
  );
  return rows[0];
};
