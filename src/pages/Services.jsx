import React, { useState } from 'react';
import { 
  Camera, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  Calendar, 
  Sparkles, 
  X, 
  ChevronRight, 
  Eye, 
  Info
} from 'lucide-react';
import { SERVICES_DATA, STUDIO_INFO } from '../data/siteData';
import useScrollReveal from '../hooks/useScrollReveal';
import InteractiveCard from '../components/InteractiveCard';

export default function Services({ setActivePage, onSelectService }) {
  const [selectedServiceDetail, setSelectedServiceDetail] = useState(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');

  // Activate scroll reveals on filter change
  useScrollReveal(activeCategoryFilter);

  const filterTabs = [
    'All',
    'Portraits & People',
    'Weddings & Couples',
    'Maternity & Family',
    'Commercial & Editorial'
  ];

  const filteredServices = SERVICES_DATA.filter((svc) => {
    if (activeCategoryFilter === 'All') return true;
    if (activeCategoryFilter === 'Portraits & People') {
      return ['portrait', 'creative-studio'].includes(svc.id);
    }
    if (activeCategoryFilter === 'Weddings & Couples') {
      return ['couple', 'pre-wedding', 'wedding', 'birthday-occasion'].includes(svc.id);
    }
    if (activeCategoryFilter === 'Maternity & Family') {
      return ['maternity', 'newborn-baby', 'family'].includes(svc.id);
    }
    if (activeCategoryFilter === 'Commercial & Editorial') {
      return ['fashion-model', 'product'].includes(svc.id);
    }
    return true;
  });

  const handleBookService = (serviceTitle) => {
    if (onSelectService) {
      onSelectService(serviceTitle);
    }
    setSelectedServiceDetail(null);
    setActivePage('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="page-enter" style={{ backgroundColor: 'var(--bg-canvas)' }}>
      {/* Header Banner */}
      <section style={{
        padding: '5.5rem 0 3.5rem',
        backgroundColor: '#17110F',
        color: '#FFFFFF',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1100px' }}>
          <span className="section-badge light">
            Artisan Disciplines
          </span>
          <h1 className="banner-hero-title">
            Artisan Photography Services
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#F5EDE8', lineHeight: '1.7', fontWeight: 300, maxWidth: '780px', margin: '0 auto' }}>
            Dedicated photography crafted with precision optics, flattering lighting, and authentic artistic empathy. Explore our specialized disciplines below.
          </p>
        </div>
      </section>

      {/* Category Filter Pills */}
      <section style={{ padding: '2.5rem 0 1rem' }}>
        <div className="container">
          <div className="showcase-filter-row" style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.65rem',
            marginBottom: '3rem'
          }}>
            {filterTabs.map((tab) => {
              const isActive = activeCategoryFilter === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveCategoryFilter(tab)}
                  className="showcase-pill-button"
                  style={{
                    padding: '0.55rem 1.3rem',
                    borderRadius: 'var(--radius-pill)',
                    border: isActive ? '1.5px solid var(--color-coral-red)' : '1px solid rgba(166, 166, 166, 0.4)',
                    backgroundColor: isActive ? 'var(--color-coral-red)' : '#FFFFFF',
                    color: isActive ? '#FFFFFF' : 'var(--text-title)',
                    fontSize: '0.86rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.25s ease'
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* All 12 Services Grid (Requirement #8) */}
          <div className="services-preview-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '2.5rem',
            marginBottom: '6rem'
          }}>
            {filteredServices.map((svc, index) => {
              return (
                <InteractiveCard
                  key={svc.id}
                  animationType="cinema"
                  className={`reveal-on-scroll reveal-delay-${(index % 3) + 1}`}
                  style={{
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  {/* Service Cover Photograph */}
                  <div 
                    className="service-card-cover-wrapper img-zoom-container"
                    data-cursor="view"
                    onClick={() => setSelectedServiceDetail(svc)}
                    style={{
                      cursor: 'pointer'
                    }}
                  >
                  <img
                    src={svc.cover}
                    alt={svc.title}
                    style={{
                      objectPosition: svc.id === 'portrait' ? 'center 18%' : 'center 15%'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    backgroundColor: 'rgba(23, 17, 15, 0.85)',
                    backdropFilter: 'blur(8px)',
                    padding: '0.35rem 0.9rem',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.72rem',
                    color: 'var(--color-blush-pink)',
                    fontWeight: 600
                  }}>
                    {svc.badge}
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem',
                    backgroundColor: 'rgba(23, 17, 15, 0.85)',
                    padding: '0.3rem 0.75rem',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.72rem',
                    color: '#FFF',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}>
                    <Clock size={12} color="var(--color-warm-orange)" />
                    <span>{svc.duration}</span>
                  </div>
                </div>

                {/* Service Content */}
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h2 style={{
                    fontSize: '1.5rem',
                    color: 'var(--text-title)',
                    marginBottom: '0.5rem',
                    lineHeight: 1.25
                  }}>
                    {svc.title}
                  </h2>
                  <p style={{
                    fontStyle: 'italic',
                    color: 'var(--color-warm-orange)',
                    fontSize: '0.88rem',
                    marginBottom: '0.9rem'
                  }}>
                    "{svc.tagline}"
                  </p>
                  <p style={{
                    color: 'var(--text-body)',
                    fontSize: '0.92rem',
                    lineHeight: '1.65',
                    marginBottom: '1.6rem',
                    flex: 1
                  }}>
                    {svc.shortDesc}
                  </p>

                  {/* Highlights */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    marginBottom: '1.6rem'
                  }}>
                    {svc.inclusions.slice(0, 2).map((inc, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                        <CheckCircle size={14} color="var(--color-coral-red)" style={{ flexShrink: 0 }} />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing and Action Links */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '1.2rem',
                    borderTop: '1px solid rgba(166, 166, 166, 0.25)',
                    gap: '0.8rem',
                    flexWrap: 'wrap'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-light)' }}>Starting from</div>
                      <div style={{ fontSize: '1.35rem', fontFamily: 'var(--font-serif)', color: 'var(--color-coral-red)', fontWeight: 600 }}>
                        ${svc.startingPrice}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.6rem' }}>
                      <button
                        onClick={() => setSelectedServiceDetail(svc)}
                        style={{
                          background: 'rgba(233, 75, 80, 0.08)',
                          border: '1px solid rgba(233, 75, 80, 0.3)',
                          borderRadius: 'var(--radius-pill)',
                          padding: '0.55rem 1rem',
                          color: 'var(--color-coral-red)',
                          fontSize: '0.82rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem'
                        }}
                      >
                        <Info size={14} />
                        <span>Explore</span>
                      </button>

                      <button
                        onClick={() => handleBookService(svc.title)}
                        className="btn-primary"
                        style={{ padding: '0.55rem 1.1rem', fontSize: '0.82rem' }}
                      >
                        <Calendar size={14} />
                        <span>Book</span>
                      </button>
                    </div>
                  </div>
                </div>
              </InteractiveCard>
            );
          })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          DEDICATED SERVICE DETAIL MODAL (Requirement #8)
          Contains: description, sample photographs, session info, and booking option!
          ===================================================================== */}
      {selectedServiceDetail && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(23, 17, 15, 0.85)',
          backdropFilter: 'blur(12px)',
          zIndex: 3000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          animation: 'fadeIn 0.2s ease'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            maxWidth: '820px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative',
            boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
            border: '1px solid rgba(166, 166, 166, 0.3)'
          }}>
            {/* Close Button */}
            <button
              onClick={() => setSelectedServiceDetail(null)}
              aria-label="Close detail modal"
              style={{
                position: 'absolute',
                top: '1.2rem',
                right: '1.2rem',
                zIndex: 10,
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'rgba(23, 17, 15, 0.7)',
                color: '#FFF',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>

            {/* Header Hero Image */}
            <div style={{ height: '320px', position: 'relative' }}>
              <img
                src={selectedServiceDetail.cover}
                alt={selectedServiceDetail.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(23, 17, 15, 0.2) 0%, rgba(23, 17, 15, 0.85) 100%)'
              }} />
              <div style={{
                position: 'absolute',
                bottom: '1.8rem',
                left: '2rem',
                right: '2rem',
                color: '#FFFFFF'
              }}>
                <span className="section-badge light" style={{ marginBottom: '0.4rem' }}>
                  {selectedServiceDetail.badge}
                </span>
                <h2 style={{ fontSize: '2.4rem', color: '#FFF', marginBottom: '0.3rem' }}>
                  {selectedServiceDetail.title}
                </h2>
                <p style={{ color: 'var(--color-blush-pink)', fontStyle: 'italic', fontSize: '1rem' }}>
                  "{selectedServiceDetail.tagline}"
                </p>
              </div>
            </div>

            {/* Body Content */}
            <div style={{ padding: '2.5rem' }}>
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-title)', marginBottom: '0.8rem' }}>
                  Session Overview
                </h3>
                <p style={{ color: 'var(--text-body)', lineHeight: '1.8', fontSize: '1rem' }}>
                  {selectedServiceDetail.fullDesc}
                </p>
              </div>

              {/* Sample Photographs Carousel / Grid */}
              <div style={{ marginBottom: '2.2rem' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-title)', marginBottom: '0.9rem' }}>
                  Sample Photographs
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '1rem'
                }}>
                  {selectedServiceDetail.gallery.map((imgUrl, gIdx) => (
                    <div key={gIdx} style={{ height: '160px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid rgba(166, 166, 166, 0.3)' }}>
                      <img src={imgUrl} alt={`${selectedServiceDetail.title} sample ${gIdx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Session Information & Inclusions */}
              <div style={{
                backgroundColor: 'var(--bg-canvas)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.8rem',
                marginBottom: '2.5rem',
                border: '1px solid rgba(166, 166, 166, 0.3)'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1.5rem',
                  marginBottom: '1.5rem',
                  paddingBottom: '1.5rem',
                  borderBottom: '1px solid rgba(166, 166, 166, 0.25)'
                }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', textTransform: 'uppercase' }}>Session Duration</span>
                    <div style={{ fontWeight: 600, color: 'var(--text-title)', fontSize: '1.05rem' }}>{selectedServiceDetail.duration}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', textTransform: 'uppercase' }}>Turnaround Time</span>
                    <div style={{ fontWeight: 600, color: 'var(--text-title)', fontSize: '1.05rem' }}>{selectedServiceDetail.turnaround}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', textTransform: 'uppercase' }}>Investment</span>
                    <div style={{ fontWeight: 600, color: 'var(--color-coral-red)', fontSize: '1.25rem', fontFamily: 'var(--font-serif)' }}>
                      Starting at ${selectedServiceDetail.startingPrice}
                    </div>
                  </div>
                </div>

                <h4 style={{ fontSize: '0.92rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-title)', marginBottom: '0.8rem' }}>
                  What's Included:
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.6rem' }}>
                  {selectedServiceDetail.inclusions.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.92rem', color: 'var(--text-body)' }}>
                      <CheckCircle size={16} color="var(--color-coral-red)" style={{ flexShrink: 0 }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setSelectedServiceDetail(null)}
                  className="btn-secondary"
                  style={{ padding: '0.85rem 1.8rem' }}
                >
                  Close View
                </button>
                <button
                  onClick={() => handleBookService(selectedServiceDetail.title)}
                  className="btn-primary"
                  style={{ padding: '0.85rem 2.2rem' }}
                >
                  <Calendar size={16} />
                  <span>Book This Session Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
