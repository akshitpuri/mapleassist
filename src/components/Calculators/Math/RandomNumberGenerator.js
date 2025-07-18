import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function RandomNumberGenerator() {
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
      minVal >= maxVal || total < 1 || total > 100
    ) {
      setResult('Please enter valid numbers. Min must be less than Max. Count should be 1 to 100.');
      return;
    }

    const numbers = Array.from({ length: total }, () =>
      Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal
    );

    setResult(numbers);
  };

  return (
    <CalculatorLayout title="🎲 Random Number Generator">
      <Helmet>
        <title>Random Number Generator – MapleAssist</title>
        <meta name="description" content="Generate random numbers between a custom range. Useful for games, simulations, and decision-making." />
        <meta name="keywords" content="random number generator, lottery picker, number tool, mapleassist math tool" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Enter a minimum and maximum value, and how many numbers you want to generate (1–100). This tool produces random integers between your range — perfect for games, simulations, or decision-making.
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
          min="1"
          max="100"
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
      ) : result && Array.isArray(result) && (
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
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '1.4rem'
          }}>
            {result.map((num, idx) => (
              <span key={idx}>🎯 {num}</span>
            ))}
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}