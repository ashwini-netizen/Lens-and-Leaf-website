import React, { useMemo } from 'react';

/**
 * AmbientCameraOptics (Replaces botanical leaves with high-end camera & optical elements)
 * - Camera Aperture Blades (Rotating iris diaphragm)
 * - Viewfinder Autofocus Reticles ([ + ] focus brackets)
 * - Concentric Optical Lens Glass Rings (barrel index ticks)
 * - Cinematic 4-Point Prismatic Starburst Glints
 * - Luminous Camera Bokeh Rings
 * Styled in the official 7 brand colors: Lightest Blush Pink (#FAD6D2), Rose Pink (#F7A1A7), 
 * Warm Orange (#F28C28), Coral Red (#E94B50), and Cream/Peach (#FFF0E7).
 */
export default function AmbientFloralParticles() {
  const particles = useMemo(() => {
    const types = ['aperture', 'reticle', 'lensRing', 'starburst', 'bokeh'];
    const colors = [
      '#FAD6D2', // Lightest blush pink
      '#F7A1A7', // Rose pink
      '#F28C28', // Warm orange optical sheen
      '#E94B50', // Coral red indicator
      '#FFF0E7', // Cream peach highlight
    ];

    return Array.from({ length: 22 }, (_, i) => {
      const type = types[i % types.length];
      const color = colors[i % colors.length];
      
      // Sizes tailored to element type
      let size = 28;
      if (type === 'aperture') size = 26 + (i % 3) * 6; // 26px - 38px
      if (type === 'reticle') size = 24 + (i % 3) * 5;  // 24px - 34px
      if (type === 'lensRing') size = 30 + (i % 3) * 8; // 30px - 46px
      if (type === 'starburst') size = 18 + (i % 3) * 6; // 18px - 30px
      if (type === 'bokeh') size = 36 + (i % 4) * 12;   // 36px - 72px

      return {
        id: i,
        type,
        size,
        color,
        left: `${(i * 4.6 + (i % 5) * 3) % 94 + 2}%`,
        top: `${(i * 5.4 + (i % 7) * 4) % 92 + 3}%`,
        duration: `${16 + (i % 6) * 4}s`,
        delay: `${-(i * 1.5)}s`,
        opacity: type === 'bokeh' 
          ? 0.12 + (i % 3) * 0.05 
          : 0.28 + (i % 4) * 0.08,
      };
    });
  }, []);

  return (
    <div 
      aria-hidden="true" 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 3,
        overflow: 'hidden'
      }}
    >
      {/* Soft Ambient Prismatic Glow in Lightest Pink & Warm Amber */}
      <div 
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-8%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(250, 214, 210, 0.18) 0%, rgba(247, 161, 167, 0.08) 35%, transparent 70%)',
          filter: 'blur(75px)',
          pointerEvents: 'none',
          animation: 'opticalPrismBreath 14s ease-in-out infinite alternate'
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '-12%',
          left: '-8%',
          width: '540px',
          height: '540px',
          background: 'radial-gradient(circle, rgba(242, 140, 40, 0.12) 0%, rgba(250, 214, 210, 0.06) 40%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          animation: 'opticalPrismBreath 16s ease-in-out infinite alternate-reverse'
        }}
      />

      {particles.map((p) => {
        // 1. Camera Aperture Diaphragm (6 Interlocking Blades Iris)
        if (p.type === 'aperture') {
          return (
            <div
              key={p.id}
              style={{
                position: 'absolute',
                left: p.left,
                top: p.top,
                width: `${p.size}px`,
                height: `${p.size}px`,
                opacity: p.opacity,
                animation: `apertureFloatRotate ${p.duration} ease-in-out infinite alternate`,
                animationDelay: p.delay,
                transformOrigin: 'center center'
              }}
            >
              <svg 
                viewBox="0 0 40 40" 
                fill="none" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.12))' 
                }}
              >
                {/* Outer Lens Aperture Ring */}
                <circle cx="20" cy="20" r="18" stroke={p.color} strokeWidth="1.2" strokeOpacity="0.75" />
                <circle cx="20" cy="20" r="19.5" stroke={p.color} strokeWidth="0.6" strokeDasharray="1.5 2" strokeOpacity="0.45" />
                {/* Interlocking Iris Blades */}
                <path d="M20 3 L33 13" stroke={p.color} strokeWidth="1.1" strokeOpacity="0.65" />
                <path d="M33 13 L35 27" stroke={p.color} strokeWidth="1.1" strokeOpacity="0.65" />
                <path d="M35 27 L25 37" stroke={p.color} strokeWidth="1.1" strokeOpacity="0.65" />
                <path d="M25 37 L10 33" stroke={p.color} strokeWidth="1.1" strokeOpacity="0.65" />
                <path d="M10 33 L5 19" stroke={p.color} strokeWidth="1.1" strokeOpacity="0.65" />
                <path d="M5 19 L15 5" stroke={p.color} strokeWidth="1.1" strokeOpacity="0.65" />
                {/* Central Aperture Polygon Opening */}
                <polygon 
                  points="18,14 24,14 27,20 24,26 18,26 15,20" 
                  stroke={p.color} 
                  strokeWidth="1.3" 
                  fill={p.color} 
                  fillOpacity="0.18" 
                />
              </svg>
            </div>
          );
        }

        // 2. Camera Autofocus Viewfinder Reticle [ + ]
        if (p.type === 'reticle') {
          return (
            <div
              key={p.id}
              style={{
                position: 'absolute',
                left: p.left,
                top: p.top,
                width: `${p.size}px`,
                height: `${p.size}px`,
                opacity: p.opacity,
                animation: `reticleFloatPulse ${p.duration} ease-in-out infinite alternate`,
                animationDelay: p.delay,
                transformOrigin: 'center center'
              }}
            >
              <svg 
                viewBox="0 0 32 32" 
                fill="none" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' 
                }}
              >
                {/* Viewfinder 4 Corner Brackets */}
                <path d="M4 10 V4 H10" stroke={p.color} strokeWidth="1.5" strokeLinecap="round" />
                <path d="M22 4 H28 V10" stroke={p.color} strokeWidth="1.5" strokeLinecap="round" />
                <path d="M28 22 V28 H22" stroke={p.color} strokeWidth="1.5" strokeLinecap="round" />
                <path d="M10 28 H4 V22" stroke={p.color} strokeWidth="1.5" strokeLinecap="round" />
                {/* Center Micro AF Crosshair */}
                <circle cx="16" cy="16" r="2.2" stroke={p.color} strokeWidth="1.2" fill={p.color} fillOpacity="0.25" />
                <path d="M16 8 V11 M16 21 V24 M8 16 H11 M21 16 H24" stroke={p.color} strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
          );
        }

        // 3. Concentric Optical Lens Glass Ring & Barrel Marks
        if (p.type === 'lensRing') {
          return (
            <div
              key={p.id}
              style={{
                position: 'absolute',
                left: p.left,
                top: p.top,
                width: `${p.size}px`,
                height: `${p.size}px`,
                opacity: p.opacity,
                animation: `lensRingOrbit ${p.duration} ease-in-out infinite alternate`,
                animationDelay: p.delay,
                transformOrigin: 'center center'
              }}
            >
              <svg 
                viewBox="0 0 36 36" 
                fill="none" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.08))' 
                }}
              >
                {/* Outer Glass Ring with Calibration Ticks */}
                <circle cx="18" cy="18" r="16.5" stroke={p.color} strokeWidth="0.8" strokeDasharray="2 3" strokeOpacity="0.6" />
                <circle cx="18" cy="18" r="12" stroke={p.color} strokeWidth="1.3" strokeOpacity="0.85" />
                <circle cx="18" cy="18" r="5" stroke={p.color} strokeWidth="1" fill={p.color} fillOpacity="0.16" />
                {/* 4 Optical Alignment Notches */}
                <path d="M18 1.5 V4.5 M18 31.5 V34.5 M1.5 18 H4.5 M31.5 18 H34.5" stroke={p.color} strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
          );
        }

        // 4. Cinematic 4-Point Prismatic Starburst Glint
        if (p.type === 'starburst') {
          return (
            <div
              key={p.id}
              style={{
                position: 'absolute',
                left: p.left,
                top: p.top,
                width: `${p.size}px`,
                height: `${p.size}px`,
                opacity: p.opacity,
                animation: `starburstTwinkle ${p.duration} ease-in-out infinite alternate`,
                animationDelay: p.delay,
                transformOrigin: 'center center'
              }}
            >
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  filter: `drop-shadow(0 0 6px ${p.color})` 
                }}
              >
                {/* Optical Anamorphic Diamond Flare */}
                <path 
                  d="M12 0 C12 6.5 17.5 12 24 12 C17.5 12 12 17.5 12 24 C12 17.5 6.5 12 0 12 C6.5 12 12 6.5 12 0 Z" 
                  fill={p.color} 
                />
                <circle cx="12" cy="12" r="2.5" fill="#FFFFFF" fillOpacity="0.9" />
              </svg>
            </div>
          );
        }

        // 5. Luminous Optical Bokeh Orb with Fine Concentric Glow Ring
        return (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${p.color} 0%, rgba(250, 214, 210, 0.18) 55%, transparent 75%)`,
              border: `1px solid ${p.color}`,
              boxShadow: `0 0 16px ${p.color}33`,
              opacity: p.opacity,
              animation: `bokehOrbPulse ${p.duration} ease-in-out infinite alternate`,
              animationDelay: p.delay,
              transformOrigin: 'center center'
            }}
          />
        );
      })}

      <style>{`
        /* Prismatic Sunbeam & Prism Dispersion Breath */
        @keyframes opticalPrismBreath {
          0% {
            opacity: 0.5;
            transform: scale(0.96) rotate(0deg);
          }
          100% {
            opacity: 0.9;
            transform: scale(1.08) rotate(4deg);
          }
        }

        /* 1. Camera Aperture Diaphragm Slow Rotation & Optical Drift */
        @keyframes apertureFloatRotate {
          0% {
            transform: translateY(0px) translateX(0px) rotate(0deg) scale(0.92);
          }
          50% {
            transform: translateY(-28px) translateX(18px) rotate(180deg) scale(1.05);
          }
          100% {
            transform: translateY(-56px) translateX(-14px) rotate(360deg) scale(0.95);
          }
        }

        /* 2. Autofocus Reticle Float & Micro Shutter Pulse */
        @keyframes reticleFloatPulse {
          0% {
            transform: translateY(0px) translateX(0px) scale(0.95);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-24px) translateX(-16px) scale(1.06);
            opacity: 0.65;
          }
          100% {
            transform: translateY(-48px) translateX(12px) scale(0.98);
            opacity: 0.35;
          }
        }

        /* 3. Concentric Lens Barrel Ring Drift & Orbit */
        @keyframes lensRingOrbit {
          0% {
            transform: translateY(0px) translateX(0px) rotate(0deg) scale(0.94);
          }
          50% {
            transform: translateY(-32px) translateX(22px) rotate(90deg) scale(1.06);
          }
          100% {
            transform: translateY(-64px) translateX(-16px) rotate(180deg) scale(0.96);
          }
        }

        /* 4. Optical Starburst Diamond Twinkle */
        @keyframes starburstTwinkle {
          0% {
            transform: translateY(0px) translateX(0px) scale(0.7) rotate(0deg);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-20px) translateX(14px) scale(1.15) rotate(45deg);
            opacity: 0.85;
          }
          100% {
            transform: translateY(-40px) translateX(-10px) scale(0.8) rotate(90deg);
            opacity: 0.3;
          }
        }

        /* 5. Luminous Optical Bokeh Orb Pulse */
        @keyframes bokehOrbPulse {
          0% {
            transform: scale(0.88) translate(0, 0);
            opacity: 0.1;
          }
          50% {
            transform: scale(1.22) translate(18px, -18px);
            opacity: 0.28;
          }
          100% {
            transform: scale(0.98) translate(-12px, -36px);
            opacity: 0.14;
          }
        }
      `}</style>
    </div>
  );
}
