"use client";
import { useState } from "react";
import Banner from "@/app/_components/Banner";
import React from "react";
import { useForm } from "react-hook-form";

export default function Contact() {
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const values = watch();

  const onSubmit = async (data) => {
    const newContactMessage = {
      name: data.name,
      email: data.email,
      content: data.comment,
      date: new Date().toISOString(),
    };

    try {
      const res = await fetch("http://localhost:4000/contact_messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newContactMessage),
      });

      if (!res.ok) throw new Error("Failed to send message");

      setMessage("Your message is send, We will be in touch as soon as possible");

      reset();
    } catch (error) {
      console.log(errors);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Banner title="contact us"></Banner>

      {/*Forms for Comment*/}
      <main className="place-self-center max-w-2xl mt-10">
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className="form-field">
            <label htmlFor="name">Your Name</label>
            <input id="name" type="text" placeholder="Spritney Biers" className={`form-input ${values["Your Name"] ? "is-filled" : ""}`} {...register("name", { required: true })} />
          </div>

          {/* Email */}
          <div className="form-field">
            <label htmlFor="email">Your Email</label>
            <input id="email" type="text" placeholder="mail@gmail.com" className={`form-input ${values["Your Email"] ? "is-filled" : ""}`} {...register("email", { required: true })} />
          </div>

          {/* Comment */}
          <div className="form-field md:col-span-2">
            <label htmlFor="comment" className="place-self-start">
              Your Comment
            </label>
            <textarea id="comment" className="form-input h-50" {...register("comment", { required: true, maxLength: 250 })} />
          </div>

          {/* Submit */}
          <input className="form-button" type="submit" value="send" />
        </form>
        {/* Feedback message */}
        {message && <p className="text-sm mt-4 text-white">{message}</p>}
      </main>
    </>
  );
}
