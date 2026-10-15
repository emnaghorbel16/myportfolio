"use client";
import Link from "next/link";
import { useState } from "react";

export function SiteNav({ name, cv }: { name: string; cv?: string | null }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="figma-nav">
      <div className="site-container figma-nav-inner">
        <Link href="/" className="brand-glyph" onClick={() => setOpen(false)}>
          EG
        </Link>

        <nav className={`nav-links-list ${open ? "mobile-open" : ""}`}>
          <Link href="/" className="nav-item-link" onClick={() => setOpen(false)}>
            Accueil
          </Link>
          <Link href="/#formation" className="nav-item-link" onClick={() => setOpen(false)}>
            Formation
          </Link>
          <Link href="/#experience" className="nav-item-link" onClick={() => setOpen(false)}>
            Expérience
          </Link>
          <Link href="/projects" className="nav-item-link" onClick={() => setOpen(false)}>
            Projets
          </Link>
          <Link href="/#skills" className="nav-item-link" onClick={() => setOpen(false)}>
            Stack
          </Link>
          <Link href="/#contact" className="nav-item-link" onClick={() => setOpen(false)}>
            Contact
          </Link>
        </nav>

        <div className="nav-right-actions">
          {/* Bouton 3 tirets (Menu Hamburger) */}
          <button
            type="button"
            className="nav-hamburger-btn"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu de navigation"}
            aria-expanded={open}
            title="Menu de navigation"
          >
            <div className={`hamburger-lines ${open ? "is-open" : ""}`} aria-hidden="true">
              <span className="hamburger-line" />
              <span className="hamburger-line" />
              <span className="hamburger-line" />
            </div>
            <span className="hamburger-label">{open ? "Fermer" : "Menu"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
