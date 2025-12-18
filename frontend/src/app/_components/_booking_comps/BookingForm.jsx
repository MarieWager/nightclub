"use client";

import { useEffect, useState } from "react";
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

export default function BookingForm({ onSubmitReservation }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const values = watch();

  const selectedTable = watch("table");
  const selectedGuests = watch("guests");
  const tableMaxGuests = TABLES.find((table) => table.id === selectedTable)?.maxGuests;

  console.log("Selected table:", selectedTable);
  console.log("Guests:", selectedGuests);
  console.log("Max allowed:", tableMaxGuests);
  console.log("Errors:", errors);

  const onSubmit = (data) => {
    if (tableMaxGuests && data.guests > tableMaxGuests) {
      console.log("guests and table error", {
        table: data.table,
        guests: data.guests,
        max: tableMaxGuests,
      });
    }

    onSubmitReservation(data, reset);
  };

  const [reservedTables, setReservedTables] = useState([]);
  const selectedDate = watch("date");

  useEffect(() => {
    if (!selectedDate) return;

    async function fetchReservations() {
      const res = await fetch(`http://localhost:4000/reservations?date=${selectedDate}`);
      const data = await res.json();
      console.log("Reservations for selected date: ", data);

      const takenTables = data.map((reserved) => reserved.table);
      console.log("Reserved tables: ", takenTables);
      setReservedTables(takenTables);
    }

    fetchReservations();
  }, [selectedDate]);

  return (
    <>
      <main className="max-w-6xl place-self-center">
        <h1>
          <b className="text-2xl md:text-4x1">book a table</b>
        </h1>

        <form className="grid grid-cols-1 gap-5 md:grid-cols-2 grid-rows-auto" onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className="form-field">
            <label htmlFor="name">Your Name *</label>
            <input required id="name" type="text" placeholder="Spritney Biers" className={`form-input ${values["Your Name"] ? "is-filled" : ""}`} {...register("name", { required: true })} />
          </div>

          {/* Email */}
          <div className="form-field">
            <label htmlFor="email">Your Email *</label>
            <input required id="email" type="text" placeholder="mail@gmail.com" className={`form-input ${values["Your Email"] ? "is-filled" : ""}`} {...register("email", { required: true })} />
          </div>

          {/* Table Number */}
          <div className="form-field">
            <label htmlFor="table">Table Number *</label>
            <select required id="table" defaultValue={""} className={`form-input ${values["Your Table"] ? "is-filled" : ""}`} {...register("table", { required: true })}>
              <option value="" disabled /*gør at denne option er usynlig og kan ikke vælges ved drop-down*/>
                1 - 15
              </option>
              <option value="0" disabled /*gør at denne option kan ikke vælges ved drop-down*/>
                The table number determines amount of guests
              </option>
              {/*options/tables genereres via TABLES(=array af nr/id + max guests) 
                & hvis table/date reserveret = option disabled */}
              {TABLES.map((table) => (
                <option key={table.id} value={table.id} disabled={reservedTables.includes(table.id)}>
                  {/*option har normalt "max antal", men hvis table=reserved sættes not available ind */}
                  Table {table.id} {reservedTables.includes(table.id) ? "(not available this date)" : `(max ${table.maxGuests} guests)`}
                </option>
              ))}
            </select>
            {tableMaxGuests && selectedGuests > tableMaxGuests && <b className="text-[FF2A70] text-[0.70rem] font-thin col-span-2">This table allows max {tableMaxGuests} guests.</b>}
          </div>

          {/* Number of Guests */}
          <div className="form-field">
            <label htmlFor="guests">Number of Guests *</label>
            <input required id="guests" type="number" placeholder="min 1, max 8" className={`form-input ${values["Your Guests"] ? "is-filled" : ""}`} min={1} max={8} {...register("guests", { required: true, validate: (value) => !tableMaxGuests || value <= tableMaxGuests || `Max ${tableMaxGuests} guests for this table` })} />
            {/*ved at tilføje min/max her vil user ikke kunne vælge højere end 15
            uden vil det kun være efter submit/validering at der React siger der er fejl*/}
            {tableMaxGuests && selectedGuests > tableMaxGuests && <b className="text-[FF2A70] text-[0.70rem] font-thin col-span-2">The table can not seat above {tableMaxGuests} guests.</b>}
          </div>

          {/* Date */}
          <div className="form-field">
            <label htmlFor="date">Select Date *</label>
            <input required id="date" type="date" className={`form-input ${values["Your Date"] ? "is-filled" : ""}`} {...register("date", { required: true })} />
            {reservedTables.length > 0 && <b className="text-[FF2A70] text-[0.70rem] font-thin col-span-2">These tables are already reserved: {reservedTables.join(", ")}</b>}
          </div>

          {/* Phone */}
          <div className="form-field">
            <label htmlFor="phone">Your Mobile Number *</label>
            <input required id="phone" type="tel" placeholder="12 34 56 78" className={`form-input ${values["Your Mobile Number"] ? "is-filled" : ""}`} {...register("phone", { required: true })} />
          </div>

          {/* Comment */}
          <div className="form-field form-comment md:col-span-2">
            <label htmlFor="comment">Your Comment</label>
            <textarea id="comment" className="form-input form-comment pl-0!" {...register("content", { maxLength: 250 })} />
          </div>

          {/* Submit */}
          <input className="form-button" type="submit" value="reserve" disabled={tableMaxGuests && selectedGuests > tableMaxGuests} />
        </form>
      </main>
    </>
  );
}
