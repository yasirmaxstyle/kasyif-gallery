'use client';

import { useEffect, useState, useRef } from 'react';

export default function Cursor() {
  const [visible, setVisible] = useState(true);
  const cursorRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    let mouseX = 0, mouseY = 0;
    let curX = 0, curY = 0;
    let animFrame;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animateCursor = () => {
      if (cursorRef.current) {
        curX += (mouseX - curX) * 0.15;
        curY += (mouseY - curY) * 0.15;
        cursorRef.current.style.transform = `translate(${curX - 9}px, ${curY - 9}px)`;
      }
      animFrame = requestAnimationFrame(animateCursor);
    };

    const handleKeyDown = (e) => {
      if (e.key === 'c' || e.key === 'C') {
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
        setVisible(v => !v);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('keydown', handleKeyDown);
    animFrame = requestAnimationFrame(animateCursor);

    // Mutation observer to attach hover events to dynamic elements
    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, .art-card, .feat-card, .article-card, .filter-btn, [tabindex="0"]');
      if (target && cursorRef.current) {
        cursorRef.current.classList.add('expand');
      }
    };
    
    const handleMouseOut = (e) => {
      const target = e.target.closest('a, button, .art-card, .feat-card, .article-card, .filter-btn, [tabindex="0"]');
      if (target && cursorRef.current) {
        cursorRef.current.classList.remove('expand');
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={cursorRef}
      className="cursor"
      id="cursor"
      aria-hidden="true"
      style={{ opacity: visible ? 1 : 0 }}
    />
  );
}
