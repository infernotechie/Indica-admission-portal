// src/components/CustomCursor.js
import React, { useEffect, useRef } from "react";
import "./CustomCursor.css";

export default function CustomCursor({
  hoverSelectors = "a, button, .MuiButton-root, .clickable"
}) {
  const cursorRef = useRef(null);
  const rafRef = useRef(null);
  const targetRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    // don't mount on touch devices (mobile) or when hover not available
    if (typeof window === "undefined") return;
    if (window.matchMedia && window.matchMedia("(hover: none)").matches) return;

    const cursor = cursorRef.current;
    let isHidden = false;

    const render = () => {
      if (!cursor) return;
      cursor.style.left = `${targetRef.current.x}px`;
      cursor.style.top = `${targetRef.current.y}px`;
      rafRef.current = null;
    };

    const onMove = (e) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
      if (!rafRef.current) rafRef.current = requestAnimationFrame(render);

      // hide cursor when over text inputs/selects/contenteditable
      const tag = e.target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || e.target?.isContentEditable) {
        if (!isHidden) { cursor.classList.add("cursor-glow--hidden"); isHidden = true; }
      } else {
        if (isHidden) { cursor.classList.remove("cursor-glow--hidden"); isHidden = false; }
      }
    };

    window.addEventListener("mousemove", onMove);

    // hover interactions for buttons/links
    const elems = document.querySelectorAll(hoverSelectors);
    const onEnter = () => cursor.classList.add("cursor-glow--hover");
    const onLeave = () => cursor.classList.remove("cursor-glow--hover");
    elems.forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    // keyboard focus: hide cursor when focusing inputs (accessibility)
    const onFocusIn = (e) => {
      const tag = e.target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || e.target?.isContentEditable) {
        cursor.classList.add("cursor-glow--hidden");
      }
    };
    const onFocusOut = () => cursor.classList.remove("cursor-glow--hidden");
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      elems.forEach(el => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [hoverSelectors]);

  return <div ref={cursorRef} className="cursor-glow" aria-hidden="true" />;
}
