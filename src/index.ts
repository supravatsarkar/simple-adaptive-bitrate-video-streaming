import express, { type Request, type Response } from "express";
import { PORT } from "./config/server.config";
import apiRouter from "./routes";
const app = express();
// const x = "test";

app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log("Server is running on prot ", PORT);
});
