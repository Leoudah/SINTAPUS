import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findUserByEmail } from "../models/user.model.js";

export const loginService = async (email, password) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("User not found");
  }

    if (!user || user.status !== 'verified') {
    throw new Error("Invalid credentials");
    }


  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    {
      id_user: user.id_user,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    token,
    user: {
      id_user: user.id_user,
      email: user.email,
      role: user.role,
    },
  };
};
