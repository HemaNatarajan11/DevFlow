import mongoose, {
  Document,
  Model,
  Schema,
} from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  githubToken?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    githubToken: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> =
  mongoose.model<IUser>("User", userSchema);

export default User;