import { useParams } from "react-router";

export default function VideoPlayer() {
  const { videoId } = useParams();
  console.log("params", videoId);
  const videoUrl = `http://localhost:3000/stream/${videoId}/master.m3u8`;
  return (
    <div className="mx-auto">
      <div className="flex flex-col mt-20">
        {/* <VideoPlayer
        src={videoUrl}
        poster="https://cdn.example.com/videos/movie/poster.jpg"
      /> */}
        <h1 className="text-amber-500 text-center">Video Title</h1>
        {/* <video
        className="video-js w-full"
        data-setup='{"controls": true, "autoplay": false, "preload": "auto"}'
        src={videoUrl}
      ></video> */}
        <video
          id="my-player"
          width="640px"
          height="267px"
          className="video-js mx-auto rounded-4 shadow-lg"
          controls
          preload="auto"
          autoPlay={true}
          // poster="//vjs.zencdn.net/v/oceans.png"
          data-setup='{ "aspectRatio":"640:267", "playbackRates": [1, 1.5, 2] }'
        >
          <source src={videoUrl}></source>
        </video>
      </div>
    </div>
  );
}
