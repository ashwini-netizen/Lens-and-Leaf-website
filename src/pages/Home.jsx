import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  Camera, 
  Heart, 
  CheckCircle, 
  ChevronRight,
  ChevronLeft,
  Eye,
  SlidersHorizontal,
  Quote,
  Star
} from 'lucide-react';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import { STUDIO_INFO, SERVICES_DATA, TESTIMONIALS_DATA } from '../data/siteData';
import CameraViewfinderMotif from '../components/CameraViewfinderMotif';
import LuxuryEditorialSeal from '../components/LuxuryEditorialSeal';
import useScrollReveal from '../hooks/useScrollReveal';
import CinematicVideoSection from '../components/CinematicVideoSection';
import InteractiveCard from '../components/InteractiveCard';
import logoImg from '../assets/logo.png';

export default function Home({ setActivePage, onSelectService }) {
  // Activate IntersectionObserver for buttery-smooth scroll reveals
  useScrollReveal();

  // Testimonial carousel state
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // 6 Featured disciplines on homepage for a balanced, full 3x2 grid
  const featuredServices = SERVICES_DATA.slice(0, 6);

  return (
    <div className="page-enter" style={{ backgroundColor: 'var(--bg-canvas)' }}>
      {/* =====================================================================
          1. HERO SECTION (Requirement #6 & #1)
          - Full-screen / near-full-screen
          - Large high-quality editorial background composition
          - Lens & Leaf brand identity
          - Headline: “Every Frame Tells a Story.” with word-by-word reveal
          - Subtle lens-flare glow and ambient optical movement
          - Primary button: “Explore Our Work” (-> Portfolio)
          - Secondary button: “Book Your Session” (-> Booking)
          - Camera-inspired viewfinder & aperture detail
          ===================================================================== */}
      <section style={{
        position: 'relative',
        minHeight: '94vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: '#17110F',
        color: '#FFFFFF',
        padding: '6rem 1.5rem'
      }}>
        {/* Background Image with Cinematic Tonal Wash & Camera Zoom Breathe Animation */}
        <div 
          className="camera-zoom-bg"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url("https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85")',
            backgroundSize: 'cover',
            backgroundPosition: 'center 35%',
            filter: 'brightness(0.34) saturate(1.15)',
          }} 
        />

        {/* Subtle Optical Lens-Flare Reflection */}
        <div className="lens-flare-glow" style={{ top: '18%', left: '12%', width: '450px', height: '450px' }} />

        {/* Soft Ambient Rose & Warm Orange Glows with Breathing Animation */}
        <div className="light-bloom-pulse" style={{
          position: 'absolute',
          top: '15%',
          right: '8%',
          width: '520px',
          height: '520px',
          background: 'radial-gradient(circle, rgba(247, 161, 167, 0.28) 0%, transparent 70%)',
          filter: 'blur(75px)',
          pointerEvents: 'none'
        }} />
        <div className="light-bloom-pulse" style={{
          position: 'absolute',
          bottom: '10%',
          left: '6%',
          width: '480px',
          height: '480px',
          background: 'radial-gradient(circle, rgba(242, 140, 40, 0.24) 0%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          animationDelay: '-4s'
        }} />

        {/* Camera-inspired Viewfinder Corner Brackets with Autofocus Breathing */}
        <div style={{
          position: 'absolute',
          top: '2.5rem',
          left: '2.5rem',
          width: '42px',
          height: '42px',
          borderTop: '2px solid rgba(250, 214, 210, 0.65)',
          borderLeft: '2px solid rgba(250, 214, 210, 0.65)',
          pointerEvents: 'none'
        }} className="focus-bracket hide-on-mobile" />
        <div style={{
          position: 'absolute',
          top: '2.5rem',
          right: '2.5rem',
          width: '42px',
          height: '42px',
          borderTop: '2px solid rgba(250, 214, 210, 0.65)',
          borderRight: '2px solid rgba(250, 214, 210, 0.65)',
          pointerEvents: 'none'
        }} className="focus-bracket hide-on-mobile" />
        <div style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '2.5rem',
          width: '42px',
          height: '42px',
          borderBottom: '2px solid rgba(250, 214, 210, 0.65)',
          borderLeft: '2px solid rgba(250, 214, 210, 0.65)',
          pointerEvents: 'none'
        }} className="focus-bracket hide-on-mobile" />
        <div style={{
          position: 'absolute',
          bottom: '2.5rem',
          right: '2.5rem',
          width: '42px',
          height: '42px',
          borderBottom: '2px solid rgba(250, 214, 210, 0.65)',
          borderRight: '2px solid rgba(250, 214, 210, 0.65)',
          pointerEvents: 'none'
        }} className="focus-bracket hide-on-mobile" />

        {/* Floating Rotating Luxury Seal Stamp */}
        <div 
          className="hide-on-mobile"
          style={{
            position: 'absolute',
            top: '3.5rem',
            right: '4.5rem',
            zIndex: 3,
            filter: 'drop-shadow(0 6px 20px rgba(0,0,0,0.5))'
          }}
        >
          <LuxuryEditorialSeal size={118} light={true} />
        </div>

        {/* Hero Central Content */}
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '960px' }}>
          {/* Animated Water Ripple & Lens Aperture Motif */}
          <div style={{ marginBottom: '2.2rem' }}>
            <CameraViewfinderMotif size={130} />
          </div>

          {/* Luxury Studio Status Badge */}
          <div 
            className="pulse-badge"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.55rem',
              padding: '0.42rem 1.15rem',
              backgroundColor: 'rgba(23, 17, 15, 0.78)',
              border: '1px solid rgba(250, 214, 210, 0.35)',
              backdropFilter: 'blur(10px)',
              borderRadius: 'var(--radius-pill)',
              marginBottom: '1.6rem',
              fontSize: '0.78rem',
              color: 'var(--color-blush-pink)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: 600
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#25D366', display: 'inline-block' }} />
            <span>Editorial Photography & Luxury Portrait Studio</span>
          </div>

          {/* Headline strictly per Requirement #6 & #1: "Every Frame Tells a Story." with Word-by-Word Reveal */}
          <h1 style={{
            fontSize: 'clamp(2.8rem, 6.4vw, 5.2rem)',
            fontWeight: 400,
            lineHeight: 1.1,
            marginBottom: '1.4rem',
            color: '#FFFFFF',
            textShadow: '0 4px 30px rgba(0,0,0,0.6)'
          }}>
            <span className="word-reveal-wrap">
              <span className="word-reveal-item word-delay-1">Every&nbsp;</span>
            </span>
            <span className="word-reveal-wrap">
              <span className="word-reveal-item word-delay-2">Frame&nbsp;</span>
            </span>
            <span className="word-reveal-wrap">
              <span className="word-reveal-item word-delay-3">Tells</span>
            </span>
            <br />
            <span className="word-reveal-wrap">
              <span className="word-reveal-item word-delay-4 text-shimmer" style={{ fontStyle: 'italic', fontWeight: 600 }}>
                a Story.
              </span>
            </span>
          </h1>

          {/* Supporting Text strictly per Requirement #6 */}
          <p style={{
            fontSize: 'clamp(1.05rem, 1.4vw, 1.25rem)',
            color: '#F5EDE8',
            maxWidth: '740px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.7,
            fontWeight: 300
          }}>
            From beautiful portraits to unforgettable celebrations, we capture the moments that deserve to last forever.
          </p>

          {/* Buttons strictly per Requirement #6: "Explore Our Work" and "Book Your Session" */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.2rem'
          }}>
            <button
              onClick={() => setActivePage('portfolio')}
              className="btn-primary btn-magnetic"
              style={{ padding: '1rem 2.4rem', fontSize: '0.95rem' }}
            >
              <Eye size={18} />
              <span>Explore Our Work</span>
            </button>

            <button
              onClick={() => setActivePage('booking')}
              className="btn-outline-light"
              style={{ padding: '1rem 2.4rem', fontSize: '0.95rem' }}
            >
              <Calendar size={18} color="var(--color-coral-red)" />
              <span>Book Your Session</span>
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. BRAND STRIP / CONTINUOUS SEAMLESS MARQUEE (Awwwards & Editorial Style)
          ===================================================================== */}
      <section style={{
        backgroundColor: '#17110F',
        borderTop: '1px solid rgba(166, 166, 166, 0.25)',
        borderBottom: '1px solid rgba(166, 166, 166, 0.25)',
        padding: '0.85rem 0',
        overflow: 'hidden'
      }}>
        <div className="marquee-container">
          <div className="marquee-track">
            {[1, 2].map((repeatIdx) => (
              <div 
                key={repeatIdx} 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3rem',
                  paddingRight: '3rem',
                  fontSize: '0.82rem',
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  color: 'var(--color-blush-pink)'
                }}
              >
                <span>PORTRAITS</span>
                <span style={{ color: 'var(--color-coral-red)' }}>✦</span>
                <span>COUPLES</span>
                <span style={{ color: 'var(--color-warm-orange)' }}>✦</span>
                <span>MATERNITY</span>
                <span style={{ color: 'var(--color-coral-red)' }}>✦</span>
                <span>NEWBORNS</span>
                <span style={{ color: 'var(--color-warm-orange)' }}>✦</span>
                <span>WEDDINGS</span>
                <span style={{ color: 'var(--color-coral-red)' }}>✦</span>
                <span>FASHION</span>
                <span style={{ color: 'var(--color-warm-orange)' }}>✦</span>
                <span>STUDIO SANCTUARY</span>
                <span style={{ color: 'var(--color-coral-red)' }}>✦</span>
                <span>FINE ART ANTHOLOGY</span>
                <span style={{ color: 'var(--color-warm-orange)' }}>✦</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. ABOUT US (Requirement #7 & #2)
          - Asymmetric layout with photography & editorial typography
          - Headline: “More Than Photographs. Memories That Stay.”
          - Expanding warm orange accent line and mask reveal
          ===================================================================== */}
      <section style={{ padding: '2.4rem 0 1.8rem', backgroundColor: 'var(--bg-canvas)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'center'
          }}>
            {/* Visual Photography Composition with Scroll Reveal & Clip Mask */}
            <div className="reveal-on-scroll clip-reveal-left" style={{ position: 'relative' }}>
              <div 
                className="card-sheen img-zoom-container"
                data-cursor="view"
                style={{
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-hover)',
                  border: '1px solid rgba(166, 166, 166, 0.35)',
                  height: '500px'
                }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85" 
                  alt="Lens & Leaf Editorial Portraiture" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover', 
                    objectPosition: 'center 24%'
                  }}
                />
              </div>

              {/* Floating Aesthetic Overlay Badge Positioned on the Right Side Clear of Face */}
              <div 
                className="float-gentle hide-on-mobile"
                style={{
                  position: 'absolute',
                  bottom: '-1.2rem',
                  right: '-1.2rem',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.1rem 1.4rem',
                  boxShadow: '0 12px 32px rgba(23, 17, 15, 0.12)',
                  border: '1px solid rgba(233, 75, 80, 0.25)',
                  maxWidth: '240px',
                  zIndex: 3
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-coral-red)' }} />
                  <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-coral-red)', fontWeight: 600 }}>
                    Our Philosophy
                  </span>
                </div>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-body)', lineHeight: '1.45', margin: 0 }}>
                  Crafting luminous photographs where genuine emotion meets gentle, flattering light.
                </p>
              </div>
            </div>

            {/* Editorial Content with Staggered Scroll Reveal */}
            <div className="reveal-on-scroll reveal-delay-2">
              <span className="section-badge">
                Our Creative Spirit
              </span>
              <span className="accent-line-expand" style={{ marginBottom: '0.8rem' }} />
              <h2 className="section-title">
                More Than Photographs. <br />
                <span className="text-shimmer" style={{ fontStyle: 'italic', fontWeight: 600 }}>
                  Memories That Stay.
                </span>
              </h2>
              <p style={{ color: 'var(--text-body)', fontSize: '1.02rem', lineHeight: '1.7', marginBottom: '1rem' }}>
                At Lens & Leaf, we see photography as the delicate art of freezing time without stripping away its soul. Like a dewdrop resting gently upon an unfurling lotus petal, our camera lens reflects life with crystalline clarity while honoring its organic tenderness.
              </p>
              <p style={{ color: 'var(--text-body)', fontSize: '1.02rem', lineHeight: '1.7', marginBottom: '1.2rem' }}>
                Whether guiding an expectant mother through her maternity session, capturing a bride’s quiet tears before the aisle, or crafting timeless personal portraits, our studio is dedicated to unhurried, comfortable, and deeply meaningful storytelling.
              </p>

              {/* Pillars */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.8rem', marginBottom: '1.4rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                  <CheckCircle size={18} color="var(--color-coral-red)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                  <div>
                    <strong style={{ color: 'var(--text-title)', display: 'block', fontSize: '0.96rem' }}>Art-Directed Solarium & Studio</strong>
                    <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Warm, peaceful ambient sets with curated backdrops and flattering diffused light.</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                  <CheckCircle size={18} color="var(--color-coral-red)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                  <div>
                    <strong style={{ color: 'var(--text-title)', display: 'block', fontSize: '0.96rem' }}>Authentic Color & Subtle Retouching</strong>
                    <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Preserving real skin textures, natural eye radiance, and true emotional warmth.</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActivePage('about')}
                className="btn-secondary btn-magnetic"
              >
                <span>Read Our Full Story</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. FEATURED SERVICES SHOWCASE (Requirement #8 Preview & #2)
          ===================================================================== */}
      <section style={{ padding: '2.2rem 0 3rem', backgroundColor: 'var(--bg-blush-soft)' }}>
        <div className="container">
          <div className="reveal-on-scroll" style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 1.6rem' }}>
            <span className="section-badge">
              Studio Disciplines
            </span>
            <h2 className="section-title">
              Crafted Photography Services
            </h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              From bespoke personal portraits and romantic couples to weddings and editorial lookbooks, explore our dedicated disciplines.
            </p>
          </div>

          {/* Interactive Card Animation Mode Pill Indicator */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.65rem',
            marginBottom: '2rem',
            flexWrap: 'wrap'
          }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
              Interactive Card Effects:
            </span>
            <span style={{
              fontSize: '0.74rem',
              color: 'var(--color-coral-red)',
              backgroundColor: 'rgba(233, 75, 80, 0.1)',
              padding: '0.25rem 0.75rem',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid rgba(233, 75, 80, 0.25)',
              fontWeight: 600
            }}>
              Cinema Studio Zoom • 3D Tilt • Viewfinder Focus • Prismatic Glow • Drawer Reveal
            </span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.8rem'
          }}>
            {featuredServices.map((svc, idx) => {
              // Cycle different card animations for the cards:
              const animStyles = ['cinema', 'tilt', 'focus', 'prism', 'reveal', 'cinema'];
              const chosenAnim = animStyles[idx % animStyles.length];

              return (
                <InteractiveCard 
                  key={svc.id}
                  animationType={chosenAnim}
                  className={`reveal-on-scroll reveal-delay-${(idx % 4) + 1} clip-reveal-up`}
                  style={{
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div 
                    className="img-zoom-container"
                    data-cursor="view"
                    style={{ height: '260px', position: 'relative', overflow: 'hidden' }}
                  >
                    <img 
                      src={svc.cover} 
                      alt={svc.title} 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover', 
                        objectPosition: svc.id === 'portrait' ? 'center 22%' : 'center 15%' 
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      backgroundColor: 'rgba(23, 17, 15, 0.85)',
                      backdropFilter: 'blur(8px)',
                      padding: '0.35rem 0.85rem',
                      borderRadius: 'var(--radius-pill)',
                      fontSize: '0.72rem',
                      color: 'var(--color-blush-pink)',
                      fontWeight: 600,
                      letterSpacing: '0.04em'
                    }}>
                      {svc.badge}
                    </div>

                    {/* Micro Animation Type Badge */}
                    <div style={{
                      position: 'absolute',
                      bottom: '0.8rem',
                      right: '0.8rem',
                      backgroundColor: 'rgba(23, 17, 15, 0.85)',
                      backdropFilter: 'blur(8px)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: 'var(--radius-pill)',
                      fontSize: '0.65rem',
                      color: 'var(--color-warm-orange)',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em'
                    }}>
                      FX: {chosenAnim}
                    </div>
                  </div>

                  <div style={{ padding: '1.8rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h3 style={{ fontSize: '1.45rem', marginBottom: '0.5rem', color: 'var(--text-title)' }}>
                      {svc.title}
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem', flex: 1 }}>
                      {svc.shortDesc}
                    </p>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '1.2rem',
                      borderTop: '1px solid rgba(166, 166, 166, 0.25)'
                    }}>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Starting from</div>
                        <div style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', fontWeight: 600, color: 'var(--color-coral-red)' }}>
                          ${svc.startingPrice}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          if (onSelectService) onSelectService(svc.title);
                          setActivePage('services');
                        }}
                        className="btn-magnetic"
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--color-coral-red)',
                          fontWeight: 600,
                          fontSize: '0.88rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          padding: 0
                        }}
                      >
                        <span>Explore Service</span>
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </InteractiveCard>
              );
            })}
          </div>

          <div className="reveal-on-scroll" style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <button
              onClick={() => setActivePage('services')}
              className="btn-secondary btn-magnetic"
            >
              <span>View All 12 Photography Services</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================================
          CINEMATIC VIDEO SHOWCASE SECTION (Requirement: Video Section)
          ===================================================================== */}
      <CinematicVideoSection 
        setActivePage={setActivePage} 
        onSelectService={onSelectService} 
      />

      {/* =====================================================================
          5. INTERACTIVE BEFORE & AFTER RETOUCHING TEASER
          ===================================================================== */}
      <section style={{ padding: '4rem 0', backgroundColor: '#17110F', color: '#FFFFFF' }}>
        <div className="container">
          <div className="reveal-on-scroll" style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 2.2rem' }}>
            <span className="section-badge light">
              The Artisan Process
            </span>
            <h2 className="section-title" style={{ color: '#FFFFFF' }}>
              Precision Color & Master Retouching
            </h2>
            <p style={{ color: '#DDD0D5', fontSize: '1.05rem', lineHeight: '1.7', margin: '0 auto' }}>
              We reject artificial plastic filters. Our color grading preserves natural micro-textures while infusing delicate rose-gold highlights and organic tones.
            </p>
          </div>

          <div className="reveal-on-scroll reveal-delay-2" style={{ maxWidth: '880px', margin: '0 auto' }}>
            <BeforeAfterSlider />
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. STUDIO SANCTUARY CALLOUT (Requirement #10 Teaser)
          ===================================================================== */}
      <section style={{ padding: '3.8rem 0', backgroundColor: 'var(--bg-canvas)' }}>
        <div className="container">
          <div 
            className="reveal-on-scroll"
            style={{
              borderRadius: 'var(--radius-xl)',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid rgba(166, 166, 166, 0.3)',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              boxShadow: 'var(--shadow-card)'
            }}
          >
            <div style={{ padding: '3rem 2.8rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span className="section-badge orange">
                The Studio Atmosphere
              </span>
              <h2 style={{ fontSize: '2.4rem', color: 'var(--text-title)', marginBottom: '1rem' }}>
                Step Inside the Lens & Leaf Studio
              </h2>
              <p style={{ color: 'var(--text-body)', lineHeight: '1.7', marginBottom: '2rem' }}>
                Equipped with north-facing natural solarium light, hand-painted canvas backdrops, high-CRI vanity suites, and an artisan tea bar, our space is an inspiring sanctuary designed for comfort and creative freedom.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <button
                  onClick={() => setActivePage('studio')}
                  className="btn-primary btn-magnetic"
                >
                  <Camera size={16} />
                  <span>Discover the Studio Experience</span>
                </button>
                <button
                  onClick={() => setActivePage('booking')}
                  className="btn-secondary btn-magnetic"
                >
                  <span>Book a Session</span>
                </button>
              </div>
            </div>

            <div 
              className="card-sheen img-zoom-container"
              data-cursor="view"
              style={{ height: '100%', minHeight: '340px' }}
            >
              <img 
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80" 
                alt="Lens & Leaf Studio Solarium" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          7. GENUINE TESTIMONIALS CAROUSEL (Requirement #2 & #13)
          ===================================================================== */}
      <section style={{
        padding: '4rem 0',
        backgroundColor: '#17110F',
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(166, 166, 166, 0.2)',
        borderBottom: '1px solid rgba(166, 166, 166, 0.2)'
      }}>
        <div className="light-bloom-pulse" style={{
          position: 'absolute',
          top: '20%',
          right: '5%',
          width: '420px',
          height: '420px',
          background: 'radial-gradient(circle, rgba(233, 75, 80, 0.15) 0%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '920px' }}>
          <div className="reveal-on-scroll" style={{ textAlign: 'center', marginBottom: '2.2rem' }}>
            <span className="section-badge light">
              Client Whispers
            </span>
            <h2 className="section-title" style={{ color: '#FFFFFF' }}>
              Words from Those We've Captured
            </h2>
            <div className="accent-line-expand" style={{ margin: '0.8rem auto 0' }} />
          </div>

          {/* Testimonial Active Slide */}
          <div 
            className="reveal-on-scroll"
            style={{
              backgroundColor: 'rgba(32, 23, 21, 0.75)',
              border: '1px solid rgba(247, 161, 167, 0.3)',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(2.5rem, 5vw, 4rem)',
              backdropFilter: 'blur(16px)',
              position: 'relative',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.45)',
              textAlign: 'center'
            }}
          >
            {/* Quote Watermark Icon */}
            <div style={{
              position: 'absolute',
              top: '1.5rem',
              left: '2rem',
              opacity: 0.12,
              pointerEvents: 'none'
            }}>
              <Quote size={80} color="var(--color-blush-pink)" />
            </div>

            {/* 5-Star Rating Gold Accents */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.35rem', marginBottom: '1.6rem' }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={18} fill="var(--color-warm-orange)" color="var(--color-warm-orange)" />
              ))}
            </div>

            {/* Testimonial Quote */}
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.25rem, 2.2vw, 1.75rem)',
              color: '#FFF0E7',
              lineHeight: 1.6,
              fontStyle: 'italic',
              marginBottom: '2rem',
              minHeight: '90px'
            }}>
              "{TESTIMONIALS_DATA[activeTestimonialIdx].quote}"
            </p>

            {/* Client Metadata */}
            <div>
              <div style={{
                fontSize: '1.15rem',
                fontWeight: 600,
                color: 'var(--color-blush-pink)',
                letterSpacing: '0.04em'
              }}>
                {TESTIMONIALS_DATA[activeTestimonialIdx].client}
              </div>
              <div style={{
                fontSize: '0.85rem',
                color: 'var(--color-silver-grey)',
                marginTop: '0.3rem'
              }}>
                {TESTIMONIALS_DATA[activeTestimonialIdx].service} • {TESTIMONIALS_DATA[activeTestimonialIdx].location} ({TESTIMONIALS_DATA[activeTestimonialIdx].date})
              </div>
            </div>

            {/* Carousel Controls */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.5rem',
              marginTop: '2.5rem'
            }}>
              <button
                onClick={() => setActiveTestimonialIdx((prev) => (prev > 0 ? prev - 1 : TESTIMONIALS_DATA.length - 1))}
                aria-label="Previous Testimonial"
                className="btn-magnetic"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(250, 214, 210, 0.35)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <ChevronLeft size={18} />
              </button>

              {/* Dots */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {TESTIMONIALS_DATA.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setActiveTestimonialIdx(dotIdx)}
                    aria-label={`Go to review ${dotIdx + 1}`}
                    style={{
                      width: activeTestimonialIdx === dotIdx ? '28px' : '8px',
                      height: '8px',
                      borderRadius: 'var(--radius-pill)',
                      backgroundColor: activeTestimonialIdx === dotIdx ? 'var(--color-coral-red)' : 'rgba(255, 255, 255, 0.25)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  />
                ))}
              </div>

              <button
                onClick={() => setActiveTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS_DATA.length)}
                aria-label="Next Testimonial"
                className="btn-magnetic"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(250, 214, 210, 0.35)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          8. BOTTOM INVITATION CTA
          ===================================================================== */}
      <section style={{
        padding: '3.8rem 0',
        backgroundColor: '#17110F',
        color: '#FFFFFF',
        textAlign: 'center',
        position: 'relative',
        borderTop: '1px solid rgba(166, 166, 166, 0.25)'
      }}>
        <div className="container reveal-on-scroll" style={{ maxWidth: '780px' }}>
          <div 
            className="pulse-badge"
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              margin: '0 auto 1.4rem',
              overflow: 'hidden',
              border: '2px solid var(--color-coral-red)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2px'
            }}
          >
            <img src={logoImg} alt="Lens & Leaf Brand" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: '#FFFFFF', marginBottom: '1rem' }}>
            Ready to Capture Your Unforgettable Story?
          </h2>
          <p style={{ color: '#F5EDE8', fontSize: '1.08rem', lineHeight: '1.7', marginBottom: '2.5rem' }}>
            Whether documenting a quiet personal threshold, celebrating love, or planning a grand ceremony, our artists are ready to welcome you.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.2rem', justifyContent: 'center' }}>
            <button
              onClick={() => setActivePage('booking')}
              className="btn-primary btn-magnetic"
              style={{ padding: '1rem 2.4rem' }}
            >
              <Calendar size={18} />
              <span>Reserve a Photoshoot Session</span>
            </button>
            <button
              onClick={() => setActivePage('contact')}
              className="btn-outline-light btn-magnetic"
              style={{ padding: '1rem 2.4rem' }}
            >
              <span>Contact Studio Concierge</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
