import apiClient from "./axios";

import type {
  Project,
  CreateProjectRequest,
} from "../types/project";

export async function getProjects(): Promise<
  Project[]
> {
  const response =
    await apiClient.get(
      "/projects"
    );

  return response.data.projects;
}

export async function getProject(
  id: string
): Promise<Project> {
  const response =
    await apiClient.get(
      `/projects/${id}`
    );

  return response.data.project;
}

export async function createProject(
  data: CreateProjectRequest
): Promise<Project> {
  const response =
    await apiClient.post(
      "/projects",
      data
    );

  return response.data.project;
}

export async function updateProject(
  id: string,
  data: Partial<CreateProjectRequest>
): Promise<Project> {
  const response =
    await apiClient.put(
      `/projects/${id}`,
      data
    );

  return response.data.project;
}

export async function deleteProject(
  id: string
): Promise<void> {
  await apiClient.delete(
    `/projects/${id}`
  );
}