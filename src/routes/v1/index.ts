import express, { Request, Response } from "express";

const v1Router = express.Router();

v1Router.get("/ping", (_req: Request, res: Response) => {
  return res.status(200).json({
    message: "pong!!",
  });
});
export default v1Router;
