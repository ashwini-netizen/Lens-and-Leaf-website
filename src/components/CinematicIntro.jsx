import React, { useState, useEffect } from 'react';

export default function CinematicIntro({ onComplete }) {
  const [phase, setPhase] = useState('entering'); // 'entering' -> 'opening' -> 'done'
  const [isSkipped, setIsSkipped] = useState(false);

  useEffect(() => {
    // Check reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (onComplete) onComplete();
      return;
    }

    // Phase 1: Logo & Tagline bloom (0ms - 900ms)
    const t1 = setTimeout(() => {
      setPhase('opening');
    }, 1100);

    // Phase 2: Iris aperture expansion into homepage (1100ms - 1500ms)
    const t2 = setTimeout(() => {
      setPhase('done');
      if (onComplete) onComplete();
    }, 1550);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsSkipped(true);
    setPhase('done');
    if (onComplete) onComplete();
  };

  if (phase === 'done' || isSkipped) return null;

  return (
    <div
      aria-label="Cinematic Studio Opening"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999999,
        backgroundColor: '#17110F',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        pointerEvents: phase === 'opening' ? 'none' : 'auto',
        transition: 'opacity 0.5s ease-out',
        opacity: phase === 'opening' ? 0 : 1,
      }}
    >
      {/* Outer Breathing Lens Light Glows */}
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(233, 75, 80, 0.28) 0%, rgba(242, 140, 40, 0.15) 45%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'teardropGlow 3s ease-in-out infinite',
        }}
      />

      {/* Camera Iris Aperture Concentric Rings */}
      <div
        style={{
          position: 'relative',
          width: '180px',
          height: '180px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.8rem',
        }}
      >
        {/* Rotating Aperture Blades Ring */}
        <div
          className="aperture-spin"
          style={{
            position: 'absolute',
            inset: '-18px',
            borderRadius: '50%',
            border: '1.5px dashed rgba(247, 161, 167, 0.5)',
            boxShadow: '0 0 35px rgba(233, 75, 80, 0.3)',
          }}
        />

        {/* Concentric Water Ripple Rings */}
        <div className="water-ripple-ring" style={{ inset: '-12px' }} />
        <div className="water-ripple-ring delay-1" style={{ inset: '-28px' }} />

        {/* Central Logo Emblem */}
        <div
          style={{
            width: '110px',
            height: '110px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            border: '2.5px solid var(--color-coral-red)',
            overflow: 'hidden',
            boxShadow: '0 8px 30px rgba(233, 75, 80, 0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '3px',
            transform: phase === 'entering' ? 'scale(1)' : 'scale(1.15)',
            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <img
            src="/images/logo.png"
            alt="Lens & Leaf Official Identity"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Typography: Brand Title & Tagline with Word Stagger */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: '#FFFFFF',
            fontWeight: 400,
            letterSpacing: '0.04em',
            marginBottom: '0.4rem',
            lineHeight: 1.15,
          }}
        >
          <span className="word-reveal-wrap">
            <span className="word-reveal-item word-delay-1" style={{ color: '#FFFFFF' }}>Lens </span>
          </span>
          <span className="word-reveal-wrap">
            <span className="word-reveal-item word-delay-2" style={{ color: 'var(--color-warm-orange)', fontStyle: 'italic', fontWeight: 300 }}>& </span>
          </span>
          <span className="word-reveal-wrap">
            <span className="word-reveal-item word-delay-3" style={{ color: 'var(--color-rose-pink)' }}>Leaf</span>
          </span>
        </h1>

        <div className="word-reveal-wrap">
          <p
            className="word-reveal-item word-delay-4"
            style={{
              fontSize: '0.85rem',
              color: 'var(--color-blush-pink)',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              fontWeight: 500,
            }}
          >
            Capturing Life...
          </p>
        </div>

        {/* Animated Warm Orange Accent Line */}
        <div
          style={{
            width: '46px',
            height: '2px',
            background: 'linear-gradient(90deg, var(--color-warm-orange), var(--color-coral-red))',
            margin: '0.9rem auto 0',
            borderRadius: '2px',
          }}
        />
      </div>

      {/* Fast Skip Option */}
      <button
        onClick={handleSkip}
        style={{
          position: 'absolute',
          bottom: '2rem',
          right: '2rem',
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(250, 214, 210, 0.25)',
          borderRadius: 'var(--radius-pill)',
          padding: '0.45rem 1.1rem',
          color: 'var(--color-blush-pink)',
          fontSize: '0.75rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          backdropFilter: 'blur(8px)',
          transition: 'all 0.25s ease',
        }}
      >
        Enter Studio ↗
      </button>
    </div>
  );
}
