import express from "express";
import { login, register, getProfile } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/me", getProfile);

export default router;
