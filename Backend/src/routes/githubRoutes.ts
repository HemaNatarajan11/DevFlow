import { Router } from "express";

import {
  getGitHubProfileController,
  getGitHubRepositoriesController,
  getRepositoryActivityController,
} from "../controllers/githubController.js";

import { authenticate } from "../middleware/authMiddleware.js";

const router = Router();

router.use(authenticate);

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