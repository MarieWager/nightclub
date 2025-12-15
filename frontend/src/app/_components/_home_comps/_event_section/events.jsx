"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import TitleLine from "../../TitleLine";
import RightTriangle from "../../_ui/newRightTriangle";

export default function Events() {
  const [events, setEvent] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);

  const performance = events;

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
    if (events.length < 3) return;

    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 2 >= events.length ? 0 : prev + 2));
    });

    return () => clearInterval(interval);
  }, [events]);

  return (
    <>
      <div className="grid grid-cols-1 grid-rows-1">
        <Image src="/slider_bg.png" alt="Event background" width={1600} height={700} className="h-full w-fit object-cover row-start-1 col-start-1"></Image>
        <main className="grid md:grid-cols-2 grid-rows-[auto] gap-y-10 gap-x-5 max-w-7xl row-start-1 col-start-1 mx-auto px-4 py-4">
          <TitleLine title="events of the month" className="col-span-2 place-self-center text-center" />

          {performance.slice(slideIndex, slideIndex + 2).map((event) => (
            <main key={event.id} className="mx-auto px-4">
              <section className="grid grid-cols-1 grid-rows-1">
                <Image src={event.asset.url} alt={event.title} width={1600} height={1400} className="z-0 row-start-1 col-start-1 object-cover"></Image>
                <article className="grid z-10 row-start-1 col-start-1">
                  <button href="/blog" className="bg-[#FF2A70] w-fit h-fit px-3 py-2 place-self-center">
                    <p className="text-7x1">Book Now</p>
                  </button>
                  <section>
                    <h2>{event.title}</h2>
                  </section>
                </article>
              </section>

              <section className="flex justify-start gap-4 p-2 h-fit bg-[#FF2A70]">
                <p type="date" className="">
                  {new Date(event.date).toLocaleString("en-UK", { day: "2-digit", month: "short" })}
                </p>
                <p type="time">{new Date(event.date).toLocaleString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}</p>
                <p>{event.location}</p>
              </section>
            </main>
          ))}
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
