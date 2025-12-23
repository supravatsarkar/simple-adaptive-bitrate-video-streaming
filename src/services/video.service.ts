import fs from "fs";
import ffmpeg from "fluent-ffmpeg";
interface Resolution {
  width: number;
  height: number;
  bitrate: number;
}

export const resolutions: Resolution[] = [
  { width: 1920, height: 1080, bitrate: 2000 }, // 1080px
  { width: 1280, height: 720, bitrate: 1000 }, // 720px
  { width: 854, height: 480, bitrate: 500 }, // 480px
  { width: 640, height: 360, bitrate: 400 }, // 360px
  { width: 256, height: 144, bitrate: 200 }, // 144px
];

/**
 * Process a video for HTTP live streaming
 * @param inputPath - input path of video file
 * @param inputPath - output path where video will save after process
 * @param callback - callback function which will after process complete
 *                   error: callback receive a error if any error occur
 *                   masterPlaylist: pass a master playlist string if video successfully processed.
 */

let processCount = 0;
export const processVideoForHls = (
  inputPath: string,
  outputPath: string,
  callback: (error: Error | null, masterPlaylist?: string) => void
): void => {
  fs.mkdirSync(outputPath, { recursive: true });
  const masterPlayList = `${outputPath}/master.m3u8`; // path to the master playlist file
  const masterPlayListContent: string[] = [];
  resolutions.map((resolution, indx) => {
    const variantOutputPath = `${outputPath}/${resolution.height}p`; // output path to particular variant files
    const variantPlaylist = `${variantOutputPath}/playlist.m3u8`; // particular variant playlist file
    fs.mkdirSync(variantOutputPath, { recursive: true }); // create the variant directory

    ffmpeg(inputPath)
      .outputOption([
        `-vf scale=w=${resolution.width}:h=${resolution.height}`,
        `-b:v ${resolution.bitrate}k`,
        `-codec:v libx264`,
        `-codec:a aac`,
        `-hls_time 10`,
        `-hls_playlist_type vod`,
        `-hls_segment_filename ${variantOutputPath}/segment%03d.ts`,
      ])
      .output(variantPlaylist)
      .on("end", () => {
        const bandwidth = resolution.bitrate * 1000 * 1.5; // as per recommended // in bit per second
        const averageBandwidth = resolution.bitrate * 1000; // in bit per second // optional but recommended
        masterPlayListContent.push(
          `#EXT-X-STREAM-INF: BANDWIDTH=${bandwidth}, AVERAGE-BANDWIDTH=${averageBandwidth}, RESOLUTION=${resolution.width}x${resolution.height}\n ${variantPlaylist}`
        );
        console.log("Process completed for ", resolution.height);
        processCount++;
        if (processCount === resolutions.length) {
          console.log("Video process completed");
          console.log("masterPlayListContent =>", masterPlayListContent);
          // after completed all variant process, master playlist creating
          fs.writeFileSync(
            masterPlayList,
            `#EXTM3U\n#EXT-X-VERSION:3\n${masterPlayListContent.join("\n")}`
          );
          callback(null, masterPlayList); // call the callback after finish video process with master playlist path
        }
      })
      .on("error", (err) => {
        console.log("Process failed", err);
        callback(err);
      })
      .run();
  });
};
