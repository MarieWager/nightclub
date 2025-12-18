"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Banner from "@/app/_components/Banner";
import React from "react";
import CommentForm from "@/app/_components/_blog_comps/CommentForms";

export default function BlogPostbyId() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function getBlogPostbyId() {
      const res = await fetch(`http://localhost:4000/blogposts/${id}`, {
        method: "GET",
      });

      if (!res.ok) throw new Error("Blog Post failed to load");

      const post = await res.json();

      const comments = await fetch(`http://localhost:4000/blogposts/${post.id}?embed=comments`);

      if (!comments.ok) return { ...post, commentCount: 0 }; /*ved fejl retunere antal kommentare til 0*/

      const postIdComments = await comments.json();

      setPost({
        ...post,
        comments: postIdComments.comments ?? [],
        commentCount: postIdComments.comments?.length ?? 0 /*antal af comments retuneres, hvis de findes ellers = undefinded = ??=fallback retunere 0*/,
      });
    }
    getBlogPostbyId();

    if (!id) return;
    getComments();
  }, [id]);

  const handleCommentSubmit = async (data, reset) => {
    const newComment = {
      blogpostId: Number(id),
      name: data.name,
      email: data.email,
      content: data.comment,
      date: new Date().toISOString(),
    };

    setPost((prev) => ({
      ...prev,
      comments: [newComment, ...prev.comments],
      commentCount: prev.commentCount + 1,
    }));

    try {
      const res = await fetch("http://localhost:4000/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      });

      if (!res.ok) throw new Error("Failed to send comment");
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  async function getComments() {
    const res = await fetch(`http://localhost:4000/comments?blogpostId=${id}`);
    const data = await res.json();
    setComments(data);
  }

  if (!post) {
    return <div className="p-10 text-center">Loading blog post ...</div>;
  }

  return (
    <>
      <Banner title="blog post"></Banner>
      <main className="grid grid-cols-1 grid-rows[auto] gap-3 max-w-7xl mx-auto px-4 py-8 md:p-10 lg:px-20">
        <section key={post.id} className="flex flex-col">
          <Image src={post.asset.url} alt={post.title} width={1600} height={1400}></Image>

          <h1 className="text-pretty">{post.title}</h1>

          {/*byline*/}
          <article className="flex gap-3 mb-3">
            <h4>BY:</h4>
            <h4>{post.author}</h4>
            <h4>/</h4>
            <h4>{post.commentCount}</h4>
            <h4>Comments</h4>
            <h4>/</h4>
            <h4>
              {new Date(post.date).toLocaleString("en-UK", { day: "2-digit", month: "short", year: "numeric" })}
            </h4>
          </article>

          {/*text content*/}
          <p className="leading-6 text-pretty">{post.content}</p>
        </section>

        {/*Comment section*/}
        <section>
          <h1 className="flex gap-2 items-center">
            <b>{post.commentCount}</b>
            <b className="text-2xl md:text-4x1">comments</b>
          </h1>

          {post.comments.map((comment) => (
            <article key={comment.id} className="flex flex-col gap-2 mb-5">
              <section className="flex gap-3 items-center">
                <b className="text-sm">{comment.name}</b>
                <b className="text-sm">-</b>
                <h4>Posted {new Date(comment.date).toLocaleString("en-UK", { day: "2-digit", month: "short", year: "numeric" })}</h4>
              </section>

              <p>" {comment.content} "</p>
            </article>
          ))}
        </section>

        {/*Forms for Comment*/}
        <section className="max-w-6xl">
          <CommentForm onSubmitComment={handleCommentSubmit} />
        </section>
      </main>
    </>
  );
}
