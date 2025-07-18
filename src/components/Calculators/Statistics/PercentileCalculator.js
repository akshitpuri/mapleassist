import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function PercentileCalculator() {
  const [input, setInput] = useState('');
  const [percentile, setPercentile] = useState('');
  const [result, setResult] = useState(null);

  const calculatePercentile = () => {
    const values = input
      .split(/[\s,]+/)
      .map((v) => parseFloat(v))
      .filter((v) => !isNaN(v))
      .sort((a, b) => a - b);

    const p = parseFloat(percentile);
    const n = values.length;

    if (n === 0 || isNaN(p) || p < 0 || p > 100) {
      setResult('Please enter a valid dataset and percentile between 0 and 100.');
      return;
    }

    const rank = (p / 100) * (n - 1);
    const ri = Math.floor(rank);
    const rf = rank - ri;

    let value;
    if (ri === n - 1) {
      value = values[ri];
    } else {
      value = +(values[ri] + rf * (values[ri + 1] - values[ri])).toFixed(4);
    }

    setResult({ value, percentile: p });
  };

  return (
    <CalculatorLayout title="📶 Percentile Calculator">
      <Helmet>
        <title>Percentile Calculator – MapleAssist</title>
        <meta name="description" content="Find the value at a given percentile from a dataset. Enter numbers and a percentile to get the result instantly." />
        <meta name="keywords" content="percentile calculator, percentile rank, statistics tool, mapleassist" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Enter a list of numbers and a percentile (0–100) to find the corresponding value in the dataset. This tool uses linear interpolation for precise results.
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
        <input
          type="number"
          min="0"
          max="100"
          placeholder="Percentile (0–100)"
          value={percentile}
          onChange={(e) => setPercentile(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={calculatePercentile}
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
          Calculate Percentile
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
          <p><strong>{result.percentile}th Percentile Value:</strong> {result.value}</p>
        </div>
      )}
    </CalculatorLayout>
  );
}