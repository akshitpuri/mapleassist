import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function MeanCalculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const calculateMean = () => {
    const values = input
      .split(/[\s,]+/)
      .map((v) => parseFloat(v))
      .filter((v) => !isNaN(v));

    if (values.length === 0) {
      setResult('Please enter a valid list of numbers.');
      return;
    }

    const sum = values.reduce((acc, val) => acc + val, 0);
    const mean = +(sum / values.length).toFixed(4);

    setResult({ sum, count: values.length, mean });
  };

  return (
    <CalculatorLayout title="🟰 Mean Calculator">
      <Helmet>
        <title>Mean Calculator – MapleAssist</title>
        <meta name="description" content="Calculate the arithmetic mean of a dataset. Enter numbers separated by commas or spaces and get the average instantly." />
        <meta name="keywords" content="mean calculator, average calculator, arithmetic mean, mapleassist statistics tool" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Enter a list of numbers separated by commas or spaces to calculate the mean (average). This tool is ideal for analyzing grades, scores, or any numeric dataset.
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
          placeholder="e.g. 12, 15, 18 or 12 15 18"
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
          onClick={calculateMean}
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
          Calculate Mean
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
          <p><strong>Sum:</strong> {result.sum}</p>
          <p><strong>Count:</strong> {result.count}</p>
          <p><strong>Mean:</strong> {result.mean}</p>
        </div>
      )}
    </CalculatorLayout>
  );
}