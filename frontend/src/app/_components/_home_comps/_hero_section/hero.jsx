"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Hero() {
  const images = ["/header_bg_1.webp", "/header_bg_2.webp"];
  const [index, setIndex] = useState(0);

  // Controls animations
  const [animateIn, setAnimateIn] = useState(false);

  // Triggers logo, text and line animation when page loads
  useEffect(() => {
    setAnimateIn(true);
  }, []);

  // force page to start from top on refresh
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

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
        key={images[index]} // Forces re-render when image changes
        src={images[index]} // current background image
        fill
        className="object-cover transition-opacity duration-[1500ms]"
        alt="Night Club Background"
      />

      {/* Centered logo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white flex flex-col items-center">
        {/* Logo */}
        <div
          className={[
            "origin-top",
            "transition-all duration-700 ease-out",
            animateIn ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0",
          ].join(" ")}
        >
          <Image
            src="/header.svg"
            alt="Night Club Logo"
            width={555}
            height={117}
            className="w-[280px] sm:w-[360px] md:w-[555px] h-auto"
          />
        </div>

        {/* under text */}
        
        <h5 // h5 is used because <p> has global styles
          className={[
            "text-white text-center font-medium uppercase [text-shadow:0_0_16px_#000]",
            "text-[12px] sm:text-[16px] md:text-[20px]",
            "tracking-[8px] sm:tracking-[14px] md:tracking-[22px]",
            "w-[90vw] sm:w-[600px] md:w-[800px] mt-4",
            "transition-all duration-700 ease-out",
            animateIn
              ? "opacity-100 translate-y-0 delay-500"
              : "opacity-0 -translate-y-6",
          ].join(" ")}
        >
          HAVE A GOOD TIME
        </h5>

        {/* gradient line under text */}
        <Image
          src="/bottom_line.png"
          alt=""
          width={400}
          height={2}
          className={[
            "mt-0.5",
            "w-[220px] sm:w-[300px] md:w-[400px] h-auto",
            "transition-all duration-700 ease-out",
            animateIn
              ? "opacity-100 translate-y-0 delay-500"
              : "opacity-0 -translate-y-6",
          ].join(" ")}
        />
      </div>
    </section>
  );
}
