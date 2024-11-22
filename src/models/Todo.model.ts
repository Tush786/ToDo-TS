import mongoose, { Schema, Document } from "mongoose";

export interface ITodo extends Document {
  title: string;
  description: string;
  completed: boolean;
  assignedTo: mongoose.Types.ObjectId; // Reference to User
}

const TodoSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, default: false },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const TodoModel = mongoose.model<ITodo>("Todo", TodoSchema);