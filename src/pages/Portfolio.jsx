import React, { useState } from 'react';
import { 
  Camera, 
  Eye, 
  MapPin, 
  Sparkles, 
  Filter, 
  Calendar,
  Layers,
  ChevronRight,
  SlidersHorizontal
} from 'lucide-react';
import { GALLERY_ITEMS } from '../data/siteData';
import Lightbox from '../components/Lightbox';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Portfolio({ setActivePage }) {
  const [activeCategory, setActiveCategory] = useState('All Work');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  // Activate scroll reveals when page or category changes
  useScrollReveal(activeCategory);

  // Exact categories requested in Requirement #9:
  // All Work, Portraits, Couples, Maternity, Newborns, Weddings, Events, Fashion, Products
  const categories = [
    'All Work',
    'Portraits',
    'Couples',
    'Maternity',
    'Newborns',
    'Weddings',
    'Events',
    'Fashion',
    'Products'
  ];

  const filteredItems = activeCategory === 'All Work'
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
    <div className="page-enter" style={{ backgroundColor: 'var(--bg-canvas)' }}>
      {/* 1. Header Banner */}
      <section style={{
        padding: '3.8rem 0 2.6rem',
        backgroundColor: '#17110F',
        color: '#FFFFFF',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1100px' }}>
          <span className="section-badge light">
            Master Portfolio & Gallery
          </span>
          <h1 className="banner-hero-title">
            Visual Anthology & Curated Moments
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#F5EDE8', lineHeight: '1.7', fontWeight: 300, maxWidth: '780px', margin: '0 auto' }}>
            An editorial collection of fine-art portraits, weddings, gentle maternal thresholds, and couture fashion. Click any image to open the full-screen master lightbox with camera metadata.
          </p>
        </div>
      </section>

      {/* 2. Category Filters (Requirement #9) */}
      <section style={{ padding: '2.4rem 0 1rem' }}>
        <div className="container">
          {/* Filter Pills with Horizontal Scroll on Mobile */}
          <div className="showcase-filter-row" style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.65rem',
            marginBottom: '2.2rem'
          }}>
            {categories.map((cat) => {
              const count = cat === 'All Work'
                ? GALLERY_ITEMS.length
                : GALLERY_ITEMS.filter((item) => item.category === cat).length;
              const isActive = activeCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setSelectedPhotoIndex(null);
                  }}
                  className="showcase-pill-button"
                  style={{
                    padding: '0.6rem 1.35rem',
                    borderRadius: 'var(--radius-pill)',
                    border: isActive ? '1.5px solid var(--color-coral-red)' : '1px solid rgba(166, 166, 166, 0.4)',
                    backgroundColor: isActive ? 'var(--color-coral-red)' : '#FFFFFF',
                    color: isActive ? '#FFFFFF' : 'var(--text-title)',
                    fontSize: '0.86rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    boxShadow: isActive ? 'var(--shadow-coral-hover)' : 'var(--shadow-subtle)',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <span>{cat}</span>
                  <span style={{
                    fontSize: '0.72rem',
                    opacity: 0.85,
                    padding: '0.1rem 0.45rem',
                    borderRadius: 'var(--radius-pill)',
                    backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.06)'
                  }}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 3. Asymmetric Editorial Masonry Grid (Requirement #9 & #3) */}
          <div className="portfolio-masonry-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.8rem',
            marginBottom: '3.5rem'
          }}>
            {filteredItems.map((item, idx) => {
              // Varied editorial aspect ratios (vertical portraits 4:5, square 1:1, cinematic landscape 16:10)
              const aspectRatio = idx % 5 === 0 ? '4/5' : idx % 5 === 1 ? '1/1' : idx % 5 === 2 ? '16/10' : idx % 5 === 3 ? '4/5' : '1/1';

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedPhotoIndex(idx)}
                  className="card-anim-cinema reveal-on-scroll clip-reveal-up"
                  data-cursor="view"
                  style={{
                    position: 'relative',
                    aspectRatio: aspectRatio,
                    animationDelay: `${(idx % 6) * 0.1}s`
                  }}
                >
                  {/* Cinematic Background Image with 1.14x fluid scale & light boost */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="cinema-img"
                    style={{
                      objectPosition: 'center 15%'
                    }}
                  />

                  {/* Dark Gradient Ambient Overlay */}
                  <div className="cinema-overlay" />

                  {/* Top Category Badge */}
                  <div 
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      backgroundColor: 'rgba(23, 17, 15, 0.82)',
                      backdropFilter: 'blur(8px)',
                      padding: '0.35rem 0.85rem',
                      borderRadius: 'var(--radius-pill)',
                      fontSize: '0.72rem',
                      color: 'var(--color-blush-pink)',
                      fontWeight: 600,
                      letterSpacing: '0.04em',
                      border: '1px solid rgba(250, 214, 210, 0.25)',
                      zIndex: 3
                    }}
                  >
                    {item.category}
                  </div>

                  {/* Clean Bottom Gradient with Title Only (Leaves Photo Clear & Unobstructed) */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '2rem 1.2rem 1rem',
                    background: 'linear-gradient(to top, rgba(23, 17, 15, 0.88) 0%, rgba(23, 17, 15, 0.4) 60%, transparent 100%)',
                    zIndex: 2,
                    pointerEvents: 'none'
                  }}>
                    <h3 style={{
                      fontSize: '1.15rem',
                      color: '#FFFFFF',
                      margin: 0,
                      fontWeight: 600,
                      textShadow: '0 2px 8px rgba(0,0,0,0.8)'
                    }}>
                      {item.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 4. Retouching Artistry Before/After Slider */}
          <div style={{
            backgroundColor: '#17110F',
            borderRadius: 'var(--radius-xl)',
            padding: '3rem 2rem',
            color: '#FFFFFF',
            textAlign: 'center',
            marginBottom: '3.5rem',
            border: '1px solid rgba(166, 166, 166, 0.25)'
          }}>
            <span className="section-badge light">
              Studio Color Grading
            </span>
            <h2 style={{ fontSize: '2.4rem', color: '#FFF', marginBottom: '0.8rem' }}>
              The Lens & Leaf Signature Edit
            </h2>
            <p style={{ color: '#F5EDE8', maxWidth: '680px', margin: '0 auto 2.2rem', lineHeight: '1.7' }}>
              Drag the interactive slider below to compare raw medium-format camera capture with our hand-graded signature rose-gold finish.
            </p>
            <div style={{ maxWidth: '820px', margin: '0 auto' }}>
              <BeforeAfterSlider />
            </div>
          </div>

          {/* 5. Booking Call to Action */}
          <div style={{
            textAlign: 'center',
            padding: '3rem 2rem',
            borderRadius: 'var(--radius-xl)',
            backgroundColor: 'var(--bg-blush-soft)',
            border: '1px solid rgba(233, 75, 80, 0.25)',
            marginBottom: '2.5rem'
          }}>
            <h3 style={{ fontSize: '2rem', color: 'var(--text-title)', marginBottom: '0.8rem' }}>
              Inspired by Our Portfolio?
            </h3>
            <p style={{ color: 'var(--text-body)', maxWidth: '600px', margin: '0 auto 2rem', lineHeight: '1.7' }}>
              Let’s create your own timeless heirloom collection. Reserve your photoshoot date or request a personalized styling consultation.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setActivePage('booking')}
                className="btn-primary"
              >
                <Calendar size={16} />
                <span>Book Your Photoshoot</span>
              </button>
              <button
                onClick={() => setActivePage('services')}
                className="btn-secondary"
              >
                <span>Explore All Services</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox with Next/Previous and Camera Details */}
      {selectedPhotoIndex !== null && currentItem && (
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
