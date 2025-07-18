import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function ConcreteCalculator() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [depth, setDepth] = useState('');
  const [unit, setUnit] = useState('meters'); // meters or feet
  const [result, setResult] = useState(null);

  const calculateVolume = () => {
    const L = parseFloat(length);
    const W = parseFloat(width);
    const D = parseFloat(depth);

    if (isNaN(L) || isNaN(W) || isNaN(D) || L <= 0 || W <= 0 || D <= 0) {
      setResult('Please enter valid dimensions.');
      return;
    }

    let volumeMeters = unit === 'meters'
      ? L * W * D
      : (L * W * D) * 0.0283168; // convert ft³ to m³

    const volumeYards = volumeMeters / 0.764555; // convert m³ to yd³

    setResult({
      volumeMeters: volumeMeters.toFixed(2),
      volumeYards: volumeYards.toFixed(2)
    });
  };

  return (
    <CalculatorLayout title="🧱 Concrete Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Estimate how much concrete you need for slabs, footings, stairs, or DIY construction. Choose units, enter dimensions, and get volume in cubic meters and cubic yards.
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
          padding: '10px', fontSize: '1rem',
          borderRadius: '8px', border: '1px solid #ccc'
        }}>
          <option value="meters">Metric (m)</option>
          <option value="feet">Imperial (ft)</option>
        </select>

        <input
          type="number"
          placeholder={`Length (${unit === 'meters' ? 'm' : 'ft'})`}
          value={length}
          onChange={(e) => setLength(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="number"
          placeholder={`Width (${unit === 'meters' ? 'm' : 'ft'})`}
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="number"
          placeholder={`Depth (${unit === 'meters' ? 'm' : 'ft'})`}
          value={depth}
          onChange={(e) => setDepth(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <button
          onClick={calculateVolume}
          style={{
            padding: '10px', backgroundColor: '#3f51b5',
            color: '#fff', border: 'none',
            borderRadius: '6px', fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          Calculate Concrete
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
          <p><strong>Concrete Volume:</strong></p>
          <p>{result.volumeMeters} m³ &nbsp;/&nbsp; {result.volumeYards} yd³</p>
        </div>
      )}
    </CalculatorLayout>
  );
}