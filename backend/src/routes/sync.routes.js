import express from "express";
import { authenticate, authorizeDosen } from "../middlewares/auth.middleware.js";
import { syncByAuthor } from "../controllers/sync.controller.js";

const router = express.Router();

// POST /api/sync/author - Sync publications by author ID
router.post("/author", authenticate, authorizeDosen, syncByAuthor);

export default router;