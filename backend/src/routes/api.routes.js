import express from 'express';
import { syncByAuthor } from '../controllers/sync.controller.js';

const router = express.Router();

// Middleware Mock for Authentication (JWT extraction would happen here)
const authMiddleware = (req, res, next) => {
  // In production, verify JWT and verify JWT and set req.user
  req.user = { id_user: 1, role: 'admin' };
  next();
};

// Sync Route
// POST /api/sync/scopus
router.post('/sync/scopus', authMiddleware, syncByAuthor);

export default router;
