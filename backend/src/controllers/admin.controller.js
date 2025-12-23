import { getAllUsersWithDosen } from "../services/admin.service.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersWithDosen();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
