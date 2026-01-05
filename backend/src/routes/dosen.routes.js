import express from "express";
import { authenticate, authorizeDosen } from "../middlewares/auth.middleware.js";
import { getDosenByScopusID, updateDosenProfile, getDosenPublications, getPublicationStats } from "../controllers/dosen.controller.js";
const router = express.Router();

// GET /api/dosen/scopus/:scopusAuthorId
router.get("/scopus/:scopusAuthorId", authenticate, authorizeDosen, getDosenByScopusID);
// PUT /api/dosen/:id_dosen
router.put("/:id_dosen", authenticate, authorizeDosen, updateDosenProfile);
// GET /api/dosen/:id_dosen/publikasi
router.get("/:id_dosen/publikasi", authenticate, authorizeDosen, getDosenPublications);
// GET /api/dosen/:id_dosen/stats
router.get("/:id_dosen/stats", authenticate, authorizeDosen, getPublicationStats);

export default router;