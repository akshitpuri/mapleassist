import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function RefinanceCalculator() {
  const [currentRate, setCurrentRate] = useState('');
  const [currentTerm, setCurrentTerm] = useState('');
  const [newRate, setNewRate] = useState('');
  const [newTerm, setNewTerm] = useState('');
  const [principal, setPrincipal] = useState('');
  const [result, setResult] = useState(null);

  const calculateRefinance = () => {
    const P = parseFloat(principal);
    const oldRate = parseFloat(currentRate) / 100 / 12;
    const oldTermMonths = parseInt(currentTerm) * 12;
    const newRateValue = parseFloat(newRate) / 100 / 12;
    const newTermMonths = parseInt(newTerm) * 12;

    if (
      isNaN(P) || isNaN(oldRate) || isNaN(oldTermMonths) ||
      isNaN(newRateValue) || isNaN(newTermMonths) ||
      P <= 0 || oldRate <= 0 || newRateValue <= 0 ||
      oldTermMonths <= 0 || newTermMonths <= 0
    ) {
      setResult('Please enter valid positive values.');
      return;
    }

    const oldPayment = (P * oldRate) / (1 - Math.pow(1 + oldRate, -oldTermMonths));
    const newPayment = (P * newRateValue) / (1 - Math.pow(1 + newRateValue, -newTermMonths));

    const totalOld = oldPayment * oldTermMonths;
    const totalNew = newPayment * newTermMonths;
    const savings = totalOld - totalNew;

    setResult({
      oldMonthly: oldPayment.toFixed(2),
      newMonthly: newPayment.toFixed(2),
      totalSavings: savings.toFixed(2)
    });
  };

  return (
    <CalculatorLayout title="🔁 Refinance Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Compare your current loan versus a refinance option. Enter original and new terms to see potential monthly savings and overall cost reduction.
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
          placeholder="Loan Amount ($)"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <input
          type="number"
          placeholder="Current Interest Rate (%)"
          value={currentRate}
          onChange={(e) => setCurrentRate(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <input
          type="number"
          placeholder="Current Term (Years)"
          value={currentTerm}
          onChange={(e) => setCurrentTerm(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <input
          type="number"
          placeholder="New Interest Rate (%)"
          value={newRate}
          onChange={(e) => setNewRate(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <input
          type="number"
          placeholder="New Term (Years)"
          value={newTerm}
          onChange={(e) => setNewTerm(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={calculateRefinance}
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
          Compare Loans
        </button>
      </div>

      {/* 📊 Output */}
      {result && (
        typeof result === 'string' ? (
          <div style={{
            textAlign: 'center',
            fontSize: '1.1rem',
            color: '#e53935',
            marginTop: '20px'
          }}>
            <strong>{result}</strong>
          </div>
        ) : (
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
            <p><strong>Current Monthly:</strong> ${result.oldMonthly}</p>
            <p><strong>New Monthly:</strong> ${result.newMonthly}</p>
            <p><strong>Total Savings:</strong> ${result.totalSavings}</p>
          </div>
        )
      )}
    </CalculatorLayout>
  );
}