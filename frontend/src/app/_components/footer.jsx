"use client";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaSnapchatGhost, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className="grid grid-cols-1 grid-rows-1">
        <Image src="/footerbg.webp" alt="People dancing" width={1600} height={1600} className="h-full w-fit lg:w-full brightness-20 object-cover z-0 row-start-1 row-end-2 col-start-1 col-end-2" />

        <footer className="grid grid-cols-1 grid-rows-[auto] md:grid-cols-3 justify-items-center md:justify-items-start items-end gap-5 p-5 md:p-10 lg:px-20 z-100 row-start-1 row-end-2 col-start-1 col-end-2">
          {/*img/link*/}
          <Link href="/">
            <Image src="/Logo.png" alt="logo image" width={200} height={27} />
          </Link>

          {/*Posts*/}
          <h3 className="hidden md:block self-center">recent posts</h3>

          {/*Tweets*/}
          <h3 className="hidden md:block self-center">recent tweets</h3>

          {/*Location*/}
          <article className="text-center md:text-left self-end">
            <h3 className="mb-2">Location</h3>
            <p>Kompagnistræde 278</p>
            <p>1265 København K</p>
          </article>

          {/*Post 1*/}
          <article className="hidden md:grid md:grid-cols-[auto_2fr] md:grid-rows-[auto_1fr] gap-2 self-start">
            <Image src="/some/post_1.webp" alt="Recent post 2" width={100} height={100} className="object-cover max-w-[8vw] max-h-[100px] row-span-2"></Image>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting.</p>
            <h4>April 17, 2018</h4>
          </article>

          {/*Tweet 1*/}
          <article className="hidden md:grid md:grid-cols-[auto_2fr] md:grid-rows-[auto_1fr] gap-2 self-start">
            <Link href="http://twitter.com" className="row-span-2">
              <FaTwitter className="h-6 w-6 text-[var(--pink)]" />
            </Link>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting.</p>
            <h4>5 hours ago</h4>
          </article>

          {/*Hours*/}
          <article className="text-center md:text-left self-start">
            <h3 className="mb-2">Opening Hours</h3>
            <p>WED - THU: 10:30 PM TO 3 AM</p>
            <p>SAT - SUN: 11 PM TO 5 AM</p>
          </article>

          {/*Post 2*/}
          <article className="hidden md:grid md:grid-cols-[auto_2fr] md:grid-rows-[auto_1fr] gap-2 self-start">
            <Image src="/some/post_2.webp" alt="Recent post 2" width={100} height={100} className="object-cover max-w-[8vw] max-h-[100px] row-span-2"></Image>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting.</p>
            <h4>April 17, 2018</h4>
          </article>

          {/*Tweet 2*/}
          <article className="hidden md:grid md:grid-cols-[auto_2fr] md:grid-rows-[auto_1fr] gap-2 self-start">
            <Link href="http://twitter.com" className="row-span-2">
              <FaTwitter className="h-6 w-6 text-[var(--pink)]" />
            </Link>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting.</p>
            <h4>5 hours ago</h4>
          </article>

          {/*SoMe + Copyright*/}
          <section className="grid grid-cols-subgrid md:grid-cols-subgrid md:grid-rows-1 md:col-span-3 items-end gap-5 md:mt-15">
            <article className="place-self-center order-1 md:order-2 w-fit grid grid-cols-3 gap-2 justify-items-center">
              <p className="col-span-3 text-center">Stay Connected With US</p>
              <Link href="http://facebook.com" className="border-2 p-2 justify-items-center">
                <FaFacebookF className="h-6 w-6" />
              </Link>
              <Link href="http://snapchat.com" className="border-2 p-2 items-center">
                <FaSnapchatGhost className="h-6 w-6" />
              </Link>
              <Link href="http://instagram.com" className="border-2 p-2 items-center">
                <FaInstagram className="h-6 w-6" />
              </Link>
            </article>

            <p className="order-2 md:order-1 text-center md:text-left">Night Club PSD Template - All Rights Reserved</p>
            <p className="order-3 text-center md:text-right">Copyright © NightClub</p>
          </section>
        </footer>
      </div>
    </>
  );
};

export default Footer;
