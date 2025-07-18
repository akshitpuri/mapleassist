import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function RatioCalculator() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [scale, setScale] = useState('');
  const [result, setResult] = useState(null);

  const gcd = (x, y) => y === 0 ? x : gcd(y, x % y);

  const calculateRatio = () => {
    const A = parseFloat(a);
    const B = parseFloat(b);
    const S = parseFloat(scale);

    if (isNaN(A) || isNaN(B) || A <= 0 || B <= 0) {
      setResult('Please enter two positive numbers to form a ratio.');
      return;
    }

    const divisor = gcd(A, B);
    const simplified = `${A / divisor} : ${B / divisor}`;
    const scaled = !isNaN(S) && S > 0
      ? `${(A * S).toFixed(2)} : ${(B * S).toFixed(2)}`
      : null;

    setResult({ original: `${A} : ${B}`, simplified, scaled });
  };

  return (
    <CalculatorLayout title="⚖️ Ratio Calculator">
      <Helmet>
        <title>Ratio Calculator – MapleAssist</title>
        <meta name="description" content="Simplify, scale, and compare ratios. Enter two numbers to find their simplest form and optionally scale the ratio." />
        <meta name="keywords" content="ratio calculator, simplify ratio, scale ratio, mapleassist math tool" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Enter two numbers to simplify their ratio. You can also scale the ratio by a multiplier to generate equivalent proportions.
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
          placeholder="First value (A)"
          value={a}
          onChange={(e) => setA(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <input
          type="number"
          placeholder="Second value (B)"
          value={b}
          onChange={(e) => setB(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <input
          type="number"
          placeholder="Optional scale factor"
          value={scale}
          onChange={(e) => setScale(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={calculateRatio}
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
          Calculate Ratio
        </button>
      </div>

      {/* 📊 Result */}
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
          <p><strong>Original Ratio:</strong> {result.original}</p>
          <p><strong>Simplified:</strong> {result.simplified}</p>
          {result.scaled && <p><strong>Scaled:</strong> {result.scaled}</p>}
        </div>
      )}
    </CalculatorLayout>
  );
}