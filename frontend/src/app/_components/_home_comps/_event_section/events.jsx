"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import TitleLine from "../../TitleLine";
import { FaSquareFull } from "react-icons/fa";

export default function Events() {
  const [events, setEvent] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(2);

  useEffect(() => {
    async function getEvents() {
      const res = await fetch("http://localhost:4000/events", {
        method: "GET",
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Events failed to load");
      const events = await res.json();
      setEvent(events);
    }
    getEvents();
  }, []);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) {
        setItemsPerSlide(1); // mobile
      } else {
        setItemsPerSlide(2); // desktop
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const performance = events;
  const visibleEvents = performance.slice(slideIndex, slideIndex + itemsPerSlide);
  const slideCount = Math.ceil(events.length / itemsPerSlide);

  return (
    <>
      <div className="grid grid-cols-1 grid-rows-1">
        <Image src="/slider_bg.png" alt="Event background" width={1600} height={700} className="h-full w-fit object-cover row-start-1 col-start-1"></Image>
        <main className="grid grid-cols-1 sm:grid-cols-2 grid-rows-[auto] gap-y-10 max-w-7xl row-start-1 col-start-1 mx-auto px-4 py-8 md:px-16 md:py-12 ">
          <TitleLine title="events of the month" className="col-span-2 place-self-center text-center" />

          {visibleEvents.map((event) => (
            <main key={event.id} className="mx-auto px-4">
              <section className="grid grid-cols-1 grid-rows-1">
                <Image src={event.asset.url} alt={event.title} width={1600} height={1400} className="z-0 row-start-1 col-start-1 object-cover"></Image>

                {/*grid grid-cols-3 grid-rows-[auto] eller flex flex-col*/}
                <article className="grid grid-cols-1 grid-rows-[auto] z-10 row-start-1 col-start-1">
                  <div className="w-full h-full border-t-1 border-[#FF2A70] col-span-3">
                    <div className="place-self-start border-[#FF2A70] h-full border-t-30 border-r-30 sm:border-t-50 sm:border-r-50 border-r-transparent"></div>
                  </div>

                  <button href="/blog" className="bg-[#FF2A70] w-fit h-fit px-3 py-2 place-self-center row-start-2 col-start-1">
                    <p className="text-base line-clamp-1">Book Now</p>
                  </button>

                  <section className="flex flex-col mt-5 px-6 py-3 place-self-end h-fit bg-black/75 overflow-hidden row-start-3 col-start-1 col-span-3">
                    <h5 className="text-base text-balance leading-8 line-clamp-1">{event.title}</h5>
                    <p className="line-clamp-3 leading-6 text-pretty overflow-hidden">{event.description}</p>
                  </section>

                  <div className="w-full h-full border-b-1 border-[#FF2A70] row-start-3 col-start-1 col-span-3">
                    <div className="place-self-end border-[#FF2A70] h-full border-b-30 border-l-30 sm:border-b-50 sm:border-l-50 border-l-transparent"></div>
                  </div>
                </article>
              </section>

              <section className="flex justify-start gap-4 p-2 h-fit bg-[#FF2A70] ">
                <p type="date" className="">
                  {new Date(event.date).toLocaleString("en-UK", { day: "2-digit", month: "short" })}
                </p>
                <p type="time">{new Date(event.date).toLocaleString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}</p>
                <p>{event.location}</p>
              </section>
            </main>
          ))}

          <section className="col-span-2 flex justify-center gap-3 mt-5">
            {Array.from({ length: slideCount }).map((_, i) => (
              <button key={i} onClick={() => setSlideIndex(i * itemsPerSlide)} className={slideIndex === i * itemsPerSlide ? "text-[#FF2A70]" : "text-white"}>
                <FaSquareFull />
              </button>
            ))}
          </section>
        </main>
      </div>
    </>
  );
}

{
  /*
    
       {slides.map((slide) => (
          <main className="grid grid-cols-1 grid-rows-2"></main>
        ))}
    
    */
}
