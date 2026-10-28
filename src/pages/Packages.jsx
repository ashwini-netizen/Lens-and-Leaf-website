import React, { useState, useEffect } from 'react';
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
  Info,
  Check,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { SERVICES_DATA, STUDIO_INFO } from '../data/siteData';
import useScrollReveal from '../hooks/useScrollReveal';
import InteractiveCard from '../components/InteractiveCard';

export default function Packages({ setActivePage, onSelectService, onSelectPackage }) {
  const [selectedServiceDetail, setSelectedServiceDetail] = useState(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');
  
  // Customizer / Tiers state
  const [packages, setPackages] = useState([
    {
      id: 'essence',
      name: 'The Essence Collection',
      tier: 'Essential Tier',
      tagline: 'Refined, purposeful portraiture crafted for personal milestones.',
      price: 650,
      duration: '60 Minutes',
      deliverables: '15 High-Resolution',
      inclusions: [
        '1 hour in Solarium daylight set or classic canvas',
        'Up to 2 wardrobe ensembles with steam styling',
        '15 master-retouched editorial digital negatives',
        'Online private password-protected proof gallery',
        'Personal printing and sharing rights'
      ]
    },
    {
      id: 'heritage',
      name: 'The Heritage Collection',
      tier: 'Signature Tier',
      tagline: 'Our signature editorial experience with bespoke lighting and albums.',
      price: 1350,
      popular: true,
      duration: '120 Minutes',
      deliverables: '35 Master-Retouched',
      inclusions: [
        '2 hours across 2 studio sets (Solarium + Cyclorama)',
        'Up to 4 wardrobe ensembles with on-set stylist assist',
        '35 master-retouched archival digital negatives',
        '10x10 custom-bound heirloom linen photo album',
        'Two 8x10 museum-grade cotton rag fine-art prints',
        'Complimentary artisan botanical tea tasting'
      ]
    },
    {
      id: 'sovereign',
      name: 'The Sovereign Heirloom',
      tier: 'Masterpiece Tier',
      tagline: 'An all-inclusive full-day creative commission with bespoke production.',
      price: 2450,
      duration: 'Half-Day (4 Hours)',
      deliverables: '60 Master-Retouched',
      inclusions: [
        'Half-day dedicated private studio reservation',
        'Full set of studio backdrops + outdoor garden session',
        '60 master-retouched archival high-resolution files',
        '12x12 Italian leather-bound bespoke monograph album',
        'One 20x30 museum acrylic wall art statement piece',
        'Priority 48-hour color grading turnaround'
      ]
    }
  ]);

  const [addOns, setAddOns] = useState([
    { id: 'album-10', name: '10x10 Fine-Art Linen Album (20 pages)', price: 380 },
    { id: 'rush-turnaround', name: '48-Hour Priority Retouching Turnaround', price: 200 },
    { id: 'wall-art-acrylic', name: '20x30 Museum Grade Acrylic Wall Art', price: 450 },
    { id: 'raw-files', name: 'Full Session Unretouched Raw Archive Access', price: 250 },
    { id: 'extra-hour', name: 'Additional Studio Shooting Hour (with 10 edits)', price: 220 }
  ]);

  const [selectedPackageId, setSelectedPackageId] = useState('heritage');
  const [activeAddOns, setActiveAddOns] = useState([]);

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

  const toggleAddOn = (addOnId) => {
    if (activeAddOns.includes(addOnId)) {
      setActiveAddOns(activeAddOns.filter((id) => id !== addOnId));
    } else {
      setActiveAddOns([...activeAddOns, addOnId]);
    }
  };

  const currentPkg = packages.find((p) => p.id === selectedPackageId) || packages[1];
  const pkgPrice = currentPkg ? currentPkg.price : 1350;
  const addOnsTotal = activeAddOns.reduce((sum, id) => {
    const item = addOns.find((a) => a.id === id);
    return sum + (item ? item.price : 0);
  }, 0);
  const estimatedInvestment = pkgPrice + addOnsTotal;

  return (
    <div className="page-enter" style={{ backgroundColor: 'var(--bg-canvas)' }}>
      {/* 1. Header Banner */}
      <section style={{
        padding: '5.5rem 0 3.5rem',
        backgroundColor: '#17110F',
        color: '#FFFFFF',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1150px' }}>
          <span className="section-badge light">
            Transparent Investment
          </span>
          <h1 
            className="packages-heading-nowrap"
            style={{ 
              fontSize: 'clamp(1.75rem, 3.8vw, 3.25rem)', 
              color: '#FFF', 
              marginBottom: '1rem' 
            }}
          >
            Photoshoot Packages & Collections
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#F5EDE8', lineHeight: '1.7', fontWeight: 300, maxWidth: '820px', margin: '0 auto' }}>
            Every commissioned collection is transparent and all-inclusive with master color grading, private digital galleries, and personal printing rights. Choose your preferred discipline package below.
          </p>
        </div>
      </section>

      {/* 2. Category Filter Pills */}
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

          {/* 3. All 12 Photography Service Packages (The Cards shown in 2nd image) */}
          <div className="services-preview-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '2.5rem',
            marginBottom: '5.5rem'
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
                      marginTop: 'auto'
                    }}>
                      <div>
                        <div style={{ fontSize: '0.76rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Starting from</div>
                        <div style={{ fontSize: '1.35rem', fontFamily: 'var(--font-serif)', fontWeight: 600, color: 'var(--color-coral-red)' }}>
                          ${svc.startingPrice}
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '0.6rem' }}>
                        <button
                          onClick={() => setSelectedServiceDetail(svc)}
                          className="btn-secondary btn-magnetic"
                          style={{
                            padding: '0.45rem 0.9rem',
                            fontSize: '0.82rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem'
                          }}
                        >
                          <Info size={14} />
                          <span>Explore</span>
                        </button>

                        <button
                          onClick={() => handleBookService(svc.title)}
                          className="btn-primary btn-magnetic"
                          style={{
                            padding: '0.45rem 1.05rem',
                            fontSize: '0.82rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem'
                          }}
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

          {/* 4. Heirloom Tiers & Custom Add-On Calculator */}
          <div style={{
            backgroundColor: '#17110F',
            borderRadius: 'var(--radius-xl)',
            padding: '3.5rem 2.5rem',
            color: '#FFFFFF',
            marginBottom: '4.5rem',
            border: '1px solid rgba(233, 75, 80, 0.25)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
          }}>
            <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.8rem' }}>
              <span className="section-badge gold">
                Heirloom Collections
              </span>
              <h2 style={{ fontSize: '2.4rem', color: '#FFFFFF', marginBottom: '0.8rem' }}>
                Artisan Tier Packages & Bespoke Add-Ons
              </h2>
              <p style={{ color: '#F5EDE8', fontSize: '1rem', lineHeight: '1.7' }}>
                Looking for a multi-hour private production? Select a signature heirloom tier and configure bespoke additions to estimate your customized investment.
              </p>
            </div>

            {/* Tiers Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
              marginBottom: '3.5rem'
            }}>
              {packages.map((pkg) => {
                const isSelected = selectedPackageId === pkg.id;
                return (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPackageId(pkg.id)}
                    style={{
                      backgroundColor: isSelected ? 'rgba(32, 23, 21, 0.95)' : 'rgba(23, 17, 15, 0.75)',
                      borderRadius: '16px',
                      padding: '2.2rem 1.8rem',
                      border: isSelected ? '2px solid var(--color-coral-red)' : '1px solid rgba(166, 166, 166, 0.25)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      boxShadow: isSelected ? '0 12px 35px rgba(233, 75, 80, 0.25)' : 'none',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {pkg.popular && (
                      <div style={{
                        position: 'absolute',
                        top: '-12px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: 'var(--color-coral-red)',
                        color: '#FFF',
                        padding: '0.25rem 1rem',
                        borderRadius: 'var(--radius-pill)',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase'
                      }}>
                        Most Celebrated
                      </div>
                    )}
                    <span style={{ fontSize: '0.78rem', color: 'var(--color-warm-orange)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                      {pkg.tier}
                    </span>
                    <h3 style={{ fontSize: '1.45rem', color: '#FFF', marginBottom: '0.5rem' }}>
                      {pkg.name}
                    </h3>
                    <div style={{ fontSize: '2.2rem', fontFamily: 'var(--font-serif)', color: 'var(--color-blush-pink)', fontWeight: 600, marginBottom: '1.2rem' }}>
                      ${pkg.price}
                    </div>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1.5rem', flex: 1 }}>
                      {pkg.inclusions.map((inc, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.84rem', color: '#E0D4D0' }}>
                          <Check size={14} color="var(--color-coral-red)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                    <div style={{
                      padding: '0.6rem 0',
                      textAlign: 'center',
                      borderRadius: 'var(--radius-pill)',
                      backgroundColor: isSelected ? 'var(--color-coral-red)' : 'rgba(255,255,255,0.08)',
                      color: '#FFF',
                      fontSize: '0.82rem',
                      fontWeight: 600
                    }}>
                      {isSelected ? 'Selected Tier' : 'Select Tier'}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add-ons list */}
            <div style={{
              borderTop: '1px solid rgba(255,255,255,0.1)',
              paddingTop: '2.5rem'
            }}>
              <h4 style={{ fontSize: '1.25rem', color: '#FFF', marginBottom: '1.2rem', textAlign: 'center' }}>
                Optional Bespoke Add-Ons
              </h4>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1rem',
                marginBottom: '2.5rem'
              }}>
                {addOns.map((addon) => {
                  const isSelected = activeAddOns.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddOn(addon.id)}
                      style={{
                        padding: '1rem 1.2rem',
                        borderRadius: '12px',
                        border: isSelected ? '1.5px solid var(--color-coral-red)' : '1px solid rgba(255,255,255,0.15)',
                        backgroundColor: isSelected ? 'rgba(233, 75, 80, 0.15)' : 'rgba(255,255,255,0.03)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <div style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '4px',
                          border: isSelected ? '1px solid var(--color-coral-red)' : '1px solid #777',
                          backgroundColor: isSelected ? 'var(--color-coral-red)' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#FFF'
                        }}>
                          {isSelected && <Check size={12} />}
                        </div>
                        <span style={{ fontSize: '0.86rem', color: '#FFF', fontWeight: 500 }}>
                          {addon.name}
                        </span>
                      </div>
                      <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-warm-orange)' }}>
                        +${addon.price}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Investment Summary */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1.5rem',
                backgroundColor: 'rgba(255,255,255,0.04)',
                borderRadius: '14px',
                padding: '1.4rem 1.8rem',
                border: '1px solid rgba(255,255,255,0.08)'
              }}>
                <div>
                  <div style={{ fontSize: '0.84rem', color: '#BBB' }}>
                    Estimated Custom Investment ({currentPkg?.name} + {activeAddOns.length} Add-on{activeAddOns.length !== 1 ? 's' : ''}):
                  </div>
                  <div style={{ fontSize: '2.2rem', fontFamily: 'var(--font-serif)', color: 'var(--color-blush-pink)', fontWeight: 600 }}>
                    ${estimatedInvestment}
                  </div>
                </div>

                <button
                  onClick={() => handleBookService(`${currentPkg?.name} (Customized)`)}
                  className="btn-primary"
                  style={{ padding: '0.85rem 2rem', fontSize: '0.92rem' }}
                >
                  <Calendar size={16} />
                  <span>Proceed to Booking with this Configuration</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Detail Modal Lightbox when Explore is clicked */}
      {selectedServiceDetail && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(23, 17, 15, 0.88)',
          backdropFilter: 'blur(12px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            maxWidth: '750px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '2.5rem',
            position: 'relative',
            boxShadow: 'var(--shadow-hover)'
          }}>
            <button
              onClick={() => setSelectedServiceDetail(null)}
              style={{
                position: 'absolute',
                top: '1.2rem',
                right: '1.2rem',
                background: 'rgba(0,0,0,0.05)',
                border: 'none',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-title)'
              }}
            >
              <X size={18} />
            </button>

            <div style={{ fontSize: '0.78rem', color: 'var(--color-coral-red)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.3rem', letterSpacing: '0.08em' }}>
              {selectedServiceDetail.badge}
            </div>
            <h2 style={{ fontSize: '2rem', color: 'var(--text-title)', marginBottom: '0.4rem' }}>
              {selectedServiceDetail.title}
            </h2>
            <p style={{ fontStyle: 'italic', color: 'var(--color-warm-orange)', fontSize: '0.95rem', marginBottom: '1.4rem' }}>
              "{selectedServiceDetail.tagline}"
            </p>

            <p style={{ color: 'var(--text-body)', lineHeight: '1.7', fontSize: '0.98rem', marginBottom: '1.8rem' }}>
              {selectedServiceDetail.fullDesc}
            </p>

            <div style={{ marginBottom: '1.8rem' }}>
              <h4 style={{ fontSize: '1.05rem', color: 'var(--text-title)', marginBottom: '0.8rem' }}>
                Included in this Collection:
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.6rem' }}>
                {selectedServiceDetail.inclusions.map((inc, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontSize: '0.9rem', color: 'var(--text-body)' }}>
                    <CheckCircle size={16} color="var(--color-coral-red)" style={{ flexShrink: 0 }} />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(166, 166, 166, 0.25)',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Estimated Investment</div>
                <div style={{ fontSize: '1.6rem', fontFamily: 'var(--font-serif)', color: 'var(--color-coral-red)', fontWeight: 600 }}>
                  ${selectedServiceDetail.startingPrice}
                </div>
              </div>

              <button
                onClick={() => handleBookService(selectedServiceDetail.title)}
                className="btn-primary"
                style={{ padding: '0.75rem 1.8rem' }}
              >
                <Calendar size={16} />
                <span>Book This Photoshoot</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
