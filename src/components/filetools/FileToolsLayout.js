import React from 'react';
import BackButton from '../BackButton';

export default function FileToolsLayout({ title, children, showBackButton = true }) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640;

  const dynamicHeaderRow = {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: isMobile ? 'center' : 'space-between',
    alignItems: 'center',
    marginBottom: '28px',
    flexWrap: 'wrap',
    gap: '12px',
    textAlign: isMobile ? 'center' : 'left'
  };

  const dynamicHeading = {
    fontSize: '2rem',
    fontWeight: 600,
    margin: 0,
    color: '#2c2c2c',
    lineHeight: 1.3,
    textAlign: isMobile ? 'center' : 'left'
  };

  return (
    <div style={{
      maxWidth: '960px',
      margin: '0 auto',
      padding: '36px 20px',
      fontFamily: '"Segoe UI", system-ui, sans-serif',
      color: '#2c2c2c'
    }}>
      {/* 🧭 Classy Header Row */}
      <div style={dynamicHeaderRow}>
        <h2 style={dynamicHeading}>{title}</h2>
        {showBackButton && <BackButton />}
      </div>

      {children}
    </div>
  );
}