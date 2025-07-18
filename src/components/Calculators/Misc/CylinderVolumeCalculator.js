import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function CylinderVolumeCalculator() {
  const [radius, setRadius] = useState('');
  const [height, setHeight] = useState('');
  const [unit, setUnit] = useState('cm');
  const [result, setResult] = useState(null);

  const calculateCylinder = () => {
    const r = parseFloat(radius);
    const h = parseFloat(height);

    if (isNaN(r) || isNaN(h) || r <= 0 || h <= 0) {
      setResult('Please enter valid radius and height.');
      return;
    }

    const volume = Math.PI * r * r * h;
    const lateralArea = 2 * Math.PI * r * h;
    const baseArea = Math.PI * r * r;
    const surfaceArea = lateralArea + 2 * baseArea;

    setResult({
      volume: volume.toFixed(2),
      surfaceArea: surfaceArea.toFixed(2),
      unit: unit
    });
  };

  return (
    <CalculatorLayout title="🧪 Cylinder Volume Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Calculate the volume and surface area of a cylinder using radius and height. Useful for geometry, engineering, and fluid capacity estimates.
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
        <select value={unit} onChange={(e) => setUnit(e.target.value)} style={{
          padding: '10px',
          fontSize: '1rem',
          borderRadius: '8px',
          border: '1px solid #ccc'
        }}>
          <option value="cm">Centimeters</option>
          <option value="m">Meters</option>
          <option value="in">Inches</option>
          <option value="ft">Feet</option>
        </select>

        <input
          type="number"
          placeholder={`Radius (${unit})`}
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <input
          type="number"
          placeholder={`Height (${unit})`}
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <button onClick={calculateCylinder} style={{
          padding: '10px',
          backgroundColor: '#3f51b5',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '1rem',
          cursor: 'pointer'
        }}>
          Calculate Cylinder
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
          <p><strong>Volume:</strong> {result.volume} {result.unit}³</p>
          <p><strong>Surface Area:</strong> {result.surfaceArea} {result.unit}²</p>
        </div>
      )}
    </CalculatorLayout>
  );
}