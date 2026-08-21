import { Router } from "express";

import {
  getGitHubProfileController,
  getGitHubRepositoriesController,
  getRepositoryActivityController,
  saveGitHubTokenController,
  getGitHubStatusController,
} from "../controllers/githubController.js";

import { authenticate } from "../middleware/authMiddleware.js";

const router = Router();

router.use(authenticate);

router.post(
  "/token",
  saveGitHubTokenController
);

router.get(
  "/status",
  getGitHubStatusController
);

router.get(
  "/profile",
  getGitHubProfileController
);

router.get(
  "/repos",
  getGitHubRepositoriesController
);

router.get(
  "/activity",
  getRepositoryActivityController
);

export default router;