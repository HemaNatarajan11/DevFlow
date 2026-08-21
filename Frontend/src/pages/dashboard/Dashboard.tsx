import {
  FolderKanban,
  CheckCircle2,
  ListTodo,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

import Card from "../../components/ui/Card";
import { useProjects } from "../../hooks/useProjects";
import { useTasks } from "../../hooks/useTasks";

import {
  Link,
} from "react-router-dom";

export default function Dashboard() {
  const {
    projects,
    isLoading:
      projectsLoading,
  } = useProjects();

  const {
    tasks,
    isLoading:
      tasksLoading,
  } = useTasks();

  const completed =
    tasks.filter(
      (task) =>
        task.status ===
        "completed"
    ).length;

  const completionRate =
    tasks.length
      ? Math.round(
          (completed /
            tasks.length) *
            100
        )
      : 0;

  const stats = [
    {
      title: "Projects",
      value: projects.length,
      icon: FolderKanban,
      gradient:
        "from-indigo-500 to-violet-500",
      shadow:
        "shadow-indigo-500/25",
    },
    {
      title: "Total Tasks",
      value: tasks.length,
      icon: ListTodo,
      gradient:
        "from-sky-500 to-blue-500",
      shadow:
        "shadow-sky-500/25",
    },
    {
      title: "Completed",
      value: completed,
      icon: CheckCircle2,
      gradient:
        "from-emerald-500 to-green-500",
      shadow:
        "shadow-emerald-500/25",
    },
    {
      title: "Completion Rate",
      value: `${completionRate}%`,
      icon: TrendingUp,
      gradient:
        "from-fuchsia-500 to-pink-500",
      shadow:
        "shadow-fuchsia-500/25",
    },
  ];

  const statusColors: Record<
    string,
    string
  > = {
    todo:
      "bg-gray-100 text-gray-600 ring-gray-200",
    "in-progress":
      "bg-amber-50 text-amber-600 ring-amber-200",
    completed:
      "bg-emerald-50 text-emerald-600 ring-emerald-200",
  };

  const priorityColors: Record<
    string,
    string
  > = {
    low: "bg-sky-50 text-sky-600 ring-sky-200",
    medium:
      "bg-amber-50 text-amber-600 ring-amber-200",
    high: "bg-red-50 text-red-600 ring-red-200",
  };

  return (
    <div className="space-y-8">

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

        <div>

          <h1 className="text-3xl font-bold">
            Dash<span className="text-gradient">board</span>
          </h1>

          <p className="mt-1 text-gray-500">
            Here's what's happening with your development work.
          </p>

        </div>

        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700"
        >
          View all projects

          <ArrowRight className="h-4 w-4" />

        </Link>

      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {stats.map((stat) => {
          const Icon =
            stat.icon;

          return (
            <Card
              key={stat.title}
              className="relative overflow-hidden p-5"
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>

                  {projectsLoading ||
                  tasksLoading ? (
                    <div className="skeleton mt-3 h-8 w-16 rounded-lg" />
                  ) : (
                    <p className="mt-2 text-3xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  )}

                </div>

                <div className={`bg-gradient-to-br ${stat.gradient} rounded-2xl p-3.5 shadow-lg ${stat.shadow}`}>

                  <Icon className="h-6 w-6 text-white" />

                </div>

              </div>

              <div className={`absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${stat.gradient} opacity-10 blur-2xl`} />

            </Card>
          );
        })}

      </div>

      <Card className="p-6">

        <div className="flex items-center justify-between">

          <h2 className="text-lg font-semibold">
            Recent Tasks
          </h2>

          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50">

            <ListTodo className="h-5 w-5 text-indigo-600" />

          </div>

        </div>

        <div className="mt-5 space-y-3">

          {tasksLoading ? (
            <div className="space-y-3">

              {[1, 2, 3].map(
                (i) => (
                  <div
                    key={i}
                    className="skeleton h-16 rounded-xl"
                  />
                )
              )}

            </div>
          ) : (
            tasks
              .slice(0, 5)
              .map((task) => (
                <div
                  key={task._id}
                  className="group flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/50 p-4 transition-all duration-200 hover:border-indigo-200 hover:bg-white hover:shadow-md"
                >

                  <div>

                    <p className="font-medium text-gray-900">
                      {task.title}
                    </p>

                    <span className={`mt-1.5 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${statusColors[task.status]}`}>

                      {task.status}

                    </span>

                  </div>

                  <span className={`rounded-full px-3 py-1 text-xs font-medium ring-1 ${priorityColors[task.priority]}`}>

                    {task.priority}

                  </span>

                </div>
              ))
          )}

          {!tasks.length &&
            !tasksLoading && (
              <div className="py-8 text-center">

                <ListTodo className="mx-auto h-10 w-10 text-gray-300" />

                <p className="mt-3 text-sm text-gray-500">
                  No tasks yet.
                </p>

                <Link
                  to="/tasks"
                  className="mt-2 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-700"
                >
                  Create your first task
                </Link>

              </div>
            )}

        </div>

      </Card>

    </div>
  );
}