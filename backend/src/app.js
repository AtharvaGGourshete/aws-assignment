import cors from "cors";
import express from "express";

import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*"
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);

app.use((err, _req, res, _next) => {
  res.status(500).json({
    message: "Unexpected server error.",
    error: err.message
  });
});

export default app;
