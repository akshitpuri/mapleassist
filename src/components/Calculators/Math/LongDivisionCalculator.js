import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function LongDivisionCalculator() {
  const [dividend, setDividend] = useState('');
  const [divisor, setDivisor] = useState('');
  const [result, setResult] = useState(null);

  const calculateLongDivision = () => {
    const a = parseInt(dividend);
    const b = parseInt(divisor);

    if (isNaN(a) || isNaN(b) || b === 0) {
      setResult('Please enter valid numbers. Divisor must not be zero.');
      return;
    }

    const quotient = Math.floor(a / b);
    const remainder = a % b;
    const decimal = (a / b).toFixed(6);

    setResult({ dividend: a, divisor: b, quotient, remainder, decimal });
  };

  return (
    <CalculatorLayout title="➗ Long Division Calculator">
      <Helmet>
        <title>Long Division Calculator – MapleAssist</title>
        <meta name="description" content="Divide two numbers using long division. Shows quotient, remainder, and decimal result with clean formatting." />
        <meta name="keywords" content="long division calculator, quotient remainder, divide numbers, mapleassist math tool" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Enter a <strong>dividend</strong> and a <strong>divisor</strong> to perform long division. This tool shows the quotient, remainder, and decimal result.
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
          placeholder="Dividend"
          value={dividend}
          onChange={(e) => setDividend(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <input
          type="number"
          placeholder="Divisor"
          value={divisor}
          onChange={(e) => setDivisor(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={calculateLongDivision}
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
          Divide
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
          <p><strong>Dividend:</strong> {result.dividend}</p>
          <p><strong>Divisor:</strong> {result.divisor}</p>
          <p><strong>Quotient:</strong> {result.quotient}</p>
          <p><strong>Remainder:</strong> {result.remainder}</p>
          <p><strong>Decimal:</strong> {result.decimal}</p>
        </div>
      )}
    </CalculatorLayout>
  );
}