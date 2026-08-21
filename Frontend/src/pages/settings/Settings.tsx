import {
  useState,
  useEffect,
} from "react";

import {
  User,
  Mail,
  LogOut,
  Shield,
  KeyRound,
  Settings as SettingsIcon,
  CheckCircle2,
  GitBranch,
  Loader2,
} from "lucide-react";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

import {
  useAuth,
} from "../../hooks/useAuth";

import {
  saveGitHubToken,
  getGitHubStatus,
} from "../../api/githubApi";

export default function Settings() {
  const {
    logout,
  } = useAuth();

  const user = JSON.parse(
    localStorage.getItem("user") ||
      "{}"
  );

  const [githubToken, setGithubToken] = useState("");
  const [savingGithub, setSavingGithub] = useState(false);
  const [githubConnected, setGithubConnected] = useState<boolean | null>(null);
  const [githubMessage, setGithubMessage] = useState("");
  const [githubError, setGithubError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadStatus() {
      try {
        const connected =
          await getGitHubStatus();

        if (!cancelled) {
          setGithubConnected(
            connected
          );
        }
      } catch {
        if (!cancelled) {
          setGithubConnected(
            false
          );
        }
      }
    }

    loadStatus();

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSaveGithubToken(
    e: React.FormEvent
  ) {
    e.preventDefault();
    setSavingGithub(true);
    setGithubError("");
    setGithubMessage("");

    try {
      await saveGitHubToken(githubToken);

      setGithubMessage(
        "GitHub connected successfully!"
      );
      setGithubToken("");
      setGithubConnected(true);
    } catch {
      setGithubError(
        "Failed to save GitHub token. Please try again."
      );
    } finally {
      setSavingGithub(false);
    }
  }

  return (
    <div className="max-w-3xl space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          Setti<span className="text-gradient">ngs</span>
        </h1>

        <p className="mt-1 text-gray-500">
          Manage your DevFlow account.
        </p>

      </div>

      <Card className="overflow-hidden p-0">

        <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 p-6">

          <div className="flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-2xl font-bold text-white ring-2 ring-white/30 backdrop-blur-xl">

              {(user.name || "D").charAt(0).toUpperCase()}

            </div>

            <div>

              <h2 className="text-xl font-bold text-white">
                {user.name || "Developer"}
              </h2>

              <p className="text-sm text-indigo-100">
                {user.email || "No email"}
              </p>

            </div>

            <span className="ml-auto hidden items-center gap-1.5 rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-medium text-emerald-200 ring-1 ring-emerald-300/30 sm:inline-flex">

              <CheckCircle2 className="h-3.5 w-3.5" />

              Active

            </span>

          </div>

        </div>

        <div className="space-y-6 p-6">

          <div>

            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-400">

              <Shield className="h-4 w-4" />

              Profile Information

            </h3>

            <div className="grid gap-4 sm:grid-cols-2">

              <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4">

                <p className="flex items-center gap-1.5 text-xs font-medium text-gray-400">

                  <User className="h-3.5 w-3.5" />

                  Name

                </p>

                <p className="mt-1.5 font-medium text-gray-900">
                  {user.name || "—"}
                </p>

              </div>

              <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4">

                <p className="flex items-center gap-1.5 text-xs font-medium text-gray-400">

                  <Mail className="h-3.5 w-3.5" />

                  Email

                </p>

                <p className="mt-1.5 break-all font-medium text-gray-900">
                  {user.email || "—"}
                </p>

              </div>

            </div>

          </div>

        </div>

      </Card>

      <Card className="p-6">

        <div className="flex items-center justify-between">

          <h2 className="flex items-center gap-2 text-lg font-semibold">

            <GitBranch className="h-5 w-5 text-indigo-600" />

            GitHub Connection
          </h2>

          {githubConnected === true && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600 ring-1 ring-emerald-200">

              <CheckCircle2 className="h-3.5 w-3.5" />

              Connected

            </span>
          )}

          {githubConnected === false && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500 ring-1 ring-gray-200">

              Not connected

            </span>
          )}

        </div>

        <p className="mt-2 text-sm text-gray-500">
          Connect your GitHub account to track your repositories
          and activity. Each user has their own token.
        </p>

        <form
          onSubmit={handleSaveGithubToken}
          className="mt-5 space-y-3"
        >

          <Input
            type="password"
            placeholder="Paste your GitHub token (ghp_...)"
            value={githubToken}
            onChange={(e) =>
              setGithubToken(e.target.value)
            }
            required
          />

          {githubMessage && (
            <p className="flex items-center gap-1.5 text-sm font-medium text-emerald-600">

              <CheckCircle2 className="h-4 w-4" />

              {githubMessage}

            </p>
          )}

          {githubError && (
            <p className="text-sm text-red-600">
              {githubError}
            </p>
          )}

          <Button
            type="submit"
            disabled={savingGithub}
          >
            {savingGithub ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save GitHub Token"
            )}
          </Button>

        </form>

      </Card>

      <Card className="p-6">

        <h2 className="flex items-center gap-2 text-lg font-semibold">

          <KeyRound className="h-5 w-5 text-indigo-600" />

          Account
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Sign out from your DevFlow account.
        </p>

        <Button
          variant="danger"
          className="mt-5"
          onClick={logout}
        >
          <LogOut className="h-4 w-4" />

          Sign out
        </Button>

      </Card>

      <p className="flex items-center justify-center gap-1.5 text-center text-xs text-gray-400">

        <SettingsIcon className="h-3.5 w-3.5" />

        DevFlow v1.0.0 — Manage your development workflow
      </p>

    </div>
  );
}