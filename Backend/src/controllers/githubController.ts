import type {
  Request,
  Response,
} from "express";

import {
  getGitHubProfile,
  getGitHubRepositories,
  getRepositoryActivity,
} from "../services/githubService.js";

export async function getGitHubProfileController(
  _req: Request,
  res: Response
) {
  try {
    const profile =
      await getGitHubProfile();

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
  _req: Request,
  res: Response
) {
  try {
    const repositories =
      await getGitHubRepositories();

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