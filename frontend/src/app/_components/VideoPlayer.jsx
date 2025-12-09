"use client";

import { useState, useRef, useEffect } from "react";
import LeftTriangle from "./_ui/LeftTriangle";
import RightTriangle from "./_ui/RightTriangle";

const VIDEOS = [
  { id: 1, src: "/media/video-crowd.mp4" },
  { id: 2, src: "/media/video-dj-crowd-2.mp4" },
  { id: 3, src: "/media/video-dj-crowd1.mp4" },
];

export default function VideoPlayer() {
  // Tracks which video is currently shown
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reference to the <video> element so we can control it directly
  const videoRef = useRef(null);

  // Go to the previous video (wraps around to last)
  function showPrevVideo() {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 0) {
        return VIDEOS.length - 1;
      } else {
        return prevIndex - 1;
      }
    });
  }

  // Go to the next video (wraps around to first)
  function showNextVideo() {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === VIDEOS.length - 1) {
        return 0;
      } else {
        return prevIndex + 1;
      }
    });
  }

  // When currentIndex changes 1) reset the video to 0 sec, 2)try to autoplay the new video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;

      videoRef.current.play().catch(() => {
        // If browser blocks autoplay, ignore the error
      });
    }
  }, [currentIndex]);

  return (
    <div className="flex flex-col items-center gap-4 py-16">

      {/* The video container needs relative so triangles can be positioned inside it */}
      <div className="w-full max-w-4xl relative">

        {/* triangles*/}
        <LeftTriangle />
        <RightTriangle />

        {/* The actual video player */}
        <video
          ref={videoRef}
          src={VIDEOS[currentIndex].src}
          controls
          loop
          className="w-full h-auto"
        />
      </div>




      {/* Navigation buttons */} 
      <div className="flex items-center gap-4 mt-4"> 
        <button
          onClick={showPrevVideo}
           className="hidden h-12 w-12 items-center justify-center border-2 border-white text-white hover:bg-white/5 md:flex"
        >
          ◀
        </button>

        <button
          onClick={showNextVideo}
           className="hidden h-12 w-12 items-center justify-center border-2 border-white text-white hover:bg-white/5 md:flex"
        >
          ▶
        </button>
      </div>
    </div>
  );
}
