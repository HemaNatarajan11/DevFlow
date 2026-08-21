import mongoose from "mongoose";

import Project from "../models/Project.js";
import Task from "../models/Task.js";

export async function createProject(
  userId: string,
  name: string,
  description?: string
) {
  return Project.create({
    name: name.trim(),
    description:
      description?.trim() ?? "",
    userId,
  });
}

export async function getProjects(
  userId: string
) {
  return Project.find({
    userId,
  }).sort({
    createdAt: -1,
  });
}

export async function getProjectById(
  userId: string,
  projectId: string
) {
  if (
    !mongoose.Types.ObjectId.isValid(
      projectId
    )
  ) {
    throw new Error(
      "Invalid project ID"
    );
  }

  const project =
    await Project.findOne({
      _id: projectId,
      userId,
    });

  if (!project) {
    throw new Error(
      "Project not found"
    );
  }

  return project;
}

export async function updateProject(
  userId: string,
  projectId: string,
  data: {
    name?: string;
    description?: string;
  }
) {
  if (
    !mongoose.Types.ObjectId.isValid(
      projectId
    )
  ) {
    throw new Error(
      "Invalid project ID"
    );
  }

  const update: Record<
    string,
    string
  > = {};

  if (typeof data.name === "string") {
    update.name = data.name.trim();
  }

  if (
    typeof data.description ===
    "string"
  ) {
    update.description =
      data.description.trim();
  }

  const project =
    await Project.findOneAndUpdate(
      {
        _id: projectId,
        userId,
      },
      update,
      {
        new: true,
        runValidators: true,
      }
    );

  if (!project) {
    throw new Error(
      "Project not found"
    );
  }

  return project;
}

export async function deleteProject(
  userId: string,
  projectId: string
) {
  if (
    !mongoose.Types.ObjectId.isValid(
      projectId
    )
  ) {
    throw new Error(
      "Invalid project ID"
    );
  }

  const project =
    await Project.findOneAndDelete({
      _id: projectId,
      userId,
    });

  if (!project) {
    throw new Error(
      "Project not found"
    );
  }

  await Task.deleteMany({
    projectId,
    userId,
  });

  return project;
}