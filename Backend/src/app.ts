import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import githubRoutes from "./routes/githubRoutes.js";

import { errorMiddleware } from "./middleware/errorMiddleware.js";

const app = express();

const frontendUrl =
  process.env.FRONTEND_URL ??
  "http://localhost:5173";

app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
  })
);

app.use(
  express.json()
);

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get(
  "/api/health",
  (_req, res) => {
    return res.status(200).json({
      success: true,
      message:
        "DevFlow API is running",
    });
  }
);

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/projects",
  projectRoutes
);

app.use(
  "/api/tasks",
  taskRoutes
);

app.use(
  "/api/analytics",
  analyticsRoutes
);

app.use(
  "/api/github",
  githubRoutes
);

app.use(errorMiddleware);

export default app;