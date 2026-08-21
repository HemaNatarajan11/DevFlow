import { useQuery } from "@tanstack/react-query";

import {
  getGitHubProfile,
  getGitHubRepositories,
  getGitHubActivity,
} from "../api/githubApi";

export function useGitHubProfile() {
  return useQuery({
    queryKey: [
      "github",
      "profile",
    ],

    queryFn:
      getGitHubProfile,
  });
}

export function useGitHubRepositories() {
  return useQuery({
    queryKey: [
      "github",
      "repositories",
    ],

    queryFn:
      getGitHubRepositories,
  });
}

export function useGitHubActivity(
  owner: string,
  repo: string
) {
  return useQuery({
    queryKey: [
      "github",
      "activity",
      owner,
      repo,
    ],

    queryFn: () =>
      getGitHubActivity(
        owner,
        repo
      ),

    enabled:
      Boolean(owner) &&
      Boolean(repo),
  });
}