import express from "express";
import { authorizeDosen } from "../middlewares/auth.middleware.js";
import { getDosenByScopusID, updateDosenProfile, getDosenPublications } from "../controllers/dosen.controller.js";
const router = express.Router();

// GET /api/dosen/scopus/:scopusAuthorId
router.get("/scopus/:scopusAuthorId", authorizeDosen, getDosenByScopusID);
// PUT /api/dosen/:id_dosen
router.put("/:id_dosen", authorizeDosen, updateDosenProfile);
// GET /api/dosen/:id_dosen/publikasi
router.get("/:id_dosen/publikasi", authorizeDosen, getDosenPublications);

export default router;