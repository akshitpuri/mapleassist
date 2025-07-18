import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function FractionToPercentCalculator() {
  const [whole, setWhole] = useState('');
  const [numerator, setNumerator] = useState('');
  const [denominator, setDenominator] = useState('');
  const [result, setResult] = useState(null);

  const convertToPercent = () => {
    const w = parseInt(whole) || 0;
    const n = parseInt(numerator);
    const d = parseInt(denominator);

    if (isNaN(n) || isNaN(d) || d === 0) {
      setResult('Please enter a valid fraction with a non-zero denominator.');
      return;
    }

    const decimal = w + n / d;
    const percent = decimal * 100;

    setResult({
      original: `${w > 0 ? `${w} ` : ''}${n}/${d}`,
      decimal: decimal.toFixed(6),
      percent: percent.toFixed(2)
    });
  };

  return (
    <CalculatorLayout title="🔣 Fraction to Percent Calculator">
      <Helmet>
        <title>Fraction to Percent Calculator – MapleAssist</title>
        <meta name="description" content="Convert proper, improper, and mixed fractions to percentage form. Supports automatic simplification and rounding." />
        <meta name="keywords" content="fraction to percent calculator, convert fractions, mixed number to percent, mapleassist math tool" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Enter a fraction or mixed number to convert it into a percentage. This tool handles proper, improper, and mixed fractions and rounds to two decimal places.
      </p>

      {/* 🔢 Inputs */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        maxWidth: '500px',
        margin: '0 auto',
        marginBottom: '20px'
      }}>
        <div>
          <h4>Mixed Number (optional)</h4>
          <input type="number" placeholder="Whole number" value={whole} onChange={(e) => setWhole(e.target.value)} />
        </div>
        <div>
          <h4>Fraction</h4>
          <input type="number" placeholder="Numerator" value={numerator} onChange={(e) => setNumerator(e.target.value)} />
          <input type="number" placeholder="Denominator" value={denominator} onChange={(e) => setDenominator(e.target.value)} />
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button
          onClick={convertToPercent}
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
          Convert to Percent
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
          <p><strong>Fraction:</strong> {result.original}</p>
          <p><strong>Decimal:</strong> {result.decimal}</p>
          <p><strong>Percent:</strong> {result.percent}%</p>
        </div>
      )}
    </CalculatorLayout>
  );
}