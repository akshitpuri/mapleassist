import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function CircleCalculator() {
  const [inputType, setInputType] = useState('radius');
  const [value, setValue] = useState('');
  const [result, setResult] = useState(null);

  const calculateCircle = () => {
    const val = parseFloat(value);
    if (isNaN(val) || val <= 0) {
      setResult('Please enter a valid positive number.');
      return;
    }

    let radius = 0;
    if (inputType === 'radius') radius = val;
    else if (inputType === 'diameter') radius = val / 2;
    else if (inputType === 'circumference') radius = val / (2 * Math.PI);
    else if (inputType === 'area') radius = Math.sqrt(val / Math.PI);

    const diameter = radius * 2;
    const circumference = 2 * Math.PI * radius;
    const area = Math.PI * radius * radius;

    setResult({
      radius: radius.toFixed(2),
      diameter: diameter.toFixed(2),
      circumference: circumference.toFixed(2),
      area: area.toFixed(2)
    });
  };

  return (
    <CalculatorLayout title="⭕ Circle Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Calculate radius, diameter, circumference, or area of a circle using any one known value. Great for geometry, design, and construction.
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
        <select value={inputType} onChange={(e) => {
          setInputType(e.target.value);
          setValue('');
          setResult(null);
        }} style={{
          padding: '10px',
          fontSize: '1rem',
          borderRadius: '8px',
          border: '1px solid #ccc'
        }}>
          <option value="radius">Radius</option>
          <option value="diameter">Diameter</option>
          <option value="circumference">Circumference</option>
          <option value="area">Area</option>
        </select>

        <input
          type="number"
          placeholder={`Enter ${inputType}`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />

        <button onClick={calculateCircle} style={{
          padding: '10px',
          backgroundColor: '#3f51b5',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '1rem',
          cursor: 'pointer'
        }}>
          Calculate Circle
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
          <p><strong>Radius:</strong> {result.radius}</p>
          <p><strong>Diameter:</strong> {result.diameter}</p>
          <p><strong>Circumference:</strong> {result.circumference}</p>
          <p><strong>Area:</strong> {result.area}</p>
        </div>
      )}
    </CalculatorLayout>
  );
}