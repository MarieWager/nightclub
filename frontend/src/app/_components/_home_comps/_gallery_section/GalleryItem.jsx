"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import EvAnimation from "@/app/_components/_home_comps/_event_section/EvAnimation";
import LeftTriangle from "@/app/_components/_ui/LeftTriangle";
import RightTriangle from "@/app/_components/_ui/RightTriangle";

const itemEnter = {
  hidden: { opacity: 0, x: -40 },
  show: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      type: "tween",
      duration: 0.6,
      ease: "easeOut",
      delay: i * 0.06,
    },
  }),
};

export default function GalleryItem({ photo, i = 0 }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <motion.div
      variants={itemEnter}
      initial="hidden"
      whileInView="show" //animate on scroll
      viewport={{ once: true, amount: 0.25 }} // once only first time, amount is how much visible before trigger
      custom={i}
      className="w-full"
    >
      <Link
        href={`/gallery/${photo.id}`}
        className="relative overflow-hidden w-full aspect-[16/9] block"
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
      >
        {/* Background imag animation*/}
        <EvAnimation
          isActive={isActive}
          animation="bgBlur"
          className="absolute inset-0"
          target={
            <Image
              src={photo.asset.url}
              alt={photo.description || "gallery photo"}
              fill
              className="object-cover"
            />
          }
        />

        {/* left triangle */}
        <EvAnimation
          isActive={isActive}
          animation="textwrap"
          className="absolute inset-0 z-20 pointer-events-none"
          target={<LeftTriangle />}
        />

        {/* right triangle */}
        <EvAnimation
          isActive={isActive}
          animation="textwrap"
          className="absolute inset-0 z-20 pointer-events-none"
          target={<RightTriangle />}
        />
      </Link>
    </motion.div>
  );
}
