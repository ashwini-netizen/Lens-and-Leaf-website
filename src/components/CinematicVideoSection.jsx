import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX
} from 'lucide-react';
import studioProductionVideo from '../assets/studio_production_bts.mp4';
import studioPosterImg from '../assets/studio_production_bts.png';
import studioInterviewBtsImg from '../assets/studio_interview_bts.png';

export default function CinematicVideoSection({ setActivePage, onSelectService }) {
  const [activeReelIdx, setActiveReelIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const videoRef = useRef(null);

  // 4 Studio Behind-the-Scenes Sessions
  const VIDEO_REELS = [
    {
      id: 'studio-cyclorama-production',
      title: 'Professional Studio Production & Lighting Stage',
      description: 'Behind the lens of our infinity cyclorama: parabolic softbox key illumination, Godox strobe lighting, tethered preview monitor, and editorial fashion posing.',
      videoUrl: studioProductionVideo,
      poster: studioPosterImg,
      durationTag: '0:14 Studio Reel',
      serviceLinked: 'Creative Studio Photoshoots'
    },
    {
      id: 'studio-photographer-craft',
      title: 'Precision Optics & Photographer Direction',
      description: 'Capturing authentic expressions, pose guidance, and instant digital proofing inside our sound-calibrated photography bay.',
      videoUrl: './videos/studio_photographer_dslr.mp4',
      poster: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1200&h=750&q=80',
      durationTag: '0:15 Studio Reel',
      serviceLinked: 'Portrait Photography'
    },
    {
      id: 'studio-interview-setup',
      title: 'Studio Spotlight & Calibrated Staging',
      description: 'Behind the scenes: Nanlite parabolic softboxes with grids, warm circular spotlight, and real-time tethered monitor proofing.',
      videoUrl: './videos/studio_interview_setup.mp4',
      poster: studioInterviewBtsImg,
      durationTag: '0:14 Studio Reel',
      serviceLinked: 'Creative Studio Photoshoots'
    },
    {
      id: 'heirloom-portrait-reel',
      title: 'Natural Light & Heirloom Portraiture',
      description: 'Capturing relaxed family milestones, authentic emotion, and golden-hour connection with documentary artistic warmth.',
      videoUrl: './videos/hero_portrait_reel.mp4',
      poster: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&h=750&q=80',
      durationTag: '0:22 Fine-Art Reel',
      serviceLinked: 'Family & Heirloom Photography'
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

  return (
    <section 
      id="video-showcase-section"
      style={{
        padding: '3.8rem 0 4.2rem',
        backgroundColor: '#17110F',
        color: '#FFFFFF',
        position: 'relative',
        borderTop: '1px solid rgba(166, 166, 166, 0.2)',
        borderBottom: '1px solid rgba(166, 166, 166, 0.2)'
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div className="reveal-on-scroll" style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 2.2rem' }}>
          <h2 className="section-title" style={{ color: '#FFFFFF' }}>
            Behind the Lens: The Studio Experience
          </h2>
          <p style={{ color: '#DDD0D5', fontSize: '1.02rem', lineHeight: '1.68', margin: '0 auto' }}>
            Step inside our professional photography studio to see how our photographers work with high-end strobe illumination, tethered proofing, and relaxed direction to capture timeless portraits.
          </p>
        </div>

        {/* Clean Studio Video Player */}
        <div 
          style={{
            borderRadius: '18px',
            overflow: 'hidden',
            backgroundColor: '#0D0A09',
            border: '1px solid rgba(247, 161, 167, 0.25)',
            boxShadow: '0 16px 45px rgba(0, 0, 0, 0.4)',
            marginBottom: '2rem'
          }}
        >
          {/* Top Video Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1.4rem',
            backgroundColor: 'rgba(23, 17, 15, 0.95)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            fontSize: '0.78rem',
            color: 'var(--color-silver-grey)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <span style={{ color: '#FFFFFF', fontWeight: 600 }}>{currentReel.title}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ color: 'var(--color-warm-orange)', fontWeight: 500, fontSize: '0.75rem' }}>
                {currentTime} / {duration}
              </span>
            </div>
          </div>

          {/* Video Player Display */}
          <div style={{ 
            position: 'relative', 
            width: '100%',
            aspectRatio: '16 / 9',
            maxHeight: '560px', 
            backgroundColor: '#000',
            overflow: 'hidden'
          }}>
            <video
              ref={videoRef}
              key={currentReel.id}
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
            >
              <source src={currentReel.videoUrl} type="video/mp4" />
              <source src="./videos/studio_production_bts.mp4" type="video/mp4" />
            </video>

            {/* Centered Play Button when paused */}
            {!isPlaying && (
              <div 
                onClick={togglePlay}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(233, 75, 80, 0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                  transition: 'transform 0.2s ease'
                }}
              >
                <Play size={30} color="#FFF" style={{ marginLeft: '3px' }} />
              </div>
            )}

            {/* Bottom Control Bar */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(to top, rgba(23, 17, 15, 0.95) 0%, rgba(23, 17, 15, 0.4) 70%, transparent 100%)',
              padding: '1rem 1.4rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.65rem'
            }}>
              {/* Scrub Bar */}
              <div 
                onClick={handleSeek}
                style={{
                  width: '100%',
                  height: '4px',
                  backgroundColor: 'rgba(255, 255, 255, 0.25)',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                <div style={{
                  width: `${progress}%`,
                  height: '100%',
                  backgroundColor: 'var(--color-coral-red)',
                  borderRadius: '2px'
                }} />
              </div>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <button
                    onClick={togglePlay}
                    style={{
                      background: 'rgba(255, 255, 255, 0.15)',
                      border: 'none',
                      color: '#FFF',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} style={{ marginLeft: '2px' }} />}
                  </button>

                  <button
                    onClick={toggleMute}
                    style={{
                      background: 'rgba(255, 255, 255, 0.15)',
                      border: 'none',
                      color: isMuted ? 'var(--color-silver-grey)' : 'var(--color-coral-red)',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Session Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.2rem'
        }}>
          {VIDEO_REELS.map((reel, index) => {
            const isSelected = activeReelIdx === index;
            return (
              <div
                key={reel.id}
                onClick={() => setActiveReelIdx(index)}
                style={{
                  borderRadius: '14px',
                  padding: '1rem',
                  backgroundColor: isSelected ? 'rgba(32, 23, 21, 0.95)' : 'rgba(23, 17, 15, 0.6)',
                  border: isSelected ? '1.5px solid var(--color-coral-red)' : '1px solid rgba(166, 166, 166, 0.25)',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
              >
                <div style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16 / 10',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  marginBottom: '0.85rem',
                  backgroundColor: '#000'
                }}>
                  <img
                    src={reel.poster}
                    alt={reel.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      display: 'block'
                    }}
                  />
                  {isSelected && (
                    <div style={{
                      position: 'absolute',
                      bottom: '0.6rem',
                      left: '0.6rem',
                      backgroundColor: 'var(--color-coral-red)',
                      padding: '0.22rem 0.65rem',
                      borderRadius: 'var(--radius-pill)',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      color: '#FFF',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                      letterSpacing: '0.04em'
                    }}>
                      <Play size={10} fill="#FFF" />
                      <span>SELECTED</span>
                    </div>
                  )}
                </div>

                <h4 style={{
                  fontSize: '0.94rem',
                  color: '#FFFFFF',
                  marginBottom: '0.4rem',
                  lineHeight: '1.3'
                }}>
                  {reel.title}
                </h4>
                <p style={{
                  fontSize: '0.78rem',
                  color: 'var(--color-silver-grey)',
                  lineHeight: '1.45',
                  margin: 0
                }}>
                  {reel.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
