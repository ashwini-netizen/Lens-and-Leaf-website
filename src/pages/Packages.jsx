import React, { useState, useEffect } from 'react';
import { 
  Check, 
  Calendar, 
  Sparkles, 
  ShieldCheck, 
  Plus, 
  Clock, 
  Image, 
  ArrowRight,
  HelpCircle
} from 'lucide-react';

export default function Packages({ setActivePage, onSelectPackage }) {
  const [packages, setPackages] = useState([]);
  const [addOns, setAddOns] = useState([]);
  const [selectedPackageId, setSelectedPackageId] = useState('heritage');
  const [activeAddOns, setActiveAddOns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/packages')
      .then((res) => res.json())
      .then((data) => {
        if (data.packages) setPackages(data.packages);
        if (data.addOns) setAddOns(data.addOns);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching packages:', err);
        setLoading(false);
      });
  }, []);

  const toggleAddOn = (addOnId) => {
    if (activeAddOns.includes(addOnId)) {
      setActiveAddOns(activeAddOns.filter((id) => id !== addOnId));
    } else {
      setActiveAddOns([...activeAddOns, addOnId]);
    }
  };

  const currentPkg = packages.find((p) => p.id === selectedPackageId) || packages[1];
  const pkgPrice = currentPkg ? currentPkg.price : 1350;
  const addOnsTotal = activeAddOns.reduce((sum, id) => {
    const item = addOns.find((a) => a.id === id);
    return sum + (item ? item.price : 0);
  }, 0);
  const estimatedInvestment = pkgPrice + addOnsTotal;

  const handleProceedToBooking = (pkg) => {
    if (onSelectPackage) {
      onSelectPackage({
        package: pkg || currentPkg,
        selectedAddOns: activeAddOns.map((id) => addOns.find((a) => a.id === id)?.name).filter(Boolean)
      });
    }
    setActivePage('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-canvas)' }}>
      {/* Header Banner */}
      <section style={{
        padding: '5rem 0 3.5rem',
        backgroundColor: '#150F11',
        color: '#FFFFFF',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '820px' }}>
          <span className="section-badge gold">
            Transparent Investment
          </span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#FFF', marginBottom: '1rem' }}>
            Photoshoot Packages & Heirloom Collections
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#DDD0D5', lineHeight: '1.7', fontWeight: 300 }}>
            Every collection is all-inclusive with master color-grading, private digital galleries, and personal printing rights. Choose your preferred tier or tailor with artisanal add-ons.
          </p>
        </div>
      </section>

      {/* Main Packages Grid */}
      <section style={{ padding: '5.5rem 0' }}>
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--gold-dark)' }}>
              Loading photoshoot collections...
            </div>
          ) : (
            <>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
                gap: '2.5rem',
                alignItems: 'stretch',
                marginBottom: '5rem'
              }}>
                {packages.map((pkg) => {
                  const isPopular = pkg.popular;
                  return (
                    <div
                      key={pkg.id}
                      style={{
                        backgroundColor: isPopular ? '#1A1316' : '#FFFFFF',
                        color: isPopular ? '#FFFFFF' : 'var(--text-body)',
                        borderRadius: 'var(--radius-xl)',
                        padding: '2.8rem 2.2rem',
                        border: isPopular ? '2px solid var(--gold-primary)' : '1px solid rgba(197, 160, 89, 0.25)',
                        boxShadow: isPopular ? 'var(--shadow-hover)' : 'var(--shadow-card)',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        transform: isPopular ? 'scale(1.03)' : 'none',
                        zIndex: isPopular ? 2 : 1
                      }}
                    >
                      {isPopular && (
                        <div style={{
                          position: 'absolute',
                          top: '-15px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          backgroundColor: 'var(--gradient-gold)',
                          background: 'var(--gradient-gold)',
                          color: '#1A1315',
                          padding: '0.35rem 1.4rem',
                          borderRadius: 'var(--radius-pill)',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          boxShadow: '0 4px 15px rgba(197, 160, 89, 0.4)'
                        }}>
                          Most Celebrated Collection
                        </div>
                      )}

                      <div style={{ marginBottom: '1.5rem' }}>
                        <span style={{
                          fontSize: '0.8rem',
                          color: isPopular ? 'var(--gold-sheen)' : 'var(--rose-primary)',
                          fontWeight: 600,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase'
                        }}>
                          {pkg.tier}
                        </span>
                        <h3 style={{
                          fontSize: '1.85rem',
                          color: isPopular ? '#FFFFFF' : 'var(--text-title)',
                          marginTop: '0.3rem',
                          marginBottom: '0.5rem'
                        }}>
                          {pkg.name}
                        </h3>
                        <p style={{
                          fontSize: '0.88rem',
                          color: isPopular ? '#BBB' : 'var(--text-muted)',
                          lineHeight: '1.6',
                          minHeight: '44px'
                        }}>
                          {pkg.tagline}
                        </p>
                      </div>

                      {/* Price Badge */}
                      <div style={{
                        padding: '1.2rem 0',
                        borderTop: isPopular ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(220, 206, 200, 0.6)',
                        borderBottom: isPopular ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(220, 206, 200, 0.6)',
                        marginBottom: '1.8rem',
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '0.5rem'
                      }}>
                        <span style={{
                          fontSize: '2.8rem',
                          fontFamily: 'var(--font-serif)',
                          color: isPopular ? 'var(--gold-sheen)' : 'var(--gold-dark)',
                          fontWeight: 600,
                          lineHeight: 1
                        }}>
                          ${pkg.price}
                        </span>
                        <span style={{ fontSize: '0.85rem', color: isPopular ? '#9E8F96' : 'var(--text-muted)' }}>
                          / session all-inclusive
                        </span>
                      </div>

                      {/* Quick Specs */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '0.8rem',
                        marginBottom: '1.8rem',
                        fontSize: '0.82rem',
                        color: isPopular ? '#DDD' : 'var(--text-body)'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Clock size={15} color="var(--rose-primary)" />
                          <span>{pkg.duration}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Image size={15} color="var(--gold-primary)" />
                          <span>{pkg.deliverables.split(' ')[0]} Retouched</span>
                        </div>
                      </div>

                      {/* Inclusions List */}
                      <div style={{ flex: 1, marginBottom: '2.2rem' }}>
                        <div style={{
                          fontSize: '0.78rem',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          fontWeight: 600,
                          marginBottom: '0.8rem',
                          color: isPopular ? 'var(--gold-sheen)' : 'var(--text-title)'
                        }}>
                          Collection Inclusions:
                        </div>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                          {pkg.inclusions.map((inc, iIdx) => (
                            <li key={iIdx} style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '0.6rem',
                              fontSize: '0.88rem',
                              color: isPopular ? '#DDD0D5' : 'var(--text-body)'
                            }}>
                              <Check size={16} color="var(--rose-primary)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                              <span>{inc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        onClick={() => handleProceedToBooking(pkg)}
                        className={isPopular ? 'btn-primary' : 'btn-outline'}
                        style={{ width: '100%' }}
                      >
                        <Calendar size={16} />
                        <span>Book {pkg.name}</span>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* =============================================================
                  INTERACTIVE ADD-ON INVESTMENT ESTIMATOR
                  ============================================================= */}
              <div className="glass-card" style={{
                padding: '3rem',
                borderRadius: 'var(--radius-xl)',
                border: '1.5px solid rgba(197, 160, 89, 0.4)'
              }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem', maxWidth: '720px', margin: '0 auto 2.5rem' }}>
                  <span className="section-badge gold">
                    Artisan Customizer
                  </span>
                  <h3 style={{ fontSize: '2rem', color: 'var(--text-title)', marginBottom: '0.5rem' }}>
                    Interactive Package & Add-On Calculator
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                    Customize your shoot with luxury additions to estimate your total session investment in real-time.
                  </p>
                </div>

                {/* Package selector pills */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  marginBottom: '2.5rem'
                }}>
                  {packages.map((pkg) => (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedPackageId(pkg.id)}
                      style={{
                        padding: '0.75rem 1.6rem',
                        borderRadius: 'var(--radius-pill)',
                        border: selectedPackageId === pkg.id ? '2px solid var(--rose-primary)' : '1px solid rgba(197, 160, 89, 0.3)',
                        backgroundColor: selectedPackageId === pkg.id ? 'rgba(200, 82, 108, 0.12)' : '#FFFFFF',
                        color: selectedPackageId === pkg.id ? 'var(--rose-primary)' : 'var(--text-title)',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <span>{pkg.name} (${pkg.price})</span>
                    </button>
                  ))}
                </div>

                {/* Add-ons Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '1.2rem',
                  marginBottom: '2.5rem'
                }}>
                  {addOns.map((addon) => {
                    const isSelected = activeAddOns.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddOn(addon.id)}
                        style={{
                          padding: '1.2rem',
                          borderRadius: 'var(--radius-md)',
                          border: isSelected ? '1.5px solid var(--gold-primary)' : '1px solid rgba(220, 206, 200, 0.6)',
                          backgroundColor: isSelected ? 'rgba(197, 160, 89, 0.12)' : '#FFFFFF',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{
                            width: '22px',
                            height: '22px',
                            borderRadius: '4px',
                            border: isSelected ? '1px solid var(--gold-primary)' : '1px solid #CCC',
                            backgroundColor: isSelected ? 'var(--gold-primary)' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#FFF'
                          }}>
                            {isSelected && <Check size={14} />}
                          </div>
                          <span style={{ fontSize: '0.9rem', color: 'var(--text-title)', fontWeight: 500 }}>
                            {addon.name}
                          </span>
                        </div>
                        <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--gold-dark)' }}>
                          +${addon.price}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Summary & Booking Jump */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1.5rem',
                  paddingTop: '2rem',
                  borderTop: '1px solid rgba(197, 160, 89, 0.3)'
                }}>
                  <div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Estimated Investment ({currentPkg?.name} + {activeAddOns.length} Add-ons):
                    </span>
                    <div style={{
                      fontSize: '2.4rem',
                      fontFamily: 'var(--font-serif)',
                      color: 'var(--gold-dark)',
                      fontWeight: 600,
                      lineHeight: 1.1
                    }}>
                      ${estimatedInvestment}
                    </div>
                  </div>

                  <button
                    onClick={() => handleProceedToBooking(currentPkg)}
                    className="btn-primary"
                    style={{ padding: '0.95rem 2.2rem', fontSize: '0.95rem' }}
                  >
                    <span>Proceed to Booking with this Configuration</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
