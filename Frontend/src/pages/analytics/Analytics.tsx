import {
  BarChart3,
  CheckCircle2,
  FolderKanban,
  GitBranch,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import Card from "../../components/ui/Card";

import {
  useAnalytics,
} from "../../hooks/useAnalytics";

export default function Analytics() {
  const {
    data,
    isLoading,
    isError,
  } = useAnalytics();

  if (isLoading) {
    return (
      <div>
        Loading analytics...
      </div>
    );
  }

  if (
    isError ||
    !data
  ) {
    return (
      <div className="rounded-xl bg-red-50 p-6 text-red-600">
        Failed to load analytics.
      </div>
    );
  }

  const stats = [
    {
      title: "Projects",
      value: data.totalProjects,
      icon: FolderKanban,
    },
    {
      title: "Tasks",
      value: data.totalTasks,
      icon: BarChart3,
    },
    {
      title: "Completed",
      value: data.completedTasks,
      icon: CheckCircle2,
    },
    {
      title: "Completion",
      value: `${data.completionRate}%`,
      icon: GitBranch,
    },
  ];

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Analytics
        </h1>

        <p className="mt-1 text-gray-500">
          Understand your development productivity.
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

              <div className="flex justify-between">

                <div>

                  <p className="text-sm text-gray-500">
                    {stat.title}
                  </p>

                  <p className="mt-2 text-3xl font-bold">
                    {stat.value}
                  </p>

                </div>

                <Icon className="h-6 w-6 text-indigo-600" />

              </div>

            </Card>
          );
        })}

      </div>

      <Card className="p-6">

        <h2 className="mb-6 text-lg font-semibold">
          Task Status
        </h2>

        <div className="h-80">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <BarChart
              data={
                data.tasksByStatus
              }
            >

              <XAxis
                dataKey="status"
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="count"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </Card>

    </div>
  );
}