import React from 'react';
import { Link } from 'react-router-dom';
import KeypadCalculator from '../components/Calculators/KeypadCalculator';

const categories = [
  { name: 'Finance', path: '/calculators/finance', icon: '💰', description: 'EMIs, compound interest, savings and tax estimators.' },
  { name: 'Health', path: '/calculators/health', icon: '🩺', description: 'BMI, calories, heart zones and body metrics.' },
  { name: 'Math', path: '/calculators/math', icon: '➗', description: 'Fractions, percentages, square footage and arithmetic.' },
  { name: 'Time', path: '/calculators/time', icon: '⏳', description: 'Durations, age calculators, time differences, work hours.' },
  { name: 'Misc', path: '/calculators/misc', icon: '🎯', description: 'Dice rollers, subnet tools, number-to-word converters and grades.' },
  { name: 'Statistics', path: '/calculators/statistics', icon: '📊', description: 'Mean, median, mode, standard deviation and probability.' }
];

export default function CalculatorDashboard() {
  return (
    <div style={outerWrap}>
      <main style={container}>
        {/* 🧭 Hero Section */}
        <section style={hero}>
          <h1 style={heroTitle}>MapleCalc</h1>
          <p style={heroSubtitle}>
            A curated suite of calculation utilities engineered for clarity, speed, and privacy. From financial planning to academic analysis,
            MapleCalc delivers offline precision across every category.
          </p>
          <div style={buttonGroup}>
            <Link to="/calculators/all" style={primaryBtn}>Browse All Calculators</Link>
          </div>
        </section>

        {/* 🧮 Intro + Keypad */}
        <section style={introWrap}>
          <div style={introBlock}>
            <h2 style={sectionHeading}>Why MapleCalc?</h2>
            <p style={introText}>
              MapleCalc brings together specialized tools that simplify computation and reduce friction. Every calculator runs entirely offline—no accounts, no data collection, and no distractions.
            </p>
            <ul style={featureList}>
              <li>🧮 Structured by category for rapid access</li>
              <li>🛡️ Built for offline privacy — zero uploads</li>
              <li>📱 Responsive across desktop and mobile devices</li>
            </ul>
          </div>
          <div style={keypadBlock}>
            <KeypadCalculator />
          </div>
        </section>

        {/* 📂 Categories Section */}
        <section style={gridWrap}>
          <h2 style={sectionHeading}>Calculator Categories</h2>
          <div style={grid}>
            {categories.map(({ name, icon, path, description }, i) => (
              <Link key={i} to={path} style={card}>
                <div style={cardIcon}>{icon}</div>
                <h4 style={cardTitle}>{name}</h4>
                <p style={cardDesc}>{description}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

// 🎨 Styles
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

const introWrap = {
  backgroundColor: '#fff',
  padding: '48px 32px',
  borderRadius: '12px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '40px',
  marginBottom: '60px'
};

const introBlock = {
  flex: '1 1 300px',
  maxWidth: '500px'
};

const keypadBlock = {
  flex: '1 1 300px',
  display: 'flex',
  justifyContent: 'center',
  maxWidth: '500px'
};

const sectionHeading = {
  fontSize: '1.6rem',
  fontWeight: 600,
  marginBottom: '28px',
  textAlign: 'center'
};

const introText = {
  fontSize: '1rem',
  lineHeight: '1.7',
  marginBottom: '16px',
  color: '#4a4a4a'
};

const featureList = {
  paddingLeft: '20px',
  marginBottom: '24px',
  fontSize: '0.95rem',
  color: '#555',
  lineHeight: '1.5'
};

const gridWrap = {
  backgroundColor: '#fff',
  padding: '48px 32px',
  borderRadius: '12px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.04)'
};

const grid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
  gap: '30px'
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

const cardIcon = {
  fontSize: '2rem',
  marginBottom: '12px'
};

const cardTitle = {
  fontSize: '1.2rem',
  fontWeight: 600,
  marginBottom: '8px'
};

const cardDesc = {
  fontSize: '0.95rem',
  color: '#555',
  lineHeight: '1.5'
};