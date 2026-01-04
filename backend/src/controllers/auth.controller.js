import { loginService } from "../services/auth.service.js";
import { registerDosen } from "../services/register.service.js";
import jwt from "jsonwebtoken";
import db from "../config/database.js";


// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const result = await loginService(email, password);
    res.json(result);

  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};


// REGISTER
export const register = async (req, res) => {
  try {
    const result = await registerDosen(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET PROFILE
export const getProfile = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id_user;

    const [userRows] = await db.query('SELECT * FROM user WHERE id_user = ?', [userId]);
    if (userRows.length === 0) return res.status(404).json({ message: 'User not found' });

    const user = userRows[0];
    const [dosenRows] = await db.query('SELECT nama, foto_profil, citizenship FROM dosen WHERE id_dosen = ?', [user.id_dosen]);
    if (dosenRows.length === 0) return res.status(404).json({ message: 'Dosen not found' });

    const dosen = dosenRows[0];

    let country = 'Unknown';
    if (dosen.citizenship) {
      const [countryRows] = await db.query('SELECT name FROM countries WHERE id = ?', [dosen.citizenship]);
      if (countryRows.length > 0) {
        country = countryRows[0].name;
      }
    }

    res.json({
      nama: dosen.nama,
      foto_profil: dosen.foto_profil,
      negara: country
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




