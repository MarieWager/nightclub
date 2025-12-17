"use client";

import { motion } from "framer-motion";

const bgChange = {
  idle: {
    opacity: 1,
    transition: {
      type: "tween",
      duration: 1,
      ease: "easeInOut",
    },
  },
  active: {
    zIndex: -1,
    opacity: 0,
    transition: {
      type: "tween",
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

const iconZoom = {
  idle: {
    opacity: 1,
    zIndex: 1,

    scale: 0,
    transition: {
      type: "tween",
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  active: {
    opacity: [0, 0.1, 1],
    scale: 1,
    transition: {
      scale: {
        type: "tween",
        duration: 0.5,
        ease: "easeIn",
      },
      opacity: {
        type: "tween",
        duration: 2,
        times: [0.1, 0.2, 1],
        ease: "easeOut",
      },
    },
  },
};

const titleZoom = {
  idle: {
    opacity: 0,
    scale: 0.2,
    y: -25,
    transition: {
      type: "tween",
      duration: 0.8,
      ease: "easeInOut",
    },
  },
  active: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "tween",
      duration: 1,
      ease: "easeIn",
    },
  },
};

const textMove = {
  idle: {
    opacity: 0,
    x: 30,
    transition: {
      type: "tween",
      duration: 0.6,
      ease: "easeInOut",
    },
  },
  active: {
    opacity: 1,
    x: 0,
    transition: {
      type: "tween",
      duration: 1.2,
      ease: "easeIn",
    },
  },
};

const triRight = {
  idle: {
    zIndex: -1,
    opacity: 0,
    x: 10,
    transition: {
      type: "tween",
      duration: 0.1,
      ease: "easeInOut",
    },
  },
  active: {
    zIndex: 10,
    opacity: [0, 0.1, 1],
    x: 0,
    transition: {
      type: "tween",
      duration: 1,
      ease: "easeIn",
      opacity: {
        type: "tween",
        duration: 1,
        times: [0.1, 0.2, 1],
        ease: "easeOut",
      },
    },
  },
};

const triLeft = {
  idle: {
    zIndex: -1,
    opacity: 0,
    x: -10,
    transition: {
      type: "tween",
      duration: 0.1,
      ease: "easeInOut",
    },
  },
  active: {
    zIndex: 10,
    opacity: [0, 0.1, 1],
    x: 0,
    transition: {
      type: "tween",
      duration: 1,
      ease: "easeIn",
      opacity: {
        type: "tween",
        duration: 1,
        times: [0.1, 0.2, 1],
        ease: "easeOut",
      },
    },
  },
};

const variantMap = {
  bgChange,
  iconZoom,
  titleZoom,
  textMove,
  triRight,
  triLeft,
};

export default function WelAnimation({ isActive, animation = "", target, className = "" }) {
  const variants = variantMap[animation];

  return (
    <>
      <motion.div className={className} variants={variants} initial="idle" animate={isActive ? "active" : "idle"}>
        {target}
      </motion.div>
    </>
  );
}

/*

{


          if (!variants) {
    console.warn(`Animation variant "${animation}" not found`);
    return target;
    } 
  
*/
