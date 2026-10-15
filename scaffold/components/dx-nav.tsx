"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export function DXNav({ name }: { name?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Magnetic CTA
  useEffect(() => {
    const btn = ctaRef.current;
    if (!btn) return;
    const m = (e: MouseEvent) => {
      const r = btn.getBoundingClientRect();
      btn.style.transform = `translate(${(e.clientX - r.left - r.width/2) * 0.22}px, ${(e.clientY - r.top - r.height/2) * 0.22}px)`;
    };
    const l = () => { btn.style.transform = ""; };
    btn.addEventListener("mousemove", m);
    btn.addEventListener("mouseleave", l);
    return () => { btn.removeEventListener("mousemove", m); btn.removeEventListener("mouseleave", l); };
  }, []);

  return (
    <nav className={`dx-nav${scrolled ? " scrolled" : ""}`}>
      <div className="dx-nav__inner">
        <Link href="/" className="dx-nav__logo">
          EG<span>.</span>
        </Link>

        <button className="dx-nav__hamburger" onClick={() => setOpen(!open)} aria-label="Menu">
          <span /><span /><span />
        </button>

        <div className={`dx-nav__links${open ? " open" : ""}`}>
          {["About", "Services", "Work", "Experience", "Contact"].map(n => (
            <a key={n} href={`#${n.toLowerCase()}`} className="dx-nav__link" onClick={() => setOpen(false)}>{n}</a>
          ))}
        </div>

        <Link href="#contact" ref={ctaRef} className="dx-nav__cta">Hire Me</Link>
      </div>
    </nav>
  );
}
