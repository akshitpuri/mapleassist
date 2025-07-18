import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function LCDCalculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const parseDenominators = (str) => {
    const values = str.split(/[\s,]+/).map((v) => v.trim());
    const denominators = [];

    for (const val of values) {
      if (val.includes('/')) {
        const parts = val.split('/');
        const denom = parseInt(parts[1]);
        if (!isNaN(denom) && denom > 0) denominators.push(denom);
      } else if (val.includes(' ')) {
        const [whole, frac] = val.split(' ');
        const parts = frac.split('/');
        const denom = parseInt(parts[1]);
        if (!isNaN(denom) && denom > 0) denominators.push(denom);
      } else {
        denominators.push(1); // treat whole numbers as denominator 1
      }
    }

    return denominators;
  };

  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
  const lcm = (a, b) => Math.abs(a * b) / gcd(a, b);

  const calculateLCD = () => {
    const denominators = parseDenominators(input);

    if (denominators.length < 2) {
      setResult('Please enter at least two fractions, mixed numbers, or integers.');
      return;
    }

    const lcd = denominators.reduce((acc, val) => lcm(acc, val));
    setResult({ denominators, lcd });
  };

  return (
    <CalculatorLayout title="🔗 Least Common Denominator Calculator">
      <Helmet>
        <title>Least Common Denominator Calculator – MapleAssist</title>
        <meta name="description" content="Find the least common denominator (LCD) of fractions, mixed numbers, and integers. Useful for adding, subtracting, or comparing fractions." />
        <meta name="keywords" content="least common denominator calculator, lcd calculator, fraction denominator, mapleassist math tool" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Enter two or more fractions, mixed numbers, or integers separated by commas or spaces to calculate their <strong>Least Common Denominator (LCD)</strong>. This tool extracts denominators and finds their least common multiple.
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
          placeholder="e.g. 1/2, 3/4, 2 1/3, 5"
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
          onClick={calculateLCD}
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
          Calculate LCD
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
          <p><strong>Extracted Denominators:</strong> {result.denominators.join(', ')}</p>
          <p><strong>Least Common Denominator:</strong> {result.lcd}</p>
        </div>
      )}
    </CalculatorLayout>
  );
}