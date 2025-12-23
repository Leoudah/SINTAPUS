import express from "express";
import { getAllUsers } from "../controllers/admin.controller.js";
import { authenticate, authorizeAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get(
  "/users",
  authenticate,
  authorizeAdmin,
  getAllUsers
);

export default router;
