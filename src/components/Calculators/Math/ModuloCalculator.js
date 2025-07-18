import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function ModuloCalculator() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [result, setResult] = useState(null);

  const calculateModulo = () => {
    const dividend = parseFloat(a);
    const divisor = parseFloat(b);

    if (isNaN(dividend) || isNaN(divisor) || divisor === 0) {
      setResult('Please enter valid numbers. Divisor must not be zero.');
      return;
    }

    const remainder = ((dividend % divisor) + divisor) % divisor;
    setResult({
      dividend,
      divisor,
      remainder: remainder.toFixed(4)
    });
  };

  return (
    <CalculatorLayout title="🔁 Modulo Calculator">
      <Helmet>
        <title>Modulo Calculator – MapleAssist</title>
        <meta name="description" content="Calculate the remainder of division using modulo operation. Supports positive, negative, and decimal values." />
        <meta name="keywords" content="modulo calculator, mod operator, remainder calculator, mapleassist math tool" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Enter two numbers to calculate the <strong>modulo</strong> (remainder). This tool handles positive, negative, and decimal values and uses:
        <br />
        <code>a mod b = remainder of a ÷ b</code>
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
          placeholder="Dividend (a)"
          value={a}
          onChange={(e) => setA(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <input
          type="number"
          placeholder="Divisor (b)"
          value={b}
          onChange={(e) => setB(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={calculateModulo}
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
          Calculate Modulo
        </button>
      </div>

      {/* 📊 Results */}
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
          <p><strong>Dividend:</strong> {result.dividend}</p>
          <p><strong>Divisor:</strong> {result.divisor}</p>
          <p><strong>Remainder:</strong> {result.remainder}</p>
        </div>
      )}
    </CalculatorLayout>
  );
}