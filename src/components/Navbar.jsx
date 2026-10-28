import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, 
  Menu, 
  X, 
  Phone, 
  MessageCircle, 
  ChevronRight,
  ChevronDown,
  Camera,
  Sparkles,
  Heart,
  User,
  Users,
  Briefcase,
  Layers,
  ArrowRight
} from 'lucide-react';
import { STUDIO_INFO, SERVICES_DATA } from '../data/siteData';
import logoImg from '../assets/logo.png';

export default function Navbar({ activePage, setActivePage, onSelectService }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items: Home | About | Services | Portfolio | Studio | Contact
  // Navigation items: Home | About | Services (dropdown only) | Package | Portfolio | Studio | Contact
  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services', hasDropdown: true },
    { id: 'packages', label: 'Package' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'studio', label: 'Studio' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiceSelect = (serviceTitle) => {
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
    setActivePage('packages');
    if (onSelectService) {
      onSelectService(serviceTitle);
    }
  };

  const handleMouseEnterDropdown = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setServicesDropdownOpen(true);
  };

  const handleMouseLeaveDropdown = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 220);
  };

  // 4 Categorized Services for the Dropdown Menu
  const serviceCategories = [
    {
      name: 'Portraits & People',
      icon: <User size={15} color="var(--color-coral-red)" />,
      items: SERVICES_DATA.filter(s => ['portrait', 'creative-studio'].includes(s.id))
    },
    {
      name: 'Weddings & Couples',
      icon: <Heart size={15} color="var(--color-rose-pink)" />,
      items: SERVICES_DATA.filter(s => ['couple', 'pre-wedding', 'wedding', 'birthday-occasion'].includes(s.id))
    },
    {
      name: 'Maternity & Family',
      icon: <Users size={15} color="var(--color-warm-orange)" />,
      items: SERVICES_DATA.filter(s => ['maternity', 'newborn-baby', 'family'].includes(s.id))
    },
    {
      name: 'Editorial & Brand',
      icon: <Briefcase size={15} color="var(--color-blush-pink)" />,
      items: SERVICES_DATA.filter(s => ['fashion-model', 'product'].includes(s.id))
    }
  ];

  return (
    <>
      {/* Main Luxury Sticky Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: isScrolled ? 'rgba(23, 17, 15, 0.95)' : 'rgba(23, 17, 15, 0.82)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: isScrolled ? '1px solid rgba(233, 75, 80, 0.35)' : '1px solid rgba(166, 166, 166, 0.2)',
        transition: 'all 0.3s ease',
        boxShadow: isScrolled ? '0 10px 30px rgba(0,0,0,0.35)' : 'none'
      }}>
        <div className="container navbar-container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: isScrolled ? '0.65rem' : '0.95rem',
          paddingBottom: isScrolled ? '0.65rem' : '0.95rem',
          transition: 'padding 0.3s ease'
        }}>
          {/* Brand Logo with exact visual identity */}
          <div 
            onClick={() => handleNavClick('home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              cursor: 'pointer',
              userSelect: 'none'
            }}
          >
            <div className="navbar-logo-box" style={{
              position: 'relative',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              overflow: 'hidden',
              boxShadow: '0 4px 18px rgba(233, 75, 80, 0.25)',
              border: '1.5px solid var(--color-coral-red)',
              backgroundColor: '#FFFFFF',
              flexShrink: 0
            }}>
              <img 
                src={logoImg} 
                alt="Lens & Leaf Official Logo" 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
            <div>
              <div className="navbar-brand-title" style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.55rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                lineHeight: 1,
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                <span style={{ color: '#FFFFFF' }}>Lens</span>
                <span style={{ color: 'var(--color-warm-orange)', fontStyle: 'italic', fontWeight: 400 }}>&</span>
                <span style={{ color: 'var(--color-rose-pink)' }}>Leaf</span>
              </div>
              <div className="navbar-brand-sub" style={{
                fontSize: '0.68rem',
                color: 'var(--color-blush-pink)',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                marginTop: '0.25rem',
                fontWeight: 500
              }}>
                Capturing Life...
              </div>
            </div>
          </div>

          {/* Desktop Navigation: Home | About | Services (with Dropdown) | Portfolio | Studio | Contact */}
          <nav className="hide-on-tablet" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.8rem',
            position: 'relative'
          }}>
            {navLinks.map((link) => {
              const isActive = activePage === link.id;

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.id}
                    onMouseEnter={handleMouseEnterDropdown}
                    onMouseLeave={handleMouseLeaveDropdown}
                    style={{ position: 'relative' }}
                  >
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setServicesDropdownOpen((prev) => !prev);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: isActive || servicesDropdownOpen ? 'var(--color-coral-red)' : '#F5EDE8',
                        fontSize: '0.92rem',
                        fontWeight: isActive || servicesDropdownOpen ? 600 : 400,
                        cursor: 'pointer',
                        padding: '0.4rem 0.2rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        position: 'relative',
                        letterSpacing: '0.02em',
                        transition: 'color 0.25s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) e.currentTarget.style.color = 'var(--color-blush-pink)';
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive && !servicesDropdownOpen) e.currentTarget.style.color = '#F5EDE8';
                      }}
                    >
                      <span>{link.label}</span>
                      <ChevronDown 
                        size={14} 
                        style={{ 
                          transform: servicesDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                          color: servicesDropdownOpen ? 'var(--color-coral-red)' : 'var(--color-silver-grey)'
                        }} 
                      />
                      {isActive && (
                        <span style={{
                          position: 'absolute',
                          bottom: -2,
                          left: 0,
                          right: 0,
                          height: '2px',
                          background: 'linear-gradient(90deg, var(--color-coral-red), var(--color-warm-orange))',
                          borderRadius: '2px',
                          boxShadow: '0 0 10px rgba(233, 75, 80, 0.6)'
                        }} />
                      )}
                    </button>

                    {/* Services Luxury Glass Dropdown Menu */}
                    {servicesDropdownOpen && (
                      <div 
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          paddingTop: '0.8rem',
                          width: '880px',
                          maxWidth: '95vw',
                          zIndex: 1100,
                          animation: 'fadeIn 0.22s ease'
                        }}
                      >
                        <div style={{
                          backgroundColor: 'rgba(23, 17, 15, 0.97)',
                          backdropFilter: 'blur(24px)',
                          WebkitBackdropFilter: 'blur(24px)',
                          borderRadius: '18px',
                          border: '1px solid rgba(233, 75, 80, 0.35)',
                          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.65), 0 0 30px rgba(233, 75, 80, 0.15)',
                          padding: '1.5rem',
                          overflow: 'hidden'
                        }}>
                          {/* Dropdown Top Bar */}
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingBottom: '0.9rem',
                            marginBottom: '1rem',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <Camera size={16} color="var(--color-coral-red)" />
                              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#FFFFFF', letterSpacing: '0.04em' }}>
                                Studio Photography Disciplines
                              </span>
                              <span style={{
                                fontSize: '0.68rem',
                                color: 'var(--color-warm-orange)',
                                backgroundColor: 'rgba(242, 140, 40, 0.14)',
                                padding: '0.15rem 0.5rem',
                                borderRadius: 'var(--radius-pill)',
                                fontWeight: 600
                              }}>
                                12 Specialized Services
                              </span>
                            </div>

                            <button
                              onClick={() => handleNavClick('packages')}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--color-blush-pink)',
                                fontSize: '0.78rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.3rem',
                                fontWeight: 500
                              }}
                            >
                              <span>Explore All Packages & Pricing</span>
                              <ArrowRight size={13} />
                            </button>
                          </div>

                          {/* 4 Category Columns Grid */}
                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            gap: '1.2rem'
                          }}>
                            {serviceCategories.map((cat, catIdx) => (
                              <div key={catIdx} style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                                <div style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.4rem',
                                  fontSize: '0.74rem',
                                  fontWeight: 700,
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.08em',
                                  color: 'var(--color-silver-grey)',
                                  marginBottom: '0.2rem',
                                  whiteSpace: 'nowrap'
                                }}>
                                  {cat.icon}
                                  <span>{cat.name}</span>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                                  {cat.items.map((svc) => (
                                    <div
                                      key={svc.id}
                                      onClick={() => handleServiceSelect(svc.title)}
                                      style={{
                                        padding: '0.65rem 0.8rem',
                                        borderRadius: '10px',
                                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                                        border: '1px solid rgba(255, 255, 255, 0.06)',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        position: 'relative'
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(233, 75, 80, 0.15)';
                                        e.currentTarget.style.borderColor = 'rgba(233, 75, 80, 0.4)';
                                        e.currentTarget.style.transform = 'translateX(2px)';
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                                        e.currentTarget.style.transform = 'translateX(0px)';
                                      }}
                                    >
                                      <div style={{
                                        fontSize: '0.84rem',
                                        fontWeight: 600,
                                        color: '#FFFFFF',
                                        lineHeight: '1.25'
                                      }}>
                                        {svc.title}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: isActive ? 'var(--color-coral-red)' : '#F5EDE8',
                    fontSize: '0.92rem',
                    fontWeight: isActive ? 600 : 400,
                    cursor: 'pointer',
                    padding: '0.4rem 0.2rem',
                    position: 'relative',
                    letterSpacing: '0.02em',
                    transition: 'color 0.25s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = 'var(--color-blush-pink)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = '#F5EDE8';
                  }}
                >
                  {link.label}
                  {isActive && (
                    <span style={{
                      position: 'absolute',
                      bottom: -2,
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'linear-gradient(90deg, var(--color-coral-red), var(--color-warm-orange))',
                      borderRadius: '2px',
                      boxShadow: '0 0 10px rgba(233, 75, 80, 0.6)'
                    }} />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action CTA: Prominent "Book a Photoshoot" Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
            <button
              onClick={() => handleNavClick('booking')}
              className="btn-primary hide-on-tablet"
              style={{
                padding: '0.68rem 1.45rem',
                fontSize: '0.84rem'
              }}
            >
              <Calendar size={15} />
              <span>Book a Photoshoot</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="show-on-tablet"
              aria-label="Toggle navigation menu"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(166, 166, 166, 0.4)',
                borderRadius: '8px',
                padding: '0.55rem',
                color: '#FFFFFF',
                cursor: 'pointer',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer-overlay">
          {/* Top Drawer Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid rgba(166, 166, 166, 0.25)',
            paddingBottom: '0.75rem',
            flexShrink: 0
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <img 
                src={logoImg} 
                alt="Lens & Leaf" 
                style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#FFF' }}
              />
              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#FFF', lineHeight: 1.1 }}>
                  Lens <span style={{ color: 'var(--color-warm-orange)' }}>&</span> Leaf
                </div>
                <div style={{ fontSize: '0.6rem', color: 'var(--color-blush-pink)', letterSpacing: '0.2em', marginTop: '0.12rem' }}>
                  CAPTURING LIFE...
                </div>
              </div>
            </div>

            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(166, 166, 166, 0.35)',
                borderRadius: '8px',
                color: '#FFF',
                padding: '0.4rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={22} />
            </button>
          </div>

          {/* Scrollable Navigation Links */}
          <div className="mobile-nav-links-scroll">
            {navLinks.map((link, idx) => {
              if (link.id === 'services') {
                return (
                  <div key={link.id} style={{ display: 'flex', flexDirection: 'column' }}>
                    <div
                      style={{
                        background: activePage === link.id ? 'rgba(233, 75, 80, 0.15)' : 'none',
                        border: activePage === link.id ? '1px solid rgba(233, 75, 80, 0.4)' : '1px solid transparent',
                        borderRadius: '10px',
                        color: activePage === link.id ? 'var(--color-coral-red)' : '#F5EDE8',
                        padding: '0.52rem 0.85rem',
                        fontSize: '0.96rem',
                        fontFamily: 'var(--font-serif)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer'
                      }}
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontSize: '0.72rem', color: 'var(--color-silver-grey)', fontFamily: 'var(--font-sans)' }}>
                          0{idx + 1}
                        </span>
                        <span>{link.label}</span>
                      </div>
                      <ChevronDown 
                        size={17} 
                        color="var(--color-coral-red)" 
                        style={{
                          transform: mobileServicesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.25s ease'
                        }}
                      />
                    </div>

                    {/* Mobile Services Accordion List */}
                    {mobileServicesOpen && (
                      <div style={{
                        paddingLeft: '1.5rem',
                        paddingRight: '0.3rem',
                        marginTop: '0.35rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.35rem'
                      }}>
                        <button
                          onClick={() => handleNavClick('packages')}
                          style={{
                            background: 'rgba(233, 75, 80, 0.12)',
                            border: '1px solid rgba(233, 75, 80, 0.3)',
                            borderRadius: '8px',
                            color: 'var(--color-coral-red)',
                            padding: '0.5rem 0.8rem',
                            fontSize: '0.82rem',
                            textAlign: 'left',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}
                        >
                          <span>Explore All Photography Packages</span>
                          <ArrowRight size={13} />
                        </button>

                        {SERVICES_DATA.map((svc) => (
                          <button
                            key={svc.id}
                            onClick={() => handleServiceSelect(svc.title)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#DDD0D5',
                              padding: '0.45rem 0.8rem',
                              fontSize: '0.85rem',
                              textAlign: 'left',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between'
                            }}
                          >
                            <span>{svc.title}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  style={{
                    background: activePage === link.id ? 'rgba(233, 75, 80, 0.15)' : 'none',
                    border: activePage === link.id ? '1px solid rgba(233, 75, 80, 0.4)' : '1px solid transparent',
                    borderRadius: '10px',
                    color: activePage === link.id ? 'var(--color-coral-red)' : '#F5EDE8',
                    padding: '0.52rem 0.85rem',
                    fontSize: '0.96rem',
                    fontFamily: 'var(--font-serif)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--color-silver-grey)', fontFamily: 'var(--font-sans)' }}>
                      0{idx + 1}
                    </span>
                    <span>{link.label}</span>
                  </div>
                  <ChevronRight size={15} color="var(--color-coral-red)" />
                </button>
              );
            })}
          </div>

          {/* Bottom Action CTAs (Pinned at bottom with safe-area spacing) */}
          <div className="mobile-drawer-bottom-ctas">
            <button
              onClick={() => handleNavClick('booking')}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '0.68rem 1rem',
                minHeight: '44px',
                fontSize: '0.88rem',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-coral-hover)'
              }}
            >
              <Calendar size={15} />
              <span>Book a Photoshoot</span>
            </button>
            
            <a
              href={`https://wa.me/${STUDIO_INFO.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.65rem',
                padding: '0.68rem 1rem',
                minHeight: '44px',
                borderRadius: '12px',
                border: '1.5px solid rgba(37, 211, 102, 0.65)',
                backgroundColor: 'rgba(37, 211, 102, 0.12)',
                color: '#25D366',
                fontSize: '0.88rem',
                fontWeight: 600,
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(37, 211, 102, 0.15)',
                transition: 'all 0.2s ease',
                boxSizing: 'border-box'
              }}
            >
              <MessageCircle size={17} />
              <span>Direct WhatsApp Chat</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
