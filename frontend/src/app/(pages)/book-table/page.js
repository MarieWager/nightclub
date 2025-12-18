"use client";

import { useState } from "react";
import Banner from "@/app/_components/Banner";
import React from "react";
import BookingForm from "@/app/_components/_booking_comps/BookingForm";
import BookTableSection from "@/app/_components/_booking_comps/BookTableSection";

export default function BookTable() {
  const [message, setMessage] = useState("");

  const handleReservationSubmit = async (data, reset) => {
    setMessage("");

    console.log("Form submit information: ", data);

    {
      /*tjekker api'et ift. reservationer af tables og dates 
      = nye reservationer kan/må ikke have samme værdier for table og date som en api-reservation allerede har */
    }
    const checkRes = await fetch(`http://localhost:4000/reservations?date=${data.date}&table=${data.table}`);
    const existing = await checkRes.json();
    const existingReservations = existing.length > 0;
    {
      /*hvis arrayet for reservationener ikke finder et "match" = ny reservation er mulig
      / hvis der er et "match" kan der ikke laves en ny reservation = alert */
    }
    if (existingReservations) {
      console.log("Reservation conflict with: ", existing);

      setMessage("Unfortunately this table is already reserved for that date." + "Please try another table, or pick a new date.");

      return;
    }

    {
      /*hvad objektet/reservation indeholder, som gemes/sendes til api'et*/
    }
    const newReservation = {
      name: data.name,
      email: data.email,
      table: data.table,
      guests: data.guests,
      date: data.date,
      phone: data.phone,
      content: data.comment,
    };

    console.log(`Reservation for: the ${data.data}, at table ${data.table} with ${data.guests} guests`);

    try {
      const res = await fetch("http://localhost:4000/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReservation),
      });

      if (!res.ok) throw new Error("Failed to send comment");

      reset();

      setMessage("Table reserved successfully!" + "Night Club has received your reservation and looking forward to see you");
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Banner title="book table"></Banner>
      <main className="p-5 md:p-10 lg:p-20">
      
        <BookTableSection />

        <BookingForm onSubmitReservation={handleReservationSubmit} />
        {/* Feedback message */}
        {message && <p className="place-self-center text-sm mt-4 text-white">{message}</p>}
      </main>
    </>
  );
}
