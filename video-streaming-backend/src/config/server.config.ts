import dotenv from "dotenv";
dotenv.config(); // load .env

type Config = {
  PORT: number;
  MONGO_URI: string;
};
export const config: Config = {
  PORT: Number(process.env.PORT) || 3001,
  MONGO_URI:
    process.env.MONGO_URI ||
    "mongodb://localhost:27017/simple-video-streaming-app",
};
