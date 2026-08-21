import {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  Code2,
  Rocket,
  Users,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import { useAuth } from "../../hooks/useAuth";

export default function Register() {
  const navigate =
    useNavigate();

  const {
    register,
    loading,
  } = useAuth();

  const [
    name,
    setName,
  ] = useState("");

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
      await register({
        name,
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
          : "Registration failed";

      setError(message);
    }
  }

  const features = [
    {
      icon: Rocket,
      text: "Launch projects in seconds",
    },
    {
      icon: Users,
      text: "Collaborate with your team",
    },
    {
      icon: ShieldCheck,
      text: "Enterprise-grade security",
    },
  ];

  return (
    <div className="flex min-h-screen">

      <div className="relative hidden flex-1 overflow-hidden lg:block">

        <div className="absolute inset-0 bg-gradient-to-br from-violet-700 via-indigo-700 to-blue-700" />

        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />

        <div className="relative flex h-full flex-col justify-center p-16">

          <div className="flex items-center gap-3">

            <div className="rounded-2xl bg-white/15 p-3 backdrop-blur-xl">

              <Code2 className="h-8 w-8 text-white" />

            </div>

            <span className="text-3xl font-bold text-white">
              DevFlow
            </span>

          </div>

          <h1 className="mt-10 text-5xl font-bold leading-tight text-white">
            Build something
            amazing together
          </h1>

          <p className="mt-6 max-w-lg text-lg text-indigo-100">
            Join thousands of developers
            who use DevFlow to organize their
            work, track progress and ship faster.
          </p>

          <div className="mt-12 space-y-5">

            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.text}
                  className="flex items-center gap-4"
                >

                  <div className="rounded-xl bg-white/15 p-3 backdrop-blur-xl">

                    <Icon className="h-5 w-5 text-white" />

                  </div>

                  <p className="font-medium text-white">
                    {feature.text}
                  </p>

                </div>
              );
            })}

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
            Create your account
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Start organizing your development workflow.
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
                Name
              </label>

              <Input
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Your name"
                required
              />

            </div>

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

              <label className="mb-2 block text-sm font-medium text-gray-700">
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

              <p className="mt-1.5 flex items-center gap-1 text-xs text-gray-400">
                <CheckCircle2 className="h-3.5 w-3.5" />

                At least 6 characters
              </p>

            </div>

            <Button
              type="submit"
              className="w-full py-3"
              disabled={loading}
            >
              {loading
                ? "Creating account..."
                : "Create account"}
            </Button>

          </form>

          <p className="mt-6 text-center text-sm text-gray-500">

            Already have an account?{" "}

            <Link
              to="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
            >
              Sign in
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}