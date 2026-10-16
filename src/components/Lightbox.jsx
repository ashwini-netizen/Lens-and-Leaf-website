import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Camera, MapPin, Eye, Info } from 'lucide-react';

export default function Lightbox({ item, onClose, onPrev, onNext }) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onPrev, onNext]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 220);
  };

  if (!item) return null;

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(23, 17, 15, 0.96)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        opacity: isClosing ? 0 : 1,
        transform: isClosing ? 'scale(0.97)' : 'scale(1)',
        transition: 'opacity 0.22s ease-out, transform 0.22s ease-out',
      }}
    >
      {/* Top Controls Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.2rem 2.2rem',
        borderBottom: '1px solid rgba(250, 214, 210, 0.25)',
        backgroundColor: 'rgba(23, 17, 15, 0.8)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
          <span className="section-badge" style={{ margin: 0, backgroundColor: 'rgba(233, 75, 80, 0.2)', color: 'var(--color-coral-red)' }}>
            {item.category}
          </span>
          <h3 style={{ color: '#FFFFFF', fontSize: '1.25rem', margin: 0, fontFamily: 'var(--font-serif)', letterSpacing: '0.02em' }}>
            {item.title}
          </h3>
        </div>

        <button
          onClick={handleClose}
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(250, 214, 210, 0.3)',
            borderRadius: '50%',
            width: '42px',
            height: '42px',
            color: '#FFFFFF',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--color-coral-red)';
            e.currentTarget.style.borderColor = 'var(--color-coral-red)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.borderColor = 'rgba(250, 214, 210, 0.3)';
          }}
          aria-label="Close Preview"
        >
          <X size={20} />
        </button>
      </div>

      {/* Main Image Stage with Next/Previous Controls */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '1.5rem',
        overflow: 'hidden'
      }}>
        {/* Previous Button */}
        <button
          onClick={onPrev}
          style={{
            position: 'absolute',
            left: '2rem',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(23, 17, 15, 0.85)',
            border: '1px solid rgba(250, 214, 210, 0.35)',
            borderRadius: '50%',
            width: '52px',
            height: '52px',
            color: '#FFFFFF',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            boxShadow: '0 6px 24px rgba(0,0,0,0.6)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-coral-red)';
            e.currentTarget.style.backgroundColor = 'var(--color-coral-red)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(250, 214, 210, 0.35)';
            e.currentTarget.style.backgroundColor = 'rgba(23, 17, 15, 0.85)';
          }}
          aria-label="Previous image"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Next Button */}
        <button
          onClick={onNext}
          style={{
            position: 'absolute',
            right: '2rem',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(23, 17, 15, 0.85)',
            border: '1px solid rgba(250, 214, 210, 0.35)',
            borderRadius: '50%',
            width: '52px',
            height: '52px',
            color: '#FFFFFF',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            boxShadow: '0 6px 24px rgba(0,0,0,0.6)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-coral-red)';
            e.currentTarget.style.backgroundColor = 'var(--color-coral-red)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(250, 214, 210, 0.35)';
            e.currentTarget.style.backgroundColor = 'rgba(23, 17, 15, 0.85)';
          }}
          aria-label="Next image"
        >
          <ChevronRight size={28} />
        </button>

        {/* Photography Display */}
        <div style={{
          position: 'relative',
          maxHeight: '74vh',
          maxWidth: '85vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img
            src={item.image}
            alt={item.title}
            style={{
              maxHeight: '74vh',
              maxWidth: '85vw',
              objectFit: 'contain',
              borderRadius: 'var(--radius-lg)',
              boxShadow: '0 24px 70px rgba(0, 0, 0, 0.75)',
              border: '1px solid rgba(250, 214, 210, 0.2)'
            }}
          />
        </div>
      </div>

      {/* Metadata Bottom Bar */}
      <div style={{
        backgroundColor: '#1E1513',
        borderTop: '1px solid rgba(250, 214, 210, 0.2)',
        padding: '1.2rem 2.5rem',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.2rem',
        color: '#E8DFE3',
        fontSize: '0.88rem'
      }}>
        <div style={{ maxWidth: '620px' }}>
          <p style={{ color: '#FFF0E7', fontStyle: 'italic', marginBottom: '0.35rem', fontSize: '0.94rem' }}>
            "{item.caption}"
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-warm-orange)', fontSize: '0.82rem' }}>
            <MapPin size={13} color="var(--color-coral-red)" />
            <span>{item.location}</span>
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.4rem',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          padding: '0.65rem 1.3rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid rgba(250, 214, 210, 0.22)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-blush-pink)' }}>
            <Camera size={15} color="var(--color-coral-red)" />
            <span>{item.camera}</span>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>
          <span style={{ color: '#D5C7CB' }}>{item.lens}</span>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>
          <span style={{ color: 'var(--color-warm-orange)', fontWeight: 600 }}>{item.settings}</span>
        </div>
      </div>
    </div>
  );
}
