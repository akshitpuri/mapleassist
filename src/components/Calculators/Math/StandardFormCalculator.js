import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function StandardFormCalculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const convertToStandardForm = () => {
    const value = input.trim();
    const num = parseFloat(value);

    if (isNaN(num)) {
      setResult('Please enter a valid number.');
      return;
    }

    if (num === 0) {
      setResult({
        original: '0',
        standard: '0 × 10⁰',
        exponent: 0,
        coefficient: 0
      });
      return;
    }

    const exponent = Math.floor(Math.log10(Math.abs(num)));
    const coefficient = num / Math.pow(10, exponent);

    setResult({
      original: num.toLocaleString('en-US'),
      standard: `${coefficient.toFixed(6)} × 10^${exponent}`,
      exponent,
      coefficient: coefficient.toFixed(6)
    });
  };

  return (
    <CalculatorLayout title="🔬 Standard Form Calculator">
      <Helmet>
        <title>Standard Form Calculator – MapleAssist</title>
        <meta name="description" content="Convert numbers to standard form using scientific notation. Supports large and small values with clean formatting." />
        <meta name="keywords" content="standard form calculator, scientific notation, convert number, mapleassist math tool" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Enter a number to convert it into <strong>standard form</strong> (scientific notation). This tool expresses numbers as:
        <br />
        <code>a × 10^b</code> where <code>1 ≤ |a| &lt; 10</code> and <code>b</code> is an integer.
      </p>

      {/* 🔢 Input */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '400px',
        margin: '0 auto',
        marginBottom: '20px'
      }}>
        <input
          type="text"
          placeholder="Enter number (e.g. 459608, 0.00038)"
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
          onClick={convertToStandardForm}
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
          Convert to Standard Form
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
          <p><strong>Original Number:</strong> {result.original}</p>
          <p><strong>Standard Form:</strong> {result.standard}</p>
          <p><strong>Coefficient:</strong> {result.coefficient}</p>
          <p><strong>Exponent:</strong> {result.exponent}</p>
        </div>
      )}
    </CalculatorLayout>
  );
}