'use client';

import { useState } from 'react';
import Modal from './Modal';

export default function ArticleGallery({ articles }) {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const featured = articles[0]; // Assuming first is featured
  const gridArticles = articles.slice(1);

  const openModal = (article, e) => {
    // Only open if clicking a valid trigger, not a real link inside
    const trigger = e.target.closest(
      '.article-read-more, .article-card-img, .article-feat-img, .article-featured .btn-primary'
    );
    if (!trigger) return;
    
    const href = trigger.getAttribute('href');
    if (href && href !== '#') return;

    e.preventDefault();
    setSelectedArticle(article);
  };

  return (
    <>
      {featured && (
        <section 
          className="article-featured reveal"
          aria-labelledby="feat-article-title"
          onClick={(e) => openModal(featured, e)}
        >
          <div className="article-featured-inner">
            <div className="article-feat-img" style={{ background: featured.bg || '#ccc' }} role="img" aria-label="Featured article illustration">
              {featured.img ? (
                <img src={featured.img} alt={featured.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <img src="/placeholder.svg" alt="Placeholder" style={{ width: '4rem', height: '4rem', opacity: 0.5 }} />
              )}
            </div>
            <div className="article-feat-text">
              <span className="eyebrow">Featured</span>
              <h2 id="feat-article-title">{featured.title}</h2>
              <p className="article-meta">Oleh <strong>{featured.author}</strong> · {featured.readTime}</p>
              <p className="article-excerpt">{featured.content.substring(0, 150)}...</p>
              <button className="btn btn-primary" aria-label={featured.title}>
                Read Article →
              </button>
            </div>
          </div>
        </section>
      )}

      <section className="articles-grid" aria-label="All articles">
        {gridArticles.map((article) => (
          <article 
            key={article.id}
            className="article-card reveal"
            onClick={(e) => openModal(article, e)}
          >
            <div className="article-card-img" style={{ background: article.bg || '#ccc' }} role="img" aria-label="Article illustration">
              {article.img ? (
                <img src={article.img} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <img src="/placeholder.svg" alt="Placeholder" style={{ width: '4rem', height: '4rem', opacity: 0.5 }} />
              )}
            </div>
            <div className="article-card-body">
              <span className="art-category">{article.category}</span>
              <h3>{article.title}</h3>
              <p className="article-meta">{article.author} · {article.readTime}</p>
              <p>{article.content.substring(0, 150)}...</p>
              <button className="article-read-more" aria-label={`Read ${article.title}`}>
                Baca selengkapnya →
              </button>
            </div>
          </article>
        ))}
      </section>

      <Modal 
        isOpen={!!selectedArticle} 
        onClose={() => setSelectedArticle(null)} 
        data={selectedArticle} 
      />
    </>
  );
}
