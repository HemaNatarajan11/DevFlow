import { Octokit } from "@octokit/rest";

function getGitHubToken(): string {
  const token =
    process.env.GITHUB_TOKEN;

  if (!token) {
    throw new Error(
      "GITHUB_TOKEN is not configured"
    );
  }

  return token;
}

function createOctokit() {
  return new Octokit({
    auth: getGitHubToken(),
  });
}

export async function getGitHubProfile() {
  const octokit =
    createOctokit();

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

export async function getGitHubRepositories() {
  const octokit =
    createOctokit();

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
  owner: string,
  repo: string
) {
  const octokit =
    createOctokit();

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