import type {
  Request,
  Response,
} from "express";

import {
  getGitHubProfile,
  getGitHubRepositories,
  getRepositoryActivity,
  saveGitHubToken,
  hasGitHubToken,
} from "../services/githubService.js";

function getUserId(
  req: Request
): string | null {
  return req.userId ?? null;
}

export async function saveGitHubTokenController(
  req: Request,
  res: Response
) {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const { token } = req.body;

    if (
      typeof token !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "GitHub token is required",
      });
    }

    await saveGitHubToken(
      userId,
      token
    );

    return res.status(200).json({
      success: true,
      message:
        "GitHub token saved successfully",
    });
  } catch (error) {
    console.error(
      "Save GitHub token error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to save GitHub token",
    });
  }
}

export async function getGitHubStatusController(
  req: Request,
  res: Response
) {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const connected =
      await hasGitHubToken(userId);

    return res.status(200).json({
      success: true,
      connected,
    });
  } catch (error) {
    console.error(
      "GitHub status error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to check GitHub connection",
    });
  }
}

export async function getGitHubProfileController(
  req: Request,
  res: Response
) {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const profile =
      await getGitHubProfile(userId);

    return res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    console.error(
      "GitHub profile error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch GitHub profile",
    });
  }
}

export async function getGitHubRepositoriesController(
  req: Request,
  res: Response
) {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const repositories =
      await getGitHubRepositories(userId);

    return res.status(200).json({
      success: true,
      repositories,
    });
  } catch (error) {
    console.error(
      "GitHub repositories error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch GitHub repositories",
    });
  }
}

export async function getRepositoryActivityController(
  req: Request,
  res: Response
) {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const {
      owner,
      repo,
    } = req.query;

    if (
      typeof owner !== "string" ||
      typeof repo !== "string" ||
      !owner.trim() ||
      !repo.trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Owner and repository are required",
      });
    }

    const activity =
      await getRepositoryActivity(
        userId,
        owner,
        repo
      );

    return res.status(200).json({
      success: true,
      activity,
    });
  } catch (error) {
    console.error(
      "GitHub activity error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch GitHub activity",
    });
  }
}