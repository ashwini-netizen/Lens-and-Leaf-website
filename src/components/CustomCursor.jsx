import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [cursorMode, setCursorMode] = useState('default'); // 'default', 'link', 'view', 'camera'
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const targetRef = useRef({ x: -100, y: -100 });
  const animFrameRef = useRef(null);
  const activeMagneticEl = useRef(null);

  useEffect(() => {
    // Check if device is touch-primary
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Subtle magnetic effect on interactive primary buttons
      if (activeMagneticEl.current) {
        const rect = activeMagneticEl.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.22;
        const deltaY = (e.clientY - centerY) * 0.22;
        activeMagneticEl.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      }
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => {
      setIsVisible(false);
      if (activeMagneticEl.current) {
        activeMagneticEl.current.style.transform = '';
        activeMagneticEl.current = null;
      }
    };

    // Track hover targets
    const onMouseOver = (e) => {
      const target = e.target;
      const viewEl = target.closest('[data-cursor="view"], .gallery-item-trigger, .lightbox-trigger');
      const cameraEl = target.closest('[data-cursor="camera"], .shutter-trigger');
      const magneticBtn = target.closest('.btn-primary, .btn-magnetic');
      const interactiveEl = target.closest('button, a, [role="button"], input, select, textarea, .interactive-click');

      if (magneticBtn) {
        activeMagneticEl.current = magneticBtn;
      }

      if (viewEl) {
        setCursorMode('view');
      } else if (cameraEl) {
        setCursorMode('camera');
      } else if (interactiveEl) {
        setCursorMode('link');
      } else {
        setCursorMode('default');
      }
    };

    const onMouseOut = (e) => {
      const target = e.target;
      const magneticBtn = target.closest('.btn-primary, .btn-magnetic');
      if (magneticBtn && activeMagneticEl.current === magneticBtn) {
        magneticBtn.style.transform = '';
        activeMagneticEl.current = null;
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });

    // Smooth trailing lerp loop
    let currentX = -100;
    let currentY = -100;

    const loop = () => {
      const target = targetRef.current;
      currentX += (target.x - currentX) * 0.18;
      currentY += (target.y - currentY) * 0.18;
      setTrailingPos({ x: currentX, y: currentY });
      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* 1. Precise Center Dot */}
      <div
        style={{
          position: 'fixed',
          top: position.y,
          left: position.x,
          width: cursorMode === 'default' ? '8px' : '4px',
          height: cursorMode === 'default' ? '8px' : '4px',
          backgroundColor: '#E94B50',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 999999,
          boxShadow: '0 0 10px rgba(233, 75, 80, 0.8)',
          transition: 'width 0.2s ease, height 0.2s ease, background-color 0.2s ease',
        }}
      />

      {/* 2. Smooth Trailing Aperture / Viewfinder Ring */}
      <div
        style={{
          position: 'fixed',
          top: trailingPos.y,
          left: trailingPos.x,
          width: cursorMode === 'view' ? '112px' : cursorMode === 'link' ? '48px' : '32px',
          height: cursorMode === 'view' ? '36px' : cursorMode === 'link' ? '48px' : '32px',
          borderRadius: cursorMode === 'view' ? 'var(--radius-pill)' : '50%',
          border: cursorMode === 'view' 
            ? '1.5px solid rgba(250, 214, 210, 0.95)' 
            : cursorMode === 'link' 
              ? '1.5px solid var(--color-coral-red)' 
              : '1.2px solid rgba(233, 75, 80, 0.45)',
          backgroundColor: cursorMode === 'view' 
            ? 'rgba(23, 17, 15, 0.92)' 
            : cursorMode === 'link' 
              ? 'rgba(233, 75, 80, 0.08)' 
              : 'transparent',
          backdropFilter: cursorMode === 'view' ? 'blur(10px)' : 'none',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 999998,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: cursorMode === 'link' 
            ? '0 0 20px rgba(233, 75, 80, 0.35)' 
            : cursorMode === 'view'
              ? '0 10px 25px rgba(23, 17, 15, 0.5)'
              : 'none',
          transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-radius 0.25s ease, background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
        }}
      >
        {cursorMode === 'view' && (
          <span
            style={{
              color: '#FFF0E7',
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            <span style={{ color: 'var(--color-coral-red)' }}>✦</span> View Photo
          </span>
        )}
      </div>
    </>
  );
}
