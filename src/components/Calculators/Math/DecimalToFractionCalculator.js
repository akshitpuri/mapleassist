import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function DecimalToFractionCalculator() {
  const [decimal, setDecimal] = useState('');
  const [result, setResult] = useState(null);

  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);

  const convertDecimalToFraction = () => {
    const value = parseFloat(decimal);
    if (isNaN(value)) {
      setResult('Please enter a valid decimal number.');
      return;
    }

    const isNegative = value < 0;
    const absValue = Math.abs(value);
    const decimalStr = absValue.toString();
    const decimalPlaces = decimalStr.includes('.') ? decimalStr.split('.')[1].length : 0;
    const denominator = Math.pow(10, decimalPlaces);
    const numerator = Math.round(absValue * denominator);
    const divisor = gcd(numerator, denominator);

    const simplifiedNum = numerator / divisor;
    const simplifiedDen = denominator / divisor;

    const whole = Math.floor(simplifiedNum / simplifiedDen);
    const remainder = simplifiedNum % simplifiedDen;

    setResult({
      original: value,
      fraction: `${isNegative ? '-' : ''}${simplifiedNum}/${simplifiedDen}`,
      mixed: remainder === 0 ? `${isNegative ? '-' : ''}${whole}` : `${isNegative ? '-' : ''}${whole} ${remainder}/${simplifiedDen}`
    });
  };

  return (
    <CalculatorLayout title="🔣 Decimal to Fraction Calculator">
      <Helmet>
        <title>Decimal to Fraction Calculator – MapleAssist</title>
        <meta name="description" content="Convert decimal numbers to simplified fractions or mixed numbers. Supports terminating decimals and automatic simplification." />
        <meta name="keywords" content="decimal to fraction calculator, convert decimals, mixed number, mapleassist math tool" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Enter a decimal number to convert it into a simplified fraction or mixed number. This tool handles terminating decimals and automatically reduces the result.
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
          placeholder="e.g. 2.625"
          value={decimal}
          onChange={(e) => setDecimal(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={convertDecimalToFraction}
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
          Convert
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
          <p><strong>Original Decimal:</strong> {result.original}</p>
          <p><strong>Fraction:</strong> {result.fraction}</p>
          <p><strong>Mixed Number:</strong> {result.mixed}</p>
        </div>
      )}
    </CalculatorLayout>
  );
}