import express, { type Request, type Response } from "express";
const app = express();
// const x = "test";

app.get("/ping", (_req: Request, res: Response) => {
  return res.status(200).json({
    message: "pong!!",
  });
});

app.listen(3000, () => {
  console.log("Server is running on prot 3000");
});
