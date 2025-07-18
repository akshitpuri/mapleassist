import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function MeanMedianModeRangeCalculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const calculateStats = () => {
    const values = input
      .split(/[\s,]+/)
      .map((v) => parseFloat(v))
      .filter((v) => !isNaN(v))
      .sort((a, b) => a - b);

    const n = values.length;
    if (n === 0) {
      setResult('Please enter a valid list of numbers.');
      return;
    }

    const sum = values.reduce((acc, val) => acc + val, 0);
    const mean = +(sum / n).toFixed(4);

    const median =
      n % 2 === 0
        ? +((values[n / 2 - 1] + values[n / 2]) / 2).toFixed(4)
        : +values[Math.floor(n / 2)].toFixed(4);

    const frequency = {};
    values.forEach((v) => {
      frequency[v] = (frequency[v] || 0) + 1;
    });
    const maxFreq = Math.max(...Object.values(frequency));
    const mode = Object.keys(frequency)
      .filter((k) => frequency[k] === maxFreq)
      .map(Number);

    const range = +(values[n - 1] - values[0]).toFixed(4);

    setResult({ mean, median, mode, range, count: n, sum });
  };

  return (
    <CalculatorLayout title="🧮 Mean Median Mode Range Calculator">
      <Helmet>
        <title>Mean Median Mode Range Calculator – MapleAssist</title>
        <meta name="description" content="Calculate mean, median, mode, and range from a dataset. Enter numbers separated by commas or spaces and get instant results." />
        <meta name="keywords" content="mean median mode range calculator, statistics tool, mapleassist" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Enter a list of numbers separated by commas or spaces to calculate the mean, median, mode, and range. This tool also shows the sum and count of values.
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
        <textarea
          rows={4}
          placeholder="e.g. 10, 20, 30, 40, 50"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            padding: '12px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc',
            resize: 'vertical'
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
          <p><strong>Median:</strong> {result.median}</p>
          <p><strong>Mode:</strong> {result.mode.join(', ')}</p>
          <p><strong>Range:</strong> {result.range}</p>
          <p><strong>Sum:</strong> {result.sum}</p>
          <p><strong>Count:</strong> {result.count}</p>
        </div>
      )}
    </CalculatorLayout>
  );
}