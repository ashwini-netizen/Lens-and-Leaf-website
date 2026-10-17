import React, { useState } from 'react';
import { Camera, Sparkles } from 'lucide-react';
import { playShutterSound } from '../utils/audio';
import logoImg from '../assets/logo.png';

export default function CameraViewfinderMotif({ size = 180, onTriggerShutter }) {
  const [isShutterActive, setIsShutterActive] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleShutterClick = () => {
    // 1. Play tactile mechanical shutter sound
    playShutterSound();

    // 2. Trigger visual shutter blades and flash
    setIsShutterActive(true);
    setIsFocused(true);

    if (onTriggerShutter) onTriggerShutter();

    setTimeout(() => {
      setIsShutterActive(false);
      setTimeout(() => setIsFocused(false), 800);
    }, 550);
  };

  return (
    <div 
      style={{ position: 'relative', width: `${size}px`, height: `${size}px`, margin: '0 auto' }}
      className="interactive-click"
      data-cursor="camera"
    >
      {/* Concentric Water Ripple Rings (Logo Inspired) */}
      <div className="water-ripple-ring" style={{ inset: '-15px' }} />
      <div className="water-ripple-ring delay-1" style={{ inset: '-30px' }} />
      <div className="water-ripple-ring delay-2" style={{ inset: '-48px' }} />

      {/* Outer Rotating Aperture F-Stop Ring */}
      <div 
        className="aperture-spin"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: '1.5px dashed rgba(247, 161, 167, 0.45)',
          boxShadow: '0 0 25px rgba(233, 75, 80, 0.25)',
          pointerEvents: 'none'
        }}
      />

      {/* Secondary Golden Compass Ring */}
      <div style={{
        position: 'absolute',
        inset: '8px',
        borderRadius: '50%',
        border: '1px solid rgba(242, 140, 40, 0.4)',
        pointerEvents: 'none'
      }} />

      {/* Central Interactive Camera Core & Logo Emblem */}
      <div
        onClick={handleShutterClick}
        title="Click to trigger camera shutter"
        style={{
          position: 'absolute',
          inset: '16px',
          borderRadius: '50%',
          overflow: 'hidden',
          backgroundColor: '#FFFFFF',
          border: isFocused ? '2.5px solid #25D366' : '2px solid var(--color-coral-red)',
          boxShadow: isFocused 
            ? '0 0 35px rgba(37, 211, 102, 0.6), 0 6px 30px rgba(233, 75, 80, 0.35)' 
            : '0 6px 30px rgba(233, 75, 80, 0.35)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease, box-shadow 0.2s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <img
          src={logoImg}
          alt="Lens & Leaf Camera Lens Emblem"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />

        {/* Shutter Blades Iris Flash Effect */}
        {isShutterActive && (
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#FFFFFF',
            zIndex: 10,
            animation: 'shutterFlash 0.5s ease-out forwards'
          }} />
        )}
      </div>


      <style>{`
        @keyframes shutterFlash {
          0% {
            opacity: 1;
            clip-path: circle(0% at 50% 50%);
          }
          40% {
            opacity: 0.95;
            clip-path: circle(75% at 50% 50%);
          }
          100% {
            opacity: 0;
            clip-path: circle(100% at 50% 50%);
          }
        }
      `}</style>
    </div>
  );
}
