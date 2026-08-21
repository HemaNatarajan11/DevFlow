import mongoose, {
  Document,
  Model,
  Schema,
} from "mongoose";

export type TaskStatus =
  | "todo"
  | "in-progress"
  | "completed";

export type TaskPriority =
  | "low"
  | "medium"
  | "high";

export interface ITask extends Document {
  title: string;
  description?: string;

  status: TaskStatus;

  priority: TaskPriority;

  projectId: mongoose.Types.ObjectId;

  userId: mongoose.Types.ObjectId;

  dueDate?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "todo",
        "in-progress",
        "completed",
      ],
      default: "todo",
    },

    priority: {
      type: String,
      enum: [
        "low",
        "medium",
        "high",
      ],
      default: "medium",
    },

    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    dueDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Task: Model<ITask> =
  mongoose.model<ITask>(
    "Task",
    taskSchema
  );

export default Task;