"use client";
import { useEffect } from "react";

type Props = {
  threshold?: number;
  rootMargin?: string;
};

export default function RevealObserver({ threshold = 0.15, rootMargin = "0px" }: Props) {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return null;
}


