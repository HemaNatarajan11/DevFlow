import { Router } from "express";

import {
  getAnalyticsController,
  getProductivityController,
} from "../controllers/analyticsController.js";

import { authenticate } from "../middleware/authMiddleware.js";

const router = Router();

router.use(authenticate);

router.get(
  "/",
  getAnalyticsController
);

router.get(
  "/productivity",
  getProductivityController
);

export default router;