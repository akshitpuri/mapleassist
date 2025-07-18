import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function PrimeFactorizationCalculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const factorize = () => {
    const num = parseInt(input);
    if (isNaN(num) || num < 2) {
      setResult('Please enter an integer greater than 1.');
      return;
    }

    let n = num;
    const factors = [];
    let divisor = 2;

    while (n >= divisor * divisor) {
      while (n % divisor === 0) {
        factors.push(divisor);
        n /= divisor;
      }
      divisor++;
    }

    if (n > 1) factors.push(n);

    const factorMap = {};
    factors.forEach(f => {
      factorMap[f] = (factorMap[f] || 0) + 1;
    });

    const exponentialForm = Object.entries(factorMap)
      .map(([prime, exp]) => `${prime}${exp > 1 ? `^${exp}` : ''}`)
      .join(' × ');

    setResult({
      original: num,
      factors: factors.join(', '),
      exponential: exponentialForm
    });
  };

  return (
    <CalculatorLayout title="🧮 Prime Factorization Calculator">
      <Helmet>
        <title>Prime Factorization Calculator – MapleAssist</title>
        <meta name="description" content="Find the prime factors of any positive integer. Supports exponential form and clean formatting." />
        <meta name="keywords" content="prime factorization calculator, prime factors, factor tree, mapleassist math tool" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Enter a positive integer to find its <strong>prime factorization</strong>. This tool uses trial division and displays results in both list and exponential form.
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
          placeholder="Enter number (e.g. 100)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
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
          Factorize
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
          <p><strong>Input:</strong> {result.original}</p>
          <p><strong>Prime Factors:</strong> {result.factors}</p>
          <p><strong>Exponential Form:</strong> {result.exponential}</p>
        </div>
      )}
    </CalculatorLayout>
  );
}