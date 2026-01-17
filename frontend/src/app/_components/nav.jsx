"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; 
import { useState, useEffect } from "react"; // ADDED for mobile menu
import LeftTriangle from "./_ui/LeftTriangle.jsx";
import RightTriangle from "./_ui/RightTriangle.jsx";

//I made the links as an array so the Navbar can generate them dynamically using .map()
//label is the text shown in the menu
export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false); // for mobile menu state

  //  close mobile menu when page changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // ADDED: lock page scroll when mobile menu is open (so footer can't appear)
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { href: "/", label: "HOME" },
    { href: "/blog", label: "BLOG" },
    { href: "/book-table", label: "BOOK TABLE" },
    { href: "/contact", label: "CONTACT US" },
  ];

  return (
    <header className="relative sticky top-0 z-50 w-full h-[84px] bg-black/90 border-t-2 border-b-2 border-[#FF2A70]">
      {/* to make triangles not blocking clicks */}
      <div className="pointer-events-none">
        <LeftTriangle />
        <RightTriangle />
      </div>

      {/* Content */}
      {/* make content sit above triangles */}
      <div className="relative z-10 max-w-6xl h-full mx-auto flex items-center justify-between px-8">
        {/* Logo */}
        <div>
          <Link href="/">
           <Image
  src="/Logo.png"
  alt="logo image"
  width={220}
  height={27}
  className="w-[140px] md:w-[220px] h-auto"
/>

          </Link>
        </div>

        {/* Navigation        //  I use .map() to render each link and check pathname*/}
        <nav className="hidden md:flex gap-8 text-xs md:text-sm tracking-[0.25em] uppercase">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`group ${
                pathname === link.href
                  ? "text-[#FF2A70] pb-1"
                  : "text-white hover:text-[#FF2A70] pb-1"
              }`}
            >
              {link.label}
              <div
                className={`h-0.5 mt-0.5 bg-gradient-to-r from-transparent via-[#FF2A70] to-transparent
                ${
                  pathname === link.href
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`} /*scale-x-0 gør linjen hidden */
              ></div>
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden relative z-20 flex flex-col justify-between w-6 h-5"
     onClick={() => {
  window.scrollTo(0, 0);
  setOpen(!open);
}}

          aria-label="Toggle menu"
        >
          <span className="block h-[2px] bg-white"></span>
          <span className="block h-[2px] bg-white"></span>
          <span className="block h-[2px] bg-white"></span>
        </button>
      </div>

      {/* Mobile navoverlay */}
      {open && (
        <div className="fixed inset-0 z-[100] min-h-[100svh] bg-black/95 flex flex-col items-center justify-center">
          {/* Close button */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute top-6 right-6 text-white text-3xl"
            aria-label="Close menu"
          >
            ✕
          </button>

          <nav className="flex flex-col gap-8 text-white text-lg tracking-[0.25em] uppercase text-center">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={pathname === link.href ? "text-[#FF2A70]" : ""}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
