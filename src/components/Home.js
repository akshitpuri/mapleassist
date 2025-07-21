import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Home() {
  return (
    <div style={outerWrap}>
      <Helmet>
        <title>MapleAssist | Productivity Tools & Verified Deals</title>
        <meta
          name="description"
          content="Privacy-forward calculators, file utilities, and verified deals. Built in Canada with trust and clarity."
        />
      </Helmet>

      <main style={container}>
        {/* 🧭 Hero Section */}
        <section style={hero}>
          <h1 style={heroTitle}>MapleAssist</h1>
          <p style={heroSubtitle}>
            Crafted for professionals, students, and creators — MapleAssist delivers dependable tools for computation,
            organization, and optimization.<br />
            And now, explore verified deals across top categories — curated with trust and convenience.
          </p>
          <div style={buttonGroup}>
            <Link to="/calculators" style={primaryBtn}>Calculators</Link>
            <Link to="/filetools" style={secondaryBtn}>File Utilities</Link>
            <Link to="/deals" style={tertiaryBtn}>View Deals</Link>
          </div>
        </section>

              {/* 💡 MapleCalculators Callout */}
        <section style={categoryWrap}>
          <div style={dealsCallout}>
            <h3 style={dealsHeading}>🧮 MapleCalculators</h3>
            <p style={dealsText}>
              Browse all calculator tools across math, health, finance, time, and trivia — built for instant use with zero setup. No formulas required.
            </p>
            <Link to="/calculators/all" style={tertiaryBtn}>Explore Calculators</Link>
          </div>

          {/* 🌟 MapleFlyers Callout */}
          <div style={{ ...dealsCallout, marginTop: '40px' }}>
            <h3 style={dealsHeading}>🗓 MapleFlyers</h3>
            <p style={dealsText}>
              Browse weekly flyers across grocery, pharmacy, tech and retail — hand-picked for Canadian shoppers. Updated every Thursday.
            </p>
            <Link to="/flyers" style={tertiaryBtn}>View Flyers</Link>
          </div>
        </section>

      </main>
    </div>
  );
}
const outerWrap = {
  backgroundImage: `url(${process.env.PUBLIC_URL}/maple-pattern.png)`,
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
  backgroundColor: '#d4e1f5',
  color: '#1a3a5d',
  textDecoration: 'none',
  borderRadius: '6px',
  fontWeight: 500
};

const tertiaryBtn = {
  fontSize: '1rem',
  padding: '12px 28px',
  backgroundColor: '#f5eee6',
  color: '#5c2e00',
  textDecoration: 'none',
  borderRadius: '6px',
  fontWeight: 500,
  border: '1px solid #dcc2b1',
  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  transition: 'background-color 0.2s ease'
};

const categoryWrap = {
  backgroundColor: '#fff',
  padding: '56px 32px',
  borderRadius: '12px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
  marginTop: '40px'
};

const sectionHeading = {
  fontSize: '1.6rem',
  fontWeight: 600,
  marginBottom: '32px',
  textAlign: 'center'
};

const categoryGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '32px',
  marginBottom: '48px'
};

const categoryBox = {
  backgroundColor: '#fefefe',
  padding: '24px',
  borderRadius: '10px',
  border: '1px solid #ddd',
  boxShadow: '0 1px 4px rgba(0,0,0,0.03)'
};

const categoryTitle = {
  fontSize: '1.25rem',
  fontWeight: 600,
  marginBottom: '16px'
};

const categoryList = {
  listStyle: 'none',
  paddingLeft: 0,
  marginBottom: 0
};

const categoryLink = {
  textDecoration: 'none',
  color: '#1a3a5d',
  fontSize: '1rem',
  fontWeight: 500,
  display: 'block',
  marginBottom: '8px'
};

const dealsCallout = {
  textAlign: 'center',
  backgroundColor: '#fdf7f2',
  padding: '40px',
  borderRadius: '12px',
  border: '1px solid #e0d5c9'
};

const dealsHeading = {
  fontSize: '1.4rem',
  fontWeight: 600,
  marginBottom: '16px',
  color: '#5c2e00'
};

const dealsText = {
  fontSize: '1rem',
  color: '#5c2e00',
  marginBottom: '24px',
  lineHeight: '1.6'
};