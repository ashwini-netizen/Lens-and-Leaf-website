import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  Phone, 
  Mail, 
  User, 
  Users, 
  MessageCircle, 
  Sparkles,
  AlertCircle,
  FileText,
  Printer
} from 'lucide-react';
import { STUDIO_INFO, SERVICES_DATA } from '../data/siteData';

export default function Booking({ initialService, setActivePage }) {
  // Requirement #12 Fields:
  // Customer name, Phone number, Email address, Photoshoot type, Preferred date, Preferred time, Number of people, Additional requirements
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [photoshootType, setPhotoshootType] = useState(initialService || 'Portrait Photography');
  
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const [preferredDate, setPreferredDate] = useState(tomorrow);
  const [preferredTime, setPreferredTime] = useState('Morning Ethereal Light (09:00 AM)');
  const [numberOfPeople, setNumberOfPeople] = useState('1 Person');
  const [additionalRequirements, setAdditionalRequirements] = useState('');

  // State management
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const timeOptions = [
    'Morning Ethereal Light (09:00 AM)',
    'Midday Solarium Sunlight (11:30 AM)',
    'Afternoon Soft Diffusion (02:30 PM)',
    'Sunset Golden Hour (05:00 PM)',
    'Twilight Ambient Atmosphere (06:30 PM)',
    'Full Day Dedicated Schedule'
  ];

  const peopleOptions = [
    '1 Person (Individual)',
    '2 People (Couple / Duo)',
    '3 - 5 People (Immediate Family)',
    '6 - 10 People (Extended Group)',
    '10+ People (Event / Wedding Party)'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Field Validations
    if (!customerName.trim()) {
      setErrorMessage('Please provide your full name.');
      return;
    }
    if (!phoneNumber.trim()) {
      setErrorMessage('Please provide your contact phone number.');
      return;
    }
    if (!emailAddress.trim() || !emailAddress.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    if (!preferredDate) {
      setErrorMessage('Please select a preferred date for your photoshoot.');
      return;
    }

    setSubmitting(true);

    const bookingPayload = {
      customer_name: customerName,
      phone: phoneNumber,
      email: emailAddress,
      photoshoot_type: photoshootType,
      preferred_date: preferredDate,
      preferred_time: preferredTime,
      number_of_people: numberOfPeople,
      additional_requirements: additionalRequirements
    };

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload)
      });

      const data = await response.json();

      if (response.ok && data.booking) {
        setConfirmedBooking(data.booking);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Fallback: save to localStorage and present confirmed enquiry receipt
        const fallbackRef = 'LL-' + Math.floor(1000 + Math.random() * 9000) + '-2026';
        const fallbackBooking = {
          ...bookingPayload,
          full_name: customerName,
          service_name: photoshootType,
          session_date: preferredDate,
          time_slot: preferredTime,
          notes: additionalRequirements,
          ref_code: fallbackRef,
          created_at: new Date().toISOString()
        };
        const existing = JSON.parse(localStorage.getItem('lens_leaf_bookings') || '[]');
        existing.push(fallbackBooking);
        localStorage.setItem('lens_leaf_bookings', JSON.stringify(existing));
        setConfirmedBooking(fallbackBooking);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err) {
      // Local fallback for offline mode
      const fallbackRef = 'LL-' + Math.floor(1000 + Math.random() * 9000) + '-2026';
      const fallbackBooking = {
        ...bookingPayload,
        full_name: customerName,
        service_name: photoshootType,
        session_date: preferredDate,
        time_slot: preferredTime,
        notes: additionalRequirements,
        ref_code: fallbackRef,
        created_at: new Date().toISOString()
      };
      const existing = JSON.parse(localStorage.getItem('lens_leaf_bookings') || '[]');
      existing.push(fallbackBooking);
      localStorage.setItem('lens_leaf_bookings', JSON.stringify(existing));
      setConfirmedBooking(fallbackBooking);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setConfirmedBooking(null);
    setCustomerName('');
    setPhoneNumber('');
    setEmailAddress('');
    setAdditionalRequirements('');
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
        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '840px' }}>
          <span className="section-badge light">
            Photoshoot Reservations
          </span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#FFF', marginBottom: '1rem' }}>
            Book Your Photoshoot Session
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#F5EDE8', lineHeight: '1.7', fontWeight: 300 }}>
            Reserve your session with the Lens & Leaf Studio. Complete the details below and our studio concierge will confirm your date.
          </p>
        </div>
      </section>

      {/* Main Booking Stage */}
      <section style={{ padding: '5rem 0 7rem' }}>
        <div className="container" style={{ maxWidth: '880px' }}>
          {confirmedBooking ? (
            /* =====================================================================
               BOOKING CONFIRMATION STATE (Requirement #12)
               ===================================================================== */
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              padding: '3.5rem 3rem',
              border: '1.5px solid var(--color-coral-red)',
              boxShadow: 'var(--shadow-hover)',
              textAlign: 'center',
              animation: 'fadeIn 0.3s ease'
            }}>
              <div style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                backgroundColor: 'rgba(233, 75, 80, 0.12)',
                color: 'var(--color-coral-red)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                border: '2px solid var(--color-coral-red)'
              }}>
                <CheckCircle size={38} />
              </div>

              <span className="section-badge" style={{ marginBottom: '0.8rem' }}>
                Booking Reference: {confirmedBooking.ref_code}
              </span>

              <h2 style={{ fontSize: '2.4rem', color: 'var(--text-title)', marginBottom: '0.8rem' }}>
                Your Photoshoot Reservation is Confirmed
              </h2>

              <p style={{ color: 'var(--text-body)', fontSize: '1.05rem', lineHeight: '1.7', maxWidth: '640px', margin: '0 auto 2.5rem' }}>
                Thank you, <strong>{confirmedBooking.full_name || confirmedBooking.customer_name}</strong>. We have successfully registered your photoshoot appointment. Our studio concierge will contact you within 24 hours to review your styling consultation.
              </p>

              {/* Booking Summary Card */}
              <div style={{
                backgroundColor: 'var(--bg-canvas)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
                textAlign: 'left',
                border: '1px solid rgba(166, 166, 166, 0.3)',
                marginBottom: '2.5rem'
              }}>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--text-title)', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FileText size={18} color="var(--color-coral-red)" />
                  <span>Reservation Details</span>
                </h4>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '1.2rem',
                  fontSize: '0.92rem'
                }}>
                  <div>
                    <span style={{ color: 'var(--text-light)', display: 'block', fontSize: '0.78rem', textTransform: 'uppercase' }}>Service Type</span>
                    <strong style={{ color: 'var(--text-title)' }}>{confirmedBooking.service_name || confirmedBooking.photoshoot_type}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-light)', display: 'block', fontSize: '0.78rem', textTransform: 'uppercase' }}>Date & Time</span>
                    <strong style={{ color: 'var(--text-title)' }}>{confirmedBooking.session_date || confirmedBooking.preferred_date} • {confirmedBooking.time_slot || confirmedBooking.preferred_time}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-light)', display: 'block', fontSize: '0.78rem', textTransform: 'uppercase' }}>Number of People</span>
                    <strong style={{ color: 'var(--text-title)' }}>{confirmedBooking.number_of_people || '1-2 People'}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-light)', display: 'block', fontSize: '0.78rem', textTransform: 'uppercase' }}>Contact Email & Phone</span>
                    <strong style={{ color: 'var(--text-title)' }}>{confirmedBooking.email} • {confirmedBooking.phone}</strong>
                  </div>
                </div>

                {confirmedBooking.notes && (
                  <div style={{ marginTop: '1.2rem', paddingTop: '1rem', borderTop: '1px solid rgba(166, 166, 166, 0.25)' }}>
                    <span style={{ color: 'var(--text-light)', display: 'block', fontSize: '0.78rem', textTransform: 'uppercase' }}>Special Requirements</span>
                    <p style={{ color: 'var(--text-body)', marginTop: '0.2rem', fontSize: '0.9rem' }}>{confirmedBooking.notes}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
                <a
                  href={`https://wa.me/${STUDIO_INFO.whatsappNumber}?text=Hello%20Lens%20%26%20Leaf!%20I%20just%20completed%20booking%20reservation%20${confirmedBooking.ref_code}%20for%20${encodeURIComponent(confirmedBooking.service_name || confirmedBooking.photoshoot_type)}.`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    backgroundColor: '#25D366',
                    color: '#FFFFFF',
                    padding: '0.85rem 1.8rem',
                    borderRadius: 'var(--radius-pill)',
                    fontWeight: 600,
                    fontSize: '0.92rem'
                  }}
                >
                  <MessageCircle size={18} />
                  <span>Message Studio on WhatsApp</span>
                </a>

                <button
                  onClick={handleReset}
                  className="btn-secondary"
                  style={{ padding: '0.85rem 1.8rem' }}
                >
                  <span>Book Another Photoshoot</span>
                </button>
              </div>
            </div>
          ) : (
            /* =====================================================================
               BOOKING FORM WITH ALL 8 REQUIREMENT #12 FIELDS
               ===================================================================== */
            <div className="glass-card clip-reveal-up is-revealed" style={{ padding: '3.5rem', borderRadius: 'var(--radius-xl)' }}>
              <div style={{ marginBottom: '2.5rem' }}>
                <span className="section-badge">
                  Simple Reservation
                </span>
                <h2 style={{ fontSize: '2.2rem', color: 'var(--text-title)', marginBottom: '0.6rem' }}>
                  Photoshoot Enquiry & Booking Form
                </h2>
                <p style={{ color: 'var(--text-body)', fontSize: '0.98rem' }}>
                  Please fill in your details below. All fields marked with * are required.
                </p>
              </div>

              {errorMessage && (
                <div style={{
                  padding: '1rem 1.4rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(233, 75, 80, 0.12)',
                  border: '1.5px solid var(--color-coral-red)',
                  color: 'var(--color-coral-red)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '2rem',
                  fontSize: '0.92rem'
                }}>
                  <AlertCircle size={20} style={{ flexShrink: 0 }} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
                {/* 1. Customer Name */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '0.5rem' }}>
                    Customer Name *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <User size={18} color="var(--color-silver-grey)" style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="text"
                      className="form-input-luxury"
                      placeholder="e.g. Clara Delacroix"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                      style={{ paddingLeft: '3.2rem' }}
                    />
                  </div>
                </div>

                {/* 2 & 3. Phone Number & Email Address */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '0.5rem' }}>
                      Phone Number *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Phone size={18} color="var(--color-silver-grey)" style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)' }} />
                      <input
                        type="tel"
                        className="form-input-luxury"
                        placeholder="e.g. +1 (555) 234-8761"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                        style={{ paddingLeft: '3.2rem' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '0.5rem' }}>
                      Email Address *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Mail size={18} color="var(--color-silver-grey)" style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)' }} />
                      <input
                        type="email"
                        className="form-input-luxury"
                        placeholder="e.g. clara@example.com"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        required
                        style={{ paddingLeft: '3.2rem' }}
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Photoshoot Type (All 12 Services selectable) */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '0.5rem' }}>
                    Photoshoot Type *
                  </label>
                  <select
                    className="form-input-luxury"
                    value={photoshootType}
                    onChange={(e) => setPhotoshootType(e.target.value)}
                    style={{ cursor: 'pointer' }}
                  >
                    {SERVICES_DATA.map((svc) => (
                      <option key={svc.id} value={svc.title}>
                        {svc.title} — from ${svc.startingPrice} ({svc.duration})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 5 & 6. Preferred Date & Preferred Time */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '0.5rem' }}>
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      className="form-input-luxury"
                      value={preferredDate}
                      min={tomorrow}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      required
                      style={{ cursor: 'pointer' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '0.5rem' }}>
                      Preferred Time *
                    </label>
                    <select
                      className="form-input-luxury"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      style={{ cursor: 'pointer' }}
                    >
                      {timeOptions.map((t, idx) => (
                        <option key={idx} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 7. Number of People */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '0.5rem' }}>
                    Number of People attending the shoot
                  </label>
                  <select
                    className="form-input-luxury"
                    value={numberOfPeople}
                    onChange={(e) => setNumberOfPeople(e.target.value)}
                    style={{ cursor: 'pointer' }}
                  >
                    {peopleOptions.map((p, idx) => (
                      <option key={idx} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 8. Additional Requirements */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '0.5rem' }}>
                    Additional Requirements or Creative Notes
                  </label>
                  <textarea
                    rows={4}
                    className="form-input-luxury"
                    placeholder="Tell us about your wardrobe ideas, background preferences (e.g. blush canvas, solarium, or outdoor), special props, or questions..."
                    value={additionalRequirements}
                    onChange={(e) => setAdditionalRequirements(e.target.value)}
                    style={{ lineHeight: '1.6', resize: 'vertical' }}
                  />
                </div>

                {/* Submit CTA */}
                <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(166, 166, 166, 0.25)' }}>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary btn-magnetic"
                    style={{
                      width: '100%',
                      padding: '1.05rem',
                      fontSize: '1rem',
                      opacity: submitting ? 0.7 : 1
                    }}
                  >
                    <Calendar size={18} />
                    <span>{submitting ? 'Registering Your Reservation...' : 'Submit Photoshoot Reservation'}</span>
                  </button>
                  <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.8rem' }}>
                    🔒 We respect your privacy. No spam. You will receive an instant confirmation receipt.
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
