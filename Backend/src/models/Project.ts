import mongoose, {
  Document,
  Model,
  Schema,
} from "mongoose";

export interface IProject extends Document {
  name: string;
  description?: string;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const Project: Model<IProject> =
  mongoose.model<IProject>(
    "Project",
    projectSchema
  );

export default Project;