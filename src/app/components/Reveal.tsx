"use client";
import { useEffect, useRef } from "react";

type RevealProps = {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children: React.ReactNode;
};

export default function Reveal({ as = "div", className = "", children }: RevealProps) {
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.classList.add("reveal");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    }, { threshold: 0.15 });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const Tag = as as any;
  return (
    <Tag ref={elementRef as any} className={className}>
      {children}
    </Tag>
  );
}


