"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import BookingForm from "./BookingForm.jsx";

export default function BookTableSection() {
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookedTables, setBookedTables] = useState([]);

  // show 8 tables on mobile, then user can see rest
  const [showAllTables, setShowAllTables] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768); // md breakpoint
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const TABLE_MAP = {
    1: "/table/table_1.png",
    2: "/table/table_1.png",
    3: "/table/table_2.png",
    4: "/table/table_1.png",
    5: "/table/table_3.png",

    6: "/table/table_1.png",
    7: "/table/table_1.png",
    8: "/table/table_2.png",
    9: "/table/table_1.png",

    10: "/table/table_3.png",

    11: "/table/table_1.png",
    12: "/table/table_1.png",
    13: "/table/table_2.png",
    14: "/table/table_1.png",

    15: "/table/table_3.png",
  };

  // fetch reservations when the date changes and find which tables are taken
  useEffect(() => {
    if (!selectedDate) {
      setBookedTables([]);
      return;
    }

    async function fetchReservations() {
      try {
        const res = await fetch("http://localhost:4000/reservations", {
          cache: "no-store",
        });

        if (!res.ok) {
          console.error("Could not fetch reservations");
          return;
        }

        const data = await res.json();

        // check only reservations that match the selected date
        const reservedForDate = data.filter((reservation) =>
          reservation.date.startsWith(selectedDate)
        );

        // table numbers
        const reservedTables = reservedForDate.map((reservation) =>
          Number(reservation.table)
        );

        setBookedTables(reservedTables);
      } catch (error) {
        console.error("Error fetching reservations", error);
      }
    }

    fetchReservations();
  }, [selectedDate]);

  // if the selected table becomes booked after choosing a new date, remove it
  useEffect(() => {
    if (selectedTable && bookedTables.includes(selectedTable)) {
      setSelectedTable(null);
    }
  }, [bookedTables, selectedTable]);

  // limit visible tables on mobile
  const allTables = Array.from({ length: 15 }, (_, i) => i + 1);
  const visibleTables =
    !isMobile ? allTables : showAllTables ? allTables : allTables.slice(0, 8);

  return (
    <section className="space-y-10 max-w-6xl mx-auto">
      {/* responsive grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 md:gap-10">
        {visibleTables.map((tableNo) => {
          const imgSrc = TABLE_MAP[tableNo];
          const isBooked = bookedTables.includes(tableNo); // check if table is taken on this date

          return (
            <button
              key={tableNo}
              type="button"
              onClick={() => {
                if (!isBooked) setSelectedTable(tableNo); // only allow selecting free tables
              }}
              disabled={isBooked}
              className={`relative aspect-square flex items-center justify-center
                rounded-xl overflow-hidden transition 
                ${selectedTable === tableNo ? "ring-2 ring-[var(--pink)]" : ""}
                ${isBooked ? "opacity-40 cursor-not-allowed" : ""}`}
            >
              <Image
                src={imgSrc}
                alt={`Table ${tableNo}`}
                fill
                className="object-contain"
              />

              <span
                className="absolute inset-0 flex items-center justify-center
                text-white font-bold text-xl bg-black/50"
              >
                {tableNo}
              </span>
            </button>
          );
        })}
      </div>

      {/* show all tables button for mobile */}
      {!showAllTables && (
        <div className="flex justify-center md:hidden">
          <button
            type="button"
            onClick={() => setShowAllTables(true)}
            className="form-button w-full max-w-xs"
          >
            Show all tables
          </button>
        </div>
      )}

      <BookingForm
        selectedTable={selectedTable}
        bookedTables={bookedTables}
        onDateChange={setSelectedDate} // form sends the chosen date back up here
      />
    </section>
  );
}
