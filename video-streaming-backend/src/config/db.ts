import mongoose from "mongoose";
import { config } from "./server.config";

export const connectDb = async () => {
  await mongoose.connect(config.MONGO_URI);
  console.log("Mongodb connected");
};
