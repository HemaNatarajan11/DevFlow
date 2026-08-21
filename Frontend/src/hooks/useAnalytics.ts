import { useQuery } from "@tanstack/react-query";

import { getAnalytics } from "../api/analyticsApi";

export function useAnalytics() {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: getAnalytics,
  });
}