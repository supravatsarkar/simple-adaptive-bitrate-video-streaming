import axios from "axios";
import { SquarePlay } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Home() {
  const [videoList, setVideoList] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/video/list").then(({ data }) => {
      console.log(data);
      setVideoList(data.data);
    });
  }, []);
  return (
    <div className="text-center text-2xl">
      <h1>Total video found {videoList.length}</h1>
      <div className="grid grid-cols-3 gap-3">
        {videoList.map((video) => (
          <>
            <div
              key={video}
              className="w-50 h-60 border border-amber-100 shadow rounded-xl p-4 mx-auto"
            >
              <Link to={`/video/play/${video}`}>
                <SquarePlay
                  className="cursor-pointer mx-auto"
                  width="150"
                  height="150"
                />
              </Link>
              <p className="p-2 text-center text-sm font-bold">{video}</p>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
