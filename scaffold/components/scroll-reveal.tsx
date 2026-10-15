"use client";
import { useEffect } from "react";

export function ScrollReveal() {
  useEffect(() => {
    // ── Intersection Observer for scroll reveals ──
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.add("visible");
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px 80px 0px" }
    );

    const revealEls = document.querySelectorAll<HTMLElement>(".reveal");
    revealEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add("visible");
      } else {
        observer.observe(el);
      }
    });

    // ── Mouse parallax on hero card ──
    const heroCard = document.querySelector<HTMLElement>(".eg-hero__card");
    const floatTags = document.querySelectorAll<HTMLElement>(".eg-float-tag");

    let frameId: number;
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    const onMouseMove = (e: MouseEvent) => {
      if (!heroCard) return;
      const r = heroCard.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      targetX = (e.clientX - cx) / window.innerWidth;
      targetY = (e.clientY - cy) / window.innerHeight;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      currentX = lerp(currentX, targetX, 0.06);
      currentY = lerp(currentY, targetY, 0.06);

      if (heroCard) {
        heroCard.style.transform = `perspective(900px) rotateY(${currentX * 6}deg) rotateX(${-currentY * 4}deg)`;
      }
      floatTags.forEach((tag, i) => {
        const factor = 0.6 + i * 0.2;
        tag.style.transform = `translate(${currentX * 14 * factor}px, ${currentY * 10 * factor}px)`;
      });

      frameId = requestAnimationFrame(animate);
    };

    // Only enable parallax on non-touch devices
    if (!window.matchMedia("(pointer: coarse)").matches) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
      frameId = requestAnimationFrame(animate);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return null;
}
