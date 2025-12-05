"use client";

import React from "react";
import { useForm } from "react-hook-form";

export default function BookingForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);
  const values = watch();

  return (
    <>
      <h1>
        <b>book a table</b>
      </h1>
      <form className="grid grid-cols-1 gap-5 md:grid-cols-2 grid-rows-auto " onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <div className="form-field">
          <label htmlFor="name">Your Name</label>
          <input id="name" type="text" {...register("Your Name", { required: true })} className={`form-input ${values["Your Name"] ? "is-filled" : ""}`} />
        </div>

        {/* Email */}
        <div className="form-field">
          <label htmlFor="email">Your Email</label>
          <input id="email" type="text" className={`form-input ${values["Your Name"] ? "is-filled" : ""}`} {...register("Your Email", { required: true })} />
        </div>

        {/* Table Number */}
        {/* old/boring way:
      
      
      */}

        <div className="form-field">
          <label htmlFor="table">Table Number</label>
          <input id="table" type="number" className={`form-input ${values["Your Name"] ? "is-filled" : ""}`} min={1} max={15} {...register("Table Number", { required: true, max: 15 })} />
          {/*ved at tilføje min/max her vil user ikke kunne vælge højere end 15
            uden vil det kun være efter submit/validering at der React siger der er fejl*/}
        </div>

        {/* Number of Guests */}
        {/* old/boring way:
      
      
      */}

        <div className="form-field">
          <label htmlFor="guests">Number of Guests</label>
          <select id="guests" className={`form-input ${values["Your Name"] ? "is-filled" : ""}`} {...register("Number of Guests", { required: true })}>
            <option value="" disabled selected hidden /*disse tre gør at denne option ikke bliver vist eller kan vælges ved drop-down*/>
              choose
            </option>
            <option value="1">1</option>
            <option value="2"> 2</option>
            <option value="3"> 3</option>
            <option value="4"> 4</option>
            <option value="5"> 5</option>
            <option value="6"> 6</option>
            <option value="7"> 7</option>
            <option value="8"> 8</option>
          </select>
        </div>

        {/* Date */}
        <div className="form-field">
          <label htmlFor="date">Select Date</label>
          <input id="date" type="date" className={`form-input ${values["Your Name"] ? "is-filled" : ""}`} {...register("Select Date", { required: true })} />
        </div>

        {/* Phone */}
        <div className="form-field">
          <label htmlFor="phone">Your Mobile Number</label>
          <input id="phone" type="tel" className={`form-input ${values["Your Name"] ? "is-filled" : ""}`} {...register("Your Mobile Number", { required: true })} />
        </div>

        {/* Comment */}
        <div className="form-field form-comment md:col-span-2">
          <label htmlFor="comment">Your Comment</label>
          <textarea id="comment" className="form-input form-comment !pl-0" {...register("Your Comment", { maxLength: 250 })} />
        </div>

        {/* Submit */}
        <input className="form-button" type="submit" value="reserve" />
      </form>
    </>
  );
}
