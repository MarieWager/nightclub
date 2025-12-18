"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaSnapchatGhost, FaTwitter, FaSquareFull } from "react-icons/fa";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    async function getTestimonials() {
      const res = await fetch("http://localhost:4000/testimonials", {
        method: "GET",
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Testimonials failed to load");

      const data = await res.json();
      setTestimonials(data);
    }
    getTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length < 2) return;

    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1 >= testimonials.length ? 0 : prev + 1));
    }, 10000);

    return () => clearInterval(interval);
  }, [testimonials]);

  const person = testimonials[slideIndex];

  if (!person) return <p>Loading...</p>;

  {
    /*
  
          <main key={person.id} className="grid grid-cols-1 grid-rows-[auto] max-w-6xl mx-auto justify-items-center text-center gap-3 p-15 md:p-20 lg:px-40 z-100 row-start-1 row-end-2 col-start-1 col-end-2">

  
  */
  }

  return (
    <>
      <div className="grid grid-cols-1 grid-rows-1">
        <Image src="/footerbg.webp" alt="People dancing" width={1600} height={1600} className="h-full w-fit lg:w-full brightness-20 object-cover z-0 row-start-1 row-end-2 col-start-1 col-end-2" />

        <main key={person.id} className="flex flex-col max-w-6xl mx-auto place-items-center justify-items-center text-center gap-3 p-15 md:p-20 lg:px-40 z-100 row-start-1 row-end-2 col-start-1 col-end-2">
          <Image src={person.asset.url} alt={`Club Guest: ${person.name}`} width={100} height={100} />
          <h2>{person.name}</h2>
          <p className="text-pretty line-clamp-3">{person.content}</p>

          {/*SoMe links*/}
          <article className="place-self-center w-fit mt-3 grid grid-cols-3 gap-2 justify-items-center">
            <Link href={person.facebook} className="border-2 p-2 justify-items-center">
              <FaFacebookF className="h-6 w-6" />
            </Link>
            <Link href={person.twitter} className="border-2 p-2 items-center">
              <FaTwitter className="h-6 w-6" />
            </Link>
            <Link href="http://snapchat.com" className="border-2 p-2 items-center">
              <FaSnapchatGhost className="h-6 w-6" />
            </Link>
          </article>

          <section className="flex gap-3 mt-3">
            {testimonials.map((person, i) => (
              <button key={person.id} onClick={() => setSlideIndex(i)} className={i === slideIndex ? "text-[#FF2A70]" : "text-white"}>
                <FaSquareFull />
              </button>
            ))}
          </section>
        </main>
      </div>
    </>
  );
}
