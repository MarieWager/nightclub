"use client";

import { useState, useRef, useEffect } from "react";
import LeftTriangle from "../../_ui/LeftTriangle";
import RightTriangle from "../../_ui/RightTriangle";

const VIDEOS = [
  { id: 1, src: "/media/video-crowd.mp4" },
  { id: 2, src: "/media/video-dj-crowd-2.mp4" },
  { id: 3, src: "/media/video-dj-crowd1.mp4" },
];

export default function VideoPlayer() {
  // current video index
  const [currentIndex, setCurrentIndex] = useState(0);

  // video ref
  const videoRef = useRef(null);

  function showPrevVideo() {
    setCurrentIndex((i) => (i === 0 ? VIDEOS.length - 1 : i - 1));
  }

  function showNextVideo() {
    setCurrentIndex((i) => (i === VIDEOS.length - 1 ? 0 : i + 1));
  }

  // reset + play on change
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [currentIndex]);

  return (
    <div className="flex flex-col items-center gap-4 py-16">
      {/* video container */}
      <div className="w-full max-w-4xl relative">
        <LeftTriangle />
        <RightTriangle />

        <video
          ref={videoRef}
          src={VIDEOS[currentIndex].src}
          controls
          loop
          className="w-full h-auto"
        />
      </div>

      {/* nav buttons */}
      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={showPrevVideo}
          className="flex h-8 w-8 items-center justify-center 
                     border-2 border-white text-white 
                     hover:text-[var(--pink)] hover:border-[var(--pink)] hover:bg-white/5"
        >
          ◀
        </button>

        <button
          onClick={showNextVideo}
          className="flex h-8 w-8 items-center justify-center 
                     border-2 border-white text-white 
                     hover:text-[var(--pink)] hover:border-[var(--pink)] hover:bg-white/5"
        >
          ▶
        </button>
      </div>
    </div>
  );
}
