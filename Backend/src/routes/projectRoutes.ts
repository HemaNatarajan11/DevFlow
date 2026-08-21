import { Router } from "express";

import {
  createProjectController,
  getProjectsController,
  getProjectController,
  updateProjectController,
  deleteProjectController,
} from "../controllers/projectController.js";

import { authenticate } from "../middleware/authMiddleware.js";

const router = Router();

router.use(authenticate);

router.get(
  "/",
  getProjectsController
);

router.get(
  "/:id",
  getProjectController
);

router.post(
  "/",
  createProjectController
);

router.put(
  "/:id",
  updateProjectController
);

router.delete(
  "/:id",
  deleteProjectController
);

export default router;