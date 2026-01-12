import express from "express";
import { authenticate, authorizeDosen } from "../middlewares/auth.middleware.js";
import { getDosenByScopusID, updateDosenProfile, getDosenPublications, getPublicationStats, createManualPublication, updatePublication, deletePublication } from "../controllers/dosen.controller.js";
const router = express.Router();

// GET /api/dosen/scopus/:scopusAuthorId
router.get("/scopus/:scopusAuthorId", authenticate, authorizeDosen, getDosenByScopusID);
// PUT /api/dosen/:id_dosen
router.put("/:id_dosen", authenticate, authorizeDosen, updateDosenProfile);
// GET /api/dosen/:id_dosen/publikasi
router.get("/:id_dosen/publikasi", authenticate, authorizeDosen, getDosenPublications);
// GET /api/dosen/:id_dosen/stats
router.get("/:id_dosen/stats", authenticate, authorizeDosen, getPublicationStats);
// POST /api/dosen/:id_dosen/publikasi/manual
router.post("/:id_dosen/publikasi/manual", authenticate, authorizeDosen, createManualPublication);
// PUT /api/dosen/:id_dosen/publikasi/:id_publikasi
router.put("/:id_dosen/publikasi/:id_publikasi", authenticate, authorizeDosen, updatePublication);
// DELETE /api/dosen/:id_dosen/publikasi/:id_publikasi
router.delete("/:id_dosen/publikasi/:id_publikasi", authenticate, authorizeDosen, deletePublication);

export default router;