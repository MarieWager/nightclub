"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; //has {} because usePathname comes directly from the Next library
import LeftTriangle from "./_ui/LeftTriangle";
import RightTriangle from "./_ui/RightTriangle";
import TitleLine from "./TitleLine";

//I made the links as an array so the Navbar can generate them dynamically using .map()
//label is the text shown in the menu
export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "HOME" },
    { href: "/blog", label: "BLOG" },
    { href: "/book-table", label: "BOOK TABLE" },
    { href: "/contact", label: "CONTACT US" },
  ];

  return (
    <header className="relative w-full h-[124px] bg-black/90 border-t-2 border-b-2 border-[#FF2A70]">
      <LeftTriangle />
      <RightTriangle />

      {/* Content */}
      <div className="max-w-6xl h-full mx-auto flex items-center justify-between px-8">
        {/* Logo */}
        <div>
          <Link href="/">
            <Image src="/Logo.png" alt="logo image" width={220} height={27} />
          </Link>
        </div>

        {/* Navigation        //  I use .map() to render each link and check pathname*/}
        <nav className="flex gap-8 text-xs md:text-sm tracking-[0.25em] uppercase">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={pathname === link.href ? "text-[#FF2A70] pb-1" : "text-white hover:text-[#FF2A70] pb-1"}>
              {link.label}
              <div
                className={`h-0.5 mt-0.5 bg-gradient-to-r from-transparent via-[#FF2A70] to-transparent
                ${pathname === link.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} /*scale-x-0 gør linjen hidden */
              ></div>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
