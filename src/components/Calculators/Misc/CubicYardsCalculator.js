import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function CubicYardsCalculator() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [depth, setDepth] = useState('');
  const [unit, setUnit] = useState('feet');
  const [result, setResult] = useState(null);

  const convertToFeet = (val, unit) => {
    switch (unit) {
      case 'feet': return val;
      case 'inches': return val / 12;
      case 'yards': return val * 3;
      case 'meters': return val * 3.28084;
      case 'centimeters': return val / 30.48;
      default: return val;
    }
  };

  const calculateVolume = () => {
    const L = convertToFeet(parseFloat(length), unit);
    const W = convertToFeet(parseFloat(width), unit);
    const D = convertToFeet(parseFloat(depth), unit);

    if ([L, W, D].some(v => isNaN(v) || v <= 0)) {
      setResult('Please enter valid dimensions.');
      return;
    }

    const cubicFeet = L * W * D;
    const cubicYards = cubicFeet / 27;
    const cubicMeters = cubicFeet * 0.0283168;

    setResult({
      cubicFeet: cubicFeet.toFixed(2),
      cubicYards: cubicYards.toFixed(2),
      cubicMeters: cubicMeters.toFixed(2)
    });
  };

  return (
    <CalculatorLayout title="📦 Cubic Yards Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem', lineHeight: '1.6',
        marginBottom: '24px', color: '#444'
      }}>
        Estimate volume in cubic yards for landscaping, concrete, mulch, or fill. Enter dimensions and choose units to get results in yards, feet, and meters.
      </p>

      {/* 🔢 Inputs */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        gap: '12px', maxWidth: '400px',
        margin: '0 auto', marginBottom: '20px'
      }}>
        <select value={unit} onChange={(e) => setUnit(e.target.value)} style={{
          padding: '10px', fontSize: '1rem',
          borderRadius: '8px', border: '1px solid #ccc'
        }}>
          <option value="feet">Feet</option>
          <option value="inches">Inches</option>
          <option value="yards">Yards</option>
          <option value="meters">Meters</option>
          <option value="centimeters">Centimeters</option>
        </select>

        <input
          type="number" placeholder={`Length (${unit})`}
          value={length}
          onChange={(e) => setLength(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="number" placeholder={`Width (${unit})`}
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="number" placeholder={`Depth (${unit})`}
          value={depth}
          onChange={(e) => setDepth(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <button onClick={calculateVolume} style={{
          padding: '10px', backgroundColor: '#3f51b5',
          color: '#fff', border: 'none',
          borderRadius: '6px', fontSize: '1rem',
          cursor: 'pointer'
        }}>
          Calculate Volume
        </button>
      </div>

      {/* 📊 Output */}
      {result && (
        <div style={{
          backgroundColor: '#fff', padding: '20px',
          borderRadius: '10px', boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
          maxWidth: '500px', margin: '0 auto',
          textAlign: 'center', fontSize: '1.1rem', color: '#333'
        }}>
          <p><strong>Cubic Yards:</strong> {result.cubicYards} yd³</p>
          <p><strong>Cubic Feet:</strong> {result.cubicFeet} ft³</p>
          <p><strong>Cubic Meters:</strong> {result.cubicMeters} m³</p>
        </div>
      )}
    </CalculatorLayout>
  );
}