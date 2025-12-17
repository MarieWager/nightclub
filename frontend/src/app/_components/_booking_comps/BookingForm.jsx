"use client";

import React, { useEffect } from "react"; 
import { useForm } from "react-hook-form";

export default function BookingForm({ selectedTable, bookedTables, onDateChange }) { // ADDED receive props from parent
  const {
    register,
    handleSubmit,
    watch,
    setValue, // ADDEd to update table Number 
    formState: { errors },
  } = useForm();

  // ADDED send data to API
  const onSubmit = async (data) => {
    // ADDED  do not send if table is already booked
    if (bookedTables && bookedTables.includes(Number(data["Table Number"]))) {
      alert("This table is already reserved on that date. Please choose another table.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data["Your Name"],
          email: data["Your Email"],
          table: data["Table Number"],
          guests: data["Number of Guests"],
          date: new Date(data["Select Date"]).toISOString(), // convert <datwe to ISO string
          phone: data["Your Mobile Number"],
          comment: data["Your Comment"] || "",
        }),
      });

      if (!response.ok) {
        //  feedback if table is already booked 
        alert("This table is already reserved on that date, or something went wrong.");
        return;
      }

      const result = await response.json();
      console.log("Reservation created:", result);
      alert("Reservation successful!");
    } catch (error) {
      console.error("Reservation error:", error);
      alert("Server error. Please try again.");
    }
  };

  const values = watch();
  const selectedDate = values["Select Date"]; // ADDED read current date from the form

  // ADDE when user clicks a table in the grid, update the table number in form
  useEffect(() => {
    if (selectedTable) {
      setValue("Table Number", selectedTable);
    }
  }, [selectedTable, setValue]);

  // ADDEd notify parent component when date changes, so it can fetch reservations
  useEffect(() => {
    if (onDateChange) {
      onDateChange(selectedDate || null);
    }
  }, [selectedDate, onDateChange]);

  return (
    <>
      <main className="max-w-6xl place-self-center">
        <h1>
          <b>book a table</b>
        </h1>
        <form
          className="grid grid-cols-1 gap-5 md:grid-cols-2 grid-rows-auto "
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Name */}
          <div className="form-field">
            <label htmlFor="name">Your Name</label>
            <input
              id="name"
              type="text"
              placeholder="Spritney Biers"
              className={`form-input ${values["Your Name"] ? "is-filled" : ""}`}
              {...register("Your Name", { required: true })}
            />
          </div>

          {/* Email */}
          <div className="form-field">
            <label htmlFor="email">Your Email</label>
            <input
              id="email"
              type="text"
              placeholder="mail@gmail.com"
              className={`form-input ${values["Your Name"] ? "is-filled" : ""}`}
              {...register("Your Email", { required: true })}
            />
          </div>

          {/* Table Number */}
          {/* old/boring way:
      
      
      */}

          <div className="form-field">
            <label htmlFor="table">Table Number</label>
            <input
              id="table"
              type="number"
              placeholder="1-15"
              className={`form-input ${values["Your Name"] ? "is-filled" : ""}`}
              min={1}
              max={15}
              {...register("Table Number", { required: true, max: 15 })}
            />
            {/*ved at tilføje min/max her vil user ikke kunne vælge højere end 15
            uden vil det kun være efter submit/validering at der React siger der er fejl*/}
          </div>

          {/* Number of Guests */}
          {/* old/boring way:
      
      
      */}

          <div className="form-field">
            <label htmlFor="guests">Number of Guests</label>
            <select
              id="guests"
              className={`form-input ${values["Your Name"] ? "is-filled" : ""}`}
              {...register("Number of Guests", { required: true })}
            >
              <option
                value=""
                disabled
                hidden /*disse tre gør at denne option ikke bliver vist eller kan vælges ved drop-down*/
              >
                min 1, max 8
              </option>
              <option value="1">1</option> <hr />
              <option value="2"> 2</option> <hr />
              <option value="3"> 3</option> <hr />
              <option value="4"> 4</option> <hr />
              <option value="5"> 5</option> <hr />
              <option value="6"> 6</option> <hr />
              <option value="7"> 7</option> <hr />
              <option value="8"> 8</option>
            </select>
          </div>

          {/* Date */}
          <div className="form-field">
            <label htmlFor="date">Select Date</label>
            <input
              id="date"
              type="date"
              className={`form-input ${values["Your Name"] ? "is-filled" : ""}`}
              {...register("Select Date", { required: true })}
            />
          </div>

          {/* Phone */}
          <div className="form-field">
            <label htmlFor="phone">Your Mobile Number</label>
            <input
              id="phone"
              type="tel"
              placeholder="12 34 56 78"
              className={`form-input ${values["Your Name"] ? "is-filled" : ""}`}
              {...register("Your Mobile Number", { required: true })}
            />
          </div>

          {/* Comment */}
          <div className="form-field form-comment md:col-span-2">
            <label htmlFor="comment">Your Comment</label>
            <textarea
              id="comment"
              className="form-input form-comment pl-0!"
              {...register("Your Comment", { maxLength: 250 })}
            />
          </div>

          {/* Submit */}
          <input className="form-button" type="submit" value="reserve" />
        </form>
      </main>
    </>
  );
}
