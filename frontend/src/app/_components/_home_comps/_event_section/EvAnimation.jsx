"use client";

import { motion, scale } from "framer-motion";

const bgBlur = {
  idle: {
    filter: "brightness(1)",
    transition: {
      type: "tween",
      duration: 1,
      ease: "easeInOut",
    },
  },
  active: {
    zIndex: 10,
    filter: "brightness(0.5)",
    transition: {
      type: "tween",
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const borderTop = {
    idle: {
      opacity: 0,
      width: 0,
    },
    active: {
      opacity: 1,
      zIndex: 100,
      scale: 1,
      width: "100%",
      transition: {
        type: "tween",
        duration: 0.6,
        ease: "easeOut",
      },
  },
};

const borderBottom = {
  idle: {
    opacity: 0,
    width: 0,
  },
  active: {
    opacity: 1,
    zIndex: 100,
    scale: 1,
    width: "100%",
    marginLeft: 0,
    transition: {
      type: "tween",
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const button = {
  idle: {
    opacity: 0,
    zIndex: 0,
    y: -10,
    transition: {
      type: "tween",
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  active: {
    opacity: 1,
    zIndex: 10,
    y: 0,
    transition: {
      type: "tween",
      duration: 1,
      ease: "easeOut",
    },
  },
};

const textwrap = {
  idle: {
    opacity: 0,
    y: 10,
    zIndex: 0,
    transition: {
      type: "tween",
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  active: {
    opacity: 1,
    zIndex: 10,
    y: 0,
    transition: {
      type: "tween",
      duration: 1,
      ease: "easeOut",
    },
  },
};

const triRightGrow = {
  idle: {
    zIndex: -1,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    opacity: 0,
    transition: {
      type: "tween",
      duration: 0.1,
      ease: "easeInOut",
    },
  },
  active: {
    zIndex: 10,
    borderLeftWidth: 40,
    borderBottomWidth: 40,
    opacity: [0, 0.1, 1],
    transition: {
      type: "tween",
      duration: 0.5,
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

const triLeftGrow = {
  idle: {
    zIndex: -1,
    borderRightWidth: 0,
    borderTopWidth: 0,
    opacity: 0,
    transition: {
      type: "tween",
      duration: 0.1,
      ease: "easeInOut",
    },
  },
  active: {
    zIndex: 10,
    borderRightWidth: 40,
    borderTopWidth: 40,
    y: 0,
    opacity: [0, 0.1, 1],
    transition: {
      type: "tween",
      duration: 0.5,
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
  bgBlur,
  button,
  textwrap,
  triRightGrow,
  triLeftGrow,
  borderTop,
  borderBottom,
};

export default function EvAnimation({ isActive, animation = "", target, className = "" }) {
  const variants = variantMap[animation];

  return (
    <>
      <motion.div className={className} variants={variants} initial="idle" animate={isActive ? "active" : "idle"}>
        {target}
      </motion.div>
    </>
  );
}

{
  /* eks:
            <Animation isActive={activeId === offer.id} className="w-full h-full border-t-2 border-[#FF2A70]" animation="triLeft" target={<div className="place-self-start border-[#FF2A70] h-full border-t-40 border-r-40 border-r-transparent"></div>}></Animation>

            <Animation isActive={activeId === offer.id} className="w-full h-full border-b-2 border-[#FF2A70]" animation="triRight" target={<div className="place-self-end border-[#FF2A70] h-full border-b-40 border-l-40 border-l-transparent"></div>}></Animation>

    <EvAnimation isActive={activeId === event.id} className="place-self-start row-start-1 col-start-1 col-span-3" animation="borderBottom" target={<div className="h-[2px] bg-[#FF2A70]"></div>}></EvAnimation>

  <EvAnimation isActive={activeId === event.id} className="row-start-3 col-start-1 col-span-3" animation="borderTop" target={<div className="h-[2px] bg-[#FF2A70] border-2 border-t-[#FF2A70]"></div>}></EvAnimation>


            */
}
