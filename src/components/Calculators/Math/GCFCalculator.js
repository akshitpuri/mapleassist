import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function GCFCalculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);

  const calculateGCF = () => {
    const values = input
      .split(/[\s,]+/)
      .map((v) => parseInt(v))
      .filter((v) => !isNaN(v) && v > 0);

    if (values.length < 2) {
      setResult('Please enter at least two positive integers separated by commas or spaces.');
      return;
    }

    const gcf = values.reduce((acc, val) => gcd(acc, val));
    setResult({ values, gcf });
  };

  return (
    <CalculatorLayout title="🔗 GCF Calculator">
      <Helmet>
        <title>GCF Calculator – MapleAssist</title>
        <meta name="description" content="Find the Greatest Common Factor (GCF) of two or more numbers. Supports prime factorization and Euclidean algorithm." />
        <meta name="keywords" content="gcf calculator, greatest common factor, gcd, hcf, mapleassist math tool" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Enter two or more positive integers separated by commas or spaces to calculate their <strong>Greatest Common Factor (GCF)</strong>. This tool uses the Euclidean algorithm:
        <br />
        <code>GCF(a, b) = GCF(b, a mod b)</code>
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
          placeholder="e.g. 24, 36, 60"
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
          onClick={calculateGCF}
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
          Calculate GCF
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
          <p><strong>GCF:</strong> {result.gcf}</p>
        </div>
      )}
    </CalculatorLayout>
  );
}