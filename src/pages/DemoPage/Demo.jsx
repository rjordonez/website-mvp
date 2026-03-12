import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import CRMView from './CRMView';

function Demo() {
  const [email, setEmail] = useState('');
  const [showDemo, setShowDemo] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setSubmitting(true);
    try {
      if (supabase) {
        await supabase.from('demo_emails').insert([
          { email: email.trim(), source: 'demo_page' }
        ]);
      }
    } catch (err) {
      console.error('Failed to save email:', err);
    }
    setSubmitting(false);
    setShowDemo(true);
  };

  if (showDemo) {
    return <CRMView />;
  }

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 9999,
    }}>
      <div style={{
        background: 'white', borderRadius: '12px', padding: '3rem',
        maxWidth: '440px', width: '90%', textAlign: 'center',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
      }}>
        <h2 style={{
          fontSize: '1.75rem', fontWeight: 300, color: '#1f2937',
          fontFamily: "'Playfair Display', serif", margin: '0 0 0.5rem',
        }}>
          Try the Trilio Demo
        </h2>
        <p style={{
          fontSize: '0.95rem', color: '#6b7280', lineHeight: 1.6,
          margin: '0 0 2rem',
        }}>
          Enter your email to access the interactive product demo.
        </p>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="email"
            required
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: '0.85rem 1rem', borderRadius: '6px',
              border: '1px solid #d1d5db', fontSize: '1rem',
              outline: 'none', width: '100%', boxSizing: 'border-box',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => e.target.style.borderColor = '#4B6EF5'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
          />
          <button
            type="submit"
            disabled={submitting}
            style={{
              background: '#4B6EF5', color: 'white', border: 'none',
              padding: '0.85rem', borderRadius: '6px', fontSize: '1rem',
              fontWeight: 500, cursor: submitting ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s',
              opacity: submitting ? 0.7 : 1,
            }}
            onMouseEnter={(e) => !submitting && (e.target.style.background = '#3b5de7')}
            onMouseLeave={(e) => !submitting && (e.target.style.background = '#4B6EF5')}
          >
            {submitting ? 'Loading...' : 'Access Demo'}
          </button>
        </form>
        <p style={{
          fontSize: '0.75rem', color: '#9ca3af', marginTop: '1.25rem',
        }}>
          We'll never share your email. No spam, ever.
        </p>
      </div>
    </div>
  );
}

export default Demo;
