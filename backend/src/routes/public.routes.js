import express from "express";
import { getDosenCards, getDosenDetail, getDosenPublicationsPage } from "../controllers/public.controller.js";

const router = express.Router();

// GET /api/public/dosen?page=1
router.get("/dosen", getDosenCards);
// GET /api/public/dosen/:id
router.get("/dosen/:id", getDosenDetail);

router.get("/dosen/:id_dosen", getDosenCards);

router.get("/dosen/:id_dosen/publikasi", getDosenPublicationsPage);


export default router;