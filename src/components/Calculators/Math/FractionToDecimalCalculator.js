import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function FractionToDecimalCalculator() {
  const [whole, setWhole] = useState('');
  const [numerator, setNumerator] = useState('');
  const [denominator, setDenominator] = useState('');
  const [result, setResult] = useState(null);

  const convertToDecimal = () => {
    const w = parseInt(whole) || 0;
    const n = parseInt(numerator);
    const d = parseInt(denominator);

    if (isNaN(n) || isNaN(d) || d === 0) {
      setResult('Please enter a valid fraction with a non-zero denominator.');
      return;
    }

    const decimal = w + n / d;
    setResult({
      original: `${w > 0 ? `${w} ` : ''}${n}/${d}`,
      decimal: decimal.toFixed(6)
    });
  };

  return (
    <CalculatorLayout title="🔣 Fraction to Decimal Calculator">
      <Helmet>
        <title>Fraction to Decimal Calculator – MapleAssist</title>
        <meta name="description" content="Convert proper, improper, and mixed fractions to decimal form. Supports automatic simplification and rounding." />
        <meta name="keywords" content="fraction to decimal calculator, convert fractions, mixed number to decimal, mapleassist math tool" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Enter a fraction or mixed number to convert it into decimal form. This tool handles proper, improper, and mixed fractions and rounds to six decimal places.
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
          onClick={convertToDecimal}
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
          Convert to Decimal
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
        </div>
      )}
    </CalculatorLayout>
  );
}