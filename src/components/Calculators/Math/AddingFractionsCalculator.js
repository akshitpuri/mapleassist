import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function AddingFractionsCalculator() {
  const [fractions, setFractions] = useState([{ numerator: '', denominator: '' }]);
  const [result, setResult] = useState(null);

  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
  const lcm = (a, b) => Math.abs(a * b) / gcd(a, b);

  const simplify = (num, den) => {
    const factor = gcd(num, den);
    return [num / factor, den / factor];
  };

  const addFractions = () => {
    const valid = fractions.every(f => {
      const n = parseInt(f.numerator);
      const d = parseInt(f.denominator);
      return !isNaN(n) && !isNaN(d) && d !== 0;
    });

    if (!valid || fractions.length < 2) {
      setResult('Please enter at least two valid fractions.');
      return;
    }

    const nums = fractions.map(f => parseInt(f.numerator));
    const dens = fractions.map(f => parseInt(f.denominator));
    const commonDen = dens.reduce((acc, val) => lcm(acc, val));

    const adjustedNums = nums.map((n, i) => n * (commonDen / dens[i]));
    const totalNum = adjustedNums.reduce((acc, val) => acc + val, 0);

    const [simpNum, simpDen] = simplify(totalNum, commonDen);
    const decimal = (simpNum / simpDen).toFixed(6);

    setResult({
      original: fractions.map(f => `${f.numerator}/${f.denominator}`),
      lcd: commonDen,
      sum: `${simpNum}/${simpDen}`,
      decimal
    });
  };

  const updateFraction = (index, field, value) => {
    const updated = [...fractions];
    updated[index][field] = value;
    setFractions(updated);
  };

  const addRow = () => {
    setFractions([...fractions, { numerator: '', denominator: '' }]);
  };

  return (
    <CalculatorLayout title="➕ Adding Fractions Calculator">
      <Helmet>
        <title>Adding Fractions Calculator – MapleAssist</title>
        <meta name="description" content="Add multiple fractions with different denominators. Automatically finds LCD, aligns fractions, and simplifies the result." />
        <meta name="keywords" content="adding fractions calculator, fraction adder, lcd finder, mapleassist math tool" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Enter two or more fractions to add them together. This tool finds the <strong>Least Common Denominator (LCD)</strong>, aligns fractions, adds numerators, and simplifies the result.
      </p>

      {/* 🔢 Fraction Inputs */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '500px',
        margin: '0 auto',
        marginBottom: '20px'
      }}>
        {fractions.map((f, i) => (
          <div key={i} style={{ display: 'flex', gap: '12px' }}>
            <input
              type="number"
              placeholder="Numerator"
              value={f.numerator}
              onChange={(e) => updateFraction(i, 'numerator', e.target.value)}
              style={{
                padding: '10px',
                fontSize: '1rem',
                borderRadius: '8px',
                border: '1px solid #ccc',
                width: '50%'
              }}
            />
            <input
              type="number"
              placeholder="Denominator"
              value={f.denominator}
              onChange={(e) => updateFraction(i, 'denominator', e.target.value)}
              style={{
                padding: '10px',
                fontSize: '1rem',
                borderRadius: '8px',
                border: '1px solid #ccc',
                width: '50%'
              }}
            />
          </div>
        ))}
        <button
          onClick={addRow}
          style={{
            padding: '8px',
            backgroundColor: '#eee',
            border: '1px solid #ccc',
            borderRadius: '6px',
            fontSize: '0.9rem',
            cursor: 'pointer'
          }}
        >
          ➕ Add Another Fraction
        </button>
        <button
          onClick={addFractions}
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
          Add Fractions
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
          color: '#333'
        }}>
          <p><strong>Input Fractions:</strong> {result.original.join(' + ')}</p>
          <p><strong>LCD:</strong> {result.lcd}</p>
          <p><strong>Sum:</strong> {result.sum}</p>
          <p><strong>Decimal:</strong> {result.decimal}</p>
        </div>
      )}
    </CalculatorLayout>
  );
}