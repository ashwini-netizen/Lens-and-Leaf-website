import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Film, 
  Sparkles, 
  Camera, 
  Clock, 
  Calendar, 
  Sliders, 
  CheckCircle,
  ChevronRight
} from 'lucide-react';

export default function CinematicVideoSection({ setActivePage, onSelectService }) {
  const [activeReelIdx, setActiveReelIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isCinemaMode, setIsCinemaMode] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const videoRef = useRef(null);

  // 4 Curated 1080p Cinematic Video Reels
  const VIDEO_REELS = [
    {
      id: 'golden-hour',
      title: 'Behind the Lens: Golden Hour Romance',
      category: 'Couples & Pre-Wedding',
      description: 'An ethereal sunset session amidst rolling hills, capturing unspoken tenderness, natural wind-swept movement, and the incandescent golden hour glow.',
      videoUrl: 'https://cdn.coverr.co/videos/coverr-couple-walking-at-sunset-5683/1080p.mp4',
      poster: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
      durationTag: '0:28 Reel',
      lens: 'Hasselblad 80mm f/1.9',
      fps: '24 FPS',
      serviceLinked: 'Couple Photography'
    },
    {
      id: 'studio-editorial',
      title: 'Solarium Studio & Fine-Art Editorial',
      category: 'Portrait & Fashion',
      description: 'Inside our natural-light sanctuary in the Metropolitan Arts Quarter, directing gentle poses and sculpted softbox lighting for high-fashion portraiture.',
      videoUrl: 'https://cdn.coverr.co/videos/coverr-photographer-in-a-studio-session-5341/1080p.mp4',
      poster: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=80',
      durationTag: '0:34 Reel',
      lens: 'Leica Summilux 50mm f/1.4',
      fps: '60 FPS Slow-Mo',
      serviceLinked: 'Portrait Photography'
    },
    {
      id: 'optics-macro',
      title: 'The Art of Optics: Aperture & Focus Pull',
      category: 'Master Craftsmanship',
      description: 'A sensory macro perspective of precision aperture blades, manual focus rings, and optical coatings that render our signature dreamlike bokeh.',
      videoUrl: 'https://cdn.coverr.co/videos/coverr-lens-focusing-camera-aperture-4321/1080p.mp4',
      poster: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1600&q=80',
      durationTag: '0:22 Reel',
      lens: 'Carl Zeiss Otus 55mm f/1.4',
      fps: '120 FPS High-Speed',
      serviceLinked: 'Creative Studio Photography'
    },
    {
      id: 'wedding-fairylights',
      title: 'Evening Vows & Fairy Light First Dance',
      category: 'Weddings & Celebrations',
      description: 'Luminous memories from an intimate evening celebration beneath thousands of twinkling fairy lights and candlelit chandeliers.',
      videoUrl: 'https://cdn.coverr.co/videos/coverr-wedding-dance-under-fairy-lights-5674/1080p.mp4',
      poster: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=80',
      durationTag: '0:36 Reel',
      lens: 'Sony G Master 35mm f/1.4',
      fps: '24 FPS Cinematic',
      serviceLinked: 'Pre-Wedding Photoshoots'
    }
  ];

  const currentReel = VIDEO_REELS[activeReelIdx];

  // Auto-play when active reel changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  }, [activeReelIdx]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    const dur = videoRef.current.duration;
    if (dur > 0) {
      setProgress((curr / dur) * 100);
      const curM = Math.floor(curr / 60);
      const curS = Math.floor(curr % 60).toString().padStart(2, '0');
      setCurrentTime(`${curM}:${curS}`);
      const durM = Math.floor(dur / 60);
      const durS = Math.floor(dur % 60).toString().padStart(2, '0');
      setDuration(`${durM}:${durS}`);
    }
  };

  const handleSeek = (e) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * videoRef.current.duration;
  };

  const handleBookCurrentService = () => {
    if (onSelectService && currentReel.serviceLinked) {
      onSelectService(currentReel.serviceLinked);
    } else if (setActivePage) {
      setActivePage('booking');
    }
  };

  return (
    <section 
      id="video-showcase-section"
      style={{
        padding: isCinemaMode ? '2rem 0 5rem' : '4.5rem 0 5.5rem',
        backgroundColor: '#110D0C',
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(233, 75, 80, 0.25)',
        borderBottom: '1px solid rgba(233, 75, 80, 0.25)',
        transition: 'padding 0.4s ease'
      }}
    >
      {/* Ambient Ambilight Glow behind the video */}
      <div 
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isCinemaMode ? '85vw' : '65vw',
          height: '420px',
          background: 'radial-gradient(circle, rgba(233, 75, 80, 0.22) 0%, rgba(242, 140, 40, 0.16) 40%, transparent 75%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          transition: 'all 0.5s ease'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div className="reveal-on-scroll" style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 2.8rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span className="section-badge light">
              <Film size={14} color="var(--color-coral-red)" />
              <span>Motion & Cinematography</span>
            </span>
            <span style={{
              fontSize: '0.7rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-warm-orange)',
              backgroundColor: 'rgba(242, 140, 40, 0.12)',
              padding: '0.35rem 0.8rem',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid rgba(242, 140, 40, 0.3)'
            }}>
              4K Ultra-HD Reels
            </span>
          </div>

          <h2 className="section-title" style={{ color: '#FFFFFF' }}>
            Life in Motion: <span className="text-shimmer">Cinematic Studio Reels</span>
          </h2>
          <p style={{ color: '#DDD0D5', fontSize: '1.05rem', lineHeight: '1.7', margin: '0 auto' }}>
            Every portrait carries a pulse, every wedding carries a rhythm. Experience behind-the-scenes artistry and high-definition film reels captured by our master lens crafters.
          </p>
        </div>

        {/* Main Video Cinema Stage */}
        <div 
          className="glass-card"
          style={{
            borderRadius: '24px',
            overflow: 'hidden',
            backgroundColor: '#000000',
            border: '1.5px solid rgba(247, 161, 167, 0.3)',
            boxShadow: isCinemaMode ? '0 30px 90px rgba(0,0,0,0.95), 0 0 60px rgba(233,75,80,0.3)' : '0 20px 60px rgba(0,0,0,0.7)',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            marginBottom: '2.5rem'
          }}
        >
          {/* Top Video Camera Metadata Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.85rem 1.4rem',
            backgroundColor: 'rgba(23, 17, 15, 0.95)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            fontSize: '0.78rem',
            color: 'var(--color-silver-grey)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-coral-red)', fontWeight: 600 }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: isPlaying ? '#25D366' : 'var(--color-coral-red)',
                  boxShadow: isPlaying ? '0 0 8px #25D366' : 'none',
                  display: 'inline-block'
                }} />
                <span>{isPlaying ? 'REC • 4K STREAMING' : 'PAUSED'}</span>
              </div>
              <span className="hide-on-mobile">|</span>
              <span className="hide-on-mobile" style={{ color: '#F5EDE8' }}>{currentReel.lens}</span>
              <span className="hide-on-mobile">|</span>
              <span className="hide-on-mobile">{currentReel.fps}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ color: 'var(--color-warm-orange)', fontWeight: 500 }}>
                {currentTime} / {duration}
              </span>
              <button
                onClick={() => setIsCinemaMode(!isCinemaMode)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: isCinemaMode ? 'var(--color-coral-red)' : '#FFF',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.75rem'
                }}
                title="Toggle Cinema Mode"
              >
                <Maximize2 size={14} />
                <span className="hide-on-mobile">{isCinemaMode ? 'Exit Cinema' : 'Cinema Mode'}</span>
              </button>
            </div>
          </div>

          {/* Video Player Display */}
          <div style={{ position: 'relative', height: isCinemaMode ? '68vh' : '520px', backgroundColor: '#000' }}>
            <video
              ref={videoRef}
              src={currentReel.videoUrl}
              poster={currentReel.poster}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onClick={togglePlay}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                cursor: 'pointer',
                display: 'block'
              }}
            />

            {/* Viewfinder Corner Overlays */}
            <div style={{
              position: 'absolute',
              top: '1.5rem',
              left: '1.5rem',
              width: '28px',
              height: '28px',
              borderTop: '2px solid rgba(250, 214, 210, 0.7)',
              borderLeft: '2px solid rgba(250, 214, 210, 0.7)',
              pointerEvents: 'none'
            }} />
            <div style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              width: '28px',
              height: '28px',
              borderTop: '2px solid rgba(250, 214, 210, 0.7)',
              borderRight: '2px solid rgba(250, 214, 210, 0.7)',
              pointerEvents: 'none'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '4.5rem',
              left: '1.5rem',
              width: '28px',
              height: '28px',
              borderBottom: '2px solid rgba(250, 214, 210, 0.7)',
              borderLeft: '2px solid rgba(250, 214, 210, 0.7)',
              pointerEvents: 'none'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '4.5rem',
              right: '1.5rem',
              width: '28px',
              height: '28px',
              borderBottom: '2px solid rgba(250, 214, 210, 0.7)',
              borderRight: '2px solid rgba(250, 214, 210, 0.7)',
              pointerEvents: 'none'
            }} />

            {/* Centered Big Play Button when paused */}
            {!isPlaying && (
              <div 
                onClick={togglePlay}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '84px',
                  height: '84px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(233, 75, 80, 0.9)',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 8px 30px rgba(233, 75, 80, 0.5)',
                  transition: 'transform 0.25s ease'
                }}
                className="btn-magnetic"
              >
                <Play size={36} color="#FFF" style={{ marginLeft: '4px' }} />
              </div>
            )}

            {/* Bottom Floating Control Bar */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(to top, rgba(17, 13, 12, 0.95) 0%, rgba(17, 13, 12, 0.6) 70%, transparent 100%)',
              padding: '1.2rem 1.6rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              {/* Interactive Scrub Bar */}
              <div 
                onClick={handleSeek}
                style={{
                  width: '100%',
                  height: '5px',
                  backgroundColor: 'rgba(255, 255, 255, 0.25)',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                <div style={{
                  width: `${progress}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, var(--color-coral-red), var(--color-warm-orange))',
                  borderRadius: '3px',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    right: '-5px',
                    top: '-3.5px',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    boxShadow: '0 0 8px rgba(233, 75, 80, 0.8)'
                  }} />
                </div>
              </div>

              {/* Action Buttons & Title */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.8rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <button
                    onClick={togglePlay}
                    style={{
                      background: 'rgba(255, 255, 255, 0.15)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      color: '#FFF',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease'
                    }}
                  >
                    {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: '2px' }} />}
                  </button>

                  <button
                    onClick={toggleMute}
                    style={{
                      background: 'rgba(255, 255, 255, 0.15)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      color: isMuted ? 'var(--color-silver-grey)' : 'var(--color-coral-red)',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease'
                    }}
                    title={isMuted ? 'Unmute Video' : 'Mute Video'}
                  >
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>

                  <div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 600, color: '#FFF' }}>
                      {currentReel.title}
                    </div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--color-blush-pink)' }}>
                      Category: {currentReel.category} • {currentReel.durationTag}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Interactive Reel Selection Cards (Showcasing Different Card Animations!) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.4rem'
        }}>
          {VIDEO_REELS.map((reel, index) => {
            const isSelected = activeReelIdx === index;
            // Cycle different card animations for each reel: tilt, focus, prism, reveal
            const animationTypes = ['tilt', 'focus', 'prism', 'reveal'];
            const animType = animationTypes[index % animationTypes.length];

            return (
              <div
                key={reel.id}
                onClick={() => setActiveReelIdx(index)}
                className={`glass-card card-anim-${animType}`}
                style={{
                  borderRadius: '16px',
                  padding: '1.2rem',
                  backgroundColor: isSelected ? 'rgba(32, 23, 21, 0.95)' : 'rgba(23, 17, 15, 0.75)',
                  border: isSelected ? '1.5px solid var(--color-coral-red)' : '1px solid rgba(166, 166, 166, 0.3)',
                  cursor: 'pointer',
                  boxShadow: isSelected ? '0 10px 30px rgba(233, 75, 80, 0.25)' : 'none',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Thumbnail Preview with Active Play Badge */}
                <div style={{
                  position: 'relative',
                  height: '130px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  marginBottom: '0.9rem'
                }}>
                  <img
                    src={reel.poster}
                    alt={reel.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '0.6rem',
                    right: '0.6rem',
                    backgroundColor: 'rgba(0,0,0,0.75)',
                    padding: '0.2rem 0.55rem',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.68rem',
                    color: '#FFF'
                  }}>
                    {reel.durationTag}
                  </div>
                  {isSelected && (
                    <div style={{
                      position: 'absolute',
                      bottom: '0.6rem',
                      left: '0.6rem',
                      backgroundColor: 'var(--color-coral-red)',
                      padding: '0.25rem 0.65rem',
                      borderRadius: 'var(--radius-pill)',
                      fontSize: '0.66rem',
                      fontWeight: 700,
                      color: '#FFF',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem'
                    }}>
                      <Play size={10} fill="#FFF" />
                      <span>NOW PLAYING</span>
                    </div>
                  )}
                </div>

                <div style={{
                  fontSize: '0.72rem',
                  color: 'var(--color-warm-orange)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '0.3rem'
                }}>
                  {reel.category}
                </div>
                <h4 style={{
                  fontSize: '1rem',
                  color: '#FFFFFF',
                  marginBottom: '0.5rem',
                  lineHeight: '1.3'
                }}>
                  {reel.title}
                </h4>
                <p style={{
                  fontSize: '0.8rem',
                  color: 'var(--color-silver-grey)',
                  lineHeight: '1.5',
                  margin: 0
                }}>
                  {reel.description.slice(0, 85)}...
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
