import React from 'react';

export default function LuxuryEditorialSeal({ size = 110, light = false }) {
  const textColor = light ? '#FFF0E7' : '#17110F';
  const accentColor = '#E94B50';

  return (
    <div
      style={{
        position: 'relative',
        width: `${size}px`,
        height: `${size}px`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
      }}
    >
      {/* Rotating Circular Text Ring */}
      <svg
        viewBox="0 0 100 100"
        className="rotate-emblem"
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          inset: 0,
        }}
      >
        <path
          id="sealPath"
          d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          fill="none"
        />
        <text
          style={{
            fontSize: '9.2px',
            fontFamily: 'var(--font-sans)',
            fontWeight: 600,
            letterSpacing: '0.22em',
            fill: textColor,
            textTransform: 'uppercase',
          }}
        >
          <textPath href="#sealPath" startOffset="0%">
            ✦ LENS & LEAF STUDIO ✦ CAPTURING LIFE ✦ EST. 2026
          </textPath>
        </text>
      </svg>

      {/* Central Camera Lens & Leaf Micro Emblem */}
      <div
        style={{
          width: `${size * 0.44}px`,
          height: `${size * 0.44}px`,
          borderRadius: '50%',
          backgroundColor: light ? 'rgba(255, 255, 255, 0.12)' : 'rgba(250, 214, 210, 0.55)',
          border: `1.5px solid ${accentColor}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(233, 75, 80, 0.25)',
          overflow: 'hidden',
          padding: '2px',
        }}
      >
        <img
          src="/images/logo.png"
          alt="Lens & Leaf Emblem"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
    </div>
  );
}
