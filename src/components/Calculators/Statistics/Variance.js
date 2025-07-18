import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function VarianceCalculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const calculateVariance = () => {
    const values = input
      .split(',')
      .map(v => parseFloat(v.trim()))
      .filter(v => !isNaN(v));

    if (values.length < 2) {
      setResult('Please enter at least two valid numbers separated by commas.');
      return;
    }

    const mean = values.reduce((acc, val) => acc + val, 0) / values.length;
    const variance = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / values.length;

    setResult({
      mean: mean.toFixed(4),
      variance: variance.toFixed(4),
      count: values.length
    });
  };

  return (
    <CalculatorLayout title="📉 Variance Calculator">
      <Helmet>
        <title>Variance Calculator – MapleAssist</title>
        <meta name="description" content="Calculate the variance and mean of a dataset. Use this tool to evaluate how far values diverge from the average." />
        <meta name="keywords" content="variance calculator, mean calculator, data spread, mapleassist statistics tool" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Enter a list of numbers separated by commas to calculate the <strong>mean</strong> and <strong>variance</strong>. Variance measures how far values are spread from the average.
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
          placeholder="e.g. 10, 12, 15, 14, 11"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={calculateVariance}
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
          Calculate Variance
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
          <p><strong>Mean:</strong> {result.mean}</p>
          <p><strong>Variance:</strong> {result.variance}</p>
          <p><strong>Count:</strong> {result.count}</p>
        </div>
      )}
    </CalculatorLayout>
  );
}