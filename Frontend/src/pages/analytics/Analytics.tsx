import {
  BarChart3,
  CheckCircle2,
  FolderKanban,
  GitBranch,
  TrendingUp,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
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
      <div className="space-y-8">

        <div>

          <h1 className="text-3xl font-bold">
            Ana<span className="text-gradient">lytics</span>
          </h1>

          <p className="mt-1 text-gray-500">
            Understand your development productivity.
          </p>

        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

          {[1, 2, 3, 4].map(
            (i) => (
              <div
                key={i}
                className="skeleton h-32 rounded-2xl"
              />
            )
          )}

        </div>

        <div className="skeleton h-96 rounded-2xl" />

      </div>
    );
  }

  if (
    isError ||
    !data
  ) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50/80 p-12 text-center">

        <GitBranch className="h-12 w-12 text-red-300" />

        <p className="mt-4 font-semibold text-red-600">
          Failed to load analytics
        </p>

        <p className="mt-1 text-sm text-red-400">
          Please try again later.
        </p>

      </div>
    );
  }

  const stats = [
    {
      title: "Projects",
      value: data.totalProjects,
      icon: FolderKanban,
      gradient:
        "from-indigo-500 to-violet-500",
      shadow:
        "shadow-indigo-500/25",
    },
    {
      title: "Tasks",
      value: data.totalTasks,
      icon: BarChart3,
      gradient:
        "from-sky-500 to-blue-500",
      shadow:
        "shadow-sky-500/25",
    },
    {
      title: "Completed",
      value: data.completedTasks,
      icon: CheckCircle2,
      gradient:
        "from-emerald-500 to-green-500",
      shadow:
        "shadow-emerald-500/25",
    },
    {
      title: "Completion",
      value: `${data.completionRate}%`,
      icon: TrendingUp,
      gradient:
        "from-fuchsia-500 to-pink-500",
      shadow:
        "shadow-fuchsia-500/25",
    },
  ];

  const chartColors = [
    "#6366f1",
    "#8b5cf6",
    "#ec4899",
  ];

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          Ana<span className="text-gradient">lytics</span>
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
              className="relative overflow-hidden p-5"
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>

                  <p className="mt-2 text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>

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

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-lg font-semibold">
            Task Status
          </h2>

          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50">

            <BarChart3 className="h-5 w-5 text-indigo-600" />

          </div>

        </div>

        <div className="h-80">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <BarChart
              data={
                data.tasksByStatus
              }
              barSize={48}
            >

              <XAxis
                dataKey="status"
                tick={{
                  fill: "#6b7280",
                  fontSize: 13,
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{
                  fill: "#6b7280",
                  fontSize: 13,
                }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                  boxShadow:
                    "0 10px 30px rgba(0,0,0,0.08)",
                  fontSize: "13px",
                }}
                cursor={{
                  fill: "#f3f4f6",
                }}
              />

              <Bar
                dataKey="count"
                radius={[10, 10, 0, 0]}
              >

                {data.tasksByStatus.map(
                  (_, index) => (
                    <Cell
                      key={index}
                      fill={
                        chartColors[
                          index %
                            chartColors.length
                        ]
                      }
                    />
                  )
                )}

              </Bar>

            </BarChart>

          </ResponsiveContainer>

        </div>

      </Card>

    </div>
  );
}