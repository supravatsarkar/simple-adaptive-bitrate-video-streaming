import { Request, Response } from "express";
import { processVideoForHls } from "../services/video.service";
import fs from "fs";
export const videoUploadController = (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Can't process without upload a file",
    });
  }

  const inputFilePath = req.file.path;
  console.log("inputFilePath", inputFilePath);
  const outputPath = `videos_output/${Date.now()}`;
  processVideoForHls(inputFilePath, outputPath, (err, masterPlaylistPath) => {
    if (err) {
      console.log("error", err);
      return res.status(500).json({
        success: false,
        message: "Video Upload failed!",
      });
    }
    fs.unlinkSync(inputFilePath); // delete original file after video variation process
    console.log("Video processed -- master file path", masterPlaylistPath);
    return res.status(200).json({
      success: true,
      message: "Video successfully uploaded!",
      data: `/${masterPlaylistPath}`,
    });
  });
};
