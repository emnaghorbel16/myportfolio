"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export function PremiumNav({ name }: { name?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Magnetic effect on CTA
  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;
    const onMove = (e: MouseEvent) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    };
    const onLeave = () => { btn.style.transform = ""; };
    btn.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);
    return () => { btn.removeEventListener("mousemove", onMove); btn.removeEventListener("mouseleave", onLeave); };
  }, []);

  return (
    <nav className={`eg-nav${scrolled ? " eg-nav--scrolled" : ""}`}>
      <div className="eg-nav__inner">
        <Link href="/" className="eg-nav__brand">
          <span className="eg-nav__logo">EG</span>
        </Link>
        <button className="eg-nav__hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
        <div className={`eg-nav__links${menuOpen ? " open" : ""}`}>
          {["About", "Work", "Skills", "Experience", "Contact"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="eg-nav__link" onClick={() => setMenuOpen(false)}>
              {item}
            </a>
          ))}
        </div>
        <Link href="#contact" ref={btnRef} className="eg-nav__cta">
          Let's Talk
        </Link>
      </div>
    </nav>
  );
}
