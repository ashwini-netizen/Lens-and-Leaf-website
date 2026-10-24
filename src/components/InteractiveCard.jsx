import React, { useRef, useState } from 'react';

/**
 * InteractiveCard Component
 * Provides varied, premium animation styles for cards:
 * - 'tilt': 3D mouse tracking tilt with real specular reflection
 * - 'focus': Cinematic camera viewfinder corners that snap into focus
 * - 'prism': Shimmering chromatic gradient border
 * - 'reveal': Editorial slide-up elevation
 * - 'levitate': Floating ambient levitation with deep shadow
 */
export default function InteractiveCard({
  children,
  animationType = 'tilt', // 'tilt' | 'focus' | 'prism' | 'reveal' | 'levitate'
  className = '',
  style = {},
  onClick,
  ...props
}) {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState('');
  const [glareStyle, setGlareStyle] = useState({ opacity: 0 });

  // Mouse move handler for 3D tilt and specular lighting sheen
  const handleMouseMove = (e) => {
    if (animationType !== 'tilt' || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -7; // Max tilt angle
    const rotateY = ((x - centerX) / centerX) * 7;

    setTransformStyle(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px) scale3d(1.02, 1.02, 1.02)`);

    // Dynamic specular glare calculation
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlareStyle({
      opacity: 0.18,
      background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 60%)`
    });
  };

  const handleMouseLeave = () => {
    if (animationType === 'tilt') {
      setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)');
      setGlareStyle({ opacity: 0 });
    }
  };

  const handleClick = (e) => {
    if (onClick) onClick(e);
  };

  // Select corresponding animation CSS class
  const animClassMap = {
    cinema: 'card-anim-cinema',
    tilt: 'card-anim-tilt',
    focus: 'card-anim-focus',
    prism: 'card-anim-prism',
    reveal: 'card-anim-reveal',
    levitate: 'card-anim-levitate'
  };

  const chosenAnimClass = animClassMap[animationType] || 'card-anim-cinema';

  return (
    <div
      ref={cardRef}
      className={`glass-card card-sheen ${chosenAnimClass} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        backgroundColor: '#FFFFFF',
        transform: animationType === 'tilt' && transformStyle ? transformStyle : undefined,
        transition: animationType === 'tilt' ? 'transform 0.15s ease-out, box-shadow 0.3s ease' : undefined,
        position: 'relative',
        ...style
      }}
      {...props}
    >
      {/* Dynamic Specular Glare Overlay for 3D Tilt */}
      {animationType === 'tilt' && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none',
            borderRadius: 'inherit',
            zIndex: 4,
            transition: 'opacity 0.25s ease',
            ...glareStyle
          }}
        />
      )}



      {children}
    </div>
  );
}
