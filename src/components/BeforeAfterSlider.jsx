import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, SlidersHorizontal, Eye } from 'lucide-react';
import defaultBeforeImg from '../assets/newborn_before_raw.jpg';
import defaultAfterImg from '../assets/newborn_after_fineart.jpg';

export default function BeforeAfterSlider({
  beforeImage = defaultBeforeImg,
  afterImage = defaultAfterImg,
  beforeLabel = 'Uncompressed RAW Capture',
  afterLabel = 'Lens & Leaf Signature Master Edit',
  title,
  subtitle
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    const onMouseUp = () => setIsDragging(false);
    const onMouseMove = (e) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };

    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [isDragging]);

  return (
    <div style={{ width: '100%', margin: '0 auto' }}>
      {(title || subtitle) && (
        <div style={{ marginBottom: '1.2rem', textAlign: 'center' }}>
          {title && (
            <h3 style={{ fontSize: '1.8rem', color: 'var(--text-title)', marginBottom: '0.4rem' }}>
              {title}
            </h3>
          )}
          {subtitle && (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Slider Interactive Window */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/9',
          maxHeight: '580px',
          overflow: 'hidden',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-hover)',
          border: '1px solid rgba(197, 160, 89, 0.4)',
          cursor: 'ew-resize',
          userSelect: 'none'
        }}
      >
        {/* Layer 1: "After" Image (Complete Fine Art Master Edit) */}
        <img
          src={afterImage}
          alt="Lens & Leaf Signature Master Edit"
          draggable={false}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            pointerEvents: 'none'
          }}
        />

        {/* Layer 2: "Before" Image (Uncompressed RAW Capture with clip-path) */}
        <img
          src={beforeImage}
          alt="Original RAW Capture"
          draggable={false}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
            WebkitClipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
            pointerEvents: 'none'
          }}
        />

        {/* Divider vertical white bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${sliderPosition}%`,
            width: '2px',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 0 12px rgba(0,0,0,0.6)',
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
            zIndex: 3
          }}
        />

        {/* Labels */}
        <div style={{
          position: 'absolute',
          top: '1.2rem',
          left: '1.2rem',
          backgroundColor: 'rgba(18, 13, 14, 0.75)',
          backdropFilter: 'blur(10px)',
          padding: '0.4rem 0.9rem',
          borderRadius: 'var(--radius-pill)',
          color: '#E0D4D8',
          fontSize: '0.78rem',
          fontWeight: 600,
          border: '1px solid rgba(255, 255, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          pointerEvents: 'none'
        }}>
          <SlidersHorizontal size={13} color="#BDB0B6" />
          <span>{beforeLabel}</span>
        </div>

        <div style={{
          position: 'absolute',
          top: '1.2rem',
          right: '1.2rem',
          backgroundColor: 'rgba(200, 82, 108, 0.85)',
          backdropFilter: 'blur(10px)',
          padding: '0.4rem 0.9rem',
          borderRadius: 'var(--radius-pill)',
          color: '#FFFFFF',
          fontSize: '0.78rem',
          fontWeight: 600,
          border: '1px solid rgba(255, 255, 255, 0.35)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          boxShadow: '0 4px 15px rgba(200, 82, 108, 0.4)',
          pointerEvents: 'none'
        }}>
          <Sparkles size={13} color="var(--gold-sheen)" />
          <span>{afterLabel}</span>
        </div>

        {/* Interactive Center Handle */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${sliderPosition}%`,
            width: '4px',
            transform: 'translateX(-50%)',
            pointerEvents: 'none'
          }}
        >
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            border: '2px solid var(--gold-primary)',
            boxShadow: '0 0 25px rgba(197, 160, 89, 0.6), 0 4px 12px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#1B1416'
          }}>
            <div style={{ display: 'flex', gap: '3px' }}>
              <span style={{ fontSize: '10px', color: 'var(--rose-primary)' }}>◀</span>
              <span style={{ fontSize: '10px', color: 'var(--gold-primary)' }}>▶</span>
            </div>
          </div>
        </div>

        {/* Hint banner at bottom */}
        <div style={{
          position: 'absolute',
          bottom: '0.8rem',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(0,0,0,0.65)',
          backdropFilter: 'blur(6px)',
          padding: '0.25rem 0.8rem',
          borderRadius: 'var(--radius-pill)',
          color: '#FFF',
          fontSize: '0.72rem',
          letterSpacing: '0.04em',
          pointerEvents: 'none'
        }}>
          Drag handle left or right to inspect color grading
        </div>
      </div>
    </div>
  );
}
