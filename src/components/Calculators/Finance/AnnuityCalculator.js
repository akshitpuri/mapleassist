import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function AnnuityCalculator() {
  const [payment, setPayment] = useState('');
  const [rate, setRate] = useState('');
  const [periods, setPeriods] = useState('');
  const [result, setResult] = useState(null);

  const calculateAnnuity = () => {
    const PMT = parseFloat(payment);
    const r = parseFloat(rate) / 100;
    const n = parseInt(periods);

    if (isNaN(PMT) || isNaN(r) || isNaN(n) || PMT <= 0 || r <= 0 || n <= 0) {
      setResult('Please enter valid positive values.');
      return;
    }

    const FV = PMT * ((Math.pow(1 + r, n) - 1) / r);
    setResult(`Future Value of Annuity: $${FV.toFixed(2)}`);
  };

  return (
    <CalculatorLayout title="🎁 Annuity Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Calculate the future value of an annuity using regular payments, annual interest rate, and number of payment periods. Useful for retirement accounts or structured payouts.
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
          placeholder="Payment Per Period ($)"
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <input
          type="number"
          placeholder="Annual Interest Rate (%)"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <input
          type="number"
          placeholder="Number of Periods"
          value={periods}
          onChange={(e) => setPeriods(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={calculateAnnuity}
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
          Calculate Value
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