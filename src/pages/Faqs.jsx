import React, { useState } from 'react';
import { 
  ChevronDown, 
  Search, 
  HelpCircle, 
  Sparkles, 
  Calendar, 
  ArrowRight,
  MessageCircle,
  FileQuestion
} from 'lucide-react';
import { FAQS, STUDIO_INFO } from '../data/siteData';

export default function Faqs({ setActivePage }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndexes, setOpenIndexes] = useState([0, 1]); // First two open by default

  const filteredFaqs = FAQS.filter((faq) => {
    return faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
           faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const toggleAccordion = (index) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  return (
    <div className="page-enter" style={{ backgroundColor: 'var(--bg-canvas)' }}>
      {/* 1. Header Banner */}
      <section style={{
        padding: '5.5rem 0 3.5rem',
        backgroundColor: '#17110F',
        color: '#FFFFFF',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '820px' }}>
          <span className="section-badge light">
            Questions & Answers
          </span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#FFF', marginBottom: '1rem' }}>
            Frequently Asked Questions
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#F5EDE8', lineHeight: '1.7', fontWeight: 300 }}>
            Everything you need to know about reserving your photoshoot, styling guidance, turnaround times, and studio policies.
          </p>

          {/* Search Bar */}
          <div style={{
            position: 'relative',
            maxWidth: '540px',
            margin: '2rem auto 0'
          }}>
            <Search size={18} color="var(--color-coral-red)" style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search questions (e.g. wardrobe, turnaround, booking, studio)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.85rem 1.2rem 0.85rem 3.2rem',
                borderRadius: 'var(--radius-pill)',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1.5px solid rgba(166, 166, 166, 0.4)',
                color: '#FFFFFF',
                fontSize: '0.95rem',
                outline: 'none',
                backdropFilter: 'blur(10px)'
              }}
            />
          </div>
        </div>
      </section>

      {/* 2. Main FAQ Accordion Stage (Requirement #14) */}
      <section style={{ padding: '4.5rem 0 6rem' }}>
        <div className="container" style={{ maxWidth: '880px' }}>
          {filteredFaqs.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(166, 166, 166, 0.3)'
            }}>
              <FileQuestion size={40} color="var(--color-coral-red)" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.35rem', color: 'var(--text-title)', marginBottom: '0.5rem' }}>
                No questions found matching "{searchTerm}"
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
                Our studio concierge is delighted to answer any specific question directly.
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="btn-secondary"
                style={{ fontSize: '0.85rem', padding: '0.65rem 1.4rem' }}
              >
                Clear Search Filter
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {filteredFaqs.map((faq, idx) => {
                const isOpen = openIndexes.includes(idx);
                return (
                  <div
                    key={idx}
                    className="glass-card"
                    style={{
                      borderRadius: 'var(--radius-lg)',
                      overflow: 'hidden',
                      border: isOpen ? '1.5px solid var(--color-coral-red)' : '1px solid rgba(166, 166, 166, 0.3)',
                      transition: 'all 0.25s ease'
                    }}
                  >
                    <button
                      onClick={() => toggleAccordion(idx)}
                      style={{
                        width: '100%',
                        padding: '1.5rem 2rem',
                        background: isOpen ? 'rgba(233, 75, 80, 0.04)' : '#FFFFFF',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        textAlign: 'left',
                        gap: '1.5rem',
                        transition: 'background 0.2s ease'
                      }}
                    >
                      <div>
                        <span style={{
                          fontSize: '0.74rem',
                          color: 'var(--color-coral-red)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          fontWeight: 700,
                          display: 'block',
                          marginBottom: '0.2rem'
                        }}>
                          Topic 0{idx + 1} • {faq.category}
                        </span>
                        <h3 style={{
                          fontSize: '1.22rem',
                          color: 'var(--text-title)',
                          fontWeight: 600,
                          lineHeight: '1.35'
                        }}>
                          {faq.question}
                        </h3>
                      </div>

                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: isOpen ? 'var(--color-coral-red)' : 'rgba(233, 75, 80, 0.1)',
                        color: isOpen ? '#FFF' : 'var(--color-coral-red)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.25s ease'
                      }}>
                        <ChevronDown size={18} />
                      </div>
                    </button>

                    {isOpen && (
                      <div style={{
                        padding: '0 2rem 1.8rem',
                        backgroundColor: isOpen ? 'rgba(233, 75, 80, 0.04)' : '#FFFFFF',
                        color: 'var(--text-body)',
                        fontSize: '0.98rem',
                        lineHeight: '1.8',
                        borderTop: '1px solid rgba(233, 75, 80, 0.15)',
                        animation: 'fadeIn 0.2s ease'
                      }}>
                        <p style={{ paddingTop: '1.2rem' }}>
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Concierge Contact Banner */}
          <div style={{
            marginTop: '4rem',
            textAlign: 'center',
            padding: '3.5rem',
            borderRadius: 'var(--radius-xl)',
            backgroundColor: '#17110F',
            color: '#FFFFFF',
            border: '1px solid rgba(166, 166, 166, 0.25)'
          }}>
            <h3 style={{ fontSize: '1.9rem', color: '#FFF', marginBottom: '0.6rem' }}>
              Have an Unanswered Question or Custom Requirement?
            </h3>
            <p style={{ color: '#F5EDE8', fontSize: '0.96rem', maxWidth: '620px', margin: '0 auto 2rem', lineHeight: '1.6' }}>
              We are delighted to tailor custom destination itineraries, special studio hours, or commercial copyright arrangements.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              <button
                onClick={() => setActivePage('contact')}
                className="btn-primary"
              >
                <span>Contact Studio Concierge</span>
                <ArrowRight size={16} />
              </button>
              <a
                href={`https://wa.me/${STUDIO_INFO.whatsappNumber}?text=Hello%20Lens%20%26%20Leaf,%20I%20have%20a%20question%20regarding%20a%20photoshoot.`}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.85rem 1.8rem',
                  borderRadius: 'var(--radius-pill)',
                  border: '1px solid rgba(37, 211, 102, 0.4)',
                  color: '#25D366',
                  fontSize: '0.92rem',
                  fontWeight: 600
                }}
              >
                <MessageCircle size={18} />
                <span>WhatsApp Directly</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
