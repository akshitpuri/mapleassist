import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function MixedNumberCalculator() {
  const [whole1, setWhole1] = useState('');
  const [num1, setNum1] = useState('');
  const [den1, setDen1] = useState('');
  const [whole2, setWhole2] = useState('');
  const [num2, setNum2] = useState('');
  const [den2, setDen2] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState(null);

  const toImproper = (whole, num, den) => {
    const w = parseInt(whole) || 0;
    const n = parseInt(num) || 0;
    const d = parseInt(den);
    if (isNaN(d) || d === 0) return null;
    return { numerator: w * d + n, denominator: d };
  };

  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);

  const simplify = (num, den) => {
    const factor = gcd(num, den);
    return { numerator: num / factor, denominator: den / factor };
  };

  const toMixed = (num, den) => {
    const whole = Math.floor(num / den);
    const remainder = num % den;
    return { whole, numerator: remainder, denominator: den };
  };

  const calculate = () => {
    const f1 = toImproper(whole1, num1, den1);
    const f2 = toImproper(whole2, num2, den2);
    if (!f1 || !f2) {
      setResult('Please enter valid mixed numbers with non-zero denominators.');
      return;
    }

    let num, den;
    switch (operation) {
      case 'add':
        num = f1.numerator * f2.denominator + f2.numerator * f1.denominator;
        den = f1.denominator * f2.denominator;
        break;
      case 'subtract':
        num = f1.numerator * f2.denominator - f2.numerator * f1.denominator;
        den = f1.denominator * f2.denominator;
        break;
      case 'multiply':
        num = f1.numerator * f2.numerator;
        den = f1.denominator * f2.denominator;
        break;
      case 'divide':
        num = f1.numerator * f2.denominator;
        den = f1.denominator * f2.numerator;
        break;
      default:
        return;
    }

    const simplified = simplify(num, den);
    const mixed = toMixed(simplified.numerator, simplified.denominator);
    setResult({ ...mixed, improper: `${simplified.numerator}/${simplified.denominator}` });
  };

  return (
    <CalculatorLayout title="🍰 Mixed Number Calculator">
      <Helmet>
        <title>Mixed Number Calculator – MapleAssist</title>
        <meta name="description" content="Add, subtract, multiply, and divide mixed numbers. Converts to improper fractions and simplifies results automatically." />
        <meta name="keywords" content="mixed number calculator, fraction operations, improper fraction converter, mapleassist math tool" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Enter two mixed numbers and choose an operation to calculate the result. This tool converts mixed numbers to improper fractions, performs the operation, and simplifies the result.
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
          <h4>First Mixed Number</h4>
          <input type="number" placeholder="Whole" value={whole1} onChange={(e) => setWhole1(e.target.value)} />
          <input type="number" placeholder="Numerator" value={num1} onChange={(e) => setNum1(e.target.value)} />
          <input type="number" placeholder="Denominator" value={den1} onChange={(e) => setDen1(e.target.value)} />
        </div>
        <div>
          <h4>Second Mixed Number</h4>
          <input type="number" placeholder="Whole" value={whole2} onChange={(e) => setWhole2(e.target.value)} />
          <input type="number" placeholder="Numerator" value={num2} onChange={(e) => setNum2(e.target.value)} />
          <input type="number" placeholder="Denominator" value={den2} onChange={(e) => setDen2(e.target.value)} />
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <select value={operation} onChange={(e) => setOperation(e.target.value)} style={{
          padding: '10px',
          fontSize: '1rem',
          borderRadius: '8px',
          border: '1px solid #ccc'
        }}>
          <option value="add">Add</option>
          <option value="subtract">Subtract</option>
          <option value="multiply">Multiply</option>
          <option value="divide">Divide</option>
        </select>
        <button
          onClick={calculate}
          style={{
            marginLeft: '12px',
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
          <p><strong>Mixed Number:</strong> {result.whole} {result.numerator}/{result.denominator}</p>
        </div>
      )}
    </CalculatorLayout>
  );
}