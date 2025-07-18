import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function SimplifyingFractionsCalculator() {
  const [numerator, setNumerator] = useState('');
  const [denominator, setDenominator] = useState('');
  const [result, setResult] = useState(null);

  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);

  const simplifyFraction = () => {
    const num = parseInt(numerator);
    const den = parseInt(denominator);

    if (isNaN(num) || isNaN(den) || den === 0) {
      setResult('Please enter valid numbers. Denominator must not be zero.');
      return;
    }

    const divisor = gcd(Math.abs(num), Math.abs(den));
    const simpleNum = num / divisor;
    const simpleDen = den / divisor;

    const whole = Math.floor(Math.abs(simpleNum) / Math.abs(simpleDen));
    const remainder = Math.abs(simpleNum) % Math.abs(simpleDen);

    const isNegative = (num < 0) !== (den < 0);
    const sign = isNegative ? '-' : '';

    setResult({
      original: `${num}/${den}`,
      simplified: `${sign}${simpleNum}/${simpleDen}`,
      mixed: remainder === 0 ? `${sign}${whole}` : `${sign}${whole} ${remainder}/${Math.abs(simpleDen)}`
    });
  };

  return (
    <CalculatorLayout title="➗ Simplifying Fractions Calculator">
      <Helmet>
        <title>Simplifying Fractions Calculator – MapleAssist</title>
        <meta name="description" content="Reduce fractions to their simplest form and convert improper fractions to mixed numbers. Supports negative values and automatic simplification." />
        <meta name="keywords" content="simplify fractions calculator, reduce fractions, lowest terms, mixed number, mapleassist math tool" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Enter a numerator and denominator to simplify the fraction. This tool reduces fractions to lowest terms and converts improper fractions to mixed numbers automatically.
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
          placeholder="Numerator"
          value={numerator}
          onChange={(e) => setNumerator(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <input
          type="number"
          placeholder="Denominator"
          value={denominator}
          onChange={(e) => setDenominator(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={simplifyFraction}
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
          Simplify
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
          <p><strong>Original:</strong> {result.original}</p>
          <p><strong>Simplified:</strong> {result.simplified}</p>
          <p><strong>Mixed Number:</strong> {result.mixed}</p>
        </div>
      )}
    </CalculatorLayout>
  );
}