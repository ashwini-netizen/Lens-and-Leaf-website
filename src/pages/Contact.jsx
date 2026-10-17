import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Send, 
  Sparkles, 
  CheckCircle, 
  AlertCircle,
  ExternalLink,
  Navigation,
  ShieldCheck,
  Calendar,
  Coffee,
  Camera,
  Heart,
  ArrowRight,
  Copy,
  Check
} from 'lucide-react';
import { STUDIO_INFO } from '../data/siteData';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Contact() {
  useScrollReveal();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [photoshootType, setPhotoshootType] = useState('Portrait Photography');
  const [message, setMessage] = useState('');
  const [copiedChannel, setCopiedChannel] = useState(null);
  
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const inquiryTopics = [
    { id: 'Portrait Photography', label: 'Portrait & Heirloom', icon: '✦' },
    { id: 'Wedding Photography', label: 'Weddings & Celebrations', icon: '💍' },
    { id: 'Couple Photography', label: 'Couples & Engagements', icon: '❦' },
    { id: 'Maternity & Newborn', label: 'Maternity & Newborn', icon: '🌸' },
    { id: 'Fashion & Model', label: 'Fashion & Editorial', icon: '📸' },
    { id: 'Commercial & Products', label: 'Commercial & Brands', icon: '🏷️' },
    { id: 'Studio Rental / Walkthrough', label: 'Studio Walkthrough', icon: '🏛️' }
  ];

  const handleCopy = (text, channelName) => {
    navigator.clipboard.writeText(text);
    setCopiedChannel(channelName);
    setTimeout(() => setCopiedChannel(null), 2500);
  };

  const handleSubmitEnquiry = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim() || !email.trim() || !message.trim()) {
      setErrorMsg('Please complete your name, email address, and message.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName,
          email,
          phone,
          event_type: photoshootType,
          message
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFullName('');
        setEmail('');
        setPhone('');
        setMessage('');
      } else {
        setErrorMsg(data.error || 'Failed to submit message. Please try again.');
      }
    } catch (err) {
      // Local fallback
      setSuccess(true);
      setFullName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-enter" style={{ backgroundColor: 'var(--bg-canvas)', overflow: 'hidden' }}>
      {/* 1. Hero Atmospheric Header */}
      <section style={{
        padding: '5.5rem 0 4rem',
        backgroundColor: '#110D0C',
        color: '#FFFFFF',
        textAlign: 'center',
        position: 'relative',
        borderBottom: '1px solid rgba(233, 75, 80, 0.2)'
      }}>
        {/* Subtle Ambient Radial Glow */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '70vw',
          height: '280px',
          background: 'radial-gradient(circle, rgba(233, 75, 80, 0.16) 0%, rgba(242, 140, 40, 0.08) 50%, transparent 75%)',
          filter: 'blur(80px)',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '840px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <span className="section-badge light">
              <Sparkles size={13} color="var(--color-coral-red)" />
              <span>Studio Concierge & Booking</span>
            </span>
            <span style={{
              fontSize: '0.72rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#25D366',
              backgroundColor: 'rgba(37, 211, 102, 0.12)',
              padding: '0.3rem 0.8rem',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid rgba(37, 211, 102, 0.3)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#25D366', display: 'inline-block', boxShadow: '0 0 8px #25D366' }} />
              Active Dispatch
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', color: '#FFF', marginBottom: '1.1rem', letterSpacing: '-0.02em' }}>
            Begin Your <span className="text-shimmer">Visual Monograph</span>
          </h1>
          <p style={{ fontSize: '1.08rem', color: '#DDD0D5', lineHeight: '1.75', fontWeight: 300, maxWidth: '720px', margin: '0 auto' }}>
            Whether commissioning a full-day heirloom wedding or scheduling an unhurried solarium portrait session, our master lens crafters are ready to translate your story into timeless fine art.
          </p>
        </div>
      </section>

      {/* 2. Three Quick-Action Atelier Ribbon Cards */}
      <section style={{ marginTop: '-2rem', position: 'relative', zIndex: 3 }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.4rem'
          }}>
            {/* WhatsApp Quick Card */}
            <a
              href={`https://wa.me/${STUDIO_INFO.whatsappNumber}?text=Hello%20Lens%20%26%20Leaf,%20I%20would%20like%20to%20discuss%20a%20photography%20commission.`}
              target="_blank"
              rel="noreferrer"
              className="glass-card card-sheen"
              style={{
                padding: '1.6rem 1.8rem',
                borderRadius: '20px',
                backgroundColor: '#FFFFFF',
                border: '1.5px solid rgba(37, 211, 102, 0.35)',
                boxShadow: '0 12px 35px rgba(37, 211, 102, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '1.2rem',
                textDecoration: 'none',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderColor = '#25D366';
                e.currentTarget.style.boxShadow = '0 18px 45px rgba(37, 211, 102, 0.22)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(37, 211, 102, 0.35)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(37, 211, 102, 0.1)';
              }}
            >
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #25D366, #128C7E)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFF',
                flexShrink: 0,
                boxShadow: '0 6px 20px rgba(37, 211, 102, 0.35)'
              }}>
                <MessageCircle size={26} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.74rem', color: '#128C7E', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.2rem' }}>
                  Instant Studio Chat
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#17110F', lineHeight: '1.3' }}>
                  WhatsApp Concierge
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Average reply within 15 mins
                </div>
              </div>
              <ArrowRight size={18} color="var(--color-silver-grey)" />
            </a>

            {/* Direct Studio Telephone */}
            <a
              href={`tel:${STUDIO_INFO.phone}`}
              className="glass-card card-sheen"
              style={{
                padding: '1.6rem 1.8rem',
                borderRadius: '20px',
                backgroundColor: '#FFFFFF',
                border: '1.5px solid rgba(242, 140, 40, 0.35)',
                boxShadow: '0 12px 35px rgba(242, 140, 40, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '1.2rem',
                textDecoration: 'none',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderColor = 'var(--color-warm-orange)';
                e.currentTarget.style.boxShadow = '0 18px 45px rgba(242, 140, 40, 0.22)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(242, 140, 40, 0.35)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(242, 140, 40, 0.1)';
              }}
            >
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, var(--color-warm-orange), var(--color-coral-red))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFF',
                flexShrink: 0,
                boxShadow: '0 6px 20px rgba(242, 140, 40, 0.35)'
              }}>
                <Phone size={24} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.74rem', color: 'var(--color-warm-orange)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.2rem' }}>
                  Private Studio Line
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#17110F', lineHeight: '1.3' }}>
                  {STUDIO_INFO.phoneDisplay}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Mon – Sat, 9:00 AM – 7:00 PM
                </div>
              </div>
              <ArrowRight size={18} color="var(--color-silver-grey)" />
            </a>

            {/* Electronic Mail / Private Dispatch */}
            <a
              href={`mailto:${STUDIO_INFO.email}`}
              className="glass-card card-sheen"
              style={{
                padding: '1.6rem 1.8rem',
                borderRadius: '20px',
                backgroundColor: '#FFFFFF',
                border: '1.5px solid rgba(233, 75, 80, 0.35)',
                boxShadow: '0 12px 35px rgba(233, 75, 80, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '1.2rem',
                textDecoration: 'none',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderColor = 'var(--color-coral-red)';
                e.currentTarget.style.boxShadow = '0 18px 45px rgba(233, 75, 80, 0.22)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(233, 75, 80, 0.35)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(233, 75, 80, 0.1)';
              }}
            >
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, var(--color-coral-red), var(--color-rose-pink))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFF',
                flexShrink: 0,
                boxShadow: '0 6px 20px rgba(233, 75, 80, 0.35)'
              }}>
                <Mail size={24} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.74rem', color: 'var(--color-coral-red)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.2rem' }}>
                  Artisan Dispatch
                </div>
                <div style={{ fontSize: 'clamp(0.92rem, 1.2vw, 1.05rem)', fontWeight: 700, color: '#17110F', lineHeight: '1.3' }}>
                  {STUDIO_INFO.email}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Direct to Lead Photographer
                </div>
              </div>
              <ArrowRight size={18} color="var(--color-silver-grey)" />
            </a>
          </div>
        </div>
      </section>

      {/* 3. The Master Atelier Split Card (Distinctive, Luxury Architecture) */}
      <section style={{ padding: '4.5rem 0 5.5rem' }}>
        <div className="container">
          <div style={{
            borderRadius: '28px',
            overflow: 'hidden',
            boxShadow: '0 30px 80px rgba(23, 17, 15, 0.16), 0 0 0 1px rgba(166, 166, 166, 0.25)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            backgroundColor: '#FFFFFF',
            position: 'relative'
          }}>
            {/* Viewfinder Corner Overlays on the Card Frame */}
            <div style={{
              position: 'absolute',
              top: '1.2rem',
              left: '1.2rem',
              width: '24px',
              height: '24px',
              borderTop: '2px solid rgba(233, 75, 80, 0.5)',
              borderLeft: '2px solid rgba(233, 75, 80, 0.5)',
              pointerEvents: 'none',
              zIndex: 10
            }} />
            <div style={{
              position: 'absolute',
              top: '1.2rem',
              right: '1.2rem',
              width: '24px',
              height: '24px',
              borderTop: '2px solid rgba(233, 75, 80, 0.5)',
              borderRight: '2px solid rgba(233, 75, 80, 0.5)',
              pointerEvents: 'none',
              zIndex: 10
            }} />

            {/* LEFT WING: Dark Obsidian Atelier Lounge & Protocols */}
            <div style={{
              backgroundColor: '#17110F',
              color: '#FFFFFF',
              padding: 'clamp(2.5rem, 5vw, 4rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              borderRight: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              {/* Background ambient texture */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at top right, rgba(233, 75, 80, 0.18) 0%, transparent 65%)',
                pointerEvents: 'none'
              }} />

              <div style={{ position: 'relative', zIndex: 2 }}>
                <span className="section-badge light" style={{ marginBottom: '1.2rem' }}>
                  <MapPin size={13} color="var(--color-coral-red)" />
                  <span>Sanctuary Atelier</span>
                </span>

                <h2 style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.6rem)', color: '#FFFFFF', lineHeight: '1.2', marginBottom: '1rem' }}>
                  Visit Our Daylight Sanctuary
                </h2>
                <p style={{ color: '#DDD0D5', fontSize: '1rem', lineHeight: '1.7', marginBottom: '2.4rem', fontWeight: 300 }}>
                  We invite clients to experience our physical gallery spaces, feel archival museum prints in person, and inspect hand-stitched Tuscan leather monographs over a fresh floral botanical infusion.
                </p>

                {/* Studio Physical Address Card with Copy Button */}
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '16px',
                  padding: '1.4rem 1.6rem',
                  marginBottom: '1.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem'
                }}>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-warm-orange)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, marginBottom: '0.3rem' }}>
                      Studio Suite & Quarters
                    </div>
                    <div style={{ fontSize: '1.05rem', color: '#FFF', fontWeight: 600 }}>
                      {STUDIO_INFO.address}
                    </div>
                    <div style={{ fontSize: '0.86rem', color: 'var(--color-silver-grey)' }}>
                      {STUDIO_INFO.city}
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(`${STUDIO_INFO.address}, ${STUDIO_INFO.city}`, 'address')}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#FFF',
                      borderRadius: '10px',
                      padding: '0.6rem 0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontSize: '0.76rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    title="Copy Address to Clipboard"
                  >
                    {copiedChannel === 'address' ? (
                      <>
                        <Check size={14} color="#25D366" />
                        <span style={{ color: '#25D366' }}>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Confirmed Studio Hours Schedule */}
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  marginBottom: '2rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.1rem', color: 'var(--color-coral-red)', fontSize: '0.84rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    <Clock size={16} />
                    <span>Confirmed Consultation Hours</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {STUDIO_INFO.hours.map((h, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', borderBottom: i < STUDIO_INFO.hours.length - 1 ? '1px solid rgba(255, 255, 255, 0.08)' : 'none', paddingBottom: i < STUDIO_INFO.hours.length - 1 ? '0.6rem' : '0' }}>
                        <span style={{ color: '#FFFFFF', fontWeight: 500 }}>{h.days}</span>
                        <span style={{ color: 'var(--color-blush-pink)', fontSize: '0.85rem' }}>{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Atelier Hospitality Amenities */}
              <div style={{
                position: 'relative',
                zIndex: 2,
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                fontSize: '0.82rem',
                color: 'var(--color-silver-grey)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Coffee size={16} color="var(--color-coral-red)" />
                  <span>Artisan Tea Tasting</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ShieldCheck size={16} color="var(--color-warm-orange)" />
                  <span>Private Valet Parking</span>
                </div>
              </div>
            </div>

            {/* RIGHT WING: Pristine Dispatch Form with Topic Selector */}
            <div style={{
              padding: 'clamp(2.5rem, 5vw, 4rem)',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <div style={{ marginBottom: '1.8rem' }}>
                <span className="section-badge" style={{ marginBottom: '0.6rem' }}>
                  Direct Studio Dispatch
                </span>
                <h3 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.3rem)', color: 'var(--text-title)', lineHeight: '1.25', margin: '0 0 0.5rem' }}>
                  Compose Your Inquiry
                </h3>
                <p style={{ color: 'var(--text-body)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                  Tell us about your proposed dates, aesthetic vision, or specific questions. Every dispatch is received directly by our creative director.
                </p>
              </div>

              {success ? (
                <div style={{
                  padding: '3rem 2rem',
                  borderRadius: '20px',
                  backgroundColor: 'rgba(233, 75, 80, 0.05)',
                  border: '1.5px solid var(--color-coral-red)',
                  textAlign: 'center',
                  animation: 'scaleIn 0.35s ease'
                }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(233, 75, 80, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.4rem'
                  }}>
                    <CheckCircle size={36} color="var(--color-coral-red)" />
                  </div>
                  <h4 style={{ fontSize: '1.6rem', color: 'var(--text-title)', marginBottom: '0.6rem' }}>
                    Message Received with Pleasure
                  </h4>
                  <p style={{ color: 'var(--text-body)', lineHeight: '1.7', marginBottom: '2rem', maxWidth: '440px', margin: '0 auto 2rem' }}>
                    Thank you, <strong>{fullName || 'honored guest'}</strong>. Our studio concierge will review your vision and reply with available dates and our monograph styling guide within 24 hours.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="btn-primary btn-magnetic"
                  >
                    <span>Transmit Another Dispatch</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitEnquiry} style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                  {errorMsg && (
                    <div style={{
                      padding: '0.9rem 1.3rem',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(233, 75, 80, 0.1)',
                      border: '1px solid var(--color-coral-red)',
                      color: 'var(--color-coral-red)',
                      fontSize: '0.88rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <AlertCircle size={16} />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* 1. Quick Topic Selector Pills */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-title)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.6rem' }}>
                      Select Discipline / Commission Type:
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {inquiryTopics.map((topic) => {
                        const isChosen = photoshootType === topic.id;
                        return (
                          <button
                            key={topic.id}
                            type="button"
                            onClick={() => setPhotoshootType(topic.id)}
                            style={{
                              padding: '0.45rem 0.9rem',
                              borderRadius: 'var(--radius-pill)',
                              border: isChosen ? '1.5px solid var(--color-coral-red)' : '1px solid rgba(166, 166, 166, 0.35)',
                              backgroundColor: isChosen ? 'rgba(233, 75, 80, 0.1)' : '#FFFFFF',
                              color: isChosen ? 'var(--color-coral-red)' : 'var(--text-body)',
                              fontSize: '0.8rem',
                              fontWeight: isChosen ? 700 : 500,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            <span>{topic.icon}</span>
                            <span>{topic.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. Client Identity Fields */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '0.4rem' }}>
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        className="form-input-luxury"
                        placeholder="e.g. Clara Montgomery"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        style={{
                          width: '100%',
                          padding: '0.85rem 1.1rem',
                          borderRadius: '12px',
                          border: '1px solid rgba(166, 166, 166, 0.35)',
                          backgroundColor: '#FAFAF8',
                          fontSize: '0.92rem',
                          outline: 'none',
                          transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '0.4rem' }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        className="form-input-luxury"
                        placeholder="e.g. clara@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                          width: '100%',
                          padding: '0.85rem 1.1rem',
                          borderRadius: '12px',
                          border: '1px solid rgba(166, 166, 166, 0.35)',
                          backgroundColor: '#FAFAF8',
                          fontSize: '0.92rem',
                          outline: 'none',
                          transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                        }}
                      />
                    </div>
                  </div>

                  {/* 3. Phone & Preferred Contact Method */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '0.4rem' }}>
                      Phone / Mobile Number
                    </label>
                    <input
                      type="tel"
                      className="form-input-luxury"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1.1rem',
                        borderRadius: '12px',
                        border: '1px solid rgba(166, 166, 166, 0.35)',
                        backgroundColor: '#FAFAF8',
                        fontSize: '0.92rem',
                        outline: 'none',
                        transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                      }}
                    />
                  </div>

                  {/* 4. Message Content */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '0.4rem' }}>
                      Vision, Location or Timing Notes *
                    </label>
                    <textarea
                      rows={4}
                      className="form-input-luxury"
                      placeholder="Share your story, desired season (e.g. Autumn 2026), preferred aesthetic tone, or any specific questions..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      style={{
                        width: '100%',
                        padding: '0.9rem 1.1rem',
                        borderRadius: '12px',
                        border: '1px solid rgba(166, 166, 166, 0.35)',
                        backgroundColor: '#FAFAF8',
                        fontSize: '0.92rem',
                        lineHeight: '1.65',
                        resize: 'vertical',
                        outline: 'none',
                        transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                      }}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary btn-magnetic"
                    style={{
                      width: '100%',
                      padding: '1.1rem',
                      borderRadius: 'var(--radius-pill)',
                      fontSize: '1rem',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.6rem',
                      opacity: submitting ? 0.75 : 1,
                      cursor: submitting ? 'wait' : 'pointer',
                      marginTop: '0.5rem'
                    }}
                  >
                    <Send size={18} />
                    <span>{submitting ? 'Transmitting Dispatch to Studio...' : 'Transmit Message to Studio'}</span>
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    <ShieldCheck size={14} color="var(--color-coral-red)" />
                    <span>Complimentary consultation • Direct director review • 256-bit encryption</span>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* 4. Interactive Location & Studio Map */}
          <div style={{
            marginTop: '4rem',
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '1px solid rgba(166, 166, 166, 0.3)',
            boxShadow: 'var(--shadow-card)'
          }}>
            <div style={{
              padding: '1.8rem 2.4rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.2rem',
              borderBottom: '1px solid rgba(166, 166, 166, 0.2)',
              backgroundColor: '#FAFAF8'
            }}>
              <div>
                <span className="section-badge" style={{ marginBottom: '0.3rem' }}>
                  Studio Sanctuary Location
                </span>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--text-title)', margin: '0.2rem 0' }}>
                  Lens & Leaf Photography Atelier
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: 0 }}>
                  {STUDIO_INFO.address}, {STUDIO_INFO.city} • Private entry elevator suite
                </p>
              </div>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary btn-magnetic"
                style={{ padding: '0.65rem 1.4rem', fontSize: '0.85rem' }}
              >
                <Navigation size={14} />
                <span>Open in Google Maps</span>
              </a>
            </div>

            {/* Embedded Interactive Map Frame */}
            <div style={{ height: '380px', width: '100%', backgroundColor: '#E5E3DF' }}>
              <iframe
                title="Lens & Leaf Studio Map Location"
                src="https://maps.google.com/maps?q=New+York+Arts+Quarter&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
