import Project from "../models/Project.js";
import Task from "../models/Task.js";

export async function getAnalytics(
  userId: string
) {
  const [
    totalProjects,
    totalTasks,
    completedTasks,
    tasksByStatus,
  ] = await Promise.all([
    Project.countDocuments({
      userId,
    }),

    Task.countDocuments({
      userId,
    }),

    Task.countDocuments({
      userId,
      status: "completed",
    }),

    Task.aggregate([
      {
        $match: {
          userId,
        },
      },

      {
        $group: {
          _id: "$status",
          count: {
            $sum: 1,
          },
        },
      },
    ]),
  ]);

  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks /
            totalTasks) *
            100
        );

  const formattedTasksByStatus =
    tasksByStatus.map(
      (item) => ({
        status: item._id,
        count: item.count,
      })
    );

  return {
    totalProjects,
    totalTasks,
    completedTasks,
    completionRate,
    tasksByStatus:
      formattedTasksByStatus,
  };
}

export async function getProductivity(
  userId: string
) {
  const data =
    await Task.aggregate([
      {
        $match: {
          userId,
        },
      },

      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
            },
          },

          created: {
            $sum: 1,
          },

          completed: {
            $sum: {
              $cond: [
                {
                  $eq: [
                    "$status",
                    "completed",
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },

      {
        $sort: {
          _id: 1,
        },
      },

      {
        $project: {
          _id: 0,
          day: "$_id",
          created: 1,
          completed: 1,
        },
      },
    ]);

  return data;
}