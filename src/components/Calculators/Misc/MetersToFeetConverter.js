import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function MetersToFeetConverter() {
  const [meters, setMeters] = useState('');
  const [result, setResult] = useState(null);

  const convert = () => {
    const m = parseFloat(meters);
    if (isNaN(m) || m <= 0) {
      setResult('Please enter a valid number of meters.');
      return;
    }

    const totalFeet = m * 3.28084;
    const feet = Math.floor(totalFeet);
    const inches = Math.round((totalFeet - feet) * 12);

    setResult({
      feet: feet.toFixed(0),
      inches: inches.toFixed(0),
      totalFeet: totalFeet.toFixed(4)
    });
  };

  return (
    <CalculatorLayout title="📏 Meters to Feet Converter">
      <BackButton />
      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Convert meters to feet and inches. Useful for travel, construction, and international sizing comparisons.
      </p>

      {/* 🔢 Input */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '400px',
        margin: '0 auto',
        marginBottom: '20px'
      }}>
        <input
          type="number"
          placeholder="Enter meters"
          value={meters}
          onChange={(e) => setMeters(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <button onClick={convert} style={{
          padding: '10px',
          backgroundColor: '#3f51b5',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '1rem',
          cursor: 'pointer'
        }}>
          Convert to Feet & Inches
        </button>
      </div>

      {/* 📊 Output */}
      {result && (
        <div style={{
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
          maxWidth: '500px',
          margin: '0 auto',
          textAlign: 'center',
          fontSize: '1.1rem',
          color: '#333'
        }}>
          <p><strong>Total Feet:</strong> {result.totalFeet} ft</p>
          <p><strong>Formatted:</strong> {result.feet}ft {result.inches}in</p>
        </div>
      )}
    </CalculatorLayout>
  );
}