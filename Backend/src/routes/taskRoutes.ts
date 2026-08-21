import { Router } from "express";

import {
  createTaskController,
  getTasksController,
  getTaskController,
  updateTaskController,
  deleteTaskController,
} from "../controllers/taskController.js";

import { authenticate } from "../middleware/authMiddleware.js";

const router = Router();

router.use(authenticate);

router.get(
  "/",
  getTasksController
);

router.get(
  "/:id",
  getTaskController
);

router.post(
  "/",
  createTaskController
);

router.put(
  "/:id",
  updateTaskController
);

router.delete(
  "/:id",
  deleteTaskController
);

export default router;