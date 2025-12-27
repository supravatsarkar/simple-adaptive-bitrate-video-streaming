import express, { type Request, type Response } from "express";
import { config } from "./config/server.config";
import apiRouter from "./routes";
import cors from "cors";
const app = express();
app.use(cors());

app.use("/api", apiRouter);
app.use("/stream", express.static("videos_output"));

app.listen(config.PORT, () => {
  console.log("Server is running on prot ", config.PORT);
});
