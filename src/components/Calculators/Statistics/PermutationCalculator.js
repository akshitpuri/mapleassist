import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function PermutationCalculator() {
  const [n, setN] = useState('');
  const [r, setR] = useState('');
  const [result, setResult] = useState(null);

  const factorial = (num) => {
    if (num < 0) return NaN;
    if (num === 0 || num === 1) return 1;
    let res = 1;
    for (let i = 2; i <= num; i++) {
      res *= i;
    }
    return res;
  };

  const calculatePermutation = () => {
    const N = parseInt(n);
    const R = parseInt(r);

    if (isNaN(N) || isNaN(R) || N < 0 || R < 0 || R > N) {
      setResult('Please enter valid non-negative integers with r ≤ n.');
      return;
    }

    const perm = factorial(N) / factorial(N - R);
    setResult({ perm, N, R });
  };

  return (
    <CalculatorLayout title="🔢 Permutation Calculator">
      <Helmet>
        <title>Permutation Calculator – MapleAssist</title>
        <meta name="description" content="Calculate the number of ordered arrangements (permutations) from a set of items. Enter n and r to get P(n, r) instantly." />
        <meta name="keywords" content="permutation calculator, nPr, ordered arrangements, mapleassist statistics tool" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Enter the total number of items (<strong>n</strong>) and the number to arrange (<strong>r</strong>) to calculate the number of permutations.
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
          min="0"
          placeholder="Total items (n)"
          value={n}
          onChange={(e) => setN(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <input
          type="number"
          min="0"
          placeholder="Items to arrange (r)"
          value={r}
          onChange={(e) => setR(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={calculatePermutation}
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
          Calculate Permutation
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
          <p><strong>P({result.N}, {result.R}) =</strong> {result.perm.toLocaleString()}</p>
        </div>
      )}
    </CalculatorLayout>
  );
}