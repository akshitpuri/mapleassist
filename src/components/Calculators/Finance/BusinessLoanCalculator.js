import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function BusinessLoanCalculator() {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [term, setTerm] = useState('');
  const [result, setResult] = useState(null);

  const calculateBusinessLoan = () => {
    const P = parseFloat(amount);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseInt(term) * 12;

    if (isNaN(P) || isNaN(r) || isNaN(n) || P <= 0 || r <= 0 || n <= 0) {
      setResult('Please enter valid positive values.');
      return;
    }

    const payment = (P * r) / (1 - Math.pow(1 + r, -n));
    const totalCost = payment * n;
    const totalInterest = totalCost - P;

    setResult({
      payment: payment.toFixed(2),
      totalCost: totalCost.toFixed(2),
      interest: totalInterest.toFixed(2)
    });
  };

  return (
    <CalculatorLayout title="🏢 Business Loan Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Estimate monthly payments, total interest, and loan cost for business financing. Use this to plan expenses, evaluate repayment feasibility, or compare offers.
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
          placeholder="Interest Rate (%)"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="number"
          placeholder="Loan Term (Years)"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <button
          onClick={calculateBusinessLoan}
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
          Calculate Loan
        </button>
      </div>

      {/* 📊 Results */}
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
          {typeof result === 'string' ? (
            <strong style={{ color: '#e53935' }}>{result}</strong>
          ) : (
            <>
              <p><strong>Monthly Payment:</strong> ${result.payment}</p>
              <p><strong>Total Interest:</strong> ${result.interest}</p>
              <p><strong>Total Loan Cost:</strong> ${result.totalCost}</p>
            </>
          )}
        </div>
      )}
    </CalculatorLayout>
  );
}