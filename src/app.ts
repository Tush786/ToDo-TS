
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB connected Successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));


  app.use("/users", userRouter);

export default app;
