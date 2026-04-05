import dotenv from "dotenv";

import app from "./app.js";
import { pool } from "./config/db.js";

dotenv.config();

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Backend running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error?.message || error);
    if (error?.stack) {
      console.error(error.stack);
    }
    await pool.end();
    process.exit(1);
  }
};

start();
