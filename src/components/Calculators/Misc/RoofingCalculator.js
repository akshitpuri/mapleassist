import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function RoofingCalculator() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [pitch, setPitch] = useState('4/12');
  const [result, setResult] = useState(null);

  const pitchMultipliers = {
    '0/12': 1.0, '1/12': 1.0035, '2/12': 1.0138, '3/12': 1.0308,
    '4/12': 1.0541, '5/12': 1.0833, '6/12': 1.118, '7/12': 1.1577,
    '8/12': 1.2019, '9/12': 1.25, '10/12': 1.3017, '11/12': 1.3566,
    '12/12': 1.4142
  };

  const calculateRoofArea = () => {
    const L = parseFloat(length);
    const W = parseFloat(width);
    const multiplier = pitchMultipliers[pitch];

    if (isNaN(L) || isNaN(W) || L <= 0 || W <= 0 || !multiplier) {
      setResult('Please enter valid dimensions and pitch.');
      return;
    }

    const footprint = L * W;
    const adjustedArea = footprint * multiplier;
    const squares = Math.ceil(adjustedArea / 100);

    setResult({
      footprint: footprint.toFixed(2),
      adjustedArea: adjustedArea.toFixed(2),
      squares
    });
  };

  return (
    <CalculatorLayout title="🏠 Roofing Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem', lineHeight: '1.6',
        marginBottom: '24px', color: '#444'
      }}>
        Estimate roof surface area and material needs using house dimensions and roof pitch. Useful for planning shingle bundles, underlayment, and cost estimates.
      </p>

      {/* 🔢 Inputs */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        gap: '12px', maxWidth: '400px',
        margin: '0 auto', marginBottom: '20px'
      }}>
        <input
          type="number" placeholder="Length (ft)"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="number" placeholder="Width (ft)"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <select value={pitch} onChange={(e) => setPitch(e.target.value)} style={{
          padding: '10px', fontSize: '1rem',
          borderRadius: '8px', border: '1px solid #ccc'
        }}>
          {Object.keys(pitchMultipliers).map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <button onClick={calculateRoofArea} style={{
          padding: '10px', backgroundColor: '#3f51b5',
          color: '#fff', border: 'none',
          borderRadius: '6px', fontSize: '1rem',
          cursor: 'pointer'
        }}>
          Calculate Roof Area
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
          <p><strong>Footprint Area:</strong> {result.footprint} ft²</p>
          <p><strong>Adjusted Roof Area:</strong> {result.adjustedArea} ft²</p>
          <p><strong>Estimated Squares:</strong> {result.squares} (100 ft² each)</p>
        </div>
      )}
    </CalculatorLayout>
  );
}