import React, { useState } from 'react';
import { 
  Camera, 
  ZoomIn, 
  ZoomOut, 
  Sliders, 
  Sparkles, 
  Check, 
  Layers, 
  Maximize2, 
  RotateCw,
  Compass
} from 'lucide-react';
import { playShutterSound } from '../utils/audio';

export default function CameraLensZoomFeature() {
  // Zoom state: 1.0x (35mm), 1.4x (50mm), 1.8x (85mm), 2.3x (135mm)
  const [zoomLevel, setZoomLevel] = useState(1.4);
  const [activePreset, setActivePreset] = useState('50mm');
  const [activeSubject, setActiveSubject] = useState(0);
  const [isShutterFlashing, setIsShutterFlashing] = useState(false);
  const [capturedNotice, setCapturedNotice] = useState(false);
  const [isAutoFocused, setIsAutoFocused] = useState(true);

  const subjects = [
    {
      title: 'Studio Lens & Mirror Optics',
      discipline: 'Precision Glass Still Life',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=85',
      specs: 'Hasselblad 100mm • f/2.2 • ISO 64'
    },
    {
      title: 'Fine-Art Editorial Portrait',
      discipline: 'Medium Format Portraiture',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
      specs: 'Sony α1 • 85mm f/1.2 GM • ISO 100'
    },
    {
      title: 'Prism Glass Refraction & Light',
      discipline: 'Optical Light Flares',
      image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=85',
      specs: 'Leica Summilux • 50mm f/1.4 • ISO 50'
    }
  ];

  const presets = [
    { name: '35mm', label: '35mm Wide', zoom: 1.0, fStop: 'f/2.8', blur: 0 },
    { name: '50mm', label: '50mm Prime', zoom: 1.4, fStop: 'f/1.8', blur: 0.5 },
    { name: '85mm', label: '85mm Portrait', zoom: 1.8, fStop: 'f/1.4', blur: 1.2 },
    { name: '135mm', label: '135mm Tele', zoom: 2.3, fStop: 'f/1.2', blur: 2.0 },
  ];

  const handlePresetChange = (preset) => {
    setActivePreset(preset.name);
    setZoomLevel(preset.zoom);
    setIsAutoFocused(false);
    setTimeout(() => setIsAutoFocused(true), 350);
  };

  const handleStepZoom = (delta) => {
    setZoomLevel((prev) => {
      const next = Math.min(2.4, Math.max(1.0, +(prev + delta).toFixed(1)));
      const closest = presets.reduce((prevP, currP) => 
        Math.abs(currP.zoom - next) < Math.abs(prevP.zoom - next) ? currP : prevP
      );
      setActivePreset(closest.name);
      return next;
    });
    setIsAutoFocused(false);
    setTimeout(() => setIsAutoFocused(true), 300);
  };

  const handleCapture = () => {
    playShutterSound();
    setIsShutterFlashing(true);
    setCapturedNotice(true);

    setTimeout(() => {
      setIsShutterFlashing(false);
    }, 450);

    setTimeout(() => {
      setCapturedNotice(false);
    }, 2800);
  };

  const currentSubject = subjects[activeSubject];

  return (
    <div style={{
      backgroundColor: '#17110F',
      borderRadius: 'var(--radius-xl)',
      border: '1px solid rgba(250, 214, 210, 0.25)',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.45)',
      overflow: 'hidden',
      color: '#FFFFFF'
    }}>
      {/* Top Camera Viewfinder Header & Status Bar */}
      <div style={{
        padding: '0.9rem 1.6rem',
        backgroundColor: 'rgba(23, 17, 15, 0.95)',
        borderBottom: '1px solid rgba(166, 166, 166, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.8rem',
        fontSize: '0.78rem',
        letterSpacing: '0.08em'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#25D366', display: 'inline-block' }} />
            <strong style={{ color: 'var(--color-blush-pink)', textTransform: 'uppercase' }}>Lens & Leaf Optical Engine</strong>
          </div>
          <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>|</span>
          <span style={{ color: 'var(--color-warm-orange)', fontWeight: 600 }}>100MP RAW • 16-BIT</span>
        </div>

        {/* Live Viewfinder Exposure & Focal Telemetry */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', fontFamily: 'monospace' }}>
          <span style={{ color: 'var(--color-blush-pink)' }}>
            FOCAL: <strong style={{ color: '#FFFFFF' }}>{activePreset.toUpperCase()} ({zoomLevel.toFixed(1)}x)</strong>
          </span>
          <span style={{ color: 'var(--color-warm-orange)' }}>
            APER: <strong>{presets.find(p => p.name === activePreset)?.fStop || 'f/1.4'}</strong>
          </span>
          <span style={{ color: '#25D366' }}>
            AF-LOCK: {isAutoFocused ? '● 0.12s' : 'SEARCHING...'}
          </span>
        </div>
      </div>

      {/* Main Viewfinder Optical Screen */}
      <div style={{
        position: 'relative',
        height: '460px',
        overflow: 'hidden',
        backgroundColor: '#0A0706',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Background Image with Live Optical Zoom */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url("${currentSubject.image}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `scale(${zoomLevel})`,
            transition: 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
            filter: 'brightness(0.88) contrast(1.04)',
            willChange: 'transform'
          }}
        />

        {/* Optical Glass Lens Vignette & Chromatic Reflection */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, transparent 45%, rgba(23, 17, 15, 0.55) 78%, rgba(23, 17, 15, 0.95) 100%)',
          pointerEvents: 'none'
        }} />

        {/* Soft Pink Prism Light Flare Sweeping across the Lens */}
        <div 
          className="lens-prism-gradient"
          style={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            filter: 'blur(45px)',
            pointerEvents: 'none',
            opacity: 0.45
          }}
        />

        {/* Rotating Concentric Aperture Rings (Lightest Pink & Lens Orange) */}
        <div 
          className="aperture-blade-zoom"
          style={{
            position: 'absolute',
            width: '260px',
            height: '260px',
            borderRadius: '50%',
            border: '1.5px dashed rgba(250, 214, 210, 0.35)',
            boxShadow: '0 0 30px rgba(247, 161, 167, 0.18)',
            pointerEvents: 'none'
          }}
        />

        {/* Rule of Thirds Viewfinder Grid Lines */}
        <div style={{
          position: 'absolute',
          inset: '30px',
          border: '1px solid rgba(250, 214, 210, 0.18)',
          pointerEvents: 'none',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gridTemplateRows: '1fr 1fr 1fr'
        }}>
          <div style={{ borderRight: '1px dashed rgba(250, 214, 210, 0.15)', borderBottom: '1px dashed rgba(250, 214, 210, 0.15)' }} />
          <div style={{ borderRight: '1px dashed rgba(250, 214, 210, 0.15)', borderBottom: '1px dashed rgba(250, 214, 210, 0.15)' }} />
          <div style={{ borderBottom: '1px dashed rgba(250, 214, 210, 0.15)' }} />
          <div style={{ borderRight: '1px dashed rgba(250, 214, 210, 0.15)', borderBottom: '1px dashed rgba(250, 214, 210, 0.15)' }} />
          {/* Central Active Autofocus Reticle */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRight: '1px dashed rgba(250, 214, 210, 0.15)',
            borderBottom: '1px dashed rgba(250, 214, 210, 0.15)',
            position: 'relative'
          }}>
            <div 
              className="autofocus-reticle"
              style={{
                width: '54px',
                height: '54px',
                border: '1.5px solid var(--color-coral-red)',
                borderRadius: '6px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <span style={{ position: 'absolute', width: '12px', height: '1.5px', backgroundColor: 'var(--color-blush-pink)' }} />
              <span style={{ position: 'absolute', height: '12px', width: '1.5px', backgroundColor: 'var(--color-blush-pink)' }} />
            </div>
          </div>
          <div style={{ borderBottom: '1px dashed rgba(250, 214, 210, 0.15)' }} />
        </div>

        {/* Viewfinder 4 Corner Brackets in Lightest Pink */}
        <div style={{ position: 'absolute', top: '1.4rem', left: '1.4rem', width: '28px', height: '28px', borderTop: '2px solid var(--color-blush-pink)', borderLeft: '2px solid var(--color-blush-pink)' }} />
        <div style={{ position: 'absolute', top: '1.4rem', right: '1.4rem', width: '28px', height: '28px', borderTop: '2px solid var(--color-blush-pink)', borderRight: '2px solid var(--color-blush-pink)' }} />
        <div style={{ position: 'absolute', bottom: '1.4rem', left: '1.4rem', width: '28px', height: '28px', borderBottom: '2px solid var(--color-blush-pink)', borderLeft: '2px solid var(--color-blush-pink)' }} />
        <div style={{ position: 'absolute', bottom: '1.4rem', right: '1.4rem', width: '28px', height: '28px', borderBottom: '2px solid var(--color-blush-pink)', borderRight: '2px solid var(--color-blush-pink)' }} />

        {/* Subject Caption Tag */}
        <div style={{
          position: 'absolute',
          bottom: '1.5rem',
          left: '2.5rem',
          backgroundColor: 'rgba(23, 17, 15, 0.85)',
          backdropFilter: 'blur(8px)',
          padding: '0.5rem 1rem',
          borderRadius: 'var(--radius-pill)',
          border: '1px solid rgba(250, 214, 210, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem'
        }}>
          <Camera size={14} color="var(--color-coral-red)" />
          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#FFFFFF' }}>{currentSubject.title}</span>
          <span style={{ fontSize: '0.72rem', color: 'var(--color-blush-pink)' }}>• {currentSubject.specs}</span>
        </div>

        {/* Shutter Blade Close/Flash Animation Overlay */}
        {isShutterFlashing && (
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#FFFFFF',
            zIndex: 99,
            animation: 'shutterFlash 0.45s ease-out forwards'
          }} />
        )}

        {/* Frame Captured Toast Confirmation */}
        {capturedNotice && (
          <div style={{
            position: 'absolute',
            top: '2rem',
            backgroundColor: 'rgba(233, 75, 80, 0.92)',
            color: '#FFFFFF',
            padding: '0.55rem 1.4rem',
            borderRadius: 'var(--radius-pill)',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 8px 30px rgba(233, 75, 80, 0.5)',
            fontSize: '0.85rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            zIndex: 100,
            animation: 'fadeIn 0.25s ease'
          }}>
            <Sparkles size={16} />
            <span>Frame Captured • Master RAW Recorded</span>
          </div>
        )}
      </div>

      {/* Bottom Camera Dial & Zoom Controls */}
      <div style={{
        padding: '1.5rem 2rem',
        backgroundColor: '#1E1614',
        borderTop: '1px solid rgba(166, 166, 166, 0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem'
      }}>
        {/* 1. Subject Scene Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.76rem', color: 'var(--color-silver-grey)', textTransform: 'uppercase', letterSpacing: '0.08em', marginRight: '0.4rem' }}>
            Scene:
          </span>
          {subjects.map((sub, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveSubject(idx);
                setIsAutoFocused(false);
                setTimeout(() => setIsAutoFocused(true), 350);
              }}
              style={{
                padding: '0.45rem 0.95rem',
                borderRadius: 'var(--radius-pill)',
                border: activeSubject === idx ? '1.5px solid var(--color-coral-red)' : '1px solid rgba(166, 166, 166, 0.35)',
                backgroundColor: activeSubject === idx ? 'var(--color-coral-red)' : 'rgba(255, 255, 255, 0.05)',
                color: activeSubject === idx ? '#FFFFFF' : 'var(--color-blush-pink)',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {idx === 0 ? 'Camera & Lens' : idx === 1 ? 'Fine-Art Portrait' : 'Prism Optics'}
            </button>
          ))}
        </div>

        {/* 2. Optical Focal Length Zoom Presets (Zoom In / Zoom Out) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => handleStepZoom(-0.2)}
            disabled={zoomLevel <= 1.0}
            title="Zoom Out Lens"
            className="btn-magnetic"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(250, 214, 210, 0.35)',
              color: 'var(--color-blush-pink)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: zoomLevel <= 1.0 ? 'not-allowed' : 'pointer',
              opacity: zoomLevel <= 1.0 ? 0.4 : 1
            }}
          >
            <ZoomOut size={16} />
          </button>

          {presets.map((p) => {
            const isSelected = activePreset === p.name;
            return (
              <button
                key={p.name}
                onClick={() => handlePresetChange(p)}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: isSelected ? '1.5px solid var(--color-warm-orange)' : '1px solid rgba(166, 166, 166, 0.25)',
                  backgroundColor: isSelected ? 'rgba(242, 140, 40, 0.18)' : 'rgba(255, 255, 255, 0.04)',
                  color: isSelected ? 'var(--color-warm-orange)' : '#FFFFFF',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
              >
                <span>{p.label}</span>
              </button>
            );
          })}

          <button
            onClick={() => handleStepZoom(0.2)}
            disabled={zoomLevel >= 2.4}
            title="Zoom In Lens"
            className="btn-magnetic"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(250, 214, 210, 0.35)',
              color: 'var(--color-blush-pink)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: zoomLevel >= 2.4 ? 'not-allowed' : 'pointer',
              opacity: zoomLevel >= 2.4 ? 0.4 : 1
            }}
          >
            <ZoomIn size={16} />
          </button>
        </div>

        {/* 3. Tactile Shutter Release Button */}
        <div>
          <button
            onClick={handleCapture}
            className="btn-magnetic"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              backgroundColor: 'var(--color-coral-red)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 'var(--radius-pill)',
              padding: '0.65rem 1.6rem',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(233, 75, 80, 0.45)',
              transition: 'all 0.2s ease'
            }}
          >
            <Camera size={16} />
            <span>Capture Frame</span>
          </button>
        </div>
      </div>
    </div>
  );
}
