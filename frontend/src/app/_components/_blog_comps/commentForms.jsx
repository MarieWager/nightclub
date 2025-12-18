"use client";

import React from "react";
import { useForm } from "react-hook-form";

export default function CommentForm({ onSubmitComment }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const values = watch();

  const onSubmit = (data) => {
    onSubmitComment(data, reset);
    console.log(data);
  };

  const onInvalid = (errors) => {
    alert("Please fill the required fields correctly.");
  };
  console.log(errors);

  return (
    <>
      {/*Forms for Comment*/}
      <main className="place-self-center">
        <h1>
          <b className="text-2xl md:text-4x1">leave a comment</b>
        </h1>
        <form className="grid grid-cols-1 gap-5 md:grid-cols-2 grid-rows-auto " onSubmit={handleSubmit(onSubmit, onInvalid)}>
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
            <label htmlFor="comment">Your Comment</label>
            <textarea id="comment" className="form-input" {...register("comment", { required: true, maxLength: 250 })} />
          </div>

          {/* Submit */}
          <input className="form-button" type="submit" value="submit" />
        </form>
      </main>
    </>
  );
}
