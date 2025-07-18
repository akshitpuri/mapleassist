import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function PercentageDifferenceCalculator() {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [result, setResult] = useState(null);

  const calculateDifference = () => {
    const v1 = parseFloat(value1);
    const v2 = parseFloat(value2);

    if (isNaN(v1) || isNaN(v2) || v1 <= 0 || v2 <= 0) {
      setResult('Please enter two positive numbers.');
      return;
    }

    const diff = Math.abs(v1 - v2);
    const avg = (v1 + v2) / 2;
    const percentDiff = (diff / avg) * 100;

    setResult({
      value1: v1,
      value2: v2,
      absolute: diff.toFixed(4),
      percent: percentDiff.toFixed(2)
    });
  };

  return (
    <CalculatorLayout title="🔁 Percentage Difference Calculator">
      <Helmet>
        <title>Percentage Difference Calculator – MapleAssist</title>
        <meta name="description" content="Calculate the percentage difference between two values using the symmetric formula. Useful for measurements, price comparisons, scores and data change." />
        <meta name="keywords" content="percentage difference calculator, compare values, percent gap, symmetric percent, mapleassist math tool" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Enter two positive values to calculate the <strong>percentage difference</strong> between them. This method is symmetric and does not assume which value came first.
        <br />
        <code>Percentage Difference = |V₁ − V₂| ÷ ((V₁ + V₂) ÷ 2) × 100</code>
      </p>

      {/* 🔢 Input Fields */}
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
          placeholder="Value 1"
          value={value1}
          onChange={(e) => setValue1(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <input
          type="number"
          placeholder="Value 2"
          value={value2}
          onChange={(e) => setValue2(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={calculateDifference}
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
          Calculate Difference
        </button>
      </div>

      {/* 📊 Results */}
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
          <p><strong>Value 1:</strong> {result.value1}</p>
          <p><strong>Value 2:</strong> {result.value2}</p>
          <p><strong>Absolute Difference:</strong> {result.absolute}</p>
          <p><strong>Percentage Difference:</strong> {result.percent}%</p>
        </div>
      )}
    </CalculatorLayout>
  );
}