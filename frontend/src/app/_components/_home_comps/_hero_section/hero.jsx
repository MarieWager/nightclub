"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Hero() {
  // Array of rotating images
  const images = ["/header_bg_1.webp", "/header_bg_2.webp"];
  const [index, setIndex] = useState(0);

  // Switch image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Rotating background */}
      <Image
        key={images[index]} // It displays the correct image based on the current index
        src={images[index]} //It forces React to re-render the image element, which makes the fade transition work
        fill
        className="object-cover transition-opacity duration-[1500ms]"
        alt="Night Club Background"
      />

      {/* Centered Logo + Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white flex flex-col items-center">
        
        {/* Logo */}
        <Image
          src="/header.svg"
          alt="Night Club Logo"
          width={555}
          height={117}
        />

        {/* Subtitle Text */}



        <h5 //used because for <p> there are settings in global css
        //tracking is making space between letters
          className="text-white text-center text-[20px] font-medium uppercase tracking-[22px] w-[800px] mt-4 [text-shadow:0_0_16px_#000]"
        >HAVE A GOOD TIME</h5>
      </div>
    </section>
  );
}  