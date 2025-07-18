import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function TankVolumeCalculator() {
  const [shape, setShape] = useState('cylinder');
  const [dimensions, setDimensions] = useState({});
  const [fill, setFill] = useState('');
  const [result, setResult] = useState(null);

  const handleInput = (key, value) => {
    setDimensions({ ...dimensions, [key]: value });
  };

  const calculateVolume = () => {
    const vals = Object.fromEntries(
      Object.entries(dimensions).map(([k, v]) => [k, parseFloat(v)])
    );
    const fillLevel = parseFloat(fill);

    for (const val of Object.values(vals)) {
      if (isNaN(val) || val <= 0) {
        setResult('Please enter valid positive numbers for all dimensions.');
        return;
      }
    }

    if (isNaN(fillLevel) || fillLevel < 0 || fillLevel > 100) {
      setResult('Please enter a fill percentage between 0 and 100.');
      return;
    }

    let total = 0;
    switch (shape) {
      case 'cylinder':
        total = Math.PI * Math.pow(vals.radius, 2) * vals.height;
        break;
      case 'rectangle':
        total = vals.length * vals.width * vals.height;
        break;
      case 'sphere':
        total = (4 / 3) * Math.PI * Math.pow(vals.radius, 3);
        break;
      default:
        total = 0;
    }

    const filled = total * (fillLevel / 100);
    setResult({
      shape,
      total: total.toFixed(4),
      filled: filled.toFixed(4),
      percent: fillLevel
    });
  };

  const inputFields = {
    cylinder: ['radius', 'height'],
    rectangle: ['length', 'width', 'height'],
    sphere: ['radius']
  };

  return (
    <CalculatorLayout title="📦 Tank Volume Calculator">
      <Helmet>
        <title>Tank Volume Calculator – MapleAssist</title>
        <meta name="description" content="Calculate total and filled volume of tanks in cylindrical, rectangular, or spherical shapes. Supports fill percentage and clean output." />
        <meta name="keywords" content="tank volume calculator, tank capacity, filled volume, cylinder tank, sphere tank, mapleassist physics tool" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Select a tank shape and enter its dimensions to calculate <strong>total volume</strong> and <strong>filled volume</strong> based on fill percentage. This tool supports cylinders, rectangles, and spheres.
      </p>

      {/* 🔘 Shape Selection */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <select
          value={shape}
          onChange={(e) => {
            setShape(e.target.value);
            setDimensions({});
            setResult(null);
          }}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        >
          <option value="cylinder">Cylinder</option>
          <option value="rectangle">Rectangle</option>
          <option value="sphere">Sphere</option>
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
        {inputFields[shape].map((field) => (
          <input
            key={field}
            type="number"
            placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)} (m)`}
            value={dimensions[field] || ''}
            onChange={(e) => handleInput(field, e.target.value)}
          />
        ))}
        <input
          type="number"
          placeholder="Fill %"
          value={fill}
          onChange={(e) => setFill(e.target.value)}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button
          onClick={calculateVolume}
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
          Calculate Volume
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
          <p><strong>Tank Shape:</strong> {result.shape}</p>
          <p><strong>Total Volume:</strong> {result.total} m³</p>
          <p><strong>Filled Volume:</strong> {result.filled} m³ ({result.percent}%)</p>
        </div>
      )}
    </CalculatorLayout>
  );
}