import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function MixedFractionCalculator() {
  const [whole1, setWhole1] = useState('');
  const [num1, setNum1] = useState('');
  const [den1, setDen1] = useState('');
  const [whole2, setWhole2] = useState('');
  const [num2, setNum2] = useState('');
  const [den2, setDen2] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState(null);

  const toImproper = (w, n, d) => {
    const W = parseInt(w) || 0;
    const N = parseInt(n);
    const D = parseInt(d);
    if (isNaN(N) || isNaN(D) || D === 0) return null;
    return W * D + N;
  };

  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);

  const simplify = (n, d) => {
    const factor = gcd(n, d);
    return [n / factor, d / factor];
  };

  const toMixed = (n, d) => {
    const whole = Math.floor(n / d);
    const rem = n % d;
    return { whole, numerator: rem, denominator: d };
  };

  const calculate = () => {
    const n1 = toImproper(whole1, num1, den1);
    const d1 = parseInt(den1);
    const n2 = toImproper(whole2, num2, den2);
    const d2 = parseInt(den2);

    if (n1 === null || n2 === null || isNaN(d1) || isNaN(d2)) {
      setResult('Please enter valid mixed fractions.');
      return;
    }

    let num = 0, den = 1;

    switch (operation) {
      case 'add':
        num = n1 * d2 + n2 * d1;
        den = d1 * d2;
        break;
      case 'subtract':
        num = n1 * d2 - n2 * d1;
        den = d1 * d2;
        break;
      case 'multiply':
        num = n1 * n2;
        den = d1 * d2;
        break;
      case 'divide':
        if (n2 === 0) {
          setResult('Cannot divide by zero.');
          return;
        }
        num = n1 * d2;
        den = d1 * n2;
        break;
      default:
        setResult('Invalid operation.');
        return;
    }

    const [simpNum, simpDen] = simplify(num, den);
    const mixed = toMixed(simpNum, simpDen);
    setResult({
      improper: `${simpNum}/${simpDen}`,
      mixed: `${mixed.whole} ${mixed.numerator}/${mixed.denominator}`
    });
  };

  return (
    <CalculatorLayout title="🔣 Mixed Fraction Calculator">
      <Helmet>
        <title>Mixed Fraction Calculator – MapleAssist</title>
        <meta name="description" content="Add, subtract, multiply, and divide mixed fractions with automatic conversion and simplification." />
        <meta name="keywords" content="mixed fraction calculator, mixed number operations, improper fraction converter, mapleassist math tool" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Enter two mixed fractions and choose an operation to calculate the result. This tool converts mixed numbers to improper fractions, performs the operation, and simplifies the result.
      </p>

      {/* 🔢 Inputs */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        maxWidth: '600px',
        margin: '0 auto',
        marginBottom: '20px'
      }}>
        <div>
          <h4>Fraction 1</h4>
          <input type="number" placeholder="Whole" value={whole1} onChange={(e) => setWhole1(e.target.value)} />
          <input type="number" placeholder="Numerator" value={num1} onChange={(e) => setNum1(e.target.value)} />
          <input type="number" placeholder="Denominator" value={den1} onChange={(e) => setDen1(e.target.value)} />
        </div>
        <div>
          <h4>Fraction 2</h4>
          <input type="number" placeholder="Whole" value={whole2} onChange={(e) => setWhole2(e.target.value)} />
          <input type="number" placeholder="Numerator" value={num2} onChange={(e) => setNum2(e.target.value)} />
          <input type="number" placeholder="Denominator" value={den2} onChange={(e) => setDen2(e.target.value)} />
        </div>
      </div>

      {/* 🔘 Operation */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        >
          <option value="add">Add</option>
          <option value="subtract">Subtract</option>
          <option value="multiply">Multiply</option>
          <option value="divide">Divide</option>
        </select>
      </div>

      {/* 🔘 Calculate */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button
          onClick={calculate}
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
      {typeof result === 'string' ? (
        <div style={{
          color: '#f44336',
          backgroundColor: '#fff6f6',
          padding: '12px',
          borderRadius: '6px',
          maxWidth: '600px',
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
          maxWidth: '600px',
          margin: '0 auto',
          fontSize: '1.1rem',
          color: '#333',
          textAlign: 'center'
        }}>
          <p><strong>Improper Fraction:</strong> {result.improper}</p>
          <p><strong>Mixed Number:</strong> {result.mixed}</p>
        </div>
      )}
    </CalculatorLayout>
  );
}