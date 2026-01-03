import express from "express";
import { getDosenCards } from "../controllers/public.controller.js";

const router = express.Router();

// GET /api/public/dosen?page=1
router.get("/dosen", getDosenCards);

router.get("/dosen/:id_dosen", getDosenCards);

router.get("/dosen/:id_dosen/publikasi", getDosenCards);


export default router;