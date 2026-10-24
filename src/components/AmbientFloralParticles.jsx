import React, { useMemo } from 'react';

/**
 * AmbientFloralParticles - Calm, subtle atmospheric motes
 * Reduced background movement to ensure the photography remains the hero.
 */
export default function AmbientFloralParticles() {
  const motes = useMemo(() => [
    { id: 1, left: '12%', top: '25%', size: 22, color: '#FAD6D2', duration: '35s', delay: '0s', opacity: 0.05 },
    { id: 2, left: '84%', top: '42%', size: 28, color: '#FFF0E7', duration: '42s', delay: '-8s', opacity: 0.06 },
    { id: 3, left: '48%', top: '75%', size: 24, color: '#F7A1A7', duration: '38s', delay: '-16s', opacity: 0.04 },
  ], []);

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
        zIndex: 1,
        overflow: 'hidden'
      }}
    >
      {/* Soft, Static Ambient Glow with minimal opacity to keep background steady */}
      <div 
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '420px',
          height: '420px',
          background: 'radial-gradient(circle, rgba(250, 214, 210, 0.04) 0%, rgba(247, 161, 167, 0.01) 40%, transparent 70%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: '380px',
          height: '380px',
          background: 'radial-gradient(circle, rgba(242, 140, 40, 0.03) 0%, rgba(250, 214, 210, 0.01) 40%, transparent 70%)',
          filter: 'blur(95px)',
          pointerEvents: 'none',
        }}
      />

      {motes.map((m) => (
        <div
          key={m.id}
          style={{
            position: 'absolute',
            left: m.left,
            top: m.top,
            width: `${m.size}px`,
            height: `${m.size}px`,
            borderRadius: '50%',
            backgroundColor: m.color,
            opacity: m.opacity,
            filter: 'blur(6px)',
            animation: `ambientMoteFloat ${m.duration} ease-in-out infinite alternate`,
            animationDelay: m.delay,
            pointerEvents: 'none'
          }}
        />
      ))}

      <style>{`
        @keyframes ambientMoteFloat {
          0% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-20px) translateX(12px);
          }
          100% {
            transform: translateY(-40px) translateX(-8px);
          }
        }
      `}</style>
    </div>
  );
}
