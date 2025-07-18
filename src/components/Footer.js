import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={footerStyle}>
      <div style={footerContent}>
        {/* 🔗 Navigation Links */}
        <nav style={linkBlock}>
          <Link to="/about" style={linkStyle}>About</Link>
          <Link to="/terms" style={linkStyle}>Terms</Link>
          <Link to="/privacy" style={linkStyle}>Privacy</Link>
        </nav>

        {/* 🪶 Brand Statement */}
        <p style={statement}>
          Quietly built for precision and privacy · Works offline · 🇨🇦 Made in Canada
        </p>

        {/* © Legal Notice */}
        <p style={copyright}>
          © {new Date().getFullYear()} MapleAssist LLC. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// 🎨 Styles
const footerStyle = {
  backgroundColor: '#f7f7f7',
  padding: '24px 20px',              // ⬅ tightened from 40px
  borderTop: '1px solid #ddd',
  fontSize: '0.95rem',
  color: '#2c2c2c',
  marginTop: 'auto'                  // ⬅ auto instead of fixed 80px
};

const footerContent = {
  maxWidth: '1100px',
  margin: '0 auto',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '16px'
};

const linkBlock = {
  display: 'flex',
  justifyContent: 'center',
  gap: '24px',
  flexWrap: 'wrap'
};

const linkStyle = {
  textDecoration: 'none',
  color: '#2c2c2c',
  fontWeight: 500,
  fontSize: '0.95rem',
  transition: 'color 0.3s ease'
};

const statement = {
  margin: 0,
  fontStyle: 'italic',
  fontSize: '0.9rem',
  color: '#666'
};

const copyright = {
  margin: 0,
  fontSize: '0.85rem',
  color: '#777'
};