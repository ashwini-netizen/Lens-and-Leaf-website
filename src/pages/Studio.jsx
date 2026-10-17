import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { 
  Camera, 
  Sun, 
  Layers, 
  Sparkles, 
  CheckCircle, 
  Calendar, 
  ArrowRight,
  Maximize2,
  X,
  Coffee,
  ShieldCheck,
  Sliders,
  Clock,
  Users,
  MapPin
} from 'lucide-react';
import { STUDIO_EXPERIENCE_DATA, STUDIO_INFO } from '../data/siteData';
import useScrollReveal from '../hooks/useScrollReveal';
import lowKeyCharcoalImg from '../assets/lowkey-charcoal-set.jpg';

export default function Studio({ setActivePage }) {
  useScrollReveal();

  const [selectedStudioImage, setSelectedStudioImage] = useState(null);

  const photoshootSetups = [
    {
      title: 'Solarium Soft Window Set',
      discipline: 'Maternity, Gentle Portraits & Newborns',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      description: 'North-facing diffused daylight gently wrapping around subjects with zero harsh shadows, complemented by organic linen swaddles.'
    },
    {
      title: 'Hand-Painted Blush Canvas Set',
      discipline: 'Fine-Art Heirloom & Milestone Portraits',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
      description: 'Textured oil-paint style canvas backdrop offering painterly depth, illuminated by a 7-foot parabolic diffused key light.'
    },
    {
      title: 'Dramatic Low-Key Charcoal Set',
      discipline: 'High-Fashion, Editorial & Horology',
      image: lowKeyCharcoalImg,
      description: 'Deep black velvet sound-dampened set with directional grid snoots sculpting razor-sharp highlights and rich shadows.'
    },
    {
      title: 'Seamless Cyclorama Infinity Bay',
      discipline: 'Commercial Lookbooks & Executive Headshots',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
      description: 'Clean, cornerless curved cyclorama for crisp clean corporate headshots, dynamic model movement, and full-length apparel staging.'
    },
    {
      title: 'Warm Editorial Amber Lifestyle Bay',
      discipline: 'Family Heirlooms, Couples & Milestones',
      image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80',
      description: 'Curated Scandinavian oak furniture and warm linen drapes, capturing unposed emotional intimacy bathed in soft, golden-hour studio tones.'
    },
    {
      title: 'Architectural Fine-Art Spotlight Set',
      discipline: 'Creative Solo Portraits & Contemporary Fashion',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      description: 'Precision optical gobo projector paired with warm cream lime-wash plaster, sculpting geometric shadows and cinematic silhouette profiles.'
    }
  ];

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
        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '840px' }}>
          <span className="section-badge light">
            Studio Sanctuary
          </span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#FFF', marginBottom: '1rem' }}>
            The Lens & Leaf Studio Experience
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#F5EDE8', lineHeight: '1.7', fontWeight: 300 }}>
            An art-directed daylight solarium and controlled lighting sanctuary crafted for comfort, intimacy, and timeless photographic composition.
          </p>
        </div>
      </section>

      {/* 2. Studio Introduction (Requirement #10) */}
      <section style={{ padding: '3.5rem 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem',
            alignItems: 'center',
            marginBottom: '3.5rem'
          }}>
            <div className="reveal-on-scroll">
              <span className="section-badge">
                Sanctuary Atmosphere
              </span>
              <span className="accent-line-expand" style={{ marginBottom: '1.2rem' }} />
              <h2 className="section-title">
                {STUDIO_EXPERIENCE_DATA.intro.headline}
              </h2>
              <p style={{ color: 'var(--text-body)', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                {STUDIO_EXPERIENCE_DATA.intro.description}
              </p>
              <p style={{ color: 'var(--text-body)', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                From the moment you enter, the outside rush melts away. We welcome you with artisan botanical tea, tailored acoustic music, and a private dressing suite so you can relax fully before the camera.
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setActivePage('booking')}
                  className="btn-primary btn-magnetic"
                >
                  <Calendar size={16} />
                  <span>Book the Studio</span>
                </button>
                <button
                  onClick={() => setActivePage('contact')}
                  className="btn-secondary btn-magnetic"
                >
                  <span>Schedule Walkthrough</span>
                </button>
              </div>
            </div>

            {/* Layered Studio Photography Composition with Parallax Depth (Requirement #2) */}
            <div className="reveal-on-scroll reveal-delay-2 clip-reveal-left" style={{ position: 'relative' }}>
              {/* Primary Solarium Image */}
              <div 
                className="card-sheen img-zoom-container"
                data-cursor="view"
                style={{
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-hover)',
                  border: '1px solid rgba(166, 166, 166, 0.35)',
                  height: '460px'
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85"
                  alt="Lens & Leaf Studio Solarium Interior"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Floating Layered Inset Card (Dressing Suite & Lounge) */}
              <div 
                className="float-gentle hide-on-mobile"
                style={{
                  position: 'absolute',
                  bottom: '-2rem',
                  left: '-2rem',
                  width: '240px',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  boxShadow: '0 16px 40px rgba(23, 17, 15, 0.28)',
                  border: '2px solid rgba(255, 255, 255, 0.85)',
                  backgroundColor: '#FFFFFF',
                  zIndex: 3
                }}
              >
                <div style={{ height: '140px', position: 'relative' }}>
                  <img
                    src="https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=600&q=80"
                    alt="Private Client Lounge"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: '0.5rem',
                    left: '0.6rem',
                    backgroundColor: 'rgba(23, 17, 15, 0.85)',
                    backdropFilter: 'blur(6px)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.68rem',
                    color: 'var(--color-blush-pink)',
                    fontWeight: 600
                  }}>
                    Client Tea Lounge
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Studio Interior Gallery (Requirement #10) */}
          <div style={{ marginBottom: '3.5rem' }}>
            <div className="reveal-on-scroll" style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 2.2rem' }}>
              <span className="section-badge orange">
                Visual Tour
              </span>
              <h2 className="section-title">
                Studio Interior Spaces
              </h2>
              <p className="section-subtitle" style={{ margin: '0 auto' }}>
                Explore the dedicated spaces designed for client comfort, grooming, and artistic production.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.8rem'
            }}>
              {STUDIO_EXPERIENCE_DATA.gallery.map((item, idx) => (
                <div
                  key={idx}
                  className="sj-dance-gallery-card reveal-on-scroll reveal-delay-1"
                  data-cursor="view"
                  onClick={() => setSelectedStudioImage(item)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div style={{ height: '240px', position: 'relative', overflow: 'hidden' }}>
                    <img
                      src={item.image}
                      alt={item.title}
                    />
                    <div className="gallery-hover-veil" />
                    <div className="gallery-center-btn">
                      <Maximize2 size={20} />
                    </div>
                  </div>
                  <div style={{ padding: '1.4rem', backgroundColor: '#0D0A09' }}>
                    <h3 style={{ fontSize: '1.15rem', color: '#FFFFFF', marginBottom: '0.4rem' }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '0.86rem', color: '#DDD0D5', lineHeight: '1.5' }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>



          {/* 5. Lighting & Equipment Highlights (Requirement #10) */}
          <div style={{
            backgroundColor: '#17110F',
            borderRadius: 'var(--radius-xl)',
            padding: '2.5rem 2.2rem',
            color: '#FFFFFF',
            border: '1px solid rgba(166, 166, 166, 0.25)',
            marginBottom: '3.5rem'
          }}>
            <div style={{ maxWidth: '680px', marginBottom: '2rem' }}>
              <span className="section-badge light">
                Optical Precision
              </span>
              <h2 style={{ fontSize: '2.2rem', color: '#FFF', marginBottom: '0.8rem' }}>
                Lighting & Equipment Highlights
              </h2>
              <p style={{ color: '#F5EDE8', lineHeight: '1.7', fontSize: '0.98rem' }}>
                We combine medium-format sensors with state-of-the-art Swedish strobe systems to achieve peerless tonal graduations and natural color science.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '2rem'
            }}>
              {STUDIO_EXPERIENCE_DATA.equipment.map((eq, eIdx) => (
                <div key={eIdx} style={{
                  borderLeft: '2px solid var(--color-coral-red)',
                  paddingLeft: '1.4rem'
                }}>
                  <h4 style={{ fontSize: '1.15rem', color: '#FFF', marginBottom: '0.5rem' }}>
                    {eq.title}
                  </h4>
                  <p style={{ color: '#DDD0D5', fontSize: '0.88rem', lineHeight: '1.6' }}>
                    {eq.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* =====================================================================
              WHY CHOOSE LENS & LEAF STUDIO? (Direct SJ Dance Studio Card Design)
              ===================================================================== */}
          <div style={{ marginBottom: '4.5rem' }}>
            <div className="reveal-on-scroll" style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.5rem' }}>
              <span className="section-badge orange">
                Studio Excellence
              </span>
              <h2 className="section-title">
                Why Choose the Lens & Leaf Studio?
              </h2>
              <p className="section-subtitle" style={{ margin: '0 auto' }}>
                Modeled after elite creative sanctuaries with acoustic isolation, natural solarium light, and bespoke high-CRI continuous lighting arrays.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.8rem'
            }}>
              {[
                {
                  icon: <Sun size={32} />,
                  title: 'Spacious 42x28 ft. Natural Solarium',
                  desc: 'Perfect for large group heirloom sessions, full wardrobe changes, and seamless natural daylight movement.'
                },
                {
                  icon: <Clock size={32} />,
                  title: '24/7 Studio Availability',
                  desc: 'Book anytime — private appointments tailored to your schedule, golden-hour timing, or midnight editorial shoots.'
                },
                {
                  icon: <Sparkles size={32} />,
                  title: 'Swedish Strobe & Optical Array',
                  desc: 'Create the perfect mood with Profoto high-CRI strobe packs and parabolic diffusers for painterly skin tones.'
                },
                {
                  icon: <Sliders size={32} />,
                  title: 'Adjustable Studio Lighting',
                  desc: 'Enhance your video & photo aesthetics with motorized overhead boom arms and calibrated softbox lighting setups.'
                },
                {
                  icon: <Users size={32} />,
                  title: 'Dedicated VIP Makeup Room',
                  desc: 'Get camera-ready on-site with full vanity daylight mirror suites, steam presses, and dedicated dressing lounges.'
                },
                {
                  icon: <MapPin size={32} />,
                  title: 'Central Location in Mysore',
                  desc: 'Easily accessible with valet and private parking in the heart of Mysore, Karnataka.'
                }
              ].map((card, cIdx) => (
                <div
                  key={cIdx}
                  className="sj-dance-studio-card reveal-on-scroll"
                  style={{ animationDelay: `${cIdx * 0.1}s` }}
                >
                  <div className="sj-card-icon">
                    {card.icon}
                  </div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    color: '#FFFFFF',
                    marginBottom: '0.65rem',
                    fontWeight: 600
                  }}>
                    {card.title}
                  </h3>
                  <p style={{
                    fontSize: '0.88rem',
                    color: '#DDD0D5',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Photoshoot Setup Examples (Requirement #10) */}
          <div style={{ marginBottom: '3.5rem' }}>
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 2.2rem' }}>
              <span className="section-badge">
                Creative Possibilities
              </span>
              <h2 className="section-title">
                Photoshoot Setup Examples
              </h2>
              <p className="section-subtitle" style={{ margin: '0 auto' }}>
                Every commissioned photoshoot is customized with a specific lighting arrangement and backdrop mood tailored to your vision.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.8rem'
            }}>
              {photoshootSetups.map((setup, sIdx) => (
                <div
                  key={sIdx}
                  className="glass-card"
                  style={{
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{ height: '220px', position: 'relative' }}>
                    <img
                      src={setup.image}
                      alt={setup.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '0.8rem',
                      left: '0.8rem',
                      backgroundColor: 'rgba(23, 17, 15, 0.85)',
                      padding: '0.3rem 0.75rem',
                      borderRadius: 'var(--radius-pill)',
                      fontSize: '0.72rem',
                      color: 'var(--color-blush-pink)',
                      fontWeight: 600
                    }}>
                      Setup 0{sIdx + 1}
                    </div>
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <h4 style={{ fontSize: '1.2rem', color: 'var(--text-title)', marginBottom: '0.3rem' }}>
                      {setup.title}
                    </h4>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-coral-red)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.8rem' }}>
                      {setup.discipline}
                    </div>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: '1.6' }}>
                      {setup.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 7. Studio Session Information & Amenities (Requirement #10) */}
          <div style={{
            backgroundColor: 'var(--bg-blush-soft)',
            borderRadius: 'var(--radius-xl)',
            padding: '3.5rem',
            border: '1px solid rgba(233, 75, 80, 0.25)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem',
            alignItems: 'center'
          }}>
            <div>
              <span className="section-badge">
                Your Comfort First
              </span>
              <h2 style={{ fontSize: '2.2rem', color: 'var(--text-title)', marginBottom: '1rem' }}>
                Studio Amenities & Guest Protocol
              </h2>
              <p style={{ color: 'var(--text-body)', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                We believe exceptional photography begins with feeling completely at ease. Our studio provides everything necessary to make your session seamless and enjoyable.
              </p>
              <button
                onClick={() => setActivePage('booking')}
                className="btn-primary"
              >
                <Calendar size={16} />
                <span>Book Your Studio Session</span>
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.85rem' }}>
              {STUDIO_EXPERIENCE_DATA.amenities.map((amenity, aIdx) => (
                <div key={aIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.94rem', color: 'var(--text-body)' }}>
                  <CheckCircle size={18} color="var(--color-coral-red)" style={{ flexShrink: 0 }} />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal Lightbox */}
      {selectedStudioImage && typeof document !== 'undefined' && createPortal(
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(23, 17, 15, 0.92)',
          backdropFilter: 'blur(12px)',
          zIndex: 999999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }}>
          <div style={{ position: 'relative', maxWidth: '800px', width: '100%' }}>
            <button
              onClick={() => setSelectedStudioImage(null)}
              style={{
                position: 'absolute',
                top: '-3rem',
                right: 0,
                backgroundColor: 'transparent',
                border: 'none',
                color: '#FFF',
                cursor: 'pointer'
              }}
            >
              <X size={28} />
            </button>
            <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              <img
                src={selectedStudioImage.image}
                alt={selectedStudioImage.title}
                style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain' }}
              />
            </div>
            <div style={{ marginTop: '1rem', color: '#FFF', textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.3rem' }}>{selectedStudioImage.title}</h3>
              <p style={{ color: '#F5EDE8', fontSize: '0.9rem' }}>{selectedStudioImage.description}</p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
