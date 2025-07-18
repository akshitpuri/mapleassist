import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function QuartileCalculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const calculateQuartiles = () => {
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

    const median = (arr) => {
      const len = arr.length;
      const mid = Math.floor(len / 2);
      return len % 2 === 0
        ? (arr[mid - 1] + arr[mid]) / 2
        : arr[mid];
    };

    const Q2 = median(values);
    const lowerHalf = values.filter((v) => v < Q2 || (n % 2 === 0 && v <= Q2));
    const upperHalf = values.filter((v) => v > Q2 || (n % 2 === 0 && v >= Q2));

    const Q1 = median(lowerHalf);
    const Q3 = median(upperHalf);
    const IQR = Q3 - Q1;
    const min = values[0];
    const max = values[n - 1];
    const range = max - min;

    setResult({ Q1, Q2, Q3, IQR, min, max, range });
  };

  return (
    <CalculatorLayout title="📐 Quartile Calculator">
      <Helmet>
        <title>Quartile Calculator – MapleAssist</title>
        <meta name="description" content="Calculate Q1, Q2, Q3, IQR, min, max, and range from a dataset. Useful for box plots and statistical analysis." />
        <meta name="keywords" content="quartile calculator, Q1 Q2 Q3, interquartile range, mapleassist statistics tool" />
      </Helmet>

      <BackButton />

      <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '24px', color: '#444' }}>
        Enter a list of numbers separated by commas or spaces to calculate the quartiles. This tool finds Q1, Q2 (median), Q3, interquartile range (IQR), minimum, maximum, and range.
      </p>

      {/* 🔢 Input */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '500px', margin: '0 auto', marginBottom: '20px' }}>
        <textarea
          rows={4}
          placeholder="e.g. 10, 20, 30, 40, 50"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ padding: '12px', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ccc', resize: 'vertical' }}
        />
        <button
          onClick={calculateQuartiles}
          style={{ padding: '10px', backgroundColor: '#3f51b5', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer' }}
        >
          Calculate Quartiles
        </button>
      </div>

      {/* 📊 Result */}
      {typeof result === 'string' ? (
        <div style={{ color: '#f44336', backgroundColor: '#fff6f6', padding: '12px', borderRadius: '6px', maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
          {result}
        </div>
      ) : result && (
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 1px 6px rgba(0,0,0,0.08)', maxWidth: '500px', margin: '0 auto', fontSize: '1.1rem', color: '#333', textAlign: 'center' }}>
          <p><strong>Q1 (Lower Quartile):</strong> {result.Q1}</p>
          <p><strong>Q2 (Median):</strong> {result.Q2}</p>
          <p><strong>Q3 (Upper Quartile):</strong> {result.Q3}</p>
          <p><strong>IQR (Q3 − Q1):</strong> {result.IQR}</p>
          <p><strong>Min:</strong> {result.min}</p>
          <p><strong>Max:</strong> {result.max}</p>
          <p><strong>Range:</strong> {result.range}</p>
        </div>
      )}
    </CalculatorLayout>
  );
}