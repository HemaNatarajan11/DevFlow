import mongoose from "mongoose";

import Task, {
  TaskPriority,
  TaskStatus,
} from "../models/Task.js";

import Project from "../models/Project.js";

interface CreateTaskInput {
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  projectId: string;
  dueDate?: string;
}

export async function createTask(
  userId: string,
  input: CreateTaskInput
) {
  if (
    !mongoose.Types.ObjectId.isValid(
      input.projectId
    )
  ) {
    throw new Error(
      "Invalid project ID"
    );
  }

  const project =
    await Project.findOne({
      _id: input.projectId,
      userId,
    });

  if (!project) {
    throw new Error(
      "Project not found"
    );
  }

  return Task.create({
    title: input.title.trim(),

    description:
      input.description?.trim() ?? "",

    status:
      input.status ?? "todo",

    priority:
      input.priority ?? "medium",

    projectId: input.projectId,

    userId,

    dueDate: input.dueDate
      ? new Date(input.dueDate)
      : undefined,
  });
}

export async function getTasks(
  userId: string,
  projectId?: string
) {
  const filter: Record<
    string,
    unknown
  > = {
    userId,
  };

  if (projectId) {
    if (
      !mongoose.Types.ObjectId.isValid(
        projectId
      )
    ) {
      throw new Error(
        "Invalid project ID"
      );
    }

    filter.projectId = projectId;
  }

  return Task.find(filter)
    .populate(
      "projectId",
      "name"
    )
    .sort({
      createdAt: -1,
    });
}

export async function getTaskById(
  userId: string,
  taskId: string
) {
  if (
    !mongoose.Types.ObjectId.isValid(
      taskId
    )
  ) {
    throw new Error(
      "Invalid task ID"
    );
  }

  const task =
    await Task.findOne({
      _id: taskId,
      userId,
    }).populate(
      "projectId",
      "name"
    );

  if (!task) {
    throw new Error(
      "Task not found"
    );
  }

  return task;
}

export async function updateTask(
  userId: string,
  taskId: string,
  data: Partial<CreateTaskInput>
) {
  if (
    !mongoose.Types.ObjectId.isValid(
      taskId
    )
  ) {
    throw new Error(
      "Invalid task ID"
    );
  }

  if (data.projectId) {
    if (
      !mongoose.Types.ObjectId.isValid(
        data.projectId
      )
    ) {
      throw new Error(
        "Invalid project ID"
      );
    }

    const project =
      await Project.findOne({
        _id: data.projectId,
        userId,
      });

    if (!project) {
      throw new Error(
        "Project not found"
      );
    }
  }

  const update: Record<
    string,
    unknown
  > = {};

  if (
    typeof data.title === "string"
  ) {
    update.title =
      data.title.trim();
  }

  if (
    typeof data.description ===
    "string"
  ) {
    update.description =
      data.description.trim();
  }

  if (data.status) {
    update.status =
      data.status;
  }

  if (data.priority) {
    update.priority =
      data.priority;
  }

  if (data.projectId) {
    update.projectId =
      data.projectId;
  }

  if (data.dueDate) {
    update.dueDate =
      new Date(data.dueDate);
  }

  const task =
    await Task.findOneAndUpdate(
      {
        _id: taskId,
        userId,
      },
      update,
      {
        new: true,
        runValidators: true,
      }
    ).populate(
      "projectId",
      "name"
    );

  if (!task) {
    throw new Error(
      "Task not found"
    );
  }

  return task;
}

export async function deleteTask(
  userId: string,
  taskId: string
) {
  if (
    !mongoose.Types.ObjectId.isValid(
      taskId
    )
  ) {
    throw new Error(
      "Invalid task ID"
    );
  }

  const task =
    await Task.findOneAndDelete({
      _id: taskId,
      userId,
    });

  if (!task) {
    throw new Error(
      "Task not found"
    );
  }

  return task;
}