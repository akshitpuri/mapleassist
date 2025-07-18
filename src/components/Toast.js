import React from 'react';
import './Toast.css';

export default function Toast({ message, type = 'info', onClose }) {
  return (
    <div className={`toast toast-${type}`} role="alert" aria-live="assertive" style={container}>
      <span style={text}>{message}</span>
      <button
        onClick={onClose}
        style={closeBtn}
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </div>
  );
}

// 🎨 Inline Styles (optional if not defined in Toast.css)
const container = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 16px',
  borderRadius: '8px',
  boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
  backgroundColor: '#f0f0f0',
  fontSize: '0.95rem',
  color: '#333',
  gap: '12px',
  fontFamily: '"Segoe UI", system-ui, sans-serif'
};

const text = {
  flex: 1
};

const closeBtn = {
  background: 'transparent',
  border: 'none',
  fontSize: '1.2rem',
  cursor: 'pointer',
  color: '#666'
};