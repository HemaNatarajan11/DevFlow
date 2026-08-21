import {
  FolderKanban,
  CheckCircle2,
  ListTodo,
  TrendingUp,
} from "lucide-react";

import Card from "../../components/ui/Card";
import { useProjects } from "../../hooks/useProjects";
import { useTasks } from "../../hooks/useTasks";

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
    },
    {
      title: "Total Tasks",
      value: tasks.length,
      icon: ListTodo,
    },
    {
      title: "Completed",
      value: completed,
      icon: CheckCircle2,
    },
    {
      title: "Completion Rate",
      value: `${completionRate}%`,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="mt-1 text-gray-500">
          Here's what's happening with your development work.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {stats.map((stat) => {
          const Icon =
            stat.icon;

          return (
            <Card
              key={stat.title}
              className="p-5"
            >
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-gray-500">
                    {stat.title}
                  </p>

                  <p className="mt-2 text-3xl font-bold">
                    {projectsLoading ||
                    tasksLoading
                      ? "—"
                      : stat.value}
                  </p>
                </div>

                <div className="rounded-xl bg-indigo-50 p-3">
                  <Icon className="h-6 w-6 text-indigo-600" />
                </div>

              </div>
            </Card>
          );
        })}

      </div>

      <Card className="p-6">

        <h2 className="text-lg font-semibold">
          Recent Tasks
        </h2>

        <div className="mt-5 space-y-3">

          {tasks.slice(0, 5).map(
            (task) => (
              <div
                key={task._id}
                className="flex items-center justify-between rounded-lg border p-4"
              >

                <div>
                  <p className="font-medium">
                    {task.title}
                  </p>

                  <p className="text-sm text-gray-500">
                    {task.status}
                  </p>
                </div>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs">
                  {task.priority}
                </span>

              </div>
            )
          )}

          {!tasks.length &&
            !tasksLoading && (
              <p className="py-8 text-center text-sm text-gray-500">
                No tasks yet.
              </p>
            )}

        </div>

      </Card>

    </div>
  );
}