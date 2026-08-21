import apiClient from "./axios";

import type {
  GitHubProfile,
  GitHubRepository,
  GitHubCommit,
} from "../types/github";

export async function getGitHubProfile(): Promise<GitHubProfile> {
  const response =
    await apiClient.get(
      "/github/profile"
    );

  return response.data.profile;
}

export async function getGitHubRepositories(): Promise<
  GitHubRepository[]
> {
  const response =
    await apiClient.get(
      "/github/repos"
    );

  return response.data.repositories;
}

export async function getGitHubActivity(
  owner: string,
  repo: string
): Promise<GitHubCommit[]> {
  const response =
    await apiClient.get(
      "/github/activity",
      {
        params: {
          owner,
          repo,
        },
      }
    );

  return response.data.commits;
}