import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function EquivalentFractionsCalculator() {
  const [numerator, setNumerator] = useState('');
  const [denominator, setDenominator] = useState('');
  const [count, setCount] = useState(5);
  const [result, setResult] = useState(null);

  const generateEquivalents = () => {
    const num = parseInt(numerator);
    const den = parseInt(denominator);
    const limit = parseInt(count);

    if (isNaN(num) || isNaN(den) || den === 0 || limit < 1) {
      setResult('Please enter a valid fraction and number of equivalents.');
      return;
    }

    const equivalents = [];
    for (let i = 1; i <= limit; i++) {
      equivalents.push({
        multiplier: i,
        fraction: `${num * i}/${den * i}`
      });
    }

    setResult({ original: `${num}/${den}`, equivalents });
  };

  return (
    <CalculatorLayout title="🔁 Equivalent Fractions Calculator">
      <Helmet>
        <title>Equivalent Fractions Calculator – MapleAssist</title>
        <meta name="description" content="Generate equivalent fractions by multiplying numerator and denominator by the same number. Supports proper, improper, and mixed fractions." />
        <meta name="keywords" content="equivalent fractions calculator, fraction generator, mapleassist math tool" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Enter a fraction and choose how many equivalent forms to generate. This tool multiplies both numerator and denominator by the same number to preserve value.
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
          <h4>Fraction</h4>
          <input type="number" placeholder="Numerator" value={numerator} onChange={(e) => setNumerator(e.target.value)} />
          <input type="number" placeholder="Denominator" value={denominator} onChange={(e) => setDenominator(e.target.value)} />
        </div>
        <div>
          <h4>Settings</h4>
          <input type="number" placeholder="How many equivalents?" value={count} onChange={(e) => setCount(e.target.value)} />
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button
          onClick={generateEquivalents}
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
          Generate Equivalents
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
          maxWidth: '600px',
          margin: '0 auto',
          fontSize: '1.1rem',
          color: '#333'
        }}>
          <p><strong>Original Fraction:</strong> {result.original}</p>
          <p><strong>Equivalent Fractions:</strong></p>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            {result.equivalents.map((eq, idx) => (
              <li key={idx}>×{eq.multiplier}: {eq.fraction}</li>
            ))}
          </ul>
        </div>
      )}
    </CalculatorLayout>
  );
}