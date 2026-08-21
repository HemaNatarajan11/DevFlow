import {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  Code2,
  Sparkles,
  Zap,
  Shield,
} from "lucide-react";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
  const navigate =
    useNavigate();

  const {
    login,
    loading,
  } = useAuth();

  const [
    email,
    setEmail,
  ] = useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    error,
    setError,
  ] = useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setError("");

    try {
      await login({
        email,
        password,
      });

      navigate("/dashboard");
    } catch (error: unknown) {
      const message =
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (
          error as { response: { data?: { message?: string } } }
        ).response?.data?.message === "string"
          ? (
              error as {
                response: { data: { message: string } };
              }
            ).response.data.message
          : "Login failed";

      setError(message);
    }
  }

  return (
    <div className="flex min-h-screen">

      <div className="relative hidden flex-1 overflow-hidden lg:flex lg:flex-col lg:justify-center lg:p-16">

        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600" />

        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-fuchsia-400/20 blur-3xl" />

        <div className="relative">

          <div className="flex items-center gap-3">

            <div className="rounded-2xl bg-white/15 p-3 backdrop-blur-xl">

              <Code2 className="h-8 w-8 text-white" />

            </div>

            <span className="text-3xl font-bold text-white">
              DevFlow
            </span>

          </div>

          <h1 className="mt-10 text-5xl font-bold leading-tight text-white">
            Your developer
            productivity workspace
          </h1>

          <p className="mt-6 max-w-lg text-lg text-indigo-100">
            Manage projects, track tasks,
            analyze productivity and monitor
            GitHub activity — all in one place.
          </p>

          <div className="mt-12 space-y-5">

            <div className="flex items-center gap-4">

              <div className="rounded-xl bg-white/15 p-3 backdrop-blur-xl">

                <Zap className="h-5 w-5 text-yellow-300" />

              </div>

              <div>

                <p className="font-semibold text-white">
                  Lightning fast workflow
                </p>

                <p className="text-sm text-indigo-100">
                  Everything your team needs, instantly.
                </p>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <div className="rounded-xl bg-white/15 p-3 backdrop-blur-xl">

                <Shield className="h-5 w-5 text-emerald-300" />

              </div>

              <div>

                <p className="font-semibold text-white">
                  Secure by design
                </p>

                <p className="text-sm text-indigo-100">
                  Your data is protected, always.
                </p>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <div className="rounded-xl bg-white/15 p-3 backdrop-blur-xl">

                <Sparkles className="h-5 w-5 text-fuchsia-300" />

              </div>

              <div>

                <p className="font-semibold text-white">
                  Beautiful analytics
                </p>

                <p className="text-sm text-indigo-100">
                  Understand your productivity at a glance.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      <div className="flex w-full items-center justify-center bg-gray-50/80 p-6 backdrop-blur-sm lg:w-[500px]">

        <div className="w-full max-w-md">

          <div className="text-center lg:hidden">

            <div className="mx-auto inline-flex items-center gap-2">

              <div className="rounded-xl bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 p-2 shadow-lg shadow-indigo-500/30">

                <Code2 className="h-6 w-6 text-white" />

              </div>

              <span className="text-2xl font-bold">
                Dev<span className="text-gradient">Flow</span>
              </span>

            </div>

          </div>

          <h2 className="mt-8 text-3xl font-bold lg:mt-0">
            Welcome back
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Sign in to continue to DevFlow.
          </p>

          {error && (
            <div className="animate-fade-in-up mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email
              </label>

              <Input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="you@example.com"
                required
              />

            </div>

            <div>

              <div className="mb-2 flex items-center justify-between">

                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>

                <button
                  type="button"
                  className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
                >
                  Forgot password?
                </button>

              </div>

              <Input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="••••••••"
                required
              />

            </div>

            <Button
              type="submit"
              className="w-full py-3"
              disabled={loading}
            >
              {loading
                ? "Signing in..."
                : "Sign in"}
            </Button>

          </form>

          <p className="mt-6 text-center text-sm text-gray-500">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
            >
              Create account
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}