import express from "express";
import { login, register, getProfile, updateProfileController, getMyPublications, togglePublicationStatusController } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/me", getProfile);
router.put("/update-profile", updateProfileController);
router.get("/my-publications", getMyPublications);
router.put("/publications/:id/toggle-status", togglePublicationStatusController);

export default router;
