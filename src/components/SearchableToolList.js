import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function SearchableToolList({ tools }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filtered = tools.filter(tool =>
    tool.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={outerWrap}>
      <main style={container}>
        <input
          type="text"
          ref={inputRef}
          placeholder="Search tools..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={inputStyle}
          aria-label="Search tools"
        />

        <div style={listWrap}>
          {filtered.map(({ path, name }, i) => (
            <Link
              to={path}
              key={i}
              style={linkStyle}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#eee'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
            >
              {name}
            </Link>
          ))}

          {filtered.length === 0 && (
            <p style={noMatch}>No matching tools found.</p>
          )}
        </div>
      </main>
    </div>
  );
}

// 🎨 Styles
const outerWrap = {
  backgroundColor: '#f7f9fb',
  padding: '0 0 60px',
  width: '100%',
  minHeight: '100vh'
};

const container = {
  maxWidth: '600px',
  width: '100%',
  margin: '0 auto',
  padding: '24px 16px',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  fontFamily: '"Segoe UI", system-ui, sans-serif',
  color: '#2c2c2c'
};

const inputStyle = {
  padding: '12px 16px',
  fontSize: '1rem',
  borderRadius: '8px',
  border: '1px solid #ccc',
  width: '100%',
  backgroundColor: '#fff',
  boxSizing: 'border-box'
};

const listWrap = {
  display: 'flex',
  flexDirection: 'column',
  gap: '14px'
};

const linkStyle = {
  padding: '14px 16px',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
  textDecoration: 'none',
  color: '#2c2c2c',
  fontWeight: 500,
  fontSize: '1rem',
  transition: 'background-color 0.2s ease'
};

const noMatch = {
  color: '#888',
  textAlign: 'center',
  fontSize: '0.95rem'
};