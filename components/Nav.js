'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const [theme, setTheme] = useState('light');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Initialize theme
    const saved = localStorage.getItem('kasyif-theme');
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = saved || preferred;
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);

    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleKeydown = (e) => {
      if (e.key === 'Escape' && menuOpen) closeMenu();
    };
    document.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [menuOpen]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('kasyif-theme', newTheme);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  };

  const toggleMenu = () => {
    const newState = !menuOpen;
    setMenuOpen(newState);
    document.body.style.overflow = newState ? 'hidden' : '';
  };

  const isActive = (path) => pathname === path;

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`} id="nav" role="navigation" aria-label="Main navigation">
        <Link href="/" className="nav-logo" aria-label="Kasyif Gallery home" onClick={closeMenu}>
          <span className="logo-mark">✦</span> Kasyif Gallery
        </Link>
        <ul className="nav-links" role="list">
          <li><Link href="/" className={`nav-link ${isActive('/') ? 'active' : ''}`} aria-current={isActive('/') ? 'page' : undefined}>Home</Link></li>
          <li><Link href="/artworks" className={`nav-link ${isActive('/artworks') ? 'active' : ''}`} aria-current={isActive('/artworks') ? 'page' : undefined}>Artworks</Link></li>
          <li><Link href="/articles" className={`nav-link ${isActive('/articles') ? 'active' : ''}`} aria-current={isActive('/articles') ? 'page' : undefined}>Articles</Link></li>
        </ul>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode">
          <span className="toggle-icon" aria-hidden="true">◐</span>
        </button>
        <button className="nav-hamburger" aria-label="Open menu" aria-expanded={menuOpen} onClick={toggleMenu} style={{ display: 'flex' /* overridden by css mostly, but we let css handle it via media queries */ }}>
          <span></span><span></span>
        </button>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} role="dialog" aria-label="Mobile navigation" aria-hidden={!menuOpen}>
        <ul role="list">
          <li><Link href="/" className="nav-link" onClick={closeMenu}>Home</Link></li>
          <li><Link href="/artworks" className="nav-link" onClick={closeMenu}>Artworks</Link></li>
          <li><Link href="/articles" className="nav-link" onClick={closeMenu}>Articles</Link></li>
        </ul>
      </div>
    </>
  );
}
