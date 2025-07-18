import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function DecimalToPercentCalculator() {
  const [decimal, setDecimal] = useState('');
  const [result, setResult] = useState(null);

  const convertToPercent = () => {
    const value = parseFloat(decimal);
    if (isNaN(value)) {
      setResult('Please enter a valid decimal number.');
      return;
    }

    const percent = value * 100;
    setResult({
      decimal: value.toFixed(6),
      percent: percent.toFixed(2)
    });
  };

  return (
    <CalculatorLayout title="📊 Decimal to Percent Calculator">
      <Helmet>
        <title>Decimal to Percent Calculator – MapleAssist</title>
        <meta name="description" content="Convert decimal numbers to percentage form. Supports automatic rounding and clean formatting." />
        <meta name="keywords" content="decimal to percent calculator, convert decimal, percentage converter, mapleassist math tool" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Enter a decimal number to convert it into a percentage. This tool multiplies the decimal by 100 and adds the percent sign:
        <br />
        <code>Percent = Decimal × 100</code>
      </p>

      {/* 🔢 Input */}
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
          placeholder="Enter decimal (e.g. 0.75)"
          value={decimal}
          onChange={(e) => setDecimal(e.target.value)}
          style={{
            padding: '12px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={convertToPercent}
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
          Convert to Percent
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
          <p><strong>Decimal:</strong> {result.decimal}</p>
          <p><strong>Percent:</strong> {result.percent}%</p>
        </div>
      )}
    </CalculatorLayout>
  );
}