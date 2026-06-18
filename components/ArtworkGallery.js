'use client';

import { useState } from 'react';
import Modal from './Modal';

export default function ArtworkGallery({ artworks }) {
  const [filter, setFilter] = useState('all');
  const [selectedArt, setSelectedArt] = useState(null);

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'batik art', label: 'Batik Art' },
    { id: 'Pencil art', label: 'Pencil Art' },
    { id: 'design art', label: 'Design Art' },
    { id: 'abstract art', label: 'Abstract Art' }
  ];

  const filteredArtworks = filter === 'all' 
    ? artworks 
    : artworks.filter(art => art.category === filter);

  return (
    <>
      <div className="filter-bar reveal" role="group" aria-label="Filter artworks by category">
        {filters.map(f => (
          <button 
            key={f.id}
            className={`filter-btn ${filter === f.id ? 'active' : ''}`}
            data-filter={f.id}
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <section className="gallery-grid" id="galleryGrid" aria-label="Artwork gallery">
        {filteredArtworks.map((art) => (
          <article 
            key={art.id}
            className="art-card reveal"
            tabIndex="0"
            role="button"
            aria-label={`Open ${art.title} by ${art.artist}`}
            onClick={() => setSelectedArt(art)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedArt(art);
              }
            }}
          >
            <div className="art-img" style={{ background: art.img ? '' : (art.bg || '#ccc') }} role="img" aria-label={art.title}>
              {art.img ? (
                <img src={art.img} alt={art.title} />
              ) : (
                <img src="/placeholder.svg" alt="Placeholder" style={{ width: '4rem', height: '4rem', opacity: 0.5 }} />
              )}
            </div>
            <div className="art-label">
              <span className="art-category">{art.category}</span>
              <h3>{art.title}</h3>
              <p>{art.artist}</p>
            </div>
          </article>
        ))}
      </section>

      <span id="filterLive" className="sr-only" aria-live="polite" aria-atomic="true">
        Showing {filteredArtworks.length} artwork{filteredArtworks.length !== 1 ? 's' : ''}
      </span>

      <Modal 
        isOpen={!!selectedArt} 
        onClose={() => setSelectedArt(null)} 
        data={selectedArt} 
      />
    </>
  );
}
