import React, { useState } from 'react';
import { Camera, Eye, MapPin, Sparkles, Filter } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/siteData';
import Lightbox from '../components/Lightbox';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  const categories = ['All', 'Weddings', 'Portraits', 'Maternity', 'Editorial', 'Fine Art & Nature'];

  const filteredItems = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const currentItem = selectedPhotoIndex !== null ? filteredItems[selectedPhotoIndex] : null;

  const handlePrev = () => {
    setSelectedPhotoIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
  };

  const handleNext = () => {
    setSelectedPhotoIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-canvas)' }}>
      {/* Header Banner */}
      <section style={{
        padding: '5rem 0 3.5rem',
        backgroundColor: '#150F11',
        color: '#FFFFFF',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '820px' }}>
          <span className="section-badge gold">
            The Visual Anthology
          </span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#FFF', marginBottom: '1rem' }}>
            Fine-Art Gallery & Curated Archives
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#DDD0D5', lineHeight: '1.7', fontWeight: 300 }}>
            Inspect our camera work across medium-format systems, natural solarium light, and bespoke architectural settings. Click any image to view camera metadata and fine details.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section style={{ padding: '3rem 0 1rem' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.75rem',
            marginBottom: '3rem'
          }}>
            {categories.map((cat) => {
              const count = cat === 'All'
                ? GALLERY_ITEMS.length
                : GALLERY_ITEMS.filter((item) => item.category === cat).length;
              const isActive = activeCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '0.65rem 1.4rem',
                    borderRadius: 'var(--radius-pill)',
                    border: isActive ? '1px solid var(--rose-primary)' : '1px solid rgba(197, 160, 89, 0.3)',
                    backgroundColor: isActive ? 'var(--rose-primary)' : '#FFFFFF',
                    color: isActive ? '#FFFFFF' : 'var(--text-title)',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    boxShadow: isActive ? 'var(--shadow-rose-hover)' : 'var(--shadow-subtle)',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <span>{cat}</span>
                  <span style={{
                    fontSize: '0.75rem',
                    opacity: 0.8,
                    padding: '0.1rem 0.45rem',
                    borderRadius: 'var(--radius-pill)',
                    backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.06)'
                  }}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Photo Gallery Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '2rem',
            marginBottom: '6rem'
          }}>
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setSelectedPhotoIndex(idx)}
                style={{
                  position: 'relative',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  aspectRatio: idx % 3 === 0 ? '4/5' : '1/1',
                  boxShadow: 'var(--shadow-card)',
                  border: '1px solid rgba(197, 160, 89, 0.25)'
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />

                {/* Aesthetic Hover Overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(18, 13, 14, 0.1) 0%, rgba(18, 13, 14, 0.9) 100%)',
                  opacity: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '1.8rem',
                  color: '#FFFFFF',
                  transition: 'opacity 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                >
                  <div style={{
                    position: 'absolute',
                    top: '1.2rem',
                    right: '1.2rem',
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(6px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFF'
                  }}>
                    <Eye size={18} />
                  </div>

                  <span style={{ fontSize: '0.72rem', color: 'var(--gold-sheen)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                    {item.category}
                  </span>
                  <h3 style={{ fontSize: '1.35rem', color: '#FFF', margin: '0.2rem 0 0.4rem' }}>
                    {item.title}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: '#CCC' }}>
                    <Camera size={13} color="var(--rose-light)" />
                    <span>{item.camera} • {item.settings}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && (
        <Lightbox
          item={currentItem}
          onClose={() => setSelectedPhotoIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
}
