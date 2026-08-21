import {
  useState,
} from "react";

import {
  Plus,
  CheckCircle2,
  Circle,
  Clock,
  Flag,
  Trash2,
  Loader2,
} from "lucide-react";

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

  const selectClass =
    "w-full rounded-xl border border-gray-200 bg-white/80 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-all duration-200 hover:border-gray-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100";

  const priorityColors: Record<
    string,
    string
  > = {
    low: "bg-sky-50 text-sky-600 ring-sky-200",
    medium:
      "bg-amber-50 text-amber-600 ring-amber-200",
    high: "bg-red-50 text-red-600 ring-red-200",
  };

  return (
    <div className="space-y-8">

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

        <div>

          <h1 className="text-3xl font-bold">
            Ta<span className="text-gradient">sks</span>
          </h1>

          <p className="mt-1 text-gray-500">
            Track and manage your development tasks.
          </p>

        </div>

      </div>

      <Card className="p-6">

        <div className="mb-5 flex items-center gap-2">

          <div className="rounded-xl bg-gradient-to-br from-sky-500 to-blue-500 p-2 shadow-lg shadow-sky-500/25">

            <Plus className="h-4 w-4 text-white" />

          </div>

          <h2 className="font-semibold">
            Create Task
          </h2>

        </div>

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
              className={selectClass}
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

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

            <select
              value={priority}
              onChange={(e) =>
                setPriority(
                  e.target.value as TaskPriority
                )
              }
              className={`${selectClass} sm:w-44`}
            >
              <option value="low">
                🔵 Low
              </option>

              <option value="medium">
                🟡 Medium
              </option>

              <option value="high">
                🔴 High
              </option>
            </select>

            <Button
              type="submit"
              disabled={
                !title.trim() ||
                !projectId
              }
            >
              Create Task
            </Button>

          </div>

        </form>

      </Card>

      <div className="grid gap-4">

        {isLoading ? (
          <div className="space-y-4">

            {[1, 2, 3].map(
              (i) => (
                <div
                  key={i}
                  className="skeleton h-24 rounded-2xl"
                />
              )
            )}

          </div>
        ) : tasks.length ? (
          tasks.map(
            (task) => (
              <Card
                key={task._id}
                hover={false}
                className="p-5"
              >

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                  <div className="flex items-start gap-4">

                    <button
                      onClick={() =>
                        changeStatus(
                          task._id,
                          task.status ===
                            "completed"
                            ? "todo"
                            : "completed"
                        )
                      }
                      className={`mt-0.5 transition-colors ${
                        task.status ===
                        "completed"
                          ? "text-emerald-500"
                          : "text-gray-300 hover:text-indigo-500"
                      }`}
                    >

                      {task.status ===
                      "completed" ? (
                        <CheckCircle2 className="h-6 w-6" />
                      ) : (
                        <Circle className="h-6 w-6" />
                      )}

                    </button>

                    <div>

                      <h3
                        className={`font-semibold ${
                          task.status ===
                          "completed"
                            ? "text-gray-400 line-through"
                            : "text-gray-900"
                        }`}
                      >
                        {task.title}
                      </h3>

                      {task.description && (
                        <p className="mt-1 text-sm text-gray-500">
                          {task.description}
                        </p>
                      )}

                      <div className="mt-2 flex flex-wrap items-center gap-2">

                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${priorityColors[task.priority]}`}>

                          <Flag className="h-3 w-3" />

                          {task.priority}

                        </span>

                        {task.projectId && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-600 ring-1 ring-indigo-200">

                            {projects.find(
                              (p) =>
                                p._id ===
                                task.projectId
                            )?.name ||
                              "Project"}

                          </span>
                        )}

                      </div>

                    </div>

                  </div>

                  <div className="flex items-center gap-3 lg:ml-12">

                    <select
                      value={task.status}
                      onChange={(e) =>
                        changeStatus(
                          task._id,
                          e.target.value as TaskStatus
                        )
                      }
                      className={`${selectClass} py-2 sm:w-40 ${
                        task.status ===
                        "completed"
                          ? "border-emerald-200 bg-emerald-50/50"
                          : ""
                      }`}
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

                    <button
                      onClick={() =>
                        deleteTask(
                          task._id
                        )
                      }
                      className="rounded-lg p-2 text-gray-400 transition-all duration-200 hover:bg-red-50 hover:text-red-600"
                      title="Delete task"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>

                  </div>

                </div>

              </Card>
            )
          )
        ) : (
          <Card
            hover={false}
            className="py-12 text-center"
          >

            <Loader2 className="mx-auto h-10 w-10 text-gray-300" />

            <p className="mt-4 text-sm text-gray-500">
              No tasks yet. Create your first task above.
            </p>

            <Clock className="mx-auto mt-3 h-5 w-5 text-gray-300" />

          </Card>
        )}

      </div>

    </div>
  );
}