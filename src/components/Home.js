import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Home() {
  const categories = [
    { name: 'Web & SEO', path: '/web-seo-tools', description: 'Meta previews, snippets, keywords and performance tools.' },
    { name: 'Privacy & Security', path: '/privacy-security-tools', description: 'Password, hash, QR, and encryption utilities.' },
    { name: 'Misc & Fun', path: '/calculators/misc', description: 'Sleep cycle, dice roller, love calculator and numerology.' },
    { name: 'Time & Date', path: '/calculators/time', description: 'Unix timestamps, timezone converters, age calculators and clocks.' },
    { name: 'Math & Numbers', path: '/calculators/math', description: 'Prime testers, base converters, randomizers and sequences.' },
    { name: 'PDF Tools', path: '/filetools/pdftools', description: 'Split, merge, compress and convert PDF files quickly and securely.' },
    { name: 'Image Tools', path: '/filetools/imagetools', description: 'Resize, compress, convert and inspect images — right in the browser.' },
    { name: 'Text & Writing', path: '/text-tools', description: 'Formatters, case converters, counters and clean-up helpers for writers.' }
  ];

  return (
    <div style={outerWrap}>
      <Helmet>
        <title>MapleAssist | Privacy-First Productivity Tools</title>
        <meta name="description" content="Privacy-forward calculators and utilities for professionals. Built in Canada." />
      </Helmet>

      <main style={container}>
        {/* 🧭 Hero Section */}
        <section style={hero}>
          <h1 style={heroTitle}>MapleAssist</h1>
          <p style={heroSubtitle}>
            Crafted for professionals, students, and creators—MapleAssist delivers dependable tools for computation, organization, and optimization.
            No accounts. No clutter. Just results.
          </p>
          <div style={buttonGroup}>
            <Link to="/calculators" style={primaryBtn}>Calculators</Link>
            <Link to="/filetools" style={secondaryBtn}>File Utilities</Link>
          </div>
        </section>

        {/* 📂 Categories Section */}
        <section style={gridWrap}>
          <h2 style={sectionHeading}>Explore Categories</h2>
          <div style={grid}>
            {categories.map(({ name, path, description }) => (
              <Link key={path} to={path} style={card}>
                <h3 style={cardTitle}>{name}</h3>
                <p style={cardDesc}>{description}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
// 📐 Styles
const outerWrap = {
  backgroundImage: 'url("/maple-pattern.png")', // use seamless maple tile
  backgroundRepeat: 'repeat',
  backgroundSize: 'auto',
  backgroundPosition: 'top left',
  backgroundColor: '#f7f9fb',
  minHeight: '100vh',
  width: '100%',
  padding: '0 0 60px'
};

const container = {
  maxWidth: '1100px',
  margin: '0 auto',
  padding: '0 24px',
  fontFamily: '"Segoe UI", system-ui, sans-serif',
  color: '#2c2c2c'
};

const hero = {
  textAlign: 'center',
  padding: '80px 32px',
  marginBottom: '0',
  color: '#2b2b2b'
};

const heroTitle = {
  fontSize: '2.6rem',
  fontWeight: 700,
  marginBottom: '16px'
};

const heroSubtitle = {
  fontSize: '1.15rem',
  maxWidth: '680px',
  margin: '0 auto 32px',
  color: '#555',
  lineHeight: '1.6'
};

const buttonGroup = {
  display: 'flex',
  justifyContent: 'center',
  gap: '16px',
  flexWrap: 'wrap',
  marginTop: '24px'
};

const primaryBtn = {
  fontSize: '1rem',
  padding: '12px 28px',
  backgroundColor: '#2b2b2b',
  color: '#fff',
  textDecoration: 'none',
  borderRadius: '6px',
  fontWeight: 500
};

const secondaryBtn = {
  fontSize: '1rem',
  padding: '12px 28px',
  backgroundColor: '#d4e1f5',   // soft blue-gray tone
  color: '#1a3a5d',             // deep slate text
  textDecoration: 'none',
  borderRadius: '6px',
  fontWeight: 500
};


const gridWrap = {
  backgroundColor: '#fff',
  padding: '48px 32px',
  borderRadius: '12px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
  marginTop: '40px'
};

const sectionHeading = {
  fontSize: '1.6rem',
  fontWeight: 600,
  marginBottom: '28px',
  textAlign: 'center'
};

const grid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
  gap: '28px'
};

const card = {
  backgroundColor: '#fafafa',
  border: '1px solid #ddd',
  borderRadius: '10px',
  padding: '20px',
  textDecoration: 'none',
  color: '#2c2c2c',
  boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
  transition: 'box-shadow 0.2s ease-in-out'
};

const cardTitle = {
  fontSize: '1.15rem',
  fontWeight: 600,
  marginBottom: '8px'
};

const cardDesc = {
  fontSize: '0.95rem',
  color: '#555',
  lineHeight: '1.5'
};