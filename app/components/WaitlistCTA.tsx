"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";

export default function WaitlistCTA() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim()) setJoined(true);
  };

  return (
    <section className="cta-band" id="waitlist">
      <div className="wrap">
        <h2>Be first through the next door.</h2>
        <p>Join the waitlist and we&apos;ll let you know the moment there&apos;s more to try.</p>
        {!joined ? (
          <form className="cta-form" onSubmit={handleSubmit}>
            <input
              type="email"
              required
              placeholder="you@email.com"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />
            <button type="submit" className="btn" style={{ background: "#fff", color: "#5B21B6" }}>
              Join Waitlist
            </button>
          </form>
        ) : (
          <p className="joined-msg">You&apos;re on the list &mdash; thanks for joining us early.</p>
        )}
      </div>
    </section>
  );
}
