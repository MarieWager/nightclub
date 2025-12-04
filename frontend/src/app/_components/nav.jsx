"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LeftTriangle from "../_components/_ui/LeftTriangle"
import RightTriangle from "../_components/_ui/RightTriangle";

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
          <div className="text-2xl font-extrabold tracking-[0.25em] text-white">
            NIGHT<span className="text-[#FF2A70]">CLUB</span>
          </div>
          <p className="text-[10px] tracking-[0.3em] text-gray-300 mt-1">
            HAVE A GOOD TIME
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex gap-8 text-xs md:text-sm tracking-[0.25em] uppercase">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                pathname === link.href
                  ? "text-[#FF2A70] border-b-2 border-[#FF2A70] pb-1"
                  : "text-white hover:text-[#FF2A70] pb-1"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
