import express from "express";
import { getDosenCards, getDosenDetail } from "../controllers/public.controller.js";

const router = express.Router();

// GET /api/public/dosen?page=1
router.get("/dosen", getDosenCards);
// GET /api/public/dosen/:id
router.get("/dosen/:id", getDosenDetail);

export default router;