"use client";

import Image from "next/image";
import TitleLine from "./TitleLine";

const Banner = ({ title }) => {
  return (
    <>
      <main className="grid grid-cols-1 grid-rows-1">
        <Image src="/footerbg.webp" alt="People dancing" width={1600} height={600} className="brightness-50 aspect-16/4 md:aspect-16/2 object-cover z-0 row-start-1 row-end-2 col-start-1 col-end-2" />
        <TitleLine title={title} className="place-self-center text-center z-10 row-start-1 row-end-2 col-start-1 col-end-2"></TitleLine>
      </main>
    </>
  );
};

export default Banner;
