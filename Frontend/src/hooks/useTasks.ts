import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../api/taskApi";

export function useTasks(
  projectId?: string
) {
  const queryClient =
    useQueryClient();

  const query = useQuery({
    queryKey: [
      "tasks",
      projectId,
    ],

    queryFn: () =>
      getTasks(projectId),
  });

  const createMutation =
    useMutation({
      mutationFn: createTask,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["tasks"],
        });
      },
    });

  const updateMutation =
    useMutation({
      mutationFn: ({
        id,
        data,
      }: {
        id: string;
        data: any;
      }) =>
        updateTask(id, data),

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["tasks"],
        });
      },
    });

  const deleteMutation =
    useMutation({
      mutationFn: deleteTask,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["tasks"],
        });
      },
    });

  return {
    ...query,

    tasks: query.data ?? [],

    createTask:
      createMutation.mutateAsync,

    updateTask:
      updateMutation.mutateAsync,

    deleteTask:
      deleteMutation.mutateAsync,
  };
}