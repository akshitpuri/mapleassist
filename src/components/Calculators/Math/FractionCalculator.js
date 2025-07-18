import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function FractionCalculator() {
  const [num1, setNum1] = useState('');
  const [den1, setDen1] = useState('');
  const [num2, setNum2] = useState('');
  const [den2, setDen2] = useState('');
  const [operation, setOperation] = useState('+');
  const [result, setResult] = useState(null);

  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  const simplify = (numerator, denominator) => {
    const factor = gcd(numerator, denominator);
    return [numerator / factor, denominator / factor];
  };

  const calculate = () => {
    const n1 = parseInt(num1);
    const d1 = parseInt(den1);
    const n2 = parseInt(num2);
    const d2 = parseInt(den2);

    if ([n1, d1, n2, d2].some(v => isNaN(v) || v === 0)) {
      setResult('Please enter valid non-zero values for all fields.');
      return;
    }

    let numerator, denominator;
    switch (operation) {
      case '+':
        numerator = n1 * d2 + n2 * d1;
        denominator = d1 * d2;
        break;
      case '-':
        numerator = n1 * d2 - n2 * d1;
        denominator = d1 * d2;
        break;
      case '*':
        numerator = n1 * n2;
        denominator = d1 * d2;
        break;
      case '/':
        if (n2 === 0) {
          setResult('Cannot divide by zero.');
          return;
        }
        numerator = n1 * d2;
        denominator = d1 * n2;
        break;
      default:
        setResult('Invalid operation.');
        return;
    }

    const [simpNum, simpDen] = simplify(numerator, denominator);
    setResult(`${simpNum} / ${simpDen}`);
  };

  return (
    <CalculatorLayout title="➗ Fraction Calculator">
      <Helmet>
        <title>Fraction Calculator – MapleAssist</title>
        <meta name="description" content="Add, subtract, multiply and divide fractions. Automatically simplifies results." />
        <meta name="keywords" content="fraction calculator, add fractions, subtract fractions, multiply divide fractions, mapleassist math tool" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Enter two fractions and choose an operation to compute the result. This tool simplifies your answer to lowest terms automatically.
      </p>

      {/* 🔢 Inputs */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        maxWidth: '500px',
        margin: '0 auto',
        marginBottom: '20px'
      }}>
        <div>
          <h4>Fraction 1</h4>
          <input type="number" placeholder="Numerator" value={num1} onChange={(e) => setNum1(e.target.value)} />
          <input type="number" placeholder="Denominator" value={den1} onChange={(e) => setDen1(e.target.value)} />
        </div>
        <div>
          <h4>Fraction 2</h4>
          <input type="number" placeholder="Numerator" value={num2} onChange={(e) => setNum2(e.target.value)} />
          <input type="number" placeholder="Denominator" value={den2} onChange={(e) => setDen2(e.target.value)} />
        </div>
      </div>

      {/* ➕ Operation Selection */}
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <select value={operation} onChange={(e) => setOperation(e.target.value)} style={{
          padding: '10px',
          fontSize: '1rem',
          borderRadius: '8px',
          border: '1px solid #ccc'
        }}>
          <option value="+">Addition (+)</option>
          <option value="-">Subtraction (-)</option>
          <option value="*">Multiplication (×)</option>
          <option value="/">Division (÷)</option>
        </select>
      </div>

      {/* 🧮 Submit */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button
          onClick={calculate}
          style={{
            padding: '10px 20px',
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
          backgroundColor: result.includes('Please') || result.includes('Cannot')
            ? '#fff6f6' : '#fff',
          color: result.includes('Please') || result.includes('Cannot')
            ? '#f44336' : '#333',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
          maxWidth: '500px',
          margin: '0 auto',
          fontSize: '1.1rem',
          textAlign: 'center'
        }}>
          <strong>Result:</strong> {result}
        </div>
      ) : null}
    </CalculatorLayout>
  );
}