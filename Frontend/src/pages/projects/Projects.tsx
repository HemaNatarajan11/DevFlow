import {
  useState,
} from "react";

import {
  Plus,
  Trash2,
  FolderKanban,
  Calendar,
} from "lucide-react";

import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";

import { useProjects } from "../../hooks/useProjects";

export default function Projects() {
  const {
    projects,
    isLoading,
    createProject,
    deleteProject,
  } = useProjects();

  const [
    name,
    setName,
  ] = useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  async function handleCreate(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!name.trim()) return;

    await createProject({
      name,
      description,
    });

    setName("");
    setDescription("");
  }

  async function handleDelete(
    id: string
  ) {
    if (
      !confirm(
        "Delete this project?"
      )
    ) {
      return;
    }

    await deleteProject(id);
  }

  return (
    <div className="space-y-8">

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

        <div>

          <h1 className="text-3xl font-bold">
            Proj<span className="text-gradient">ects</span>
          </h1>

          <p className="mt-1 text-gray-500">
            Manage your development projects.
          </p>

        </div>

      </div>

      <Card className="p-6">

        <div className="mb-5 flex items-center gap-2">

          <div className="rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 p-2 shadow-lg shadow-indigo-500/25">

            <Plus className="h-4 w-4 text-white" />

          </div>

          <h2 className="font-semibold">
            Create project
          </h2>

        </div>

        <form
          onSubmit={handleCreate}
          className="grid gap-4 md:grid-cols-[1fr_2fr_auto]"
        >

          <Input
            placeholder="Project name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <Input
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
          />

          <Button type="submit">
            Create
          </Button>

        </form>

      </Card>

      {isLoading ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

          {[1, 2, 3].map(
            (i) => (
              <div
                key={i}
                className="skeleton h-44 rounded-2xl"
              />
            )
          )}

        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

          {projects.map(
            (project) => (
              <Card
                key={project._id}
                className="group relative overflow-hidden p-6"
              >

                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-indigo-500/10 to-violet-500/10 blur-2xl transition-all duration-300 group-hover:from-indigo-500/20 group-hover:to-violet-500/20" />

                <div className="relative flex items-start justify-between">

                  <div className="flex items-start gap-3">

                    <div className="rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 p-2.5 shadow-lg shadow-indigo-500/25">

                      <FolderKanban className="h-5 w-5 text-white" />

                    </div>

                    <div>

                      <h2 className="text-lg font-semibold text-gray-900">
                        {project.name}
                      </h2>

                      <p className="mt-1.5 text-sm text-gray-500">
                        {project.description ||
                          "No description"}
                      </p>

                    </div>

                  </div>

                  <button
                    onClick={() =>
                      handleDelete(
                        project._id
                      )
                    }
                    className="rounded-lg p-2 text-gray-400 transition-all duration-200 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                </div>

                <div className="relative mt-6 flex items-center gap-1.5 text-xs text-gray-400">

                  <Calendar className="h-3.5 w-3.5" />

                  Created{" "}
                  {new Date(
                    project.createdAt
                  ).toLocaleDateString(
                    undefined,
                    {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }
                  )}

                </div>

              </Card>
            )
          )}

          {!projects.length && (
            <div className="col-span-full py-12 text-center">

              <FolderKanban className="mx-auto h-12 w-12 text-gray-300" />

              <p className="mt-4 text-sm text-gray-500">
                No projects yet. Create your first project above.
              </p>

            </div>
          )}

        </div>
      )}

    </div>
  );
}