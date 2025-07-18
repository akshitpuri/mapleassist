import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function RoundingCalculator() {
  const [number, setNumber] = useState('');
  const [precision, setPrecision] = useState('nearest integer');
  const [result, setResult] = useState(null);

  const roundNumber = () => {
    const value = parseFloat(number);
    if (isNaN(value)) {
      setResult('Please enter a valid number.');
      return;
    }

    let rounded;
    switch (precision) {
      case 'nearest integer':
        rounded = Math.round(value);
        break;
      case 'nearest tenth':
        rounded = +(Math.round(value * 10) / 10).toFixed(1);
        break;
      case 'nearest hundredth':
        rounded = +(Math.round(value * 100) / 100).toFixed(2);
        break;
      case 'nearest thousandth':
        rounded = +(Math.round(value * 1000) / 1000).toFixed(3);
        break;
      case 'nearest ten':
        rounded = Math.round(value / 10) * 10;
        break;
      case 'nearest hundred':
        rounded = Math.round(value / 100) * 100;
        break;
      case 'nearest thousand':
        rounded = Math.round(value / 1000) * 1000;
        break;
      default:
        rounded = value;
    }

    setResult({ original: value, rounded });
  };

  return (
    <CalculatorLayout title="🔢 Rounding Calculator">
      <Helmet>
        <title>Rounding Calculator – MapleAssist</title>
        <meta name="description" content="Round numbers to the nearest integer, tenth, hundredth, thousandth, or place value. Useful for estimation and precision control." />
        <meta name="keywords" content="rounding calculator, round decimals, round to nearest, mapleassist math tool" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Enter a number and choose the precision level to round it. This tool supports rounding to decimal places or whole number place values.
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
          type="text"
          placeholder="Enter a number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <select
          value={precision}
          onChange={(e) => setPrecision(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        >
          <option value="nearest integer">Nearest Integer</option>
          <option value="nearest tenth">Nearest Tenth</option>
          <option value="nearest hundredth">Nearest Hundredth</option>
          <option value="nearest thousandth">Nearest Thousandth</option>
          <option value="nearest ten">Nearest Ten</option>
          <option value="nearest hundred">Nearest Hundred</option>
          <option value="nearest thousand">Nearest Thousand</option>
        </select>
        <button
          onClick={roundNumber}
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
          Round Number
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
          <p><strong>Original:</strong> {result.original}</p>
          <p><strong>Rounded:</strong> {result.rounded}</p>
        </div>
      )}
    </CalculatorLayout>
  );
}