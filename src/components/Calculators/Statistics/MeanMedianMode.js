import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function MeanMedianModeCalculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const calculateStats = () => {
    const values = input
      .split(',')
      .map((v) => parseFloat(v.trim()))
      .filter((v) => !isNaN(v))
      .sort((a, b) => a - b);

    const n = values.length;
    if (n === 0) {
      setResult('Please enter valid numbers separated by commas.');
      return;
    }

    const mean = +(values.reduce((acc, val) => acc + val, 0) / n).toFixed(4);
    const median =
      n % 2 === 0
        ? +((values[n / 2 - 1] + values[n / 2]) / 2).toFixed(4)
        : +values[Math.floor(n / 2)].toFixed(4);

    const frequency = {};
    let maxFreq = 0;
    values.forEach((val) => {
      frequency[val] = (frequency[val] || 0) + 1;
      maxFreq = Math.max(maxFreq, frequency[val]);
    });

    const mode = Object.keys(frequency)
      .filter((key) => frequency[key] === maxFreq)
      .map(Number);

    setResult({ mean, median, mode });
  };

  return (
    <CalculatorLayout title="📊 Mean Median Mode Calculator">
      <Helmet>
        <title>Mean Median Mode Calculator – MapleAssist</title>
        <meta name="description" content="Calculate mean, median, and mode from a dataset. Ideal for quick statistical analysis and learning how central tendency works." />
        <meta name="keywords" content="mean calculator, median calculator, mode calculator, statistics tool, mapleassist" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Enter a list of numbers separated by commas (e.g. <code>10, 15, 20</code>) to compute the <strong>mean</strong> (average), <strong>median</strong> (middle value), and <strong>mode</strong> (most frequent values).
      </p>

      {/* 🔢 Inputs */}
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
          placeholder="e.g. 12, 15, 13, 15, 16"
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
          onClick={calculateStats}
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
          Calculate
        </button>
      </div>

      {/* 📈 Result Display */}
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
          <p><strong>Median:</strong> {result.median}</p>
          <p><strong>Mode:</strong> {result.mode.join(', ')}</p>
        </div>
      )}
    </CalculatorLayout>
  );
}