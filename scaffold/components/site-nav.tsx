"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

export function SiteNav({ name, cv }: { name: string; cv?: string | null }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="figma-nav">
      <div className="site-container figma-nav-inner">
        <Link href="/" className="brand-glyph">
          EG
        </Link>
        <nav className={`nav-links-list ${open ? "mobile-open" : ""}`}>
          <Link href="/" className="nav-link-item" onClick={() => setOpen(false)}>
            Accueil
          </Link>
          <Link href="/#education" className="nav-link-item" onClick={() => setOpen(false)}>
            Formation
          </Link>
          <Link href="/#experience" className="nav-link-item" onClick={() => setOpen(false)}>
            Expérience
          </Link>
          <Link href="/#skills" className="nav-link-item" onClick={() => setOpen(false)}>
            Stack
          </Link>
          <Link href="/projects" className="nav-link-item" onClick={() => setOpen(false)}>
            Projets
          </Link>
          <Link href="/#contact" className="nav-link-item" onClick={() => setOpen(false)}>
            Contact
          </Link>
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <a
            href={cv || "/cv.pdf"}
            target="_blank"
            rel="noreferrer"
            className="btn-primary-purple"
            style={{ padding: "0.45rem 1rem", fontSize: "0.8rem", textDecoration: "none" }}
          >
            CV / Résumé <ArrowUpRight size={14} />
          </a>
          <button
            className="nav-hamburger-mobile"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}

