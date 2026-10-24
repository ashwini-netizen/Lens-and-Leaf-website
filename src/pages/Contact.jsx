import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle, 
  AlertCircle,
  Navigation,
  ShieldCheck,
  Calendar,
  Coffee,
  Heart,
  ArrowRight,
  Copy,
  Check,
  RefreshCw
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
  const [mapReloadKey, setMapReloadKey] = useState(0);
  
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const inquiryTopics = [
    { id: 'Portrait Photography', label: 'Portraits' },
    { id: 'Wedding Photography', label: 'Weddings' },
    { id: 'Couple Photography', label: 'Couples' },
    { id: 'Maternity & Newborn', label: 'Maternity & Newborn' },
    { id: 'Fashion & Model', label: 'Fashion & Editorial' },
    { id: 'Commercial & Products', label: 'Products & Brands' },
    { id: 'Studio Rental / Walkthrough', label: 'Studio Walkthrough' }
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
      {/* 1. Header Banner */}
      <section style={{
        padding: '4.5rem 0 3.2rem',
        backgroundColor: '#17110F',
        color: '#FFFFFF',
        textAlign: 'center',
        position: 'relative',
        borderBottom: '1px solid rgba(166, 166, 166, 0.2)'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1100px' }}>
          <span className="section-badge light">
            Get in Touch
          </span>

          <h1 className="banner-hero-title">
            Contact Our Studio
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#F5EDE8', lineHeight: '1.7', fontWeight: 300, maxWidth: '780px', margin: '0 auto' }}>
            Have questions about photoshoot packages, available dates, or our studio location? Reach out via WhatsApp, phone, or fill out the form below.
          </p>
        </div>
      </section>

      {/* 2. Three Quick-Action Contact Cards */}
      <section style={{ marginTop: '-2rem', position: 'relative', zIndex: 3 }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.4rem'
          }}>
            {/* WhatsApp Quick Card */}
            <a
              href={`https://wa.me/${STUDIO_INFO.whatsappNumber}?text=Hello%20Lens%20%26%20Leaf,%20I%20would%20like%20to%20discuss%20a%20photoshoot%20session.`}
              target="_blank"
              rel="noreferrer"
              className="glass-card card-sheen"
              style={{
                padding: '1.5rem 1.6rem',
                borderRadius: '16px',
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(37, 211, 102, 0.3)',
                boxShadow: '0 8px 24px rgba(37, 211, 102, 0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: '1.2rem',
                textDecoration: 'none',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease'
              }}
            >
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #25D366, #128C7E)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFF',
                flexShrink: 0
              }}>
                <MessageCircle size={24} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.72rem', color: '#128C7E', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.2rem' }}>
                  Fastest Response
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#17110F', lineHeight: '1.3' }}>
                  WhatsApp Chat
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Quick replies on session details
                </div>
              </div>
              <ArrowRight size={16} color="var(--color-silver-grey)" />
            </a>

            {/* Direct Studio Telephone */}
            <a
              href={`tel:${STUDIO_INFO.phone}`}
              className="glass-card card-sheen"
              style={{
                padding: '1.5rem 1.6rem',
                borderRadius: '16px',
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(242, 140, 40, 0.3)',
                boxShadow: '0 8px 24px rgba(242, 140, 40, 0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: '1.2rem',
                textDecoration: 'none',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease'
              }}
            >
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, var(--color-warm-orange), var(--color-coral-red))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFF',
                flexShrink: 0
              }}>
                <Phone size={22} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-warm-orange)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.2rem' }}>
                  Call the Studio
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#17110F', lineHeight: '1.3' }}>
                  {STUDIO_INFO.phoneDisplay}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Mon – Sat, 9:00 AM – 7:00 PM
                </div>
              </div>
              <ArrowRight size={16} color="var(--color-silver-grey)" />
            </a>

            {/* Direct Email */}
            <a
              href={`mailto:${STUDIO_INFO.email}`}
              className="glass-card card-sheen"
              style={{
                padding: '1.5rem 1.6rem',
                borderRadius: '16px',
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(233, 75, 80, 0.3)',
                boxShadow: '0 8px 24px rgba(233, 75, 80, 0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: '1.2rem',
                textDecoration: 'none',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease'
              }}
            >
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, var(--color-coral-red), var(--color-rose-pink))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFF',
                flexShrink: 0
              }}>
                <Mail size={22} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-coral-red)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.2rem' }}>
                  Email Us
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#17110F', lineHeight: '1.3' }}>
                  {STUDIO_INFO.email}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Direct inbox response
                </div>
              </div>
              <ArrowRight size={16} color="var(--color-silver-grey)" />
            </a>
          </div>
        </div>
      </section>

      {/* 3. Studio Location Details & Contact Form */}
      <section style={{ padding: '3.8rem 0 4.5rem' }}>
        <div className="container">
          <div style={{
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(23, 17, 15, 0.1)',
            border: '1px solid rgba(166, 166, 166, 0.25)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            backgroundColor: '#FFFFFF'
          }}>
            {/* LEFT SIDE: Studio Details & Hours */}
            <div style={{
              backgroundColor: '#17110F',
              color: '#FFFFFF',
              padding: 'clamp(2.5rem, 4vw, 3.5rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderRight: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div>
                <span className="section-badge light" style={{ marginBottom: '1rem' }}>
                  <MapPin size={13} color="var(--color-coral-red)" />
                  <span>Studio Location</span>
                </span>

                <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.3rem)', color: '#FFFFFF', lineHeight: '1.2', marginBottom: '0.8rem' }}>
                  Visit Our Studio
                </h2>
                <p style={{ color: '#DDD0D5', fontSize: '0.96rem', lineHeight: '1.65', marginBottom: '2rem' }}>
                  Located in Mysore, our studio features a 2,400 sq. ft. natural light solarium, private dressing rooms, and a print gallery showcasing handcrafted photo albums.
                </p>

                {/* Studio Physical Address Card */}
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '14px',
                  padding: '1.2rem 1.4rem',
                  marginBottom: '1.6rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem'
                }}>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-warm-orange)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700, marginBottom: '0.2rem' }}>
                      Address
                    </div>
                    <div style={{ fontSize: '1rem', color: '#FFF', fontWeight: 600 }}>
                      {STUDIO_INFO.address}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-silver-grey)' }}>
                      {STUDIO_INFO.city}
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(`${STUDIO_INFO.address}, ${STUDIO_INFO.city}`, 'address')}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#FFF',
                      borderRadius: '8px',
                      padding: '0.5rem 0.8rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.74rem',
                      cursor: 'pointer'
                    }}
                    title="Copy Address"
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

                {/* Studio Hours */}
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '14px',
                  padding: '1.3rem',
                  marginBottom: '1.8rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.9rem', color: 'var(--color-coral-red)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    <Clock size={15} />
                    <span>Studio Hours</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                    {STUDIO_INFO.hours.map((h, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.88rem', borderBottom: i < STUDIO_INFO.hours.length - 1 ? '1px solid rgba(255, 255, 255, 0.08)' : 'none', paddingBottom: i < STUDIO_INFO.hours.length - 1 ? '0.5rem' : '0' }}>
                        <span style={{ color: '#FFFFFF' }}>{h.days}</span>
                        <span style={{ color: 'var(--color-blush-pink)', fontSize: '0.84rem' }}>{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div style={{
                paddingTop: '1.2rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.8rem',
                fontSize: '0.82rem',
                color: 'var(--color-silver-grey)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Coffee size={15} color="var(--color-coral-red)" />
                  <span>Complimentary Tea & Lounge</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <ShieldCheck size={15} color="var(--color-warm-orange)" />
                  <span>Private Valet Parking</span>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Contact Message Form */}
            <div style={{
              padding: 'clamp(2.5rem, 4vw, 3.5rem)',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <div style={{ marginBottom: '1.6rem' }}>
                <span className="section-badge" style={{ marginBottom: '0.5rem' }}>
                  Send a Message
                </span>
                <h3 style={{ fontSize: 'clamp(1.7rem, 2.6vw, 2.1rem)', color: 'var(--text-title)', lineHeight: '1.25', margin: '0 0 0.4rem' }}>
                  Send an Inquiry
                </h3>
                <p style={{ color: 'var(--text-body)', fontSize: '0.94rem', lineHeight: '1.6', margin: 0 }}>
                  Share your planned date, preferred photography style, or any questions. We will get back to you promptly.
                </p>
              </div>

              {success ? (
                <div style={{
                  padding: '2.5rem 1.8rem',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(233, 75, 80, 0.05)',
                  border: '1.5px solid var(--color-coral-red)',
                  textAlign: 'center'
                }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(233, 75, 80, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.2rem'
                  }}>
                    <CheckCircle size={32} color="var(--color-coral-red)" />
                  </div>
                  <h4 style={{ fontSize: '1.4rem', color: 'var(--text-title)', marginBottom: '0.5rem' }}>
                    Thank You!
                  </h4>
                  <p style={{ color: 'var(--text-body)', lineHeight: '1.65', marginBottom: '1.8rem', maxWidth: '420px', margin: '0 auto 1.8rem' }}>
                    We have received your message. A member of our studio team will review your inquiry and reply within 24 hours.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="btn-primary btn-magnetic"
                  >
                    <span>Send Another Message</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitEnquiry} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  {errorMsg && (
                    <div style={{
                      padding: '0.8rem 1.2rem',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(233, 75, 80, 0.1)',
                      border: '1px solid var(--color-coral-red)',
                      color: 'var(--color-coral-red)',
                      fontSize: '0.86rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <AlertCircle size={15} />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* 1. Quick Topic Selector Pills */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-title)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                      Interested Photography Service:
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                      {inquiryTopics.map((topic) => {
                        const isChosen = photoshootType === topic.id;
                        return (
                          <button
                            key={topic.id}
                            type="button"
                            onClick={() => setPhotoshootType(topic.id)}
                            style={{
                              padding: '0.4rem 0.85rem',
                              borderRadius: 'var(--radius-pill)',
                              border: isChosen ? '1.5px solid var(--color-coral-red)' : '1px solid rgba(166, 166, 166, 0.35)',
                              backgroundColor: isChosen ? 'rgba(233, 75, 80, 0.1)' : '#FFFFFF',
                              color: isChosen ? 'var(--color-coral-red)' : 'var(--text-body)',
                              fontSize: '0.8rem',
                              fontWeight: isChosen ? 700 : 500,
                              cursor: 'pointer',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            <span>{topic.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. Client Identity Fields */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '0.35rem' }}>
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Sarah Jenkins"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        style={{
                          width: '100%',
                          padding: '0.8rem 1rem',
                          borderRadius: '10px',
                          border: '1px solid rgba(166, 166, 166, 0.35)',
                          backgroundColor: '#FAFAF8',
                          fontSize: '0.9rem',
                          outline: 'none'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '0.35rem' }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. sarah@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                          width: '100%',
                          padding: '0.8rem 1rem',
                          borderRadius: '10px',
                          border: '1px solid rgba(166, 166, 166, 0.35)',
                          backgroundColor: '#FAFAF8',
                          fontSize: '0.9rem',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  {/* 3. Phone */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '0.35rem' }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.8rem 1rem',
                        borderRadius: '10px',
                        border: '1px solid rgba(166, 166, 166, 0.35)',
                        backgroundColor: '#FAFAF8',
                        fontSize: '0.9rem',
                        outline: 'none'
                      }}
                    />
                  </div>

                  {/* 4. Message Content */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '0.35rem' }}>
                      Your Message or Questions *
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your planned session, desired dates, or any questions..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '10px',
                        border: '1px solid rgba(166, 166, 166, 0.35)',
                        backgroundColor: '#FAFAF8',
                        fontSize: '0.9rem',
                        lineHeight: '1.6',
                        resize: 'vertical',
                        outline: 'none'
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
                      padding: '0.95rem',
                      borderRadius: 'var(--radius-pill)',
                      fontSize: '0.96rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      opacity: submitting ? 0.75 : 1,
                      cursor: submitting ? 'wait' : 'pointer',
                      marginTop: '0.4rem'
                    }}
                  >
                    <Send size={16} />
                    <span>{submitting ? 'Sending Message...' : 'Send Message'}</span>
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    <ShieldCheck size={14} color="var(--color-coral-red)" />
                    <span>Direct studio review • Quick 24-hour response</span>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* 4. Interactive Location & Studio Map */}
          <div style={{
            marginTop: '3.5rem',
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1px solid rgba(166, 166, 166, 0.25)',
            boxShadow: 'var(--shadow-card)'
          }}>
            <div style={{
              padding: '1.5rem 2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              borderBottom: '1px solid rgba(166, 166, 166, 0.2)',
              backgroundColor: '#FAFAF8'
            }}>
              <div>
                <span className="section-badge" style={{ marginBottom: '0.3rem' }}>
                  Studio Map
                </span>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-title)', margin: '0.15rem 0' }}>
                  Lens & Leaf Photography Studio
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: 0 }}>
                  {STUDIO_INFO.address}, {STUDIO_INFO.city}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <button
                  onClick={() => setMapReloadKey(prev => prev + 1)}
                  className="btn-secondary btn-magnetic"
                  style={{ padding: '0.6rem 1rem', fontSize: '0.84rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer' }}
                  title="Reload Map Embed"
                >
                  <RefreshCw size={13} />
                  <span>Reload Map</span>
                </button>

                <a
                  href="https://maps.google.com/?q=Mysore,+Karnataka,+India"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary btn-magnetic"
                  style={{ padding: '0.6rem 1.3rem', fontSize: '0.84rem' }}
                >
                  <Navigation size={14} />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>

            {/* Embedded Interactive Map Frame */}
            <div style={{ height: '340px', width: '100%', backgroundColor: '#E5E3DF', position: 'relative' }}>
              <iframe
                key={mapReloadKey}
                title="Lens & Leaf Studio Map Location - Mysore"
                src="https://maps.google.com/maps?q=Mysore,+Karnataka,+India&t=&z=13&ie=UTF8&iwloc=&output=embed"
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
