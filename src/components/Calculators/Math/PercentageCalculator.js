import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function PercentageCalculator() {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [mode, setMode] = useState('of'); // 'of', 'increase', 'decrease'
  const [result, setResult] = useState(null);

  const calculatePercentage = () => {
    const num1 = parseFloat(value1);
    const num2 = parseFloat(value2);

    if (isNaN(num1) || isNaN(num2)) {
      setResult('Please enter valid numeric values.');
      return;
    }

    let output;
    switch (mode) {
      case 'of':
        output = (num1 / num2) * 100;
        setResult(`${num1} is ${output.toFixed(2)}% of ${num2}`);
        break;
      case 'increase':
        output = ((num2 - num1) / num1) * 100;
        setResult(`Increase: ${output.toFixed(2)}%`);
        break;
      case 'decrease':
        output = ((num1 - num2) / num1) * 100;
        setResult(`Decrease: ${output.toFixed(2)}%`);
        break;
      default:
        setResult('Invalid calculation mode.');
    }
  };

  return (
    <CalculatorLayout title="📊 Percentage Calculator">
      <Helmet>
        <title>Percentage Calculator – MapleAssist</title>
        <meta name="description" content="Calculate percentage values, increases, and decreases. Useful for sales, comparisons, and financial calculations." />
        <meta name="keywords" content="percentage calculator, percent of value, percent increase decrease, mapleassist math tool" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Choose a percentage mode and input two values to calculate the result. This tool helps solve “what percent of,” “percent increase,” and “percent decrease” scenarios.
      </p>

      {/* 🔢 Inputs */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '400px',
        margin: '0 auto',
        marginBottom: '16px'
      }}>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        >
          <option value="of">What % of?</option>
          <option value="increase">% Increase</option>
          <option value="decrease">% Decrease</option>
        </select>

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
          onClick={calculatePercentage}
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
      {typeof result === 'string' && (
        <div style={{
          backgroundColor: result.includes('Please') ? '#fff6f6' : '#fff',
          color: result.includes('Please') ? '#f44336' : '#333',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
          maxWidth: '500px',
          margin: '0 auto',
          textAlign: 'center',
          fontSize: '1.1rem'
        }}>
          <strong>{result}</strong>
        </div>
      )}
    </CalculatorLayout>
  );
}