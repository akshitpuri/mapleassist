import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function PercentageChangeCalculator() {
  const [initial, setInitial] = useState('');
  const [final, setFinal] = useState('');
  const [result, setResult] = useState(null);

  const calculateChange = () => {
    const initVal = parseFloat(initial);
    const finalVal = parseFloat(final);

    if (isNaN(initVal) || isNaN(finalVal) || initVal === 0) {
      setResult('Please enter valid numbers. Initial value must not be zero.');
      return;
    }

    const change = ((finalVal - initVal) / Math.abs(initVal)) * 100;
    const type = change > 0 ? 'Increase' : change < 0 ? 'Decrease' : 'No Change';

    setResult({
      initial: initVal,
      final: finalVal,
      percent: Math.abs(change).toFixed(2),
      type
    });
  };

  return (
    <CalculatorLayout title="📊 Percentage Change Calculator">
      <Helmet>
        <title>Percentage Change Calculator – MapleAssist</title>
        <meta name="description" content="Calculate the percentage change between two values. Useful for comparing growth, decline, or variation in data." />
        <meta name="keywords" content="percentage change calculator, percent increase decrease, value comparison, mapleassist math tool" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Enter the initial and final values to calculate the <strong>percentage change</strong>. This tool detects increase, decrease, or no change using:
        <br />
        <code>(Final − Initial) / |Initial| × 100</code>
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
          placeholder="Initial value"
          value={initial}
          onChange={(e) => setInitial(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <input
          type="number"
          placeholder="Final value"
          value={final}
          onChange={(e) => setFinal(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={calculateChange}
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
          Calculate Change
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
          <p><strong>Initial:</strong> {result.initial}</p>
          <p><strong>Final:</strong> {result.final}</p>
          <p><strong>{result.type}:</strong> {result.percent}%</p>
        </div>
      )}
    </CalculatorLayout>
  );
}