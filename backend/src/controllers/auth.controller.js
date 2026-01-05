import { loginService } from "../services/auth.service.js";
import { registerDosen } from "../services/register.service.js";
import jwt from "jsonwebtoken";
import db from "../config/database.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { updateProfile, findMyPublications, togglePublicationStatus } from "../repositories/dosen.repository.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Multer config for file upload to frontend/public/uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../../frontend/public/uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });


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
    const [dosenRows] = await db.query('SELECT nama, foto_profil, citizenship, scopus_author_id, id_afiliasi FROM dosen WHERE id_dosen = ?', [user.id_dosen]);
    if (dosenRows.length === 0) return res.status(404).json({ message: 'Dosen not found' });

    const dosen = dosenRows[0];

    let countryName = 'Unknown';
    let countryId = dosen.citizenship;
    if (dosen.citizenship) {
      const [countryRows] = await db.query('SELECT name FROM countries WHERE id = ?', [dosen.citizenship]);
      if (countryRows.length > 0) {
        countryName = countryRows[0].name;
      }
    }

    let afiliasiName = 'Unknown';
    let afiliasiId = dosen.id_afiliasi;
    if (dosen.id_afiliasi) {
      const [afiliasiRows] = await db.query('SELECT institusi FROM afiliasi WHERE id_afiliasi = ?', [dosen.id_afiliasi]);
      if (afiliasiRows.length > 0) {
        afiliasiName = afiliasiRows[0].institusi;
      }
    }

    res.json({
      nama: dosen.nama,
      foto_profil: dosen.foto_profil,
      scopus_author_id: dosen.scopus_author_id,
      negara: countryName, // return name for display
      negara_id: countryId, // return ID for forms
      afiliasi: afiliasiName, // return name for display
      afiliasi_id: afiliasiId // return ID for forms
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE PROFILE
export const updateProfileController = [
  upload.single('foto'),
  async (req, res) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) return res.status(401).json({ message: 'No token' });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id_user;

      const [userRows] = await db.query('SELECT * FROM user WHERE id_user = ?', [userId]);
      if (userRows.length === 0) return res.status(404).json({ message: 'User not found' });

      const user = userRows[0];
      const id_dosen = user.id_dosen;

      const { scopus_author_id, afiliasi, citizenship } = req.body;
      const link_foto = req.file ? `/uploads/${req.file.filename}` : null;

      const updateData = {
        scopus_author_id,
        id_afiliasi: afiliasi,
        citizenship,
        link_foto
      };

      await updateProfile(id_dosen, updateData);

      res.json({ message: 'Profile updated successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
];

// GET MY PUBLICATIONS
export const getMyPublications = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id_user;

    const [userRows] = await db.query('SELECT * FROM user WHERE id_user = ?', [userId]);
    if (userRows.length === 0) return res.status(404).json({ message: 'User not found' });

    const user = userRows[0];
    const publications = await findMyPublications(user.id_dosen);

    res.json({ publications });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// TOGGLE PUBLICATION STATUS
export const togglePublicationStatusController = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id_user;

    const [userRows] = await db.query('SELECT * FROM user WHERE id_user = ?', [userId]);
    if (userRows.length === 0) return res.status(404).json({ message: 'User not found' });

    const user = userRows[0];
    const { id } = req.params;
    const { is_public } = req.body;

    // Check if the publication belongs to the user
    const [pubRows] = await db.query(`
      SELECT p.id_publikasi
      FROM publikasi p
      JOIN penulis_publikasi pp ON p.id_publikasi = pp.id_publikasi
      WHERE p.id_publikasi = ? AND pp.id_dosen = ?
    `, [id, user.id_dosen]);

    if (pubRows.length === 0) return res.status(403).json({ message: 'Unauthorized to modify this publication' });

    await togglePublicationStatus(id, is_public);

    res.json({ message: 'Status updated successfully', is_public });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




