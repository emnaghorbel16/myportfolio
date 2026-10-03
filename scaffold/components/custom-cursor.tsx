"use client";
import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [cursorType, setCursorType] = useState("default");
  const pos = useRef({ x: -100, y: -100 });
  const raf = useRef<number>(0);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const updateDOM = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      raf.current = requestAnimationFrame(updateDOM);
    };

    raf.current = requestAnimationFrame(updateDOM);
    window.addEventListener("mousemove", move);

    const onEnter = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("[data-cursor='view']")) { setLabel("VIEW"); setCursorType("view"); }
      else if (t.closest("a, button")) setCursorType("link");
      else if (t.closest("img")) setCursorType("image");
      else { setCursorType("default"); setLabel(""); }
    };

    const onLeave = () => { setCursorType("default"); setLabel(""); };

    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className={`eg-cursor eg-cursor--${cursorType}`} aria-hidden>
        {label && <span className="eg-cursor__label">{label}</span>}
      </div>
      <div ref={dotRef} className="eg-cursor__dot" aria-hidden />
    </>
  );
}
