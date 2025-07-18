import React, { useState } from 'react';

export default function KeypadCalculator() {
  const [input, setInput] = useState('');

  const handleClick = (value) => {
    if (value === 'C') return setInput('');
    if (value === '=') {
      try {
        // ⚠️ Only for demo purposes. Replace eval with secure parser in production.
        setInput(eval(input).toString());
      } catch {
        setInput('Error');
      }
    } else {
      setInput(input + value);
    }
  };

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', 'C', '+',
    '='
  ];

  return (
    <div style={container}>
      {/* 🧮 Display Field */}
      <input
        type="text"
        value={input}
        readOnly
        aria-label="Calculator Display"
        style={display}
      />

      {/* 🔢 Keypad Buttons */}
      <div style={grid}>
        {buttons.map((btn, i) => (
          <button
            key={i}
            onClick={() => handleClick(btn)}
            style={btnStyle(btn)}
            onMouseEnter={(e) =>
              e.currentTarget.style.backgroundColor = btn === '=' ? '#b84040' : '#d5d5d5'
            }
            onMouseLeave={(e) =>
              e.currentTarget.style.backgroundColor = btn === '=' ? '#c94b4bff' : '#e0e0e0'
            }
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}

// 🎨 Styles
const container = {
  width: '100%',
  maxWidth: '320px',
  backgroundColor: '#ffffff',
  padding: '24px',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  boxSizing: 'border-box',
  fontFamily: '"Segoe UI", system-ui, sans-serif'
};

const display = {
  width: '100%',
  fontSize: '1.6rem',
  marginBottom: '20px',
  textAlign: 'right',
  padding: '10px 14px',
  borderRadius: '10px',
  border: '1px solid #ccc',
  backgroundColor: '#fcfcfc',
  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  boxSizing: 'border-box'
};

const grid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '10px'
};

const btnStyle = (btn) => ({
  padding: '16px',
  fontSize: '1.2rem',
  borderRadius: '10px',
  border: 'none',
  backgroundColor: btn === '=' ? '#c94b4bff' : '#e0e0e0',
  color: btn === '=' ? '#fff' : '#333',
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
  outline: 'none'
});