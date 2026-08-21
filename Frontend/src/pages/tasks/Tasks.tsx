import {
  useState,
} from "react";

import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";

import {
  useProjects,
} from "../../hooks/useProjects";

import {
  useTasks,
} from "../../hooks/useTasks";

import type {
  TaskStatus,
  TaskPriority,
} from "../../types/task";

export default function Tasks() {
  const {
    projects,
  } = useProjects();

  const [
    projectId,
    setProjectId,
  ] = useState("");

  const {
    tasks,
    isLoading,
    createTask,
    updateTask,
    deleteTask,
  } = useTasks(
    projectId || undefined
  );

  const [
    title,
    setTitle,
  ] = useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [
    priority,
    setPriority,
  ] =
    useState<TaskPriority>(
      "medium"
    );

  async function handleCreate(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (
      !title.trim() ||
      !projectId
    ) {
      return;
    }

    await createTask({
      title,
      description,
      priority,
      status: "todo",
      projectId,
    });

    setTitle("");
    setDescription("");
  }

  async function changeStatus(
    id: string,
    status: TaskStatus
  ) {
    await updateTask({
      id,
      data: { status },
    });
  }

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Tasks
        </h1>

        <p className="mt-1 text-gray-500">
          Track and manage your development tasks.
        </p>
      </div>

      <Card className="p-6">

        <h2 className="mb-5 font-semibold">
          Create Task
        </h2>

        <form
          onSubmit={handleCreate}
          className="space-y-4"
        >

          <div className="grid gap-4 md:grid-cols-2">

            <Input
              placeholder="Task title"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
            />

            <select
              value={projectId}
              onChange={(e) =>
                setProjectId(
                  e.target.value
                )
              }
              className="rounded-lg border border-gray-300 px-3 py-2"
            >
              <option value="">
                Select project
              </option>

              {projects.map(
                (project) => (
                  <option
                    key={project._id}
                    value={project._id}
                  >
                    {project.name}
                  </option>
                )
              )}

            </select>

          </div>

          <Input
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
          />

          <div className="flex gap-4">

            <select
              value={priority}
              onChange={(e) =>
                setPriority(
                  e.target.value as TaskPriority
                )
              }
              className="rounded-lg border border-gray-300 px-3 py-2"
            >
              <option value="low">
                Low
              </option>

              <option value="medium">
                Medium
              </option>

              <option value="high">
                High
              </option>
            </select>

            <Button>
              Create Task
            </Button>

          </div>

        </form>

      </Card>

      <div className="grid gap-4">

        {isLoading ? (
          <p>Loading tasks...</p>
        ) : (
          tasks.map(
            (task) => (
              <Card
                key={task._id}
                className="p-5"
              >

                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                  <div>

                    <h3 className="font-semibold">
                      {task.title}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {task.description}
                    </p>

                  </div>

                  <div className="flex items-center gap-3">

                    <select
                      value={task.status}
                      onChange={(e) =>
                        changeStatus(
                          task._id,
                          e.target.value as TaskStatus
                        )
                      }
                      className="rounded-lg border px-3 py-2 text-sm"
                    >
                      <option value="todo">
                        Todo
                      </option>

                      <option value="in-progress">
                        In Progress
                      </option>

                      <option value="completed">
                        Completed
                      </option>
                    </select>

                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs">
                      {task.priority}
                    </span>

                    <button
                      onClick={() =>
                        deleteTask(
                          task._id
                        )
                      }
                      className="text-sm text-red-500"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </Card>
            )
          )
        )}

      </div>

    </div>
  );
}