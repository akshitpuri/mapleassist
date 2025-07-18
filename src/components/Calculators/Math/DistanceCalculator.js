import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function DistanceCalculator() {
  const [mode, setMode] = useState('2d'); // '2d' or '3d'
  const [coords, setCoords] = useState({
    x1: '', y1: '', x2: '', y2: '', z1: '', z2: ''
  });
  const [result, setResult] = useState(null);

  const handleChange = (key, value) => {
    setCoords({ ...coords, [key]: value });
  };

  const calculateDistance = () => {
    const { x1, y1, x2, y2, z1, z2 } = coords;
    const x1n = parseFloat(x1), y1n = parseFloat(y1), x2n = parseFloat(x2), y2n = parseFloat(y2);
    const z1n = parseFloat(z1), z2n = parseFloat(z2);

    if (mode === '2d') {
      if ([x1n, y1n, x2n, y2n].some(isNaN)) {
        setResult('Please enter valid 2D coordinates.');
        return;
      }
      const dx = x2n - x1n;
      const dy = y2n - y1n;
      const dist = Math.sqrt(dx ** 2 + dy ** 2);
      setResult({
        formula: `√[(${x2n} - ${x1n})² + (${y2n} - ${y1n})²]`,
        distance: dist.toFixed(6)
      });
    } else {
      if ([x1n, y1n, z1n, x2n, y2n, z2n].some(isNaN)) {
        setResult('Please enter valid 3D coordinates.');
        return;
      }
      const dx = x2n - x1n;
      const dy = y2n - y1n;
      const dz = z2n - z1n;
      const dist = Math.sqrt(dx ** 2 + dy ** 2 + dz ** 2);
      setResult({
        formula: `√[(${x2n} - ${x1n})² + (${y2n} - ${y1n})² + (${z2n} - ${z1n})²]`,
        distance: dist.toFixed(6)
      });
    }
  };

  return (
    <CalculatorLayout title="📏 Distance Calculator">
      <Helmet>
        <title>Distance Calculator – MapleAssist</title>
        <meta name="description" content="Calculate the distance between two points in 2D or 3D space using the Pythagorean theorem. Supports clean formatting and step-by-step logic." />
        <meta name="keywords" content="distance calculator, 2D distance, 3D distance, coordinate geometry, mapleassist physics tool" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Select a dimension and enter coordinates for two points. This tool uses:
        <br />
        <code>d = √[(x₂ - x₁)² + (y₂ - y₁)²]</code> for 2D and  
        <br />
        <code>d = √[(x₂ - x₁)² + (y₂ - y₁)² + (z₂ - z₁)²]</code> for 3D
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
          <option value="2d">2D Distance</option>
          <option value="3d">3D Distance</option>
        </select>
      </div>

      {/* 🔢 Inputs */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        maxWidth: '600px',
        margin: '0 auto',
        marginBottom: '20px'
      }}>
        <input type="number" placeholder="x₁" value={coords.x1} onChange={(e) => handleChange('x1', e.target.value)} />
        <input type="number" placeholder="y₁" value={coords.y1} onChange={(e) => handleChange('y1', e.target.value)} />
        {mode === '3d' && <input type="number" placeholder="z₁" value={coords.z1} onChange={(e) => handleChange('z1', e.target.value)} />}
        <input type="number" placeholder="x₂" value={coords.x2} onChange={(e) => handleChange('x2', e.target.value)} />
        <input type="number" placeholder="y₂" value={coords.y2} onChange={(e) => handleChange('y2', e.target.value)} />
        {mode === '3d' && <input type="number" placeholder="z₂" value={coords.z2} onChange={(e) => handleChange('z2', e.target.value)} />}
      </div>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button
          onClick={calculateDistance}
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
          Calculate Distance
        </button>
      </div>

      {/* 📊 Result */}
      {typeof result === 'string' ? (
        <div style={{
          color: '#f44336',
          backgroundColor: '#fff6f6',
          padding: '12px',
          borderRadius: '6px',
          maxWidth: '600px',
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
          maxWidth: '600px',
          margin: '0 auto',
          fontSize: '1.1rem',
          color: '#333'
        }}>
          <p><strong>Formula Used:</strong> {result.formula}</p>
          <p><strong>Distance:</strong> {result.distance}</p>
        </div>
      )}
    </CalculatorLayout>
  );
}