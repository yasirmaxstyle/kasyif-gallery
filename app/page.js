import Link from 'next/link';
import { getCMSData } from '../lib/data';

export const metadata = {
  title: 'Kasyif Gallery — Home',
};

async function getQuote() {
  try {
    const res = await fetch('https://api.quotable.io/random?tags=art|creativity|inspirational&maxLength=160', {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    if (!res.ok) throw new Error('Failed to fetch quote');
    return res.json();
  } catch (error) {
    return {
      content: "Art is not what you see, but what you make others see.",
      author: "Edgar Degas"
    };
  }
}

export default async function Home() {
  const quote = await getQuote();
  const { artworks } = getCMSData();
  const featured = artworks.slice(0, 3); // take first 3 for featured

  return (
    <main>
      {/* HERO */}
      <section className="hero" aria-label="Exhibition introduction">
        <div className="hero-eyebrow reveal">MA Al Kasyif — 2026</div>
        <h1 className="hero-title reveal">
          <em>Where</em> student<br />
          creativity<br />
          finds its voice.
        </h1>
        <p className="hero-sub reveal">Rifqi digital exhibition celebrating the imagination, craft, and artistic vision of our students.</p>
        <div className="hero-actions reveal">
          <Link href="/artworks" className="btn btn-primary">Explore the Gallery</Link>
          <Link href="/articles" className="btn btn-ghost">Read Articles</Link>
        </div>
        <div className="hero-rule reveal" aria-hidden="true"></div>
      </section>

      {/* QUOTE / MANIFESTO */}
      <section className="manifesto reveal" aria-label="Exhibition quote">
        <blockquote>
          <p>&quot;Art is not what you see, but what you make others see.&quot;</p>
          <cite>— Edgar Degas</cite>
        </blockquote>
      </section>

      {/* FEATURED WORKS */}
      <section className="featured" aria-labelledby="featured-heading">
        <div className="section-header">
          <h2 id="featured-heading" className="section-title reveal">Featured Works</h2>
          <Link href="/artworks" className="section-link reveal">View all →</Link>
        </div>
        <div className="featured-grid">
          {featured.map((art) => (
            <Link href="/artworks" key={art.id} className="feat-card reveal" tabIndex="0" aria-label={`${art.title} by ${art.artist}`}>
              <div className="feat-img-wrap">
                <div className="feat-img" style={{ background: art.img ? '' : (art.bg || '#c9b99a') }} role="img" aria-label={`${art.title} artwork placeholder`}>
                  {art.img ? (
                    <img src={art.img} alt={art.title} />
                  ) : (
                    <img src="/placeholder.svg" alt="Placeholder" style={{ width: '4rem', height: '4rem', opacity: 0.5 }} />
                  )}
                </div>
                <div className="feat-overlay" aria-hidden="true">
                  <span>View →</span>
                </div>
              </div>
              <div className="feat-meta">
                <h3>{art.title}</h3>
                <p>{art.artist}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ABOUT EXHIBITION */}
      <section className="about-section" aria-labelledby="about-heading">
        <div className="about-inner">
          <div className="about-text reveal">
            <span className="eyebrow">About the Exhibition</span>
            <h2 id="about-heading">Creativity<br /><em>in simplicity.</em></h2>
            <p>This exhibition was built to give every student&apos;s artwork the elegant platform it deserves — a clean, digital gallery that puts the art first and the artist in the spotlight.</p>
            <p>From digital design to traditional painting and photography, this collection reflects the breadth of talent within MA Al Kasyif.</p>
            <Link href="/artworks" className="btn btn-primary" style={{ marginTop: '2rem' }}>Enter Gallery</Link>
          </div>
          <div className="about-decoration reveal" aria-hidden="true">
            <div className="deco-square"></div>
            <div className="deco-circle"></div>
            <div className="deco-line"></div>
          </div>
        </div>
      </section>

      {/* DAILY QUOTE API (SERVER SIDE FETCH) */}
      <section className="quote-api reveal visible" aria-labelledby="quote-heading">
        <span className="eyebrow" id="quote-heading">Daily Inspiration</span>
        <div className="quote-card" aria-live="polite" aria-label="Daily inspirational quote">
          <blockquote className="quote-text">&quot;{quote.content}&quot;</blockquote>
          <cite className="quote-author">— {quote.author}</cite>
        </div>
      </section>
    </main>
  );
}
