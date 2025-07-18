import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function HeightConverter() {
  const [inputValue, setInputValue] = useState('');
  const [inputUnit, setInputUnit] = useState('cm');
  const [result, setResult] = useState(null);

  const convertHeight = () => {
    const val = parseFloat(inputValue);
    if (isNaN(val) || val <= 0) {
      setResult('Please enter a valid height.');
      return;
    }

    let cm = 0;

    switch (inputUnit) {
      case 'cm':
        cm = val;
        break;
      case 'm':
        cm = val * 100;
        break;
      case 'in':
        cm = val * 2.54;
        break;
      case 'ft':
        cm = val * 30.48;
        break;
      default:
        setResult('Invalid unit');
        return;
    }

    const meters = (cm / 100).toFixed(2);
    const inches = cm / 2.54;
    const feet = Math.floor(inches / 12);
    const inchRemainder = Math.round(inches % 12);

    setResult({
      cm: cm.toFixed(2),
      meters,
      feet,
      inchRemainder
    });
  };

  return (
    <CalculatorLayout title="📏 Height Converter">
      <BackButton />
      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Convert height between centimeters, meters, feet, and inches. Useful for travel, health, and international sizing.
      </p>

      {/* 🔢 Inputs */}
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
          placeholder="Enter height"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <select value={inputUnit} onChange={(e) => setInputUnit(e.target.value)} style={{
          padding: '10px',
          fontSize: '1rem',
          borderRadius: '8px',
          border: '1px solid #ccc'
        }}>
          <option value="cm">Centimeters</option>
          <option value="m">Meters</option>
          <option value="ft">Feet</option>
          <option value="in">Inches</option>
        </select>
        <button onClick={convertHeight} style={{
          padding: '10px',
          backgroundColor: '#3f51b5',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '1rem',
          cursor: 'pointer'
        }}>
          Convert Height
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
          <p><strong>Centimeters:</strong> {result.cm} cm</p>
          <p><strong>Meters:</strong> {result.meters} m</p>
          <p><strong>Feet & Inches:</strong> {result.feet}ft {result.inchRemainder}in</p>
        </div>
      )}
    </CalculatorLayout>
  );
}