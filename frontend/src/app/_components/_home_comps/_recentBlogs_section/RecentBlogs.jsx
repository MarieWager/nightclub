"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function RecentBlogs({ params }) {
  const [blogposts, setBlogposts] = useState([]);

  useEffect(() => {
    async function getAllBlogPosts() {
      const res = await fetch("http://localhost:4000/blogposts", {
        method: "GET",
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Recent Blog Posts failed to load");
      const blogposts = await res.json();

      const postComments = await Promise.all(
        blogposts.map(async (post) => {
          const res = await fetch(`http://localhost:4000/blogposts/${post.id}?embed=comments`);

          if (!res.ok) return { ...post, commentCount: 0 }; /*ved fejl retunere antal kommentare til 0*/

          const count = await res.json();

          return {
            ...post,
            commentCount: count.comments?.length ?? 0 /*antal af comments retuneres, hvis de findes ellers = undefinded = ??=fallback retunere 0*/,
          };
        })
      );
      setBlogposts(postComments);
    }
    getAllBlogPosts();
  }, []);

  return (
    <>
      <main className="grid grid-cols-1 sm:grid-cols-3 gap-y-5 sm:gap-y-10 sm:gap-x-6 max-w-7xl mx-auto px-4 py-8 md:p-10 lg:px-20">
        {blogposts.map((post) => (
          <section key={post.id} className="flex flex-col">
            <Link href={`/blogposts/${post.id}`}>
              <Image src={post.asset.url} alt={post.title} width={1600} height={1400}></Image>
            </Link>
            <h2 className="line-clamp-1">{post.title}</h2>
          {/*byline*/}
            <article className="flex gap-3 mb-3">
              <h4>BY:</h4>
              <h4>{post.author}</h4>
              <h4>/</h4>
              <h4>{post.commentCount}</h4>
              <h4>Comments</h4>
              <h4>/</h4>
              <h4>{post.date}</h4>
            </article>
            {/*text content*/}
            <p className="line-clamp-3 leading-5">{post.content}</p>
          </section>
        ))}
      </main>
    </>
  );
}
