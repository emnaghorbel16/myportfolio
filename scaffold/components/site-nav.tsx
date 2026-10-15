"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, FileText } from "lucide-react";

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
          <Link href="/#skills" className="nav-item-link" onClick={() => setOpen(false)}>
            Stack
          </Link>
          <Link href="/projects" className="nav-item-link" onClick={() => setOpen(false)}>
            Projets
          </Link>
          <Link href="/#contact" className="nav-item-link" onClick={() => setOpen(false)}>
            Contact
          </Link>

          <a
            href={cv || "/cv.pdf"}
            target="_blank"
            rel="noreferrer"
            className="btn-primary-purple mobile-nav-cv-btn"
            onClick={() => setOpen(false)}
          >
            <FileText size={16} />
            <span>Consulter mon CV (PDF)</span>
          </a>
        </nav>

        <div className="nav-right-actions">
          <a
            href={cv || "/cv.pdf"}
            target="_blank"
            rel="noreferrer"
            className="btn-primary-purple desktop-cv-btn"
            style={{ padding: "0.45rem 1rem", fontSize: "0.82rem", textDecoration: "none" }}
          >
            CV <ArrowUpRight size={14} />
          </a>

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

