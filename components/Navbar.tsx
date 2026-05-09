"use client";
import { useEffect, useState } from "react";

const LINKS = [
  { label: "Product", href: "#problem" },
  { label: "Demo", href: "#demo" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Who it's for", href: "#who" },
  { label: "Contact", href: "#contact" },
];

const SERIF = "var(--font-cormorant), Georgia, serif";
const MONO = "var(--font-dm-mono), 'Courier New', monospace";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.88);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1.35rem 3.5rem",
        backgroundColor: scrolled ? "#0A1628" : "transparent",
        borderBottom: scrolled
          ? "1px solid rgba(242,247,255,0.07)"
          : "1px solid transparent",
        transition:
          "background-color 0.38s ease, border-color 0.38s ease",
      }}
    >
      {/* Wordmark */}
      <a
        href="#hero"
        style={{
          fontFamily: SERIF,
          fontSize: "1.05rem",
          fontWeight: 400,
          letterSpacing: "0.08em",
          color: "#F2F7FF",
          textDecoration: "none",
          opacity: 0.9,
        }}
      >
        Glassbox
      </a>

      {/* Nav links */}
      <ul
        style={{
          display: "flex",
          gap: "2.25rem",
          listStyle: "none",
        }}
        className="nav-links"
      >
        {LINKS.map(({ label, href }) => (
          <li key={href}>
            <a
              href={href}
              style={{
                fontFamily: MONO,
                fontSize: "0.66rem",
                letterSpacing: "0.1em",
                color: "rgba(242,247,255,0.55)",
                textDecoration: "none",
                cursor: "pointer",
              }}
              className="nav-link"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
