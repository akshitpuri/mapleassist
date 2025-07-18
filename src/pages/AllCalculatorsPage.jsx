import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import calculatorToolsList from '../data/calculatorToolsList';

export default function AllCalculatorsPage() {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640;

  const filteredTools = calculatorToolsList.filter(tool =>
    tool.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={outerWrap}>
      <main style={container}>
        <div style={wrapper}>
          {/* 🧭 Header */}
          <section style={{
            ...header,
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: isMobile ? 'center' : 'space-between',
            textAlign: isMobile ? 'center' : 'left'
          }}>
            <h1 style={{
              ...heading,
              textAlign: isMobile ? 'center' : 'left'
            }}>
              All Calculators
            </h1>
            <div style={{
              ...backWrap,
              justifyContent: isMobile ? 'center' : 'flex-end',
              width: isMobile ? '100%' : 'auto'
            }}>
              <button onClick={() => navigate('/calculators')} style={backBtn}>
                ← Back to MapleCalc
              </button>
            </div>
          </section>

          {/* 🔍 Search */}
          <section style={searchWrap}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search calculators..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={searchInput}
            />
          </section>

          {/* 🧮 Cards */}
          <section style={grid}>
            {filteredTools.map(({ path, icon, name, description }, i) => (
              <Link key={i} to={path} style={card}>
                <div style={cardIcon}>{icon}</div>
                <h3 style={cardTitle}>{name}</h3>
                <p style={cardDesc}>{description}</p>
              </Link>
            ))}
            {filteredTools.length === 0 && (
              <p style={noMatch}>No matching calculators found.</p>
            )}
          </section>
        </div>
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
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '40px 20px',
  width: '100%',
  fontFamily: '"Segoe UI", system-ui, sans-serif',
  color: '#2c2c2c',
  boxSizing: 'border-box'
};

const wrapper = {
  width: '100%',
  maxWidth: '1100px',
  padding: '0 12px',
  boxSizing: 'border-box'
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
  flex: '0 1 auto'
};

const backBtn = {
  padding: '8px 16px',
  backgroundColor: '#e0e0e0',
  borderRadius: '6px',
  fontSize: '0.95rem',
  border: 'none',
  cursor: 'pointer',
  fontWeight: 500,
  color: '#333'
};

const searchWrap = {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '36px',
  padding: '0 12px'
};

const searchInput = {
  padding: '12px 16px',
  fontSize: '1rem',
  borderRadius: '8px',
  border: '1px solid #ccc',
  width: '100%',
  maxWidth: '440px',
  boxSizing: 'border-box',
  backgroundColor: '#fff'
};

const grid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
  gap: '28px',
  marginBottom: '60px',
  width: '100%',
  boxSizing: 'border-box'
};

const card = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '12px',
  boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
  textDecoration: 'none',
  color: '#2c2c2c',
  transition: 'transform 0.2s ease',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px'
};

const cardIcon = {
  fontSize: '2rem'
};

const cardTitle = {
  fontSize: '1.1rem',
  fontWeight: 600
};

const cardDesc = {
  fontSize: '0.95rem',
  lineHeight: '1.5',
  color: '#555'
};

const noMatch = {
  textAlign: 'center',
  fontSize: '1rem',
  color: '#888',
  gridColumn: '1 / -1'
};