import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function InterestRateCalculator() {
  const [amount, setAmount] = useState('');
  const [payment, setPayment] = useState('');
  const [years, setYears] = useState('');
  const [result, setResult] = useState(null);

  const calculateInterestRate = () => {
    const P = parseFloat(amount);
    const PMT = parseFloat(payment);
    const N = parseInt(years) * 12;

    if (isNaN(P) || isNaN(PMT) || isNaN(N) || P <= 0 || PMT <= 0 || N <= 0) {
      setResult('Please enter valid positive values.');
      return;
    }

    let rate = 0.001;
    let guess, diff;

    for (let i = 0; i < 1000; i++) {
      guess = P * rate / (1 - Math.pow(1 + rate, -N));
      diff = PMT - guess;

      if (Math.abs(diff) < 0.001) break;

      const derivative = (P * Math.pow(1 + rate, -N) * N) / Math.pow(1 + rate, N + 1);
      rate += diff / derivative;
    }

    const annualRate = rate * 12 * 100;
    setResult(`Estimated Interest Rate: ${annualRate.toFixed(2)}%`);
  };

  return (
    <CalculatorLayout title="📊 Interest Rate Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem', lineHeight: '1.6',
        marginBottom: '24px', color: '#444'
      }}>
        Estimate your loan's annual interest rate based on loan amount, monthly payment, and term. Helpful for reverse-calculating loan offers or comparing financing deals.
      </p>

      {/* 🔢 Inputs */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        gap: '12px', maxWidth: '400px',
        margin: '0 auto', marginBottom: '20px'
      }}>
        <input
          type="number"
          placeholder="Loan Amount ($)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="number"
          placeholder="Monthly Payment ($)"
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="number"
          placeholder="Loan Term (Years)"
          value={years}
          onChange={(e) => setYears(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <button
          onClick={calculateInterestRate}
          style={{
            padding: '10px', backgroundColor: '#3f51b5',
            color: '#fff', border: 'none',
            borderRadius: '6px', fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          Calculate Rate
        </button>
      </div>

      {/* 📊 Result */}
      {result && (
        <div style={{
          backgroundColor: '#fff', padding: '20px',
          borderRadius: '10px', boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
          maxWidth: '500px', margin: '0 auto',
          textAlign: 'center', fontSize: '1.1rem', color: '#333'
        }}>
          <strong>{result}</strong>
        </div>
      )}
    </CalculatorLayout>
  );
}