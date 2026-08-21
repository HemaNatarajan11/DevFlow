export interface AnalyticsSummary {
  totalProjects: number;
  completedTasks: number;
  githubCommits: number;
  completionRate: number;
}

export interface TaskStatusData {
  status: string;
  count: number;
}

export interface ProductivityData {
  day: string;
  completed: number;
  created: number;
}

export interface AnalyticsData {
  totalProjects: number;
  totalTasks: number;
  completedTasks: number;
  completionRate: number;
  tasksByStatus: TaskStatusData[];
}