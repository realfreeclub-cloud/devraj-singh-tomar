"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // We delay the mounting state to the next tick to avoid cascading render lint issues 
    // and correctly handle hydration mismatches in Next.js Server Components.
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const updatePosition = (e: MouseEvent | TouchEvent) => {
      let clientX, clientY;
      if (e instanceof MouseEvent) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }
      
      setPosition({ x: clientX, y: clientY });
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseOut = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", updatePosition, { passive: true });
    window.addEventListener("touchstart", updatePosition, { passive: true });
    window.addEventListener("touchmove", updatePosition, { passive: true });
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseOut);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("touchstart", updatePosition);
      window.removeEventListener("touchmove", updatePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseOut);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <div className={`${isVisible ? "opacity-100" : "opacity-0"} transition-opacity duration-300 ${isHovering ? "cursor-hover" : ""}`}>
      <div
        className="cursor-dot"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
        }}
      />
      <div
        className="cursor-outline"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
        }}
      />
    </div>
  );
}
