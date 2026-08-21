import type {
  Request,
  Response,
} from "express";

import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../services/taskService.js";

export async function createTaskController(
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
      title,
      description,
      status,
      priority,
      projectId,
      dueDate,
    } = req.body;

    if (
      typeof title !== "string" ||
      !title.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Task title is required",
      });
    }

    if (
      typeof projectId !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Project ID is required",
      });
    }

    const task =
      await createTask(
        req.userId,
        {
          title,
          description,
          status,
          priority,
          projectId,
          dueDate,
        }
      );

    return res.status(201).json({
      success: true,
      task,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to create task";

    return res.status(400).json({
      success: false,
      message,
    });
  }
}

export async function getTasksController(
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

    const projectId =
      typeof req.query.projectId === "string"
        ? req.query.projectId
        : undefined;

    const tasks =
      await getTasks(
        req.userId,
        projectId
      );

    return res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to fetch tasks";

    return res.status(400).json({
      success: false,
      message,
    });
  }
}

export async function getTaskController(
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
        message: "Invalid task ID",
      });
    }

    const task =
      await getTaskById(
        req.userId,
        id
      );

    return res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Task not found";

    return res.status(404).json({
      success: false,
      message,
    });
  }
}

export async function updateTaskController(
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
        message: "Invalid task ID",
      });
    }

    const task =
      await updateTask(
        req.userId,
        id,
        req.body
      );

    return res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to update task";

    return res.status(400).json({
      success: false,
      message,
    });
  }
}

export async function deleteTaskController(
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
        message: "Invalid task ID",
      });
    }

    await deleteTask(
      req.userId,
      id
    );

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to delete task";

    return res.status(400).json({
      success: false,
      message,
    });
  }
}