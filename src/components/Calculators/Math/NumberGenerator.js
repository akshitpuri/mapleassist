import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function NumberGenerator() {
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [count, setCount] = useState('1');
  const [result, setResult] = useState(null);

  const generateNumbers = () => {
    const minVal = parseInt(min);
    const maxVal = parseInt(max);
    const total = parseInt(count);

    if (
      isNaN(minVal) || isNaN(maxVal) || isNaN(total) ||
      minVal > maxVal || total <= 0 || total > 100
    ) {
      setResult('Please enter valid numbers. Max must be ≥ Min. Count must be between 1 and 100.');
      return;
    }

    const numbers = [];
    for (let i = 0; i < total; i++) {
      const rand = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
      numbers.push(rand);
    }

    setResult(numbers);
  };

  return (
    <CalculatorLayout title="🎲 Number Generator">
      <Helmet>
        <title>Number Generator – MapleAssist</title>
        <meta name="description" content="Generate one or multiple random numbers between any custom range. Useful for games, simulations, and decision-making." />
        <meta name="keywords" content="number generator, random number, math tool, mapleassist" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Enter a minimum and maximum value, and how many numbers you want to generate. This tool produces random integers between your range — great for games, simulations, or decision-making.
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
          placeholder="Minimum value"
          value={min}
          onChange={(e) => setMin(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <input
          type="number"
          placeholder="Maximum value"
          value={max}
          onChange={(e) => setMax(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <input
          type="number"
          placeholder="How many numbers?"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={generateNumbers}
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
          Generate
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
          <p><strong>Generated Numbers:</strong></p>
          <p>{result.join(', ')}</p>
        </div>
      )}
    </CalculatorLayout>
  );
}