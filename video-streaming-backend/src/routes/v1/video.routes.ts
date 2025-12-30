import express from "express";
import {
  videoUploadController,
  getVideoListController,
} from "../../controllers/videoUplaod.controller";
import { upload } from "../../middlewares/multer.middleware";

const videoRouter = express.Router();
videoRouter.post("/upload", upload.single("video"), videoUploadController);
videoRouter.get("/list", getVideoListController);
export default videoRouter;
