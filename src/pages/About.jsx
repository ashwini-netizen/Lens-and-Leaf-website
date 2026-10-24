import React from 'react';
import { 
  Sparkles, 
  Camera, 
  Heart, 
  Clock, 
  Sun, 
  CheckCircle,
  ArrowRight,
  Calendar,
  Layers
} from 'lucide-react';
import { STUDIO_INFO } from '../data/siteData';
import useScrollReveal from '../hooks/useScrollReveal';
import LuxuryEditorialSeal from '../components/LuxuryEditorialSeal';
import logoImg from '../assets/logo.png';

export default function About({ setActivePage }) {
  useScrollReveal();

  const creativeSteps = [
    {
      num: '01',
      title: 'Consultation & Vision',
      desc: 'A relaxed conversation to discuss your goals, style preferences, and wardrobe guidance.'
    },
    {
      num: '02',
      title: 'Studio Styling & Light',
      desc: 'Setting up custom backdrops, soft solarium lighting, and outfit coordination.'
    },
    {
      num: '03',
      title: 'The Photography Session',
      desc: 'A comfortable, unhurried photoshoot with gentle posing direction and zero stress.'
    },
    {
      num: '04',
      title: 'Retouching & Delivery',
      desc: 'Subtle hand-finishing for natural skin tones and prompt delivery of high-res files.'
    }
  ];

  return (
    <div className="page-enter" style={{ backgroundColor: 'var(--bg-canvas)' }}>
      {/* 1. Header Banner */}
      <section style={{
        padding: '2.4rem 0 1.6rem',
        backgroundColor: '#17110F',
        color: '#FFFFFF',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1100px' }}>
          {/* Logo Brand Emblem with Water Ripple */}
          <div style={{ position: 'relative', width: '64px', height: '64px', margin: '0 auto 0.8rem' }}>
            <div className="water-ripple-ring" style={{ inset: '-10px' }} />
            <div style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              overflow: 'hidden',
              backgroundColor: '#FFFFFF',
              border: '2px solid var(--color-coral-red)',
              position: 'relative',
              zIndex: 2,
              boxShadow: '0 6px 20px rgba(233, 75, 80, 0.3)'
            }}>
              <img 
                src={logoImg} 
                alt="Lens & Leaf Brand" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  borderRadius: '50%',
                  clipPath: 'circle(50%)',
                  WebkitClipPath: 'circle(50%)',
                  display: 'block'
                }} 
              />
            </div>
          </div>

          <span className="section-badge light">
            About Lens & Leaf
          </span>
          {/* Headline strictly per Requirement #7: “More Than Photographs. Memories That Stay.” */}
          <h1 className="banner-hero-title">
            More Than Photographs.{' '}
            <span className="text-shimmer" style={{ fontStyle: 'italic', fontWeight: 600 }}>
              Memories That Stay.
            </span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#F5EDE8', lineHeight: '1.7', fontWeight: 300, maxWidth: '780px', margin: '0 auto' }}>
            Dedicated to the quiet art of preserving meaningful moments, natural connections, and authentic emotion.
          </p>
        </div>
      </section>

      {/* 2. Editorial Story Section (Asymmetric Layout per Requirement #7) */}
      <section style={{ padding: '2rem 0 3.2rem' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'center',
            marginBottom: '3rem'
          }}>
            {/* Left Column: Creative Philosophy with Scroll Reveal */}
            <div className="reveal-on-scroll">
              <span className="section-badge">
                Our Approach
              </span>
              <h2 className="section-title">
                Natural Light, Genuine Connection
              </h2>
              <p style={{ color: 'var(--text-body)', fontSize: '1rem', lineHeight: '1.68', marginBottom: '1rem' }}>
                Lens & Leaf is a boutique photography studio created around a simple idea: photoshoots should feel relaxed, natural, and enjoyable—never rushed or stiffly posed.
              </p>
              <p style={{ color: 'var(--text-body)', fontSize: '1rem', lineHeight: '1.68', marginBottom: '1.5rem' }}>
                By pairing soft solarium daylight with gentle direction, we highlight authentic expressions and true skin tones to deliver timeless photographs you'll love revisiting for decades.
              </p>

              {/* 3 Clear, Quick Highlights */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.9rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <CheckCircle size={18} color="var(--color-coral-red)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                  <div>
                    <strong style={{ color: 'var(--text-title)', fontSize: '0.95rem' }}>Relaxed Atmosphere:</strong>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginLeft: '0.35rem' }}>A comfortable, pressure-free studio where you can simply be yourself.</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <CheckCircle size={18} color="var(--color-coral-red)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                  <div>
                    <strong style={{ color: 'var(--text-title)', fontSize: '0.95rem' }}>True-to-Life Tones:</strong>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginLeft: '0.35rem' }}>Natural skin textures and painterly light with zero artificial plastic filters.</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <CheckCircle size={18} color="var(--color-coral-red)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                  <div>
                    <strong style={{ color: 'var(--text-title)', fontSize: '0.95rem' }}>Heirloom Delivery:</strong>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginLeft: '0.35rem' }}>Full-resolution digital master files and archival fine-art prints.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Photograph Composition with Floating Seal */}
            <div className="reveal-on-scroll reveal-delay-2" style={{ position: 'relative' }}>
              <div 
                className="card-sheen img-zoom-container"
                data-cursor="view"
                style={{
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-hover)',
                  border: '1px solid rgba(166, 166, 166, 0.35)',
                  height: '430px'
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=85"
                  alt="Authentic Emotional Photography"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Floating Luxury Editorial Seal */}
              <div 
                className="float-gentle hide-on-mobile"
                style={{
                  position: 'absolute',
                  bottom: '-2rem',
                  left: '-2rem',
                  zIndex: 3,
                  filter: 'drop-shadow(0 8px 24px rgba(23, 17, 15, 0.16))'
                }}
              >
                <LuxuryEditorialSeal size={110} light={false} />
              </div>
            </div>
          </div>

          {/* 3. The 4-Pillar Creative Journey */}
          <div style={{ marginBottom: '3.5rem' }}>
            <div className="reveal-on-scroll" style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 2.2rem' }}>
              <span className="section-badge orange">
                Client Journey
              </span>
              <h2 className="section-title">
                Our Four-Pillar Studio Process
              </h2>
              <p className="section-subtitle" style={{ margin: '0 auto' }}>
                How we guide you seamlessly from initial vision through to finished archival heirlooms.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.8rem'
            }}>
              {creativeSteps.map((step, idx) => (
                <div
                  key={step.num}
                  className={`glass-card card-sheen reveal-on-scroll reveal-delay-${idx + 1}`}
                  style={{
                    padding: '2rem 1.8rem',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div style={{
                    fontSize: '2rem',
                    fontFamily: 'var(--font-serif)',
                    color: 'var(--color-coral-red)',
                    fontWeight: 600,
                    marginBottom: '0.8rem'
                  }}>
                    {step.num}
                  </div>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--text-title)', marginBottom: '0.6rem' }}>
                    {step.title}
                  </h3>
                  <p style={{ color: 'var(--text-body)', fontSize: '0.92rem', lineHeight: '1.65', flex: 1 }}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Attention to Detail & Sustainable Care */}
          <div style={{
            backgroundColor: '#17110F',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: '3rem 2.5rem',
            border: '1px solid rgba(166, 166, 166, 0.25)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem',
            alignItems: 'center'
          }}>
            <div>
              <span className="section-badge light">
                Artisanal Standards
              </span>
              <h2 style={{ fontSize: '2.2rem', color: '#FFF', marginBottom: '1rem' }}>
                Uncompromising Quality in Every Detail
              </h2>
              <p style={{ color: '#F5EDE8', lineHeight: '1.7', fontSize: '0.98rem', marginBottom: '1.8rem' }}>
                From our camera calibration and hypoallergenic textiles to our museum-grade printing partners, we spare no effort in ensuring that your memories are preserved with utmost care.
              </p>
              <button
                onClick={() => setActivePage('services')}
                className="btn-primary"
              >
                <span>Explore Photography Services</span>
                <ArrowRight size={16} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.2rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <Camera size={22} color="var(--color-coral-red)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                <div>
                  <h4 style={{ fontSize: '1.05rem', color: '#FFF', marginBottom: '0.2rem' }}>Optical Calibrated Sensors</h4>
                  <p style={{ fontSize: '0.88rem', color: '#DDD0D5', lineHeight: '1.5' }}>Ultra-high-resolution imaging with lifelike skin tones and smooth tonal transitions.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <Sun size={22} color="var(--color-warm-orange)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                <div>
                  <h4 style={{ fontSize: '1.05rem', color: '#FFF', marginBottom: '0.2rem' }}>Diffuse Solarium Natural Light</h4>
                  <p style={{ fontSize: '0.88rem', color: '#DDD0D5', lineHeight: '1.5' }}>Soft, wrap-around ambient light creating gentle shadows and natural sparkle in the eyes.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <Heart size={22} color="var(--color-rose-pink)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                <div>
                  <h4 style={{ fontSize: '1.05rem', color: '#FFF', marginBottom: '0.2rem' }}>Safe & Hypoallergenic Studio</h4>
                  <p style={{ fontSize: '0.88rem', color: '#DDD0D5', lineHeight: '1.5' }}>Organic washed wraps and clean, warm climate controls tailored for infants and expectant mothers.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
