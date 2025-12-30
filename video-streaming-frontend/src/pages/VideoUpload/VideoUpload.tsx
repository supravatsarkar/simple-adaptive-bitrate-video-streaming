import axios from "axios";
import { Loader } from "lucide-react";
import React, { useState } from "react";
const uploadAPI = "http://localhost:3000/api/v1/video/upload";

function VideoUpload() {
  const [isUploading, setIsUploading] = useState(false);

  const uploadHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);
    const file = event.target.files?.[0];
    if (file) {
      console.log("Uploading file:", file);
      // Implement the upload logic here
      const form = new FormData();
      form.append("video", file);
      axios
        .post(uploadAPI, form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Upload successful:", response.data);
          if (response.data.success) {
            alert(response.data.message);
          }
        })
        .catch((error) => {
          console.error("Upload failed:", error);
          console.log("Video Upload filed!");
        })
        .finally(() => setIsUploading(false));
    } else {
      console.log("No file selected");
      return;
    }
  };
  return (
    <div className=" min-h-screen flex flex-col items-center justify-center">
      <h1>Upload Your Video</h1>
      <div className="relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300">
        {isUploading ? (
          <Loader className="mx-auto" />
        ) : (
          <input
            className="bg-white text-black border border-gray-300 rounded px-4 py-2 mt-4 mouse-pointer hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="file"
            accept="video/*"
            onChange={uploadHandler}
          />
        )}
      </div>
    </div>
  );
}

export default VideoUpload;
