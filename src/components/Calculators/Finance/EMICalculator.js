import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function EMICalculator() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [term, setTerm] = useState('');
  const [result, setResult] = useState(null);

  const calculateEMI = () => {
    const P = parseFloat(principal);
    const annualRate = parseFloat(rate);
    const monthlyRate = annualRate / 12 / 100;
    const N = parseInt(term) * 12;

    if (isNaN(P) || isNaN(monthlyRate) || isNaN(N) || P <= 0 || monthlyRate <= 0 || N <= 0) {
      setResult('Please enter valid positive values.');
      return;
    }

    const EMI = (P * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -N));
    const totalPayment = EMI * N;
    const totalInterest = totalPayment - P;

    setResult({
      emi: EMI.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalPayment: totalPayment.toFixed(2)
    });
  };

  return (
    <CalculatorLayout title="🔄 EMI Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem', lineHeight: '1.6',
        marginBottom: '24px', color: '#444'
      }}>
        Calculate your Equated Monthly Installment (EMI) and see total interest and final cost based on loan amount, interest rate, and repayment term. Works for personal, vehicle, and home loans.
      </p>

      {/* 🔢 Input Fields */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: '12px',
        maxWidth: '400px', margin: '0 auto', marginBottom: '20px'
      }}>
        <input
          type="number" placeholder="Loan Amount ($)"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem', borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <input
          type="number" placeholder="Interest Rate (%)"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem', borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <input
          type="number" placeholder="Term (Years)"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem', borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={calculateEMI}
          style={{
            padding: '10px', backgroundColor: '#3f51b5', color: '#fff',
            border: 'none', borderRadius: '6px', fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          Calculate EMI
        </button>
      </div>

      {/* 📊 Output Results */}
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
            backgroundColor: '#fff', padding: '20px', borderRadius: '10px',
            boxShadow: '0 1px 6px rgba(0,0,0,0.08)', maxWidth: '500px',
            margin: '0 auto', fontSize: '1.1rem',
            color: '#333', textAlign: 'center'
          }}>
            <p><strong>Monthly EMI:</strong> ${result.emi}</p>
            <p><strong>Total Interest:</strong> ${result.totalInterest}</p>
            <p><strong>Total Payment:</strong> ${result.totalPayment}</p>
          </div>
        )
      )}
    </CalculatorLayout>
  );
}