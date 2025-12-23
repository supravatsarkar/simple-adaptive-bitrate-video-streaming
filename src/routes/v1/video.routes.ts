import express from "express";
import { videoUploadController } from "../../controllers/videoUplaod.controller";
import { upload } from "../../middlewares/multer.middleware";

const videoRouter = express.Router();
videoRouter.post("/upload", upload.single("video"), videoUploadController);
export default videoRouter;
