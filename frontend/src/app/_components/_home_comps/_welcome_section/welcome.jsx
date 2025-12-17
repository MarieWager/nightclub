"use client";

import { useState } from "react";
import Image from "next/image";
import { MdOutlineRoomService } from "react-icons/md";
import { PiCheersDuotone } from "react-icons/pi";
import WelAnimation from "./WelAnimation";
import EvAnimation from "../_event_section/EvAnimation";

const OFFERS = [
  {
    id: 1,
    img: "/welcome/offer_1.jpg",
    icon: <Image src="/welcome/icon_dancer.svg" width={12} height={12} alt="Offer icon" />,
    title: "Night Club",
    text: "Night Club Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi quod temporibus rerum minus nihil nulla recusandae aliquam nesciunt veniam, doloremque modi ducimus, dolores voluptas. Mollitia distinctio velit itaque dolores officiis.",
  },
  {
    id: 2,
    img: "/welcome/offer_2.jpg",
    icon: <MdOutlineRoomService />,
    title: "Resturant",
    text: "Resturant Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi quod temporibus rerum minus nihil nulla recusandae aliquam nesciunt veniam, doloremque modi ducimus, dolores voluptas. Mollitia distinctio velit itaque dolores officiis.",
  },
  {
    id: 3,
    img: "/welcome/offer_3.jpg",
    icon: <PiCheersDuotone />,
    title: "Bar",
    text: "Bar Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi quod temporibus rerum minus nihil nulla recusandae aliquam nesciunt veniam, doloremque modi ducimus, dolores voluptas. Mollitia distinctio velit itaque dolores officiis.",
  },
];

export default function Welcome() {
  const [activeId, setActiveId] = useState(null);

  return (
    <main className="grid grid-cols-1 sm:grid-cols-3 max-w-6xl place-self-center gap-x-6 gap-y-8 p-5 md:p-10 lg:px-20">
      {OFFERS.map((offer) => (
        <section key={offer.id} className="grid grid-cols-1 grid-rows-1 min-h-90 sm:h-100 max-w-[305px] md:max-w-full gap-2 place-self-center" onPointerEnter={() => setActiveId(offer.id)} onPointerLeave={() => setActiveId(null)} onPointerDown={() => setActiveId((prev) => (prev === offer.id ? null : offer.id))} onFocus={() => setActiveId(offer.id)} onBlur={() => setActiveId(null)} tabIndex={0}>
          {/*bg img*/}
          <WelAnimation isActive={activeId === offer.id} className="row-start-1 col-start-1 z-0 h-full w-full" animation="bgChange" target={<Image src={offer.img} alt={`Picture of ${offer.title}`} width={400} height={800} className="h-full w-full object-cover pointer-events-none" />} />

          {/*
        overlay*/}
          <article className="h-full grid grid-cols-1 grid-rows-[auto] row-start-1 col-start-1">
            {/*top border*/}
            <EvAnimation isActive={activeId === offer.id} className="place-self-start row-start-1 col-start-1" animation="borderTop" target={<div className="h-[2px] bg-[#FF2A70]"></div>}></EvAnimation>

            {/*left tri*/}
            <EvAnimation isActive={activeId === offer.id} className="border-r-transparent border-t-[#FF2A70] place-self-start row-start-1 col-start-1" animation="triLeftGrow" target={<div className="place-self-start border-[#FF2A70]"></div>}></EvAnimation>

            {/*icon*/}
            <WelAnimation isActive={activeId === offer.id} className="place-self-center" animation="iconZoom" target={<div className="flex w-fit h-fit border-2 border-[#FF2A70] p-[1rem] justify-center place-self-center [&>*]:text-[#FF2A70] [&>*]:h-10 [&>*]:w-10 [&>*]:aspect-square">{offer.icon}</div>}></WelAnimation>

            {/*title*/}
            <WelAnimation isActive={activeId === offer.id} className="place-self-center" animation="titleZoom" target={<p className="uppercase text-center text-2xl font-bold tracking-[0.5em]">{offer.title}</p>}></WelAnimation>

            {/*text*/}
            <WelAnimation isActive={activeId === offer.id} className="place-self-center" animation="textMove" target={<p className="text-center text-pretty">{offer.text}</p>}></WelAnimation>

            {/*right tri*/}
            <EvAnimation isActive={activeId === offer.id} className="place-self-end border-l-transparent border-b-[#FF2A70] row-start-5 col-start-1" animation="triRightGrow" target={<div className="place-self-end border-[#FF2A70]"></div>}></EvAnimation>
            {/*bottom border*/}
            <EvAnimation isActive={activeId === offer.id} className="place-self-end row-start-5 col-start-1" animation="borderBottom" target={<div className="h-[2px] bg-[#FF2A70]"></div>}></EvAnimation>
          </article>
        </section>
      ))}
    </main>
  );
}
