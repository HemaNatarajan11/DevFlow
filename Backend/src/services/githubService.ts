import { Octokit } from "@octokit/rest";

import User from "../models/User.js";

async function getGitHubToken(
  userId: string
): Promise<string> {
  const user = await User.findById(
    userId
  ).select("+githubToken");

  const token = user?.githubToken;

  if (!token) {
    throw new Error(
      "GitHub token not configured. Add your GitHub token in Settings."
    );
  }

  return token;
}

async function createOctokit(
  token: string
) {
  return new Octokit({
    auth: token,
  });
}

export async function hasGitHubToken(
  userId: string
): Promise<boolean> {
  const user = await User.findById(
    userId
  ).select("+githubToken");

  return Boolean(
    user?.githubToken
  );
}

export async function saveGitHubToken(
  userId: string,
  token: string
) {
  const trimmed = token.trim();

  if (!trimmed) {
    throw new Error(
      "GitHub token is required"
    );
  }

  await User.findByIdAndUpdate(
    userId,
    { githubToken: trimmed },
    { new: true }
  );
}

export async function getGitHubProfile(
  userId: string
) {
  const token =
    await getGitHubToken(userId);

  const octokit =
    await createOctokit(token);

  const response =
    await octokit.rest.users.getAuthenticated();

  return {
    username:
      response.data.login,

    avatarUrl:
      response.data.avatar_url,

    publicRepos:
      response.data.public_repos,

    followers:
      response.data.followers,

    following:
      response.data.following,
  };
}

export async function getGitHubRepositories(
  userId: string
) {
  const token =
    await getGitHubToken(userId);

  const octokit =
    await createOctokit(token);

  const response =
    await octokit.rest.repos.listForAuthenticatedUser(
      {
        sort: "updated",
        per_page: 100,
      }
    );

  return response.data.map(
    (repository) => ({
      id: repository.id,

      name: repository.name,

      description:
        repository.description ??
        "",

      language:
        repository.language ??
        "Unknown",

      stars:
        repository.stargazers_count,

      forks:
        repository.forks_count,

      url:
        repository.html_url,
    })
  );
}

export async function getRepositoryActivity(
  userId: string,
  owner: string,
  repo: string
) {
  const token =
    await getGitHubToken(userId);

  const octokit =
    await createOctokit(token);

  const response =
    await octokit.rest.repos.listCommits(
      {
        owner,
        repo,
        per_page: 20,
      }
    );

  return response.data.map(
    (commit) => ({
      id: commit.sha,

      message:
        commit.commit.message,

      repository: repo,

      author:
        commit.commit.author
          ?.name ??
        "Unknown",

      date:
        commit.commit.author
          ?.date ??
        "",
    })
  );
}