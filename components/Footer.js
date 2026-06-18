import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="logo-mark">✦</span>
          <span>Kasyif Gallery</span>
        </div>
        <p className="footer-copy">© 2026 Student Art Exhibition — MA Al Kasyif</p>
        <nav className="footer-nav" aria-label="Footer navigation">
          <Link href="/">Home</Link>
          <Link href="/artworks">Artworks</Link>
          <Link href="/articles">Articles</Link>
        </nav>
      </div>
    </footer>
  );
}
