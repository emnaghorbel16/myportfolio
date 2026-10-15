"use client";
import { useState } from "react";
import { supabase } from "@/lib/data";

export function NewContactForm() {
  const [status, setStatus] = useState("");
  
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = new FormData(e.currentTarget);
    
    if (!supabase) { 
      setStatus("setup"); 
      return; 
    }
    
    const { error } = await supabase.from("contact_messages").insert({
      name: form.get("name"),
      email: form.get("email"),
      subject: "Contact via Portfolio", 
      message: form.get("message")
    });
    
    setStatus(error ? "error" : "sent");
    if (!error) e.currentTarget.reset();
  }

  return (
    <form className="new-contact-form" onSubmit={submit}>
      <input type="text" name="name" placeholder="Your Name" required />
      <input type="email" name="email" placeholder="Your Email" required />
      <textarea name="message" placeholder="Tell me about your project..." required></textarea>
      <button type="submit" className="eg-btn" disabled={status === "sending" || status === "sent"}>
        {status === "sent" ? "✓ Message Sent!" : status === "sending" ? "Sending…" : "Send Message →"}
      </button>
      
      {status === "setup" && <p style={{ color: "red", marginTop: "10px" }}>Veuillez connecter Supabase pour recevoir des messages.</p>}
      {status === "error" && <p style={{ color: "red", marginTop: "10px" }}>Une erreur est survenue. Veuillez réessayer.</p>}
    </form>
  );
}
