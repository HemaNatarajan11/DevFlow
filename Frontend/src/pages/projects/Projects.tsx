import {
  useState,
} from "react";

import {
  Plus,
  Trash2,
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

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>
          <h1 className="text-3xl font-bold">
            Projects
          </h1>

          <p className="mt-1 text-gray-500">
            Manage your development projects.
          </p>
        </div>

      </div>

      <Card className="p-6">

        <div className="mb-5 flex items-center gap-2">

          <Plus className="h-5 w-5 text-indigo-600" />

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
        <p>Loading projects...</p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

          {projects.map(
            (project) => (
              <Card
                key={project._id}
                className="p-6"
              >

                <div className="flex items-start justify-between">

                  <div>

                    <h2 className="text-lg font-semibold">
                      {project.name}
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                      {project.description ||
                        "No description"}
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      handleDelete(
                        project._id
                      )
                    }
                    className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                </div>

                <div className="mt-6 text-xs text-gray-400">
                  Created{" "}
                  {new Date(
                    project.createdAt
                  ).toLocaleDateString()}
                </div>

              </Card>
            )
          )}

        </div>
      )}

    </div>
  );
}