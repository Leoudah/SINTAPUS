import express from "express";
import { getDosenCards, getDosenDetail, getDosenPublicationsPage, getCountries, getAfiliasi, getAfiliasiDetail } from "../controllers/public.controller.js";
import{ getAfiliasiPaged } from "../controllers/public.controller.js";

const router = express.Router();

// GET /api/public/dosen?page=1
router.get("/dosen", getDosenCards);
// GET /api/public/dosen/:id
router.get("/dosen/:id", getDosenDetail);

// GET /api/public/dosen/:id_dosen/publikasi
router.get("/dosen/:id_dosen/publikasi", getDosenPublicationsPage);

router.get("/countries", getCountries);
router.get("/afiliasi/all", getAfiliasi);
router.get("/afiliasi", getAfiliasiPaged);
router.get("/afiliasi/:id", getAfiliasiDetail);


export default router;