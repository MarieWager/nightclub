"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import TitleLine from "../../TitleLine";
import { FaSquareFull } from "react-icons/fa";
import EvAnimation from "./EvAnimation";
import Link from "next/link";

export default function Events() {
  const [activeId, setActiveId] = useState(null);
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

  const visibleEvents = events.slice(slideIndex, slideIndex + itemsPerSlide);
  const slideCount = Math.ceil(events.length / itemsPerSlide);

  return (
    <div className="grid grid-cols-1 grid-rows-1">
      <Image src="/slider_bg.png" alt="Event background" width={1600} height={700} className="h-full w-fit object-cover row-start-1 col-start-1"></Image>
      <main className="grid grid-cols-1 sm:grid-cols-2 grid-rows-[auto] gap-y-5 sm:gap-y-10 sm:gap-x-6 max-w-7xl row-start-1 col-start-1 mx-auto px-4 py-8 md:p-10 lg:px-20">
        <TitleLine title="events of the month" className="col-span-2 place-self-center text-center" />

        {visibleEvents.map((event) => (
          <main key={event.id} className="grid grid-cols-1 grid-rows-[auto] max-w-7xl" onPointerEnter={() => setActiveId(event.id)} onPointerLeave={() => setActiveId(null)} onPointerDown={() => setActiveId((prev) => (prev === event.id ? null : event.id))} onFocus={() => setActiveId(event.id)} onBlur={() => setActiveId(null)} tabIndex={0}>
            <section className="grid grid-cols-1 grid-rows-1">
              <EvAnimation isActive={activeId === event.id} className="h-full w-full border-y-transparent border-[#FF2A70] row-start-1 col-start-1" animation="bgBlur" target={<Image src={event.asset.url} alt={event.title} width={1600} height={1400} className="h-full w-full object-cover pointer-events-none" />}></EvAnimation>

              {/*overlay*/}
              <article className="grid grid-cols-1 grid-rows-[0.3fr_auto_0.3fr] row-start-1 col-start-1">
                {/*top border*/}
                <EvAnimation isActive={activeId === event.id} className="place-self-start row-start-1 col-start-1 col-span-3" animation="borderTop" target={<div className="h-[2px] bg-[#FF2A70]"></div>}></EvAnimation>

                {/*left tri*/}
                <EvAnimation isActive={activeId === event.id} className="border-r-transparent border-t-[#FF2A70] place-self-start row-start-1 col-start-1" animation="triLeftGrow" target={<div className="place-self-end border-[#FF2A70]"></div>}></EvAnimation>
               
                {/*button*/}
                <EvAnimation
                  isActive={activeId === event.id}
                  animation="button"
                  className="place-self-center row-start-2 col-start-1"
                  target={
                    <Link href="/book-table" className="bg-[#FF2A70] w-fit h-full px-3 py-2 inline-block">
                      Book Now
                    </Link>
                  }
                ></EvAnimation>

                {/*text content*/}
                <EvAnimation
                  isActive={activeId === event.id}
                  animation="textwrap"
                  className="place-self-end row-start-3 col-start-1 col-span-3"
                  target={
                    <section className="flex flex-col mt-5 px-6 py-3 bg-black/75">
                      <h5 className="text-base text-balance leading-8 line-clamp-1">{event.title}</h5>
                      <p className="line-clamp-3 leading-6 text-pretty">{event.description}</p>
                    </section>
                  }
                ></EvAnimation>

                {/*right tri*/}
                <EvAnimation isActive={activeId === event.id} className="place-self-end border-l-transparent border-b-[#FF2A70] row-start-3 col-start-1 col-span-3" animation="triRightGrow" target={<div className="place-self-end border-[#FF2A70]"></div>}></EvAnimation>
                {/*bottom border*/}
                <EvAnimation isActive={activeId === event.id} className="place-self-end row-start-3 col-start-1" animation="borderBottom" target={<div className="h-[2px] bg-[#FF2A70]"></div>}></EvAnimation>
              </article>
            </section>

            <section className="z-200 flex justify-start gap-4 p-2 h-fit bg-[#FF2A70] ">
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
  );
}

{
  /*
    
       {slides.map((slide) => (
          <main className="grid grid-cols-1 grid-rows-2"></main>
        ))}
    
    */
}
