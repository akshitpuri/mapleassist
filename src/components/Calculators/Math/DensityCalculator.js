import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function DensityCalculator() {
  const [mode, setMode] = useState('density'); // 'density', 'mass', 'volume'
  const [mass, setMass] = useState('');
  const [volume, setVolume] = useState('');
  const [density, setDensity] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const m = parseFloat(mass);
    const v = parseFloat(volume);
    const d = parseFloat(density);

    switch (mode) {
      case 'density':
        if (isNaN(m) || isNaN(v) || v <= 0) {
          setResult('Please enter valid mass and volume. Volume must be greater than zero.');
          return;
        }
        setResult({ type: 'Density', value: (m / v).toFixed(4), units: 'mass/volume' });
        break;
      case 'mass':
        if (isNaN(d) || isNaN(v) || v <= 0) {
          setResult('Please enter valid density and volume. Volume must be greater than zero.');
          return;
        }
        setResult({ type: 'Mass', value: (d * v).toFixed(4), units: 'mass units' });
        break;
      case 'volume':
        if (isNaN(m) || isNaN(d) || d <= 0) {
          setResult('Please enter valid mass and density. Density must be greater than zero.');
          return;
        }
        setResult({ type: 'Volume', value: (m / d).toFixed(4), units: 'volume units' });
        break;
      default:
        setResult('Invalid calculation mode.');
    }
  };

  return (
    <CalculatorLayout title="📦 Density Calculator">
      <Helmet>
        <title>Density Calculator – MapleAssist</title>
        <meta name="description" content="Calculate density, mass, or volume using the formula density = mass / volume. Supports flexible input formats and clean output." />
        <meta name="keywords" content="density calculator, mass volume calculator, physics tool, mapleassist science calculator" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Select what you want to calculate — <strong>density</strong>, <strong>mass</strong>, or <strong>volume</strong> — and enter the other two. This tool uses the classic formula:
        <br />
        <code>Density = Mass ÷ Volume</code>
      </p>

      {/* 🔘 Mode Selector */}
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <select
          value={mode}
          onChange={(e) => {
            setMode(e.target.value);
            setResult(null);
          }}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        >
          <option value="density">Calculate Density</option>
          <option value="mass">Calculate Mass</option>
          <option value="volume">Calculate Volume</option>
        </select>
      </div>

      {/* 🔢 Inputs */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '400px',
        margin: '0 auto',
        marginBottom: '20px'
      }}>
        {(mode === 'density' || mode === 'volume') && (
          <input
            type="number"
            placeholder="Mass"
            value={mass}
            onChange={(e) => setMass(e.target.value)}
            style={{
              padding: '10px',
              fontSize: '1rem',
              borderRadius: '8px',
              border: '1px solid #ccc'
            }}
          />
        )}
        {(mode === 'density' || mode === 'mass') && (
          <input
            type="number"
            placeholder="Volume"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            style={{
              padding: '10px',
              fontSize: '1rem',
              borderRadius: '8px',
              border: '1px solid #ccc'
            }}
          />
        )}
        {(mode === 'mass' || mode === 'volume') && (
          <input
            type="number"
            placeholder="Density"
            value={density}
            onChange={(e) => setDensity(e.target.value)}
            style={{
              padding: '10px',
              fontSize: '1rem',
              borderRadius: '8px',
              border: '1px solid #ccc'
            }}
          />
        )}
        <button
          onClick={calculate}
          style={{
            padding: '10px',
            backgroundColor: '#3f51b5',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          Calculate
        </button>
      </div>

      {/* 📊 Output */}
      {typeof result === 'string' ? (
        <div style={{
          color: '#f44336',
          backgroundColor: '#fff6f6',
          padding: '12px',
          borderRadius: '6px',
          maxWidth: '500px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          {result}
        </div>
      ) : result && (
        <div style={{
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
          maxWidth: '500px',
          margin: '0 auto',
          fontSize: '1.1rem',
          color: '#333',
          textAlign: 'center'
        }}>
          <p><strong>{result.type}:</strong> {result.value} {result.units}</p>
        </div>
      )}
    </CalculatorLayout>
  );
}