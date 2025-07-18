import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function BodyTypeCalculator() {
  const [shoulders, setShoulders] = useState('');
  const [waist, setWaist] = useState('');
  const [hips, setHips] = useState('');
  const [result, setResult] = useState(null);

  const classifyBodyType = () => {
    const s = parseFloat(shoulders);
    const w = parseFloat(waist);
    const h = parseFloat(hips);

    if (isNaN(s) || isNaN(w) || isNaN(h) || s <= 0 || w <= 0 || h <= 0) {
      setResult('Please enter valid positive values.');
      return;
    }

    const shape =
      w < s && w < h
        ? 'Hourglass'
        : s > h && s > w
        ? 'Inverted Triangle'
        : h > s && h > w
        ? 'Pear'
        : s === h && w < h
        ? 'Rectangle'
        : 'Undefined Body Shape';

    setResult(`Your body type is: ${shape}`);
  };

  return (
    <CalculatorLayout title="🧍‍♀️ Body Type Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Find your body shape by entering key measurements — shoulders, waist, and hips. Useful for fitness planning, styling guidance, and self-awareness.
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
          placeholder="Shoulder Measurement (cm)"
          value={shoulders}
          onChange={(e) => setShoulders(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <input
          type="number"
          placeholder="Waist Measurement (cm)"
          value={waist}
          onChange={(e) => setWaist(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <input
          type="number"
          placeholder="Hip Measurement (cm)"
          value={hips}
          onChange={(e) => setHips(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={classifyBodyType}
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
          Calculate Body Type
        </button>
      </div>

      {/* 📊 Output */}
      {result && (
        typeof result === 'string' ? (
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
            <strong>{result}</strong>
          </div>
        ) : null
      )}
    </CalculatorLayout>
  );
}