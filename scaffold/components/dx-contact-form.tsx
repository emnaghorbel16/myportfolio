"use client";
import { useState } from "react";
import { supabase } from "@/lib/data";

export function DXContactForm() {
  const [status, setStatus] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = new FormData(e.currentTarget);
    if (!supabase) { setStatus("setup"); return; }
    const { error } = await supabase.from("contact_messages").insert({
      name:    form.get("name"),
      email:   form.get("email"),
      subject: "Contact via Portfolio",
      message: form.get("message"),
    });
    setStatus(error ? "error" : "sent");
    if (!error) (e.target as HTMLFormElement).reset();
  }

  return (
    <form className="dx-form" onSubmit={submit}>
      <input name="name"    type="text"  placeholder="Your Name"    required />
      <input name="email"   type="email" placeholder="Your Email"   required />
      <textarea name="message" placeholder="Tell me about your project..." required />
      <button
        type="submit"
        className="dx-form__btn"
        disabled={status === "sending" || status === "sent"}
      >
        {status === "sent"    ? "✓ Message Sent!"
         : status === "sending" ? "Sending…"
         : "Send Message →"}
      </button>
      {status === "error" && <p className="dx-form__status-err">Something went wrong. Please try again.</p>}
      {status === "setup" && <p className="dx-form__status-err">Supabase not connected.</p>}
      {status === "sent"  && <p className="dx-form__status-ok">Your message was sent successfully!</p>}
    </form>
  );
}
