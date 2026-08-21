import { Router } from "express";

import {
  registerController,
  loginController,
  meController,
} from "../controllers/authController.js";

import { authenticate } from "../middleware/authMiddleware.js";

const router = Router();

router.post(
  "/register",
  registerController
);

router.post(
  "/login",
  loginController
);

router.get(
  "/me",
  authenticate,
  meController
);

export default router;