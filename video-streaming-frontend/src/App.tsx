// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router";
import VideoUpload from "./pages/VideoUpload/VideoUpload";
import Home from "./pages/Home/Home";
import VideoPlayer from "./conponents/VideoPlayer";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="shadow-lg flex flex-row gap-4 p-2 m-2">
          <Link className="p-2 shadow-sm bg-gray-300 rounded-l" to="/">
            Home
          </Link>
          <Link className="p-2 shadow-sm bg-gray-300 rounded-l" to="/upload">
            Upload
          </Link>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<VideoUpload />} />
          <Route path="/video/play/:videoId" element={<VideoPlayer />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
