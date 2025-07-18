import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function PaymentCalculator() {
  const [mode, setMode] = useState('payment'); // 'payment' or 'term'
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [term, setTerm] = useState('');
  const [monthly, setMonthly] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const principal = parseFloat(amount);
    const annualRate = parseFloat(rate) / 100;
    const monthlyRate = annualRate / 12;

    if (mode === 'payment') {
      const n = parseInt(term) * 12;

      if (isNaN(principal) || isNaN(monthlyRate) || isNaN(n) || principal <= 0 || monthlyRate <= 0 || n <= 0) {
        setResult('Please enter valid positive values.');
        return;
      }

      const payment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
      setResult(`Monthly Payment: $${payment.toFixed(2)}`);
    } else {
      const mPay = parseFloat(monthly);

      if (isNaN(principal) || isNaN(monthlyRate) || isNaN(mPay) || principal <= 0 || monthlyRate <= 0 || mPay <= 0) {
        setResult('Please enter valid positive values.');
        return;
      }

      const termMonths = Math.log(mPay / (mPay - principal * monthlyRate)) / Math.log(1 + monthlyRate);
      const termYears = termMonths / 12;
      setResult(`Estimated Term: ${termYears.toFixed(1)} years`);
    }
  };

  return (
    <CalculatorLayout title="🗓️ Payment Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem', lineHeight: '1.6',
        marginBottom: '24px', color: '#444'
      }}>
        Choose a mode to calculate either your monthly payment or the term needed to pay off a loan based on the values you provide.
      </p>

      {/* Mode Selection */}
      <div style={{
        display: 'flex', justifyContent: 'center',
        gap: '10px', marginBottom: '20px'
      }}>
        <label>
          <input
            type="radio" name="mode" value="payment"
            checked={mode === 'payment'}
            onChange={() => setMode('payment')}
            style={{ marginRight: '6px' }}
          />
          Monthly Payment
        </label>
        <label>
          <input
            type="radio" name="mode" value="term"
            checked={mode === 'term'}
            onChange={() => setMode('term')}
            style={{ marginLeft: '20px', marginRight: '6px' }}
          />
          Loan Term
        </label>
      </div>

      {/* 🔢 Inputs */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        gap: '12px', maxWidth: '400px',
        margin: '0 auto', marginBottom: '20px'
      }}>
        <input
          type="number" placeholder="Loan Amount ($)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
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
        {mode === 'payment' ? (
          <input
            type="number" placeholder="Loan Term (Years)"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            style={{
              padding: '10px', fontSize: '1rem',
              borderRadius: '8px', border: '1px solid #ccc'
            }}
          />
        ) : (
          <input
            type="number" placeholder="Monthly Payment ($)"
            value={monthly}
            onChange={(e) => setMonthly(e.target.value)}
            style={{
              padding: '10px', fontSize: '1rem',
              borderRadius: '8px', border: '1px solid #ccc'
            }}
          />
        )}
        <button
          onClick={calculate}
          style={{
            padding: '10px', backgroundColor: '#3f51b5',
            color: '#fff', border: 'none',
            borderRadius: '6px', fontSize: '1rem', cursor: 'pointer'
          }}
        >
          Calculate
        </button>
      </div>

      {/* 📊 Output */}
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