import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Sparkles, 
  CheckCircle, 
  MessageSquare, 
  PlusCircle, 
  Heart, 
  ShieldCheck,
  Calendar
} from 'lucide-react';
import ReviewModal from '../components/ReviewModal';

export default function Testimonials({ setActivePage }) {
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({ average: 5.0, total: 5 });
  const [activeFilter, setActiveFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchReviews = () => {
    fetch('/api/reviews')
      .then((res) => res.json())
      .then((data) => {
        if (data.reviews) setReviews(data.reviews);
        if (data.stats) setStats(data.stats);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading reviews:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleReviewAdded = (newReview) => {
    setReviews([newReview, ...reviews]);
    setStats((prev) => ({
      average: 5.0,
      total: prev.total + 1
    }));
  };

  const filterOptions = [
    'All',
    'Luxury Wedding',
    'Fine-Art Portrait & Branding',
    'Maternity & Newborn Fine-Art',
    'Editorial & Haute Couture',
    'Romantic Pre-Wedding & Elopement'
  ];

  const filteredReviews = activeFilter === 'All'
    ? reviews
    : reviews.filter((r) => r.service_type === activeFilter || r.service_type.includes(activeFilter));

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
            Client Words & Accolades
          </span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#FFF', marginBottom: '1rem' }}>
            Heirloom Testimonials & Client Reflections
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#DDD0D5', lineHeight: '1.7', fontWeight: 300 }}>
            Read authentic stories from couples, designers, and families who have stepped into our sanctuary and entrusted us with their most cherished memories.
          </p>
        </div>
      </section>

      {/* Aggregate Score & Action Bar */}
      <section style={{ padding: '3.5rem 0 1.5rem' }}>
        <div className="container">
          <div className="glass-card" style={{
            padding: '2.5rem',
            borderRadius: 'var(--radius-xl)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
            marginBottom: '3.5rem',
            border: '1.5px solid rgba(197, 160, 89, 0.35)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{
                fontSize: '3.5rem',
                fontFamily: 'var(--font-serif)',
                fontWeight: 600,
                color: 'var(--gold-dark)',
                lineHeight: 1
              }}>
                {stats.average}
              </div>

              <div>
                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.35rem' }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={22} fill="#ECC480" color="#ECC480" />
                  ))}
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-title)', fontWeight: 600 }}>
                  Flawless Studio Rating based on {stats.total} Verified Commissions
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  100% of clients would recommend Lens & Leaf to family and peers.
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-rose"
              style={{ padding: '0.85rem 1.8rem', fontSize: '0.88rem' }}
            >
              <PlusCircle size={16} />
              <span>Share Your Experience</span>
            </button>
          </div>

          {/* Filter Pills */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.65rem',
            marginBottom: '3rem'
          }}>
            {filterOptions.map((f) => {
              const isActive = activeFilter === f;
              return (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  style={{
                    padding: '0.55rem 1.2rem',
                    borderRadius: 'var(--radius-pill)',
                    border: isActive ? '1px solid var(--rose-primary)' : '1px solid rgba(197, 160, 89, 0.3)',
                    backgroundColor: isActive ? 'var(--rose-primary)' : '#FFFFFF',
                    color: isActive ? '#FFFFFF' : 'var(--text-title)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {f}
                </button>
              );
            })}
          </div>

          {/* Reviews Grid */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--gold-dark)' }}>
              Loading client reflections...
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '2rem',
              marginBottom: '5rem'
            }}>
              {filteredReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="glass-card"
                  style={{
                    padding: '2.2rem',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    border: '1px solid rgba(197, 160, 89, 0.25)'
                  }}
                >
                  <div>
                    {/* Stars and verified badge */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', gap: '0.2rem' }}>
                        {[...Array(rev.rating || 5)].map((_, i) => (
                          <Star key={i} size={16} fill="var(--gold-primary)" color="var(--gold-primary)" />
                        ))}
                      </div>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontSize: '0.72rem',
                        color: '#28A745',
                        fontWeight: 600,
                        backgroundColor: 'rgba(40, 167, 69, 0.1)',
                        padding: '0.2rem 0.6rem',
                        borderRadius: 'var(--radius-pill)'
                      }}>
                        <ShieldCheck size={12} />
                        <span>Verified Session</span>
                      </div>
                    </div>

                    <h4 style={{ fontSize: '1.2rem', color: 'var(--text-title)', marginBottom: '0.6rem', lineHeight: '1.4' }}>
                      "{rev.headline || 'Breathtaking artistry'}"
                    </h4>

                    <p style={{ fontSize: '0.92rem', color: 'var(--text-body)', lineHeight: '1.7', fontStyle: 'italic', marginBottom: '1.8rem' }}>
                      {rev.comment}
                    </p>
                  </div>

                  {/* Client Info Bar */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.9rem',
                    paddingTop: '1.2rem',
                    borderTop: '1px solid rgba(220, 206, 200, 0.6)'
                  }}>
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: '1.5px solid var(--rose-primary)',
                      flexShrink: 0
                    }}>
                      <img
                        src={rev.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                        alt={rev.client_name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-title)' }}>
                        {rev.client_name}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--gold-dark)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <span>{rev.service_type}</span>
                        {rev.session_date && (
                          <>
                            <span>•</span>
                            <span>{rev.session_date}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Leave Review Modal */}
      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onReviewSubmitted={handleReviewAdded}
      />
    </div>
  );
}
