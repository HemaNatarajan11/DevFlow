import type {
  Request,
  Response,
} from "express";

import {
  getAnalytics,
  getProductivity,
} from "../services/analyticsService.js";

export async function getAnalyticsController(
  req: Request,
  res: Response
) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const analytics =
      await getAnalytics(
        req.userId
      );

    return res.status(200).json({
      success: true,
      analytics,
    });
  } catch (error) {
    console.error(
      "Analytics error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch analytics",
    });
  }
}

export async function getProductivityController(
  req: Request,
  res: Response
) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const productivity =
      await getProductivity(
        req.userId
      );

    return res.status(200).json({
      success: true,
      productivity,
    });
  } catch (error) {
    console.error(
      "Productivity error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch productivity",
    });
  }
}