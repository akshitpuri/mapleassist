import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function LCMCalculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
  const lcmTwo = (a, b) => Math.abs(a * b) / gcd(a, b);

  const calculateLCM = () => {
    const values = input
      .split(/[\s,]+/)
      .map((v) => parseInt(v))
      .filter((v) => !isNaN(v) && v > 0);

    if (values.length < 2) {
      setResult('Please enter at least two positive integers separated by commas or spaces.');
      return;
    }

    const lcm = values.reduce((acc, val) => lcmTwo(acc, val));
    setResult({ values, lcm });
  };

  return (
    <CalculatorLayout title="🔗 LCM Calculator">
      <Helmet>
        <title>LCM Calculator – MapleAssist</title>
        <meta name="description" content="Find the Least Common Multiple (LCM) of two or more numbers. Supports prime factorization and automatic simplification." />
        <meta name="keywords" content="lcm calculator, least common multiple, math tool, mapleassist" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Enter two or more positive integers separated by commas or spaces to calculate their <strong>Least Common Multiple (LCM)</strong>. This tool uses the formula:
        <br />
        <code>LCM(a, b) = (a × b) / GCD(a, b)</code>
      </p>

      {/* 🔢 Input */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '500px',
        margin: '0 auto',
        marginBottom: '20px'
      }}>
        <input
          type="text"
          placeholder="e.g. 12, 18, 30"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            padding: '12px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={calculateLCM}
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
          Calculate LCM
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
          <p><strong>Input:</strong> {result.values.join(', ')}</p>
          <p><strong>LCM:</strong> {result.lcm}</p>
        </div>
      )}
    </CalculatorLayout>
  );
}