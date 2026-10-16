import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Calendar, 
  Users, 
  DollarSign, 
  Star, 
  RefreshCw, 
  Mail, 
  Phone, 
  CheckCircle, 
  Clock, 
  Filter, 
  AlertCircle 
} from 'lucide-react';

export default function Admin({ setActivePage }) {
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({ bookings: 0, enquiries: 0, reviews: 0, rating: 5.0, estimatedRevenue: 0 });
  const [loading, setLoading] = useState(true);
  const [statusUpdating, setStatusUpdating] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [bookingsRes, enquiriesRes, reviewsRes, statsRes] = await Promise.all([
        fetch('/api/bookings').then((r) => r.json()),
        fetch('/api/enquiries').then((r) => r.json()),
        fetch('/api/reviews').then((r) => r.json()),
        fetch('/api/stats').then((r) => r.json())
      ]);

      if (bookingsRes.bookings) setBookings(bookingsRes.bookings);
      if (enquiriesRes.enquiries) setEnquiries(enquiriesRes.enquiries);
      if (reviewsRes.reviews) setReviews(reviewsRes.reviews);
      if (statsRes) setStats(statsRes);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (bookingId, newStatus) => {
    setStatusUpdating(bookingId);
    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
        );
      }
    } catch (err) {
      console.error('Error updating status:', err);
    } finally {
      setStatusUpdating(null);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-canvas)', minHeight: '85vh', paddingBottom: '6rem' }}>
      {/* Header Banner */}
      <section style={{
        padding: '3.5rem 0 2.5rem',
        backgroundColor: '#150F11',
        color: '#FFFFFF',
        borderBottom: '1px solid rgba(197, 160, 89, 0.25)'
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                backgroundColor: 'rgba(197, 160, 89, 0.15)',
                border: '1.5px solid var(--gold-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--gold-sheen)'
              }}>
                <ShieldCheck size={28} />
              </div>
              <div>
                <span className="section-badge gold" style={{ margin: 0 }}>
                  Internal Operations
                </span>
                <h1 style={{ fontSize: '2rem', color: '#FFF', margin: '0.2rem 0 0' }}>
                  Lens & Leaf Studio Ledger & Operations Portal
                </h1>
              </div>
            </div>

            <button
              onClick={loadData}
              disabled={loading}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.4rem',
                borderRadius: 'var(--radius-pill)',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(197, 160, 89, 0.4)',
                color: '#ECC480',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 600
              }}
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              <span>Refresh Ledger</span>
            </button>
          </div>
        </div>
      </section>

      {/* Real-time KPI Stats Grid */}
      <section style={{ padding: '2.5rem 0 1rem' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}>
            <div className="glass-card" style={{ padding: '1.6rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Confirmed Sessions
                </span>
                <Calendar size={18} color="var(--rose-primary)" />
              </div>
              <div style={{ fontSize: '2.2rem', fontFamily: 'var(--font-serif)', color: 'var(--text-title)', fontWeight: 600 }}>
                {stats.bookings}
              </div>
            </div>

            <div className="glass-card" style={{ padding: '1.6rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Client Inquiries
                </span>
                <Mail size={18} color="var(--gold-dark)" />
              </div>
              <div style={{ fontSize: '2.2rem', fontFamily: 'var(--font-serif)', color: 'var(--text-title)', fontWeight: 600 }}>
                {stats.enquiries}
              </div>
            </div>

            <div className="glass-card" style={{ padding: '1.6rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Booked Pipeline
                </span>
                <DollarSign size={18} color="#28A745" />
              </div>
              <div style={{ fontSize: '2.2rem', fontFamily: 'var(--font-serif)', color: '#28A745', fontWeight: 600 }}>
                ${Number(stats.estimatedRevenue).toLocaleString()}
              </div>
            </div>

            <div className="glass-card" style={{ padding: '1.6rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Studio Rating
                </span>
                <Star size={18} color="#ECC480" fill="#ECC480" />
              </div>
              <div style={{ fontSize: '2.2rem', fontFamily: 'var(--font-serif)', color: 'var(--text-title)', fontWeight: 600 }}>
                {stats.rating}★ <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 400 }}>({stats.reviews} reviews)</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div style={{ display: 'flex', gap: '0.8rem', borderBottom: '1px solid rgba(197, 160, 89, 0.3)', paddingBottom: '1rem', marginBottom: '2rem' }}>
            {[
              { id: 'bookings', label: `Active Bookings (${bookings.length})` },
              { id: 'enquiries', label: `Direct Inquiries (${enquiries.length})` },
              { id: 'reviews', label: `Published Reviews (${reviews.length})` }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '0.65rem 1.4rem',
                  borderRadius: 'var(--radius-pill)',
                  border: activeTab === tab.id ? '1px solid var(--gold-primary)' : '1px solid transparent',
                  backgroundColor: activeTab === tab.id ? 'rgba(197, 160, 89, 0.15)' : 'transparent',
                  color: activeTab === tab.id ? 'var(--gold-dark)' : 'var(--text-body)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: BOOKINGS TABLE */}
          {activeTab === 'bookings' && (
            <div className="glass-card" style={{ overflowX: 'auto', borderRadius: 'var(--radius-lg)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--bg-cream)', borderBottom: '1.5px solid rgba(197, 160, 89, 0.3)', color: 'var(--text-title)' }}>
                    <th style={{ padding: '1rem 1.2rem' }}>Ref & Date</th>
                    <th style={{ padding: '1rem 1.2rem' }}>Client Details</th>
                    <th style={{ padding: '1rem 1.2rem' }}>Discipline & Tier</th>
                    <th style={{ padding: '1rem 1.2rem' }}>Slot & Location</th>
                    <th style={{ padding: '1rem 1.2rem' }}>Add-ons</th>
                    <th style={{ padding: '1rem 1.2rem' }}>Amount</th>
                    <th style={{ padding: '1rem 1.2rem' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id} style={{ borderBottom: '1px solid rgba(220, 206, 200, 0.5)' }}>
                      <td style={{ padding: '1.2rem' }}>
                        <strong style={{ color: 'var(--rose-primary)', display: 'block', fontSize: '0.85rem' }}>
                          {b.ref_code}
                        </strong>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          {b.session_date}
                        </span>
                      </td>

                      <td style={{ padding: '1.2rem' }}>
                        <div style={{ fontWeight: 600, color: 'var(--text-title)' }}>{b.full_name}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{b.email}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{b.phone}</div>
                      </td>

                      <td style={{ padding: '1.2rem' }}>
                        <div style={{ fontWeight: 500 }}>{b.service_name}</div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--gold-dark)', display: 'block' }}>
                          {b.package_name}
                        </span>
                      </td>

                      <td style={{ padding: '1.2rem', fontSize: '0.82rem' }}>
                        <div>{b.time_slot}</div>
                        <div style={{ color: 'var(--text-muted)' }}>{b.location_type}</div>
                      </td>

                      <td style={{ padding: '1.2rem', fontSize: '0.78rem', color: 'var(--text-body)', maxWidth: '200px' }}>
                        {b.add_ons || 'None'}
                      </td>

                      <td style={{ padding: '1.2rem' }}>
                        <strong style={{ fontSize: '1.05rem', color: 'var(--gold-dark)' }}>
                          ${b.total_amount}
                        </strong>
                      </td>

                      <td style={{ padding: '1.2rem' }}>
                        <select
                          value={b.status}
                          disabled={statusUpdating === b.id}
                          onChange={(e) => handleStatusChange(b.id, e.target.value)}
                          style={{
                            padding: '0.35rem 0.7rem',
                            borderRadius: 'var(--radius-pill)',
                            border: '1px solid rgba(197, 160, 89, 0.4)',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            backgroundColor:
                              b.status === 'Confirmed' ? 'rgba(40, 167, 69, 0.12)' :
                              b.status === 'Completed' ? 'rgba(0, 123, 255, 0.12)' :
                              b.status === 'Cancelled' ? 'rgba(220, 53, 69, 0.12)' : 'rgba(255, 193, 7, 0.12)',
                            color:
                              b.status === 'Confirmed' ? '#28A745' :
                              b.status === 'Completed' ? '#007BFF' :
                              b.status === 'Cancelled' ? '#DC3545' : '#856404',
                            cursor: 'pointer',
                            outline: 'none'
                          }}
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 2: ENQUIRIES TABLE */}
          {activeTab === 'enquiries' && (
            <div className="glass-card" style={{ overflowX: 'auto', borderRadius: 'var(--radius-lg)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--bg-cream)', borderBottom: '1.5px solid rgba(197, 160, 89, 0.3)', color: 'var(--text-title)' }}>
                    <th style={{ padding: '1rem 1.2rem' }}>Date Received</th>
                    <th style={{ padding: '1rem 1.2rem' }}>Client Name</th>
                    <th style={{ padding: '1rem 1.2rem' }}>Contact Info</th>
                    <th style={{ padding: '1rem 1.2rem' }}>Commission Type</th>
                    <th style={{ padding: '1rem 1.2rem' }}>Client Vision & Message</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                        No direct enquiries received yet.
                      </td>
                    </tr>
                  ) : (
                    enquiries.map((enq) => (
                      <tr key={enq.id} style={{ borderBottom: '1px solid rgba(220, 206, 200, 0.5)' }}>
                        <td style={{ padding: '1.2rem', whiteSpace: 'nowrap', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          {new Date(enq.created_at).toLocaleDateString()}
                        </td>
                        <td style={{ padding: '1.2rem', fontWeight: 600, color: 'var(--text-title)' }}>
                          {enq.full_name}
                        </td>
                        <td style={{ padding: '1.2rem', fontSize: '0.82rem' }}>
                          <div>{enq.email}</div>
                          <div style={{ color: 'var(--text-muted)' }}>{enq.phone || 'No phone'}</div>
                        </td>
                        <td style={{ padding: '1.2rem', color: 'var(--rose-primary)', fontWeight: 500 }}>
                          {enq.event_type}
                        </td>
                        <td style={{ padding: '1.2rem', fontSize: '0.85rem', color: 'var(--text-body)', lineHeight: '1.5' }}>
                          {enq.message}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 3: REVIEWS TABLE */}
          {activeTab === 'reviews' && (
            <div className="glass-card" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {reviews.map((r) => (
                  <div key={r.id} style={{
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(197, 160, 89, 0.25)',
                    backgroundColor: '#FFFFFF'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <strong style={{ color: 'var(--text-title)' }}>{r.client_name}</strong>
                      <span style={{ color: '#ECC480' }}>{'★'.repeat(r.rating || 5)}</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--gold-dark)', marginBottom: '0.5rem' }}>
                      {r.service_type}
                    </div>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', fontStyle: 'italic', lineHeight: '1.6' }}>
                      "{r.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
