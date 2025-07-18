import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function FactoringCalculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const factorize = () => {
    const num = parseInt(input);
    if (isNaN(num) || num < 2) {
      setResult('Please enter a positive integer greater than 1.');
      return;
    }

    const factors = [];
    let n = num;
    let divisor = 2;

    while (n >= 2) {
      if (n % divisor === 0) {
        factors.push(divisor);
        n /= divisor;
      } else {
        divisor++;
      }
    }

    const simplified = factors.join(' × ');
    setResult({ input: num, factors, simplified });
  };

  return (
    <CalculatorLayout title="🧮 Factoring Calculator">
      <Helmet>
        <title>Factoring Calculator – MapleAssist</title>
        <meta name="description" content="Factor positive integers using prime decomposition. Automatically simplifies and displays prime factors." />
        <meta name="keywords" content="factoring calculator, prime factors, factorize number, mapleassist math tool" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Enter a positive integer greater than 1 to find its prime factors. This tool uses trial division and outputs simplified prime decomposition.
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
        <input
          type="number"
          min="2"
          placeholder="Enter an integer (e.g. 60)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            padding: '12px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={factorize}
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
          Factor Number
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
          <p><strong>Input:</strong> {result.input}</p>
          <p><strong>Prime Factors:</strong> {result.factors.join(', ')}</p>
          <p><strong>Decomposition:</strong> {result.simplified}</p>
        </div>
      )}
    </CalculatorLayout>
  );
}