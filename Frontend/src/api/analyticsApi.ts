import apiClient from "./axios";

import type {
  AnalyticsData,
} from "../types/analytics";

export async function getAnalytics(): Promise<AnalyticsData> {
  const response =
    await apiClient.get(
      "/analytics"
    );

  return response.data.analytics;
}