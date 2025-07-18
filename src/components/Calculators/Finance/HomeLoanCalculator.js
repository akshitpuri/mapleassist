import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function HomeLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState('');
  const [rate, setRate] = useState('');
  const [term, setTerm] = useState('');
  const [result, setResult] = useState(null);

  const calculateHomeLoan = () => {
    const P = parseFloat(loanAmount);
    const annualRate = parseFloat(rate) / 100;
    const monthlyRate = annualRate / 12;
    const months = parseInt(term) * 12;

    if (isNaN(P) || isNaN(annualRate) || isNaN(months) || P <= 0 || annualRate <= 0 || months <= 0) {
      setResult('Please enter valid positive values.');
      return;
    }

    const monthlyPayment = (P * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - P;

    setResult({
      monthly: monthlyPayment.toFixed(2),
      total: totalPayment.toFixed(2),
      interest: totalInterest.toFixed(2)
    });
  };

  return (
    <CalculatorLayout title="🏡 Home Loan Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem', lineHeight: '1.6',
        marginBottom: '24px', color: '#444'
      }}>
        Estimate your monthly home loan payments by entering loan amount, annual interest rate, and term length. This helps you plan housing budgets confidently.
      </p>

      {/* 🔢 Inputs */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        gap: '12px', maxWidth: '400px',
        margin: '0 auto', marginBottom: '20px'
      }}>
        <input
          type="number" placeholder="Loan Amount ($)"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="number" placeholder="Interest Rate (%)"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="number" placeholder="Loan Term (Years)"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <button
          onClick={calculateHomeLoan}
          style={{
            padding: '10px', backgroundColor: '#3f51b5', color: '#fff',
            border: 'none', borderRadius: '6px', fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          Calculate Home Loan
        </button>
      </div>

      {/* 📊 Output */}
      {result && (
        typeof result === 'string' ? (
          <div style={{
            textAlign: 'center', fontSize: '1.1rem',
            color: '#e53935', marginTop: '20px'
          }}>
            <strong>{result}</strong>
          </div>
        ) : (
          <div style={{
            backgroundColor: '#fff', padding: '20px',
            borderRadius: '10px', boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
            maxWidth: '500px', margin: '0 auto',
            textAlign: 'center', fontSize: '1.1rem', color: '#333'
          }}>
            <p><strong>Monthly Payment:</strong> ${result.monthly}</p>
            <p><strong>Total Interest:</strong> ${result.interest}</p>
            <p><strong>Total Payment:</strong> ${result.total}</p>
          </div>
        )
      )}
    </CalculatorLayout>
  );
}