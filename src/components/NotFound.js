import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main style={container}>
      <div style={content}>
        <h1 style={code}>404</h1>
        <h2 style={title}>Page Not Found</h2>
        <p style={message}>
          The page you’re trying to reach doesn’t exist or may have been moved. Return to the homepage to continue exploring MapleAssist’s tools and resources.
        </p>
        <Link to="/" style={btn}>← Back to Home</Link>
      </div>
    </main>
  );
}

// 🎨 Styles
const container = {
  minHeight: '60vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '60px 20px',
  backgroundColor: '#f7f9fb'
};

const content = {
  textAlign: 'center',
  maxWidth: '640px',
  color: '#2c2c2c'
};

const code = {
  fontSize: '4.5rem',
  fontWeight: '700',
  color: '#c94b4b',
  marginBottom: '8px'
};

const title = {
  fontSize: '1.6rem',
  fontWeight: '600',
  marginBottom: '16px'
};

const message = {
  fontSize: '1rem',
  lineHeight: '1.6',
  color: '#555',
  marginBottom: '24px'
};

const btn = {
  display: 'inline-block',
  padding: '12px 24px',
  backgroundColor: '#2b2b2b',
  color: '#fff',
  borderRadius: '6px',
  textDecoration: 'none',
  fontSize: '0.95rem',
  fontWeight: 500
};