import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function APRCalculator() {
  const [interest, setInterest] = useState('');
  const [fees, setFees] = useState('');
  const [principal, setPrincipal] = useState('');
  const [termMonths, setTermMonths] = useState('');
  const [result, setResult] = useState(null);

  const calculateAPR = () => {
    const I = parseFloat(interest);
    const F = parseFloat(fees);
    const P = parseFloat(principal);
    const N = parseFloat(termMonths);

    if (
      isNaN(I) || isNaN(F) || isNaN(P) || isNaN(N) ||
      I < 0 || F < 0 || P <= 0 || N <= 0
    ) {
      setResult('Please enter valid positive values.');
      return;
    }

    const APR = ((I + F) / P) / (N / 12) * 100;
    setResult(`Estimated APR: ${APR.toFixed(2)}%`);
  };

  return (
    <CalculatorLayout title="📉 APR Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Calculate the <strong>Annual Percentage Rate (APR)</strong> using loan interest, fees, principal, and term. Helps reveal the real cost of a loan beyond the nominal interest rate.
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
          placeholder="Interest Paid ($)"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="number"
          placeholder="Fees ($)"
          value={fees}
          onChange={(e) => setFees(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="number"
          placeholder="Loan Principal ($)"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="number"
          placeholder="Loan Term (Months)"
          value={termMonths}
          onChange={(e) => setTermMonths(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <button
          onClick={calculateAPR}
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
          Calculate APR
        </button>
      </div>

      {/* 📊 Result */}
      {result && (
        <div style={{
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
          maxWidth: '500px',
          margin: '0 auto',
          textAlign: 'center',
          fontSize: '1.1rem',
          color: '#333'
        }}>
          <strong>{result}</strong>
        </div>
      )}
    </CalculatorLayout>
  );
}