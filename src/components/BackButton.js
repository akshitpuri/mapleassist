import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d5d5d5'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e0e0e0'}
      style={buttonStyle}
      aria-label="Go back"
    >
      ← Back
    </button>
  );
}

const buttonStyle = {
  padding: '8px 16px',
  fontSize: '0.95rem',
  backgroundColor: '#e0e0e0',
  color: '#2c2c2c',
  border: '1px solid #ccc',
  borderRadius: '6px',
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'background-color 0.2s ease, transform 0.2s ease',
  boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
};