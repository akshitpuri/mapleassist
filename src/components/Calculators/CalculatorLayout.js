import React from 'react';

export default function CalculatorLayout({ title, children }) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640;

  const childArray = React.Children.toArray(children);
  const backButton = childArray.find(child => child?.type?.name === 'BackButton');
  const otherContent = childArray.filter(child => child?.type?.name !== 'BackButton');

  const dynamicHeader = {
    ...header,
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: isMobile ? 'center' : 'space-between',
    textAlign: isMobile ? 'center' : 'left'
  };

  const dynamicHeading = {
    ...heading,
    textAlign: isMobile ? 'center' : 'left'
  };

  const dynamicBackWrap = {
    ...backWrap,
    justifyContent: isMobile ? 'center' : 'flex-end',
    width: isMobile ? '100%' : 'auto'
  };

  return (
    <div style={outerWrap}>
      <main style={container}>
        {/* 🧭 Header */}
        <header style={dynamicHeader}>
          <h1 style={dynamicHeading}>{title}</h1>
          {backButton && <div style={dynamicBackWrap}>{backButton}</div>}
        </header>

        {/* 🧮 Content */}
        <section style={content}>
          {otherContent}
          <div style={{ flexGrow: 1 }} />
        </section>
      </main>
    </div>
  );
}

// 🎨 Styles
const outerWrap = {
  backgroundRepeat: 'repeat',
  backgroundSize: 'auto',
  backgroundPosition: 'top left',
  backgroundColor: '#f7f9fb',
  minHeight: '100vh',
  width: '100%',
  padding: '0 0 60px'
};

const container = {
  display: 'flex',
  flexDirection: 'column',
  padding: '32px 16px',
  maxWidth: '900px',
  margin: '0 auto',
  boxSizing: 'border-box',
  fontFamily: '"Segoe UI", system-ui, sans-serif',
  color: '#2c2c2c',
  width: '100%'
};

const header = {
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '12px',
  marginBottom: '28px',
  width: '100%'
};

const heading = {
  margin: 0,
  fontSize: 'clamp(1.6rem, 4vw, 2rem)',
  fontWeight: 700,
  color: '#2c2c2c',
  flex: '1 1 auto'
};

const backWrap = {
  display: 'flex',
  flex: '0 1 auto',
  boxSizing: 'border-box'
};

const content = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '24px'
};