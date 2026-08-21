import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../api/projectApi";

export function useProjects() {
  const queryClient =
    useQueryClient();

  const projectsQuery =
    useQuery({
      queryKey: ["projects"],
      queryFn: getProjects,
    });

  const createMutation =
    useMutation({
      mutationFn: createProject,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["projects"],
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
        updateProject(id, data),

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["projects"],
        });
      },
    });

  const deleteMutation =
    useMutation({
      mutationFn: deleteProject,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["projects"],
        });
      },
    });

  return {
    ...projectsQuery,

    projects:
      projectsQuery.data ?? [],

    createProject:
      createMutation.mutateAsync,

    updateProject:
      updateMutation.mutateAsync,

    deleteProject:
      deleteMutation.mutateAsync,
  };
}