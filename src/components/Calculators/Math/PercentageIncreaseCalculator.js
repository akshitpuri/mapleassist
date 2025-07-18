import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function PercentageIncreaseCalculator() {
  const [original, setOriginal] = useState('');
  const [newValue, setNewValue] = useState('');
  const [result, setResult] = useState(null);

  const calculateIncrease = () => {
    const oldVal = parseFloat(original);
    const newVal = parseFloat(newValue);

    if (isNaN(oldVal) || isNaN(newVal) || oldVal <= 0 || newVal <= 0) {
      setResult('Please enter valid positive numbers for both values.');
      return;
    }

    const increase = ((newVal - oldVal) / oldVal) * 100;
    setResult({
      original: oldVal,
      newValue: newVal,
      percent: increase.toFixed(2)
    });
  };

  return (
    <CalculatorLayout title="📈 Percentage Increase Calculator">
      <Helmet>
        <title>Percentage Increase Calculator – MapleAssist</title>
        <meta name="description" content="Calculate the percentage increase between two values. Useful for tracking growth in prices, salaries, investments, and more." />
        <meta name="keywords" content="percentage increase calculator, percent growth, value comparison, mapleassist math tool" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Enter the original and new values to calculate the <strong>percentage increase</strong>. This tool helps compare growth between two numbers using:
        <br />
        <code>(New − Original) / Original × 100</code>
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
          placeholder="Original value"
          value={original}
          onChange={(e) => setOriginal(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <input
          type="number"
          placeholder="New value"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={calculateIncrease}
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
          Calculate Increase
        </button>
      </div>

      {/* 📊 Output Display */}
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
          <p><strong>New:</strong> {result.newValue}</p>
          <p><strong>Percentage Increase:</strong> {result.percent}%</p>
        </div>
      )}
    </CalculatorLayout>
  );
}