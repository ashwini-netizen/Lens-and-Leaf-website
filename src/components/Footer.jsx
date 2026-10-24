import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Heart, 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  ShieldCheck, 
  MessageCircle,
  X,
  FileText
} from 'lucide-react';
import { STUDIO_INFO, SERVICES_DATA } from '../data/siteData';
import logoImg from '../assets/logo.png';

// Clean SVG social icons with authentic geometries
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export default function Footer({ setActivePage }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [policyModal, setPolicyModal] = useState(null); // 'privacy' | 'terms' | null
  const [activeSocial, setActiveSocial] = useState(null);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail && newsletterEmail.includes('@')) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const nav = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      backgroundColor: '#17110F',
      color: '#E8DFE3',
      borderTop: '1px solid rgba(166, 166, 166, 0.25)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative ambient background glows */}
      <div style={{
        position: 'absolute',
        top: '-150px',
        left: '20%',
        width: '450px',
        height: '450px',
        background: 'radial-gradient(circle, rgba(233, 75, 80, 0.1) 0%, transparent 70%)',
        filter: 'blur(70px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-150px',
        right: '15%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(242, 140, 40, 0.08) 0%, transparent 70%)',
        filter: 'blur(70px)',
        pointerEvents: 'none'
      }} />

      {/* Main Footer Grid (Requirement #16) */}
      <div className="container" style={{ paddingTop: '5rem', paddingBottom: '3.5rem', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '3rem',
          marginBottom: '4rem'
        }}>
          {/* Column 1: Lens & Leaf Brand, Logo & Tagline */}
          <div style={{ maxWidth: '340px' }}>
            <div 
              onClick={() => nav('home')}
              style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', cursor: 'pointer', marginBottom: '1.2rem' }}
            >
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '1.5px solid var(--color-coral-red)',
                backgroundColor: '#FFFFFF',
                flexShrink: 0
              }}>
                <img 
                  src={logoImg} 
                  alt="Lens & Leaf Official Brand Identity" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#FFF' }}>
                  Lens <span style={{ color: 'var(--color-warm-orange)', fontStyle: 'italic' }}>&</span> Leaf
                </div>
                <div style={{ fontSize: '0.68rem', color: 'var(--color-blush-pink)', letterSpacing: '0.26em', textTransform: 'uppercase' }}>
                  Capturing Life...
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.9rem', lineHeight: '1.7', color: '#B8A8AF', marginBottom: '1.5rem' }}>
              A boutique photography studio where floral inspiration meets the precision of a camera lens. Dedicated to capturing moments that deserve to last forever.
            </p>

            {/* Social Media Links with Authentic App Colors on Click & Hover */}
            <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="Lens & Leaf Instagram"
                title="Follow on Instagram"
                onClick={() => setActiveSocial(prev => prev === 'instagram' ? null : 'instagram')}
                className={`footer-social-btn instagram ${activeSocial === 'instagram' ? 'is-active' : ''}`}
              >
                <InstagramIcon />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="Lens & Leaf Facebook"
                title="Follow on Facebook"
                onClick={() => setActiveSocial(prev => prev === 'facebook' ? null : 'facebook')}
                className={`footer-social-btn facebook ${activeSocial === 'facebook' ? 'is-active' : ''}`}
              >
                <FacebookIcon />
              </a>
              <a 
                href={`https://wa.me/${STUDIO_INFO.whatsappNumber}`} 
                target="_blank" 
                rel="noreferrer"
                aria-label="Lens & Leaf WhatsApp"
                title="Chat on WhatsApp"
                onClick={() => setActiveSocial(prev => prev === 'whatsapp' ? null : 'whatsapp')}
                className={`footer-social-btn whatsapp ${activeSocial === 'whatsapp' ? 'is-active' : ''}`}
              >
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Navigation Links */}
          <div>
            <h4 style={{ 
              color: '#FFF', 
              fontSize: '1.15rem', 
              marginBottom: '1.4rem', 
              letterSpacing: '0.04em',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Sparkles size={16} color="var(--color-coral-red)" />
              <span>Quick Navigation</span>
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About Us' },
                { id: 'packages', label: 'Photoshoot Packages' },
                { id: 'portfolio', label: 'Portfolio & Gallery' },
                { id: 'studio', label: 'Studio Experience' },
                { id: 'booking', label: 'Book a Photoshoot' },
                { id: 'faqs', label: 'Frequently Asked Questions' },
                { id: 'contact', label: 'Contact Us' }
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => nav(item.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#BDB0B6',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      padding: 0,
                      textAlign: 'left',
                      transition: 'color 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-coral-red)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#BDB0B6'}
                  >
                    <span style={{ color: 'var(--color-coral-red)', fontSize: '0.75rem' }}>›</span>
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Photography Services List (Requirement #16) */}
          <div>
            <h4 style={{ 
              color: '#FFF', 
              fontSize: '1.15rem', 
              marginBottom: '1.4rem', 
              letterSpacing: '0.04em',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Heart size={16} color="var(--color-coral-red)" />
              <span>Photography Services</span>
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem' }}>
              {SERVICES_DATA.slice(0, 7).map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => nav('services')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#BDB0B6',
                      cursor: 'pointer',
                      padding: 0,
                      textAlign: 'left',
                      fontSize: '0.88rem',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-coral-red)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#BDB0B6'}
                  >
                    {s.title}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => nav('services')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-warm-orange)',
                    cursor: 'pointer',
                    padding: 0,
                    fontWeight: 600,
                    fontSize: '0.84rem'
                  }}
                >
                  + View All 12 Services →
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Details & Opening Hours */}
          <div>
            <h4 style={{ 
              color: '#FFF', 
              fontSize: '1.15rem', 
              marginBottom: '1.4rem', 
              letterSpacing: '0.04em',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Clock size={16} color="var(--color-coral-red)" />
              <span>Studio Contact</span>
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.88rem', color: '#C2B5BC' }}>
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                <MapPin size={18} color="var(--color-coral-red)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                <div>
                  <div style={{ color: '#FFF', fontWeight: 500 }}>{STUDIO_INFO.address}</div>
                  <div style={{ fontSize: '0.8rem', color: '#9E8F96' }}>{STUDIO_INFO.city}</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                <Phone size={16} color="var(--color-warm-orange)" />
                <a href={`tel:${STUDIO_INFO.phone}`} style={{ color: '#FFF' }}>
                  {STUDIO_INFO.phoneDisplay}
                </a>
              </div>

              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                <Mail size={16} color="var(--color-blush-pink)" />
                <a href={`mailto:${STUDIO_INFO.email}`} style={{ color: '#FFF' }}>
                  {STUDIO_INFO.email}
                </a>
              </div>

              {/* Newsletter / Journal */}
              <div style={{ marginTop: '0.8rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: '0.8rem', color: '#DDD', marginBottom: '0.5rem' }}>
                  Join our private studio journal list:
                </div>
                {subscribed ? (
                  <div style={{ color: '#4ECA81', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <CheckCircle size={14} />
                    <span>Welcome to the Lens & Leaf circle.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.4rem' }}>
                    <input
                      type="email"
                      placeholder="Your email..."
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      required
                      style={{
                        padding: '0.55rem 0.85rem',
                        borderRadius: 'var(--radius-pill)',
                        border: '1px solid rgba(166, 166, 166, 0.4)',
                        backgroundColor: 'rgba(255,255,255,0.08)',
                        color: '#FFF',
                        fontSize: '0.82rem',
                        outline: 'none',
                        flex: 1
                      }}
                    />
                    <button
                      type="submit"
                      style={{
                        padding: '0.55rem 1rem',
                        borderRadius: 'var(--radius-pill)',
                        backgroundColor: 'var(--color-coral-red)',
                        color: '#FFF',
                        border: 'none',
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                        fontWeight: 600
                      }}
                    >
                      Join
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Privacy & Terms Links */}
        <div style={{
          borderTop: '1px solid rgba(166, 166, 166, 0.2)',
          paddingTop: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          fontSize: '0.82rem',
          color: '#8E7F85'
        }}>
          <div>
            © {new Date().getFullYear()} Lens & Leaf Photography Studio. “Capturing Life…” All rights reserved.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <button 
              onClick={() => setPolicyModal('privacy')}
              style={{ background: 'none', border: 'none', color: '#BDB0B6', cursor: 'pointer', padding: 0 }}
            >
              Privacy Policy
            </button>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>
            <button 
              onClick={() => setPolicyModal('terms')}
              style={{ background: 'none', border: 'none', color: '#BDB0B6', cursor: 'pointer', padding: 0 }}
            >
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Policy & Terms Modal */}
      {policyModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(23, 17, 15, 0.92)',
          backdropFilter: 'blur(12px)',
          zIndex: 3500,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            maxWidth: '680px',
            width: '100%',
            maxHeight: '80vh',
            overflowY: 'auto',
            padding: '2.5rem',
            position: 'relative',
            color: 'var(--text-body)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.4)'
          }}>
            <button
              onClick={() => setPolicyModal(null)}
              style={{
                position: 'absolute',
                top: '1.2rem',
                right: '1.2rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-title)'
              }}
            >
              <X size={24} />
            </button>

            <h3 style={{ fontSize: '1.8rem', color: 'var(--text-title)', marginBottom: '1rem' }}>
              {policyModal === 'privacy' ? 'Privacy & Data Protection Policy' : 'Terms & Conditions of Commission'}
            </h3>

            {policyModal === 'privacy' ? (
              <div style={{ fontSize: '0.94rem', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p>
                  At Lens & Leaf, we respect client confidentiality and image privacy. Personal information collected during bookings or consultations is used strictly for scheduling, session preparation, and gallery delivery.
                </p>
                <p>
                  We never sell or distribute your contact details to third parties. Private online galleries are password-protected with 256-bit encryption. Public portfolio display of client photographs is always subject to mutual consent.
                </p>
                <p>
                  If you have any questions regarding your data or wish to request image deletion, please email concierge@lensandleafstudio.com.
                </p>
              </div>
            ) : (
              <div style={{ fontSize: '0.94rem', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p>
                  <strong>Session Reservations:</strong> A photoshoot is confirmed upon receipt of booking submission and initial consultation confirmation with the studio concierge.
                </p>
                <p>
                  <strong>Image Rights & Licensing:</strong> All commissioned sessions include personal, non-commercial digital reproduction and printing rights for life. Commercial, advertising, or third-party publication requires an official commercial release agreement.
                </p>
                <p>
                  <strong>Rescheduling:</strong> Sessions may be rescheduled with at least 48 hours notice. Inclement weather for outdoor shoots allows complimentary studio transfer or backup date coordination.
                </p>
              </div>
            )}

            <div style={{ marginTop: '2rem', textAlign: 'right' }}>
              <button
                onClick={() => setPolicyModal(null)}
                className="btn-primary"
                style={{ padding: '0.65rem 1.6rem', fontSize: '0.85rem' }}
              >
                Understood & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
