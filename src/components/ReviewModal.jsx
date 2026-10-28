import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Star, Sparkles, CheckCircle, AlertCircle } from 'lucide-react';

export default function ReviewModal({ isOpen, onClose, onReviewSubmitted }) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [clientName, setClientName] = useState('');
  const [serviceType, setServiceType] = useState('Luxury Wedding');
  const [headline, setHeadline] = useState('');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!clientName.trim() || !comment.trim()) {
      setErrorMsg('Please provide your name and your testimonial review.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_name: clientName,
          service_type: serviceType,
          rating,
          headline: headline || 'An Unforgettable Session',
          comment
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        if (onReviewSubmitted) onReviewSubmitted(data.review);
        setTimeout(() => {
          setSuccess(false);
          onClose();
        }, 2500);
      } else {
        setErrorMsg(data.error || 'Failed to submit review. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Could not connect to studio server. Please check your connection.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen || typeof document === 'undefined') return null;

  return createPortal(
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 10, 12, 0.85)',
      backdropFilter: 'blur(12px)',
      zIndex: 2500,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      animation: 'fadeIn 0.2s ease'
    }}>
      <div style={{
        backgroundColor: '#1C1417',
        border: '1px solid rgba(197, 160, 89, 0.35)',
        borderRadius: 'var(--radius-lg)',
        maxWidth: '560px',
        width: '100%',
        padding: '2.2rem',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)',
        color: '#FFFFFF',
        position: 'relative'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.2rem',
            right: '1.2rem',
            background: 'none',
            border: 'none',
            color: '#B5A5AC',
            cursor: 'pointer',
            padding: '0.4rem'
          }}
        >
          <X size={20} />
        </button>

        {success ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'rgba(200, 82, 108, 0.15)',
              border: '1px solid var(--rose-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.2rem',
              color: 'var(--rose-light)'
            }}>
              <CheckCircle size={32} />
            </div>
            <h3 style={{ fontSize: '1.8rem', color: '#FFF', marginBottom: '0.5rem' }}>
              Gratitude from Lens & Leaf
            </h3>
            <p style={{ color: '#D4C6CC', fontSize: '0.95rem', lineHeight: '1.6' }}>
              Your testimonial has been immortalized in our studio ledger. Thank you for entrusting us with your memories.
            </p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '1.6rem' }}>
              <span className="section-badge" style={{ marginBottom: '0.5rem' }}>
                Client Story
              </span>
              <h3 style={{ fontSize: '1.7rem', color: '#FFF' }}>
                Share Your Lens & Leaf Experience
              </h3>
              <p style={{ color: '#BDB0B6', fontSize: '0.88rem' }}>
                Your kind words inspire our craftsmanship and guide future clients on their creative journey.
              </p>
            </div>

            {errorMsg && (
              <div style={{
                backgroundColor: 'rgba(235, 87, 87, 0.15)',
                border: '1px solid rgba(235, 87, 87, 0.4)',
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                color: '#FFB8B8',
                fontSize: '0.85rem',
                marginBottom: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <AlertCircle size={16} />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {/* Star Rating Selector */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#E4D5DA', marginBottom: '0.4rem', fontWeight: 500 }}>
                  Your Overall Rating
                </label>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0.2rem',
                        color: (hoverRating || rating) >= star ? '#ECC480' : 'rgba(255,255,255,0.2)'
                      }}
                    >
                      <Star size={26} fill={(hoverRating || rating) >= star ? '#ECC480' : 'none'} />
                    </button>
                  ))}
                  <span style={{ fontSize: '0.85rem', color: '#ECC480', marginLeft: '0.5rem', alignSelf: 'center' }}>
                    {rating} out of 5 Stars
                  </span>
                </div>
              </div>

              {/* Client Name & Service */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <label style={{ fontSize: '0.85rem', color: '#E4D5DA', fontWeight: 500 }}>
                      Your Name / Names *
                    </label>
                    <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)' }}>Letters only</span>
                  </div>
                  <input
                    type="text"
                    required
                    maxLength={50}
                    placeholder="e.g. Clara & Julian"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value.replace(/[^a-zA-Z\s'&,-]/g, ''))}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(197, 160, 89, 0.35)',
                      color: '#FFF',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#E4D5DA', marginBottom: '0.4rem', fontWeight: 500 }}>
                    Commission Type
                  </label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      backgroundColor: '#271C20',
                      border: '1px solid rgba(197, 160, 89, 0.35)',
                      color: '#FFF',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  >
                    <option value="Luxury Wedding">Luxury Wedding</option>
                    <option value="Heirloom Portrait">Heirloom Portrait</option>
                    <option value="Maternity & Newborn">Maternity & Newborn</option>
                    <option value="Editorial & Fashion">Editorial & Fashion</option>
                    <option value="Couples & Proposal">Couples & Proposal</option>
                    <option value="Commercial & Brand">Commercial & Brand</option>
                  </select>
                </div>
              </div>

              {/* Review Headline */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#E4D5DA', marginBottom: '0.4rem', fontWeight: 500 }}>
                  Review Headline
                </label>
                <input
                  type="text"
                  placeholder="e.g. Beyond any expectation, pure poetic art"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(197, 160, 89, 0.35)',
                    color: '#FFF',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Review Body */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#E4D5DA', marginBottom: '0.4rem', fontWeight: 500 }}>
                  Your Story & Reflection *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="How did the shoot feel? How did you feel when you saw your final prints and gallery?"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(197, 160, 89, 0.35)',
                    color: '#FFF',
                    fontSize: '0.9rem',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    padding: '0.8rem 1.4rem',
                    borderRadius: 'var(--radius-pill)',
                    backgroundColor: 'transparent',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#FFF',
                    fontSize: '0.88rem',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-rose"
                  style={{
                    padding: '0.8rem 1.8rem',
                    fontSize: '0.88rem',
                    opacity: submitting ? 0.7 : 1
                  }}
                >
                  <Sparkles size={16} />
                  <span>{submitting ? 'Submitting Story...' : 'Publish Testimonial'}</span>
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
