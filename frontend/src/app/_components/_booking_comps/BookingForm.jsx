"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

const TABLES = [
  { id: "1", maxGuests: 4 },
  { id: "2", maxGuests: 4 },
  { id: "3", maxGuests: 6 },
  { id: "4", maxGuests: 4 },
  { id: "5", maxGuests: 8 },
  { id: "6", maxGuests: 4 },
  { id: "7", maxGuests: 4 },
  { id: "8", maxGuests: 6 },
  { id: "9", maxGuests: 4 },
  { id: "10", maxGuests: 8 },
  { id: "11", maxGuests: 4 },
  { id: "12", maxGuests: 4 },
  { id: "13", maxGuests: 6 },
  { id: "14", maxGuests: 4 },
  { id: "15", maxGuests: 8 },
];

export default function BookingForm({ selectedTable, onDateChange }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      table: "",
      guests: 1,
      date: "",
      phone: "",
      comment: "",
    },
  });

  const [reservedTables, setReservedTables] = useState([]);

  const formDate = watch("date");
  const formTable = watch("table");
  const formGuests = Number(watch("guests"));

  const tableMaxGuests = useMemo(() => {
    return TABLES.find((t) => t.id === formTable)?.maxGuests;
  }, [formTable]);

  // If parent selects a table (grid), update dropdown value
  useEffect(() => {
    if (selectedTable) setValue("table", String(selectedTable));
  }, [selectedTable, setValue]);

  // Notify parent when date changes (optional)
  useEffect(() => {
    if (onDateChange) onDateChange(formDate || null);
  }, [formDate, onDateChange]);

  // Fetch reservations for chosen date
  useEffect(() => {
    if (!formDate) {
      setReservedTables([]);
      return;
    }

    async function fetchReservations() {
      const res = await fetch(`http://localhost:4000/reservations?date=${formDate}`);
      const data = await res.json();

      // normalize to strings like "1", "2", ...
      const taken = data.map((r) => String(r.table));
      setReservedTables(taken);
    }

    fetchReservations();
  }, [formDate]);

  const onSubmit = async (data) => {
    // block if too many guests
    const max = TABLES.find((t) => t.id === String(data.table))?.maxGuests;
    if (max && Number(data.guests) > max) {
      alert(`This table allows max ${max} guests.`);
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          table: String(data.table),
          guests: String(data.guests),
          date: data.date, // keep as YYYY-MM-DD (matches your existing reservation)
          phone: data.phone,
          comment: data.comment || "",
        }),
      });

      if (!response.ok) {
        alert("Something went wrong while creating reservation.");
        return;
      }

      alert("Reservation successful!");
      reset();
    } catch (error) {
      console.error(error);
      alert("Server error. Please try again.");
    }
  };

  return (
    <main className="max-w-6xl place-self-center">
      <h1>
        <b className="text-2xl md:text-4xl">book a table</b>
      </h1>

      <form className="grid grid-cols-1 gap-5 md:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <div className="form-field">
          <label htmlFor="name">Your Name</label>
          <input
            id="name"
            required
            type="text"
            placeholder="Britney Spears"
            className="form-input"
            {...register("name", { required: true })}
          />
        </div>

        {/* Email */}
        <div className="form-field">
          <label htmlFor="email">Your Email</label>
          <input
            id="email"
            required
            type="email"
            placeholder="mail@gmail.com"
            className="form-input"
            {...register("email", { required: true })}
          />
        </div>

        {/* Table Number */}
        <div className="form-field">
          <label htmlFor="table">Table Number</label>
          <select
            required
            id="table"
            defaultValue=""
            className="form-input"
            {...register("table", { required: true })}
          >
            <option value="" disabled>
              1 - 15
            </option>
            <option value="0" disabled>
              The table number determines amount of guests
            </option>

            {/* options/tables generated via TABLES and disabled if reserved */}
            {TABLES.map((t) => (
              <option key={t.id} value={t.id} disabled={reservedTables.includes(t.id)}>
                Table {t.id}{" "}
                {reservedTables.includes(t.id)
                  ? "(not available this date)"
                  : `(max ${t.maxGuests} guests)`}
              </option>
            ))}
          </select>

          {tableMaxGuests && formGuests > tableMaxGuests && (
            <b className="text-[0.70rem] font-thin col-span-2">
              This table allows max {tableMaxGuests} guests.
            </b>
          )}
        </div>

        {/* Number of Guests */}
        <div className="form-field">
          <label htmlFor="guests">Number of Guests *</label>
          <input
            required
            id="guests"
            type="number"
            min={1}
            max={8}
            className="form-input"
            {...register("guests", {
              required: true,
              valueAsNumber: true,
              validate: (v) =>
                !tableMaxGuests ||
                v <= tableMaxGuests ||
                `Max ${tableMaxGuests} guests for this table`,
            })}
          />
          {/* validation error from react-hook-form */}
          {errors.guests && (
            <b className="text-[0.70rem] font-thin col-span-2">
              {String(errors.guests.message)}
            </b>
          )}
        </div>

        {/* Date */}
        <div className="form-field">
          <label htmlFor="date">Select Date *</label>
          <input
            required
            id="date"
            type="date"
            className="form-input"
            {...register("date", { required: true })}
          />
        </div>

        {/* Phone */}
        <div className="form-field">
          <label htmlFor="phone">Your Mobile Number</label>
          <input
            id="phone"
            required
            type="tel"
            placeholder="12 34 56 78"
            className="form-input"
            {...register("phone", { required: true })}
          />
        </div>

        {/* Comment */}
        <div className="form-field md:col-span-2">
          <label htmlFor="comment">Your Comment</label>
          <textarea
            id="comment"
            className="form-input"
            {...register("comment", { maxLength: 250 })}
          />
        </div>

        {/* Submit */}
        <input
          className="form-button md:col-span-2"
          type="submit"
          value="reserve"
          disabled={tableMaxGuests && formGuests > tableMaxGuests}
        />
      </form>
    </main>
  );
}
