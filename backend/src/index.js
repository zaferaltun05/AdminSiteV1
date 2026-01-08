import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// 🔥 __dirname fix (ESM için)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔥 .env backend klasöründen zorla okunur
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import jwt from "jsonwebtoken";

import authRouter from "./auth.js";
import discordAuthRouter from "./discordAuth.js";
import playersRouter from "./players.js";
import logsRouter from "./logs.js";
import commandsRouter from "./commands.js";
import onlineRouter from "./online.js";
import rolesRouter from "./roles.js";
import punishmentsRouter from "./punishments.js";
import adminActivityRouter from "./adminActivity.js";
import analyticsRouter from "./analytics.js";
import maintenanceRouter from "./maintenance.js";
import unauthorizedRouter from "./unauthorized.js";
import backupRouter from "./backup.js";
import apiKeysRouter from "./apiKeys.js";
import bulkActionsRouter from "./bulkActions.js";
import reportsRouter from "./reports.js";
import serverControlRouter from "./serverControl.js";

// 🔎 ENV TEST (ilk çalıştırmada gör)
console.log("ENV CHECK:", {
  PORT: process.env.PORT,
  DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
  DISCORD_REDIRECT_URI: process.env.DISCORD_REDIRECT_URI,
  JWT_SECRET: process.env.JWT_SECRET ? "OK" : "MISSING"
});

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false
  })
);

// JWT auth middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// ROUTES
app.use("/api/discord", discordAuthRouter);
app.use("/api/maintenance", maintenanceRouter);
app.use("/api/unauthorized", unauthorizedRouter);
app.use("/api/backup", authenticateToken, backupRouter);
app.use("/api/api-keys", authenticateToken, apiKeysRouter);
app.use("/api/bulk-actions", bulkActionsRouter);
app.use("/api/reports", reportsRouter);
app.use("/api/server", serverControlRouter);
app.use("/api/admin-activity", adminActivityRouter);
app.use("/api/analytics", analyticsRouter);

// ROOT
app.get("/", (req, res) => {
  res.send("FiveM Admin Panel Backend Running");
});

// TEST PROTECTED
app.get("/api/protected", authenticateToken, (req, res) => {
  res.json({ message: "Yetkili erişim", user: req.user });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
