import {
  useState,
} from "react";

import {
  GitBranch,
  Star,
  GitFork,
  Users,
  BookOpen,
  KeyRound,
  CheckCircle2,
  Loader2,
} from "lucide-react";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

import {
  useGitHubProfile,
  useGitHubRepositories,
} from "../../hooks/useGitHub";

import {
  saveGitHubToken,
} from "../../api/githubApi";

export default function Github() {
  const [token, setToken] = useState("");
  const [savingToken, setSavingToken] = useState(false);
  const [tokenSaved, setTokenSaved] = useState(false);
  const [tokenError, setTokenError] = useState("");

  const {
    data: profile,
    isLoading:
      profileLoading,
    isError:
      profileError,
    refetch:
      refetchProfile,
  } = useGitHubProfile();

  const {
    data: repositories = [],
    isLoading:
      repositoriesLoading,
    isError:
      repositoriesError,
    refetch:
      refetchRepositories,
  } =
    useGitHubRepositories();

  const hasError =
    profileError ||
    repositoriesError;

  async function handleSaveToken(
    e: React.FormEvent
  ) {
    e.preventDefault();
    setSavingToken(true);
    setTokenError("");
    setTokenSaved(false);

    try {
      await saveGitHubToken(token);

      setTokenSaved(true);
      setToken("");

      await Promise.all([
        refetchProfile(),
        refetchRepositories(),
      ]);
    } catch {
      setTokenError(
        "Failed to save token. Please try again."
      );
    } finally {
      setSavingToken(false);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Git<span className="text-gradient">Hub</span>
        </h1>
        <p className="mt-1 text-gray-500">
          Track your GitHub development activity.
        </p>
      </div>

      {hasError ? (
        <Card className="overflow-hidden p-0">
          <div className="flex flex-col items-center justify-center p-8 text-center sm:p-10">
            <div className="rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 p-3 shadow-lg shadow-amber-500/30">
              <KeyRound className="h-8 w-8 text-white" />
            </div>

            <p className="mt-5 text-lg font-semibold text-gray-900">
              Connect your GitHub account
            </p>

            <p className="mt-2 max-w-md text-sm text-gray-500">
              Add your GitHub Personal Access Token to see your
              profile and repositories. Your token is stored securely
              and only used to fetch your own GitHub data.
            </p>

            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50/80 px-4 py-3 text-left text-xs text-amber-700">
              <p className="font-semibold">
                How to create a token:
              </p>
              <ol className="mt-1.5 list-decimal space-y-1 pl-4">
                <li>
                  Go to{" "}
                  <a
                    href="https://github.com/settings/tokens"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-amber-800 underline"
                  >
                    github.com/settings/tokens
                  </a>
                </li>
                <li>Click "Generate new token (classic)"</li>
                <li>
                  Select scopes:{" "}
                  <code className="rounded bg-amber-100 px-1 font-mono">
                    read:user
                  </code>{" "}
                  and{" "}
                  <code className="rounded bg-amber-100 px-1 font-mono">
                    repo
                  </code>
                </li>
                <li>Copy the token starting with <code className="rounded bg-amber-100 px-1 font-mono">ghp_...</code></li>
              </ol>
            </div>

            <form
              onSubmit={handleSaveToken}
              className="mt-6 w-full max-w-md space-y-3"
            >
              <Input
                type="password"
                placeholder="Paste your GitHub token (ghp_...)"
                value={token}
                onChange={(e) =>
                  setToken(e.target.value)
                }
                required
              />

              {tokenError && (
                <p className="text-sm text-red-600">
                  {tokenError}
                </p>
              )}

              {tokenSaved && (
                <p className="flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                  <CheckCircle2 className="h-4 w-4" />
                  GitHub connected successfully!
                </p>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={savingToken}
              >
                {savingToken ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  "Connect GitHub"
                )}
              </Button>
            </form>
          </div>
        </Card>
      ) : (
        <>
          {profileLoading ? (
            <div className="flex items-center gap-4">
              <div className="skeleton h-20 w-20 rounded-full" />
              <div className="space-y-2">
                <div className="skeleton h-5 w-48 rounded-lg" />
                <div className="skeleton h-4 w-64 rounded-lg" />
              </div>
            </div>
          ) : (
            profile && (
              <Card className="p-6">
                <div className="flex flex-col items-center gap-6 sm:flex-row">
                  <img
                    src={profile.avatarUrl}
                    alt={profile.username}
                    className="h-20 w-20 rounded-full ring-4 ring-indigo-100"
                  />
                  <div className="text-center sm:text-left">
                    <h2 className="flex items-center gap-2 text-xl font-bold">
                      {profile.username}
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-600 ring-1 ring-emerald-200">
                        <CheckCircle2 className="h-3 w-3" />
                        Connected
                      </span>
                    </h2>
                    <div className="mt-3 flex flex-wrap justify-center gap-5 text-sm text-gray-500 sm:justify-start">
                      <span className="inline-flex items-center gap-1.5">
                        <BookOpen className="h-4 w-4" />
                        {profile.publicRepos} repos
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Users className="h-4 w-4" />
                        {profile.followers} followers
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Users className="h-4 w-4" />
                        {profile.following} following
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            )
          )}

          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 p-2 shadow-lg shadow-gray-700/25">
                <GitBranch className="h-4 w-4 text-white" />
              </div>
              <h2 className="text-xl font-semibold">
                Repositories
              </h2>
            </div>

            {repositoriesLoading ? (
              <div className="grid gap-5 md:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="skeleton h-40 rounded-2xl" />
                ))}
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2">
                {repositories.map((repo) => (
                  <Card
                    key={repo.id}
                    className="group relative overflow-hidden p-5"
                  >
                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-gray-500/10 to-indigo-500/10 blur-2xl transition-all duration-300 group-hover:from-gray-500/20 group-hover:to-indigo-500/20" />

                    <div className="relative">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-semibold text-gray-900">
                          {repo.name}
                        </h3>
                        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-600 ring-1 ring-amber-200">
                          <Star className="h-3 w-3" />
                          {repo.stars}
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-gray-500">
                        {repo.description || "No description"}
                      </p>

                      <div className="mt-5 flex items-center gap-4 text-xs text-gray-500">
                        <a
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg bg-gray-50 px-2.5 py-1.5 font-medium text-gray-600 ring-1 ring-gray-200 transition-all duration-200 hover:bg-indigo-50 hover:text-indigo-600 hover:ring-indigo-200"
                        >
                          <GitBranch className="h-3.5 w-3.5" />
                          View repo
                        </a>

                        <span className="inline-flex items-center gap-1">
                          <GitFork className="h-3.5 w-3.5" />
                          {repo.forks}
                        </span>

                        {repo.language && (
                          <span className="inline-flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-indigo-500" />
                            {repo.language}
                          </span>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}

                {!repositories.length && (
                  <div className="col-span-full py-12 text-center">
                    <GitBranch className="mx-auto h-12 w-12 text-gray-300" />
                    <p className="mt-4 text-sm text-gray-500">
                      No repositories found.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}