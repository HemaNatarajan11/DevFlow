import {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

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
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Login failed"
      );
    }
  }

  return (
    <div className="flex min-h-screen">

      <div className="hidden flex-1 bg-indigo-600 lg:flex lg:flex-col lg:justify-center lg:p-16">

        <h1 className="text-5xl font-bold text-white">
          DevFlow
        </h1>

        <p className="mt-6 max-w-lg text-lg text-indigo-100">
          Your developer productivity
          workspace for projects, tasks,
          analytics and GitHub activity.
        </p>

      </div>

      <div className="flex w-full items-center justify-center bg-gray-50 p-6 lg:w-[500px]">

        <div className="w-full max-w-md">

          <h2 className="text-3xl font-bold">
            Welcome back
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Sign in to continue to DevFlow.
          </p>

          {error && (
            <div className="mt-6 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            <div>
              <label className="mb-2 block text-sm font-medium">
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
              <label className="mb-2 block text-sm font-medium">
                Password
              </label>

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
              className="w-full"
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
              className="font-medium text-indigo-600 hover:underline"
            >
              Create account
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}