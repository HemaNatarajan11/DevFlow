import Card from "../../components/ui/Card";

import {
  useGitHubProfile,
  useGitHubRepositories,
} from "../../hooks/useGitHub";

export default function Github() {
  const {
    data: profile,
    isLoading:
      profileLoading,
  } = useGitHubProfile();

  const {
    data: repositories = [],
    isLoading:
      repositoriesLoading,
  } =
    useGitHubRepositories();

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          GitHub
        </h1>

        <p className="mt-1 text-gray-500">
          Track your GitHub development activity.
        </p>
      </div>

      {profile && (
        <Card className="p-6">

          <div className="flex items-center gap-5">

            <img
              src={profile.avatarUrl}
              alt={profile.username}
              className="h-20 w-20 rounded-full"
            />

            <div>

              <h2 className="text-xl font-bold">
                {profile.username}
              </h2>

              <div className="mt-2 flex gap-5 text-sm text-gray-500">

                <span>
                  {profile.publicRepos} repos
                </span>

                <span>
                  {profile.followers} followers
                </span>

                <span>
                  {profile.following} following
                </span>

              </div>

            </div>

          </div>

        </Card>
      )}

      {profileLoading && (
        <p>Loading GitHub profile...</p>
      )}

      <div>

        <h2 className="mb-4 text-xl font-semibold">
          Repositories
        </h2>

        {repositoriesLoading ? (
          <p>Loading repositories...</p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">

            {repositories.map(
              (repo) => (
                <Card
                  key={repo.id}
                  className="p-5"
                >

                  <div className="flex justify-between">

                    <h3 className="font-semibold">
                      {repo.name}
                    </h3>

                    <span className="text-sm text-gray-500">
                      ★ {repo.stars}
                    </span>

                  </div>

                  <p className="mt-2 text-sm text-gray-500">
                    {repo.description ||
                      "No description"}
                  </p>

                  <div className="mt-5 flex gap-4 text-xs text-gray-500">

                    <span>
                      {repo.language ||
                        "Unknown"}
                    </span>

                    <span>
                      Forks: {repo.forks}
                    </span>

                  </div>

                </Card>
              )
            )}

          </div>
        )}

      </div>

    </div>
  );
}