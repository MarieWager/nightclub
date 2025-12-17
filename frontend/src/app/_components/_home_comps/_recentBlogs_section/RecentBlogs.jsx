"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import TitleLine from "../../TitleLine";
import { FaSquareFull } from "react-icons/fa";
import EvAnimation from "./EvAnimation";

export default function RecentBlogs() {
  const [activeId, setActiveId] = useState(null);
  const [blog, setBlog] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(2);

  useEffect(() => {
    async function getBlogPosts() {
      const res = await fetch("http://localhost:4000/events", {
        method: "GET",
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Recent Blog Posts failed to load");
      const blog = await res.json();
      setBlog(blog);
    }
    getBlogPosts();
  }, []);



}