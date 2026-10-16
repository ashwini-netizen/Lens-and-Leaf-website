import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Studio from './pages/Studio';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import Faqs from './pages/Faqs';
import Admin from './pages/Admin';
import AmbientFloralParticles from './components/AmbientFloralParticles';
import CustomCursor from './components/CustomCursor';
import CinematicIntro from './components/CinematicIntro';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedService, setSelectedService] = useState(null);
  const [showIntro, setShowIntro] = useState(() => {
    // Show cinematic intro once per session, or if query param ?intro=1
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('intro') === '1') return true;
      return !sessionStorage.getItem('lens_leaf_intro_seen');
    }
    return true;
  });

  const handleIntroComplete = () => {
    sessionStorage.setItem('lens_leaf_intro_seen', 'true');
    setShowIntro(false);
  };

  // Sync hash routing so users can bookmark and refresh pages
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      const validPages = ['home', 'about', 'services', 'portfolio', 'studio', 'booking', 'contact', 'faqs', 'admin'];
      if (hash && validPages.includes(hash)) {
        setActivePage(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToPage = (pageId) => {
    setActivePage(pageId);
    window.location.hash = `#/${pageId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectServiceForBooking = (serviceTitle) => {
    setSelectedService(serviceTitle);
    navigateToPage('booking');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--bg-canvas)', position: 'relative' }}>
      {/* Cinematic Logo & Aperture Reveal */}
      {showIntro && <CinematicIntro onComplete={handleIntroComplete} />}

      {/* Custom Luxury Editorial Cursor */}
      <CustomCursor />

      {/* Ambient Floral & Light Particles */}
      <AmbientFloralParticles />

      {/* Top Navbar */}
      <Navbar 
        activePage={activePage} 
        setActivePage={navigateToPage} 
        onSelectService={handleSelectServiceForBooking} 
      />

      {/* Main Page Stage with Smooth Fade & Slide Page Transitions */}
      <main style={{ flex: 1 }}>
        <div key={activePage} className="page-transition-enter">
        {activePage === 'home' && (
          <Home
            setActivePage={navigateToPage}
            onSelectService={handleSelectServiceForBooking}
          />
        )}
        {activePage === 'about' && (
          <About setActivePage={navigateToPage} />
        )}
        {activePage === 'services' && (
          <Services
            setActivePage={navigateToPage}
            onSelectService={handleSelectServiceForBooking}
          />
        )}
        {activePage === 'portfolio' && (
          <Portfolio setActivePage={navigateToPage} />
        )}
        {activePage === 'studio' && (
          <Studio setActivePage={navigateToPage} />
        )}
        {activePage === 'booking' && (
          <Booking
            initialService={selectedService}
            setActivePage={navigateToPage}
          />
        )}
        {activePage === 'contact' && (
          <Contact />
        )}
        {activePage === 'faqs' && (
          <Faqs setActivePage={navigateToPage} />
        )}
        {activePage === 'admin' && (
          <Admin setActivePage={navigateToPage} />
        )}
        </div>
      </main>

      {/* Bottom Footer */}
      <Footer setActivePage={navigateToPage} />
    </div>
  );
}
