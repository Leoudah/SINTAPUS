import express from "express";
import { getAllUsers } from "../controllers/admin.controller.js";
import { authenticate, authorizeAdmin } from "../middlewares/auth.middleware.js";

import {
  getAccounts,
  getAccountDetail,
  updateAccountStatus
} from '../controllers/admin.controller.js';
import {
  getPublications,
  getPublicationDetail,
  updatePublicationStatus
} from '../controllers/admin.controller.js';

const router = express.Router();

router.use(authenticate);
router.use(authorizeAdmin);

// GET /api/admin/accounts?status=submitted
router.get('/accounts', getAccounts);

// GET /api/admin/accounts/:id
router.get('/accounts/:id', getAccountDetail);

// PUT /api/admin/accounts/:id/status
router.put('/accounts/:id/status', updateAccountStatus);

// GET /api/admin/publications?status=submitted
router.get('/publications', getPublications);

// GET /api/admin/publications/:id
router.get('/publications/:id', getPublicationDetail);

// PUT /api/admin/publications/:id/status
router.put('/publications/:id/status', updatePublicationStatus);

router.get(
  "/users",
  authenticate,
  authorizeAdmin,
  getAllUsers
);

export default router;
