import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function CDCalculator() {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [termYears, setTermYears] = useState('');
  const [result, setResult] = useState(null);

  const calculateCD = () => {
    const deposit = parseFloat(amount);
    const annualRate = parseFloat(rate) / 100;
    const years = parseFloat(termYears);

    if (isNaN(deposit) || isNaN(annualRate) || isNaN(years) || deposit <= 0 || annualRate <= 0 || years <= 0) {
      setResult('Please enter valid positive values.');
      return;
    }

    const futureValue = deposit * Math.pow(1 + annualRate, years);
    setResult(`CD Future Value: $${futureValue.toFixed(2)}`);
  };

  return (
    <CalculatorLayout title="🏦 CD Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem', lineHeight: '1.6',
        marginBottom: '24px', color: '#444'
      }}>
        Estimate the future value of a Certificate of Deposit using deposit amount, annual interest rate, and term length in years. Ideal for fixed-rate savings calculations.
      </p>

      {/* 🔢 Inputs */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        gap: '12px', maxWidth: '400px',
        margin: '0 auto', marginBottom: '20px'
      }}>
        <input
          type="number"
          placeholder="Deposit Amount ($)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="number"
          placeholder="Annual Interest Rate (%)"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="number"
          placeholder="Term (Years)"
          value={termYears}
          onChange={(e) => setTermYears(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <button
          onClick={calculateCD}
          style={{
            padding: '10px', backgroundColor: '#3f51b5',
            color: '#fff', border: 'none',
            borderRadius: '6px', fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          Calculate CD Value
        </button>
      </div>

      {/* 📊 Result */}
      {result && (
        <div style={{
          backgroundColor: '#fff', padding: '20px',
          borderRadius: '10px', boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
          maxWidth: '500px', margin: '0 auto',
          fontSize: '1.1rem', color: '#333',
          textAlign: 'center'
        }}>
          <strong>{result}</strong>
        </div>
      )}
    </CalculatorLayout>
  );
}