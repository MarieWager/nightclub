"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import Banner from "@/app/_components/Banner";
import React from "react";
import { useForm } from "react-hook-form";

export default function BlogPostbyId({ params }) {
  const { id } = use(params);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  console.log(errors);
  const values = watch();

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

  const onSubmit = async (data) => {
    setMessage("");

    const newComment = {
      blogpostId: Number(id),
      name: data.name,
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
      setMessage("Thank you for writing a comment!");
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong. Please try again.");
    }
  };

  async function getComments() {
    const res = await fetch(`http://localhost:4000/comments?blogpostId=${id}`);
    const data = await res.json();
    setComments(data);
  }

  {
    /*  


  async function getComments() {
      const res = await fetch(`http://localhost:4000/comments?blogpostId=${id}`);
      const data = await res.json();
      setComments(data);
    }


    //////////////
    
    async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:4000/newsletters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Failed to subscribe");

      setMessage("Thank you for subscribing!");
      setEmail("");
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong. Please try again.");
    }
  }


  //////////////////


   <form onSubmit={handleSubmit} className="space-y-4">

          
         <div className="flex flex-col md:flex-row items-center justify-center gap-6 mx-auto">

            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full md:w-[600px] border-b-2 border-white px-4 py-3 outline-none text-sm text-white hover:bg-neutral-700 focus:bg-neutral-800 placeholder-white placeholder:!text-lg;" />

          <input
  className="form-button w-full md:w-40"
  type="submit"
  value="Subscribe"
/>

          </div>
        </form>
    
    */
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
            <h4>{post.date}</h4>
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
            <article key={comment.id} className="flex flex-col gap-2 mb-3">
              <section className="flex gap-3 items-center">
                <b className="text-sm">{comment.name}</b>
                <b className="text-sm">-</b>
                <h4>Posted</h4>
                <h4> {new Date(comment.date).toLocaleString("en-UK", { day: "2-digit", month: "short" })}</h4>
              </section>

              <p>" {comment.content} "</p>
            </article>
          ))}
        </section>

        {/*Forms for Comment*/}
        <section className="max-w-6xl place-self-center">
          <h1>
            <b className="text-2xl md:text-4x1">leave a comment</b>
          </h1>
          <form className="grid grid-cols-1 gap-5 md:grid-cols-2 grid-rows-auto " onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <div className="form-field">
              <label htmlFor="name">Your Name</label>
              <input id="name" type="text" placeholder="Spritney Biers" className={`form-input ${values["Your Name"] ? "is-filled" : ""}`} {...register("name", { required: true })} />
            </div>

            {/* Email */}
            <div className="form-field">
              <label htmlFor="email">Your Email</label>
              <input id="email" type="text" placeholder="mail@gmail.com" className={`form-input ${values["Your Name"] ? "is-filled" : ""}`} {...register("email")} />
            </div>

            {/* Comment */}
            <div className="form-field md:col-span-2">
              <label htmlFor="comment">Your Comment</label>
              <textarea id="comment" className="form-input" {...register("comment", { required: true, maxLength: 250 })} />{" "}
            </div>

            {/* Submit */}
            <input className="form-button" type="submit" value="submit" />
          </form>
          {/* Feedback message */}
          {message && <p className="text-sm mt-4 text-white">{message}</p>}
        </section>
      </main>
    </>
  );
}
