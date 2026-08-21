import type {
  Request,
  Response,
} from "express";

import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../services/projectService.js";

export async function createProjectController(
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

    const {
      name,
      description,
    } = req.body;

    if (
      typeof name !== "string" ||
      !name.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Project name is required",
      });
    }

    const project =
      await createProject(
        req.userId,
        name,
        description
      );

    return res.status(201).json({
      success: true,
      project,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to create project";

    return res.status(400).json({
      success: false,
      message,
    });
  }
}

export async function getProjectsController(
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

    const projects =
      await getProjects(
        req.userId
      );

    return res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to fetch projects";

    return res.status(500).json({
      success: false,
      message,
    });
  }
}

export async function getProjectController(
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

    const { id } = req.params;

    if (typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID",
      });
    }

    const project =
      await getProjectById(
        req.userId,
        id
      );

    return res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Project not found";

    return res.status(404).json({
      success: false,
      message,
    });
  }
}

export async function updateProjectController(
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

    const { id } = req.params;

    if (typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID",
      });
    }

    const project =
      await updateProject(
        req.userId,
        id,
        req.body
      );

    return res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to update project";

    return res.status(400).json({
      success: false,
      message,
    });
  }
}

export async function deleteProjectController(
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

    const { id } = req.params;

    if (typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID",
      });
    }

    await deleteProject(
      req.userId,
      id
    );

    return res.status(200).json({
      success: true,
      message:
        "Project deleted successfully",
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to delete project";

    return res.status(400).json({
      success: false,
      message,
    });
  }
}