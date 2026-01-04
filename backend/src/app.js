import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import apiRoutes from "./routes/api.routes.js";
import publicRoutes from "./routes/public.routes.js";
import dosenRoutes from "./routes/dosen.routes.js";
import syncRoutes from "./routes/sync.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from frontend public folder
app.use('/uploads', express.static(path.join(process.cwd(), '../frontend/public/uploads')));

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/dosen", dosenRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/sync", syncRoutes);
app.use("/api", apiRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});

export default app;
