import apiClient from "./axios";

import type {
  Task,
  CreateTaskRequest,
} from "../types/task";

export async function getTasks(
  projectId?: string
): Promise<Task[]> {
  const response =
    await apiClient.get(
      "/tasks",
      {
        params: projectId
          ? { projectId }
          : undefined,
      }
    );

  return response.data.tasks;
}

export async function getTask(
  id: string
): Promise<Task> {
  const response =
    await apiClient.get(
      `/tasks/${id}`
    );

  return response.data.task;
}

export async function createTask(
  data: CreateTaskRequest
): Promise<Task> {
  const response =
    await apiClient.post(
      "/tasks",
      data
    );

  return response.data.task;
}

export async function updateTask(
  id: string,
  data: Partial<CreateTaskRequest>
): Promise<Task> {
  const response =
    await apiClient.put(
      `/tasks/${id}`,
      data
    );

  return response.data.task;
}

export async function deleteTask(
  id: string
): Promise<void> {
  await apiClient.delete(
    `/tasks/${id}`
  );
}