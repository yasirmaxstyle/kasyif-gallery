'use client';

import { useEffect, useRef } from 'react';

export default function Modal({ isOpen, onClose, data }) {
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // focus trap can be added here
      setTimeout(() => closeBtnRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !data) return null;

  return (
    <>
      <div 
        className="artwork-modal open" 
        role="dialog" 
        aria-modal="true" 
        ref={modalRef}
      >
        <button 
          className="modal-close" 
          aria-label="Close detail" 
          onClick={onClose}
          ref={closeBtnRef}
        >
          ✕
        </button>
        <div className="modal-inner">
          <div className="modal-image-col">
            <div className="modal-img-wrap">
              <div 
                className="modal-img" 
                role="img" 
                aria-label={data.title}
                style={{ background: data.img ? '' : (data.bg || '#ccc') }}
              >
                {data.img ? (
                  <img src={data.img} alt={data.title} />
                ) : (
                  <img src="/placeholder.svg" alt="Placeholder" style={{ width: '4rem', height: '4rem', opacity: 0.5 }} />
                )}
              </div>
            </div>
          </div>
          <div className="modal-info-col">
            <span className="eyebrow">{data.category}</span>
            <h2 className="modal-title">{data.title}</h2>
            <div className="modal-divider" aria-hidden="true"></div>
            <div className="modal-artist">
              <div className="artist-avatar" aria-hidden="true">
                {(data.artist || data.author || 'S')[0].toUpperCase()}
              </div>
              <div>
                <p className="artist-name">{data.artist || data.author}</p>
                <p className="artist-class">{data.class || data.readTime}</p>
              </div>
            </div>
            <p className="modal-desc">{data.desc || data.content}</p>
            <div className="modal-tags">
              {(data.tags || '').split(',').filter(Boolean).map((t, i) => (
                <span key={i} className="modal-tag">{t.trim()}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop open" aria-hidden="true" onClick={onClose}></div>
    </>
  );
}
