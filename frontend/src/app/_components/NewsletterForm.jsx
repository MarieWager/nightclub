"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

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

  return (
    <section className="bg-black py-12 text-white">
      <div className="mx-auto max-w-4xl px-4 text-center space-y-8">
        {/* Heading */}
        <div>
          <h2 className="text-[24px] tracking-[0.1em] uppercase">
            WANT THE LATEST NIGHT CLUB NEWS
          </h2>
          <h5 className="tracking-[0.3em] mt-1.5">
            Subscribe to our newsletter and never miss an{" "}
            <span className="text-[var(--pink)]">Event</span>
          </h5>
        </div>

        {/* Form */}
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

        {/* Feedback message */}
        {message && (
          <p className="text-sm mt-4 text-white">{message}</p>
        )}
      </div>
    </section>
  );
}
