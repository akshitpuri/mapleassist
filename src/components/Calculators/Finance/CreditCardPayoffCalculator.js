import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function CreditCardPayoffCalculator() {
  const [balance, setBalance] = useState('');
  const [rate, setRate] = useState('');
  const [payment, setPayment] = useState('');
  const [result, setResult] = useState(null);

  const calculatePayoff = () => {
    const B = parseFloat(balance);
    const r = parseFloat(rate) / 100 / 12;
    const p = parseFloat(payment);

    if (isNaN(B) || isNaN(r) || isNaN(p) || B <= 0 || r <= 0 || p <= 0) {
      setResult('Please enter valid positive values.');
      return;
    }

    let month = 0;
    let totalInterest = 0;
    let currentBalance = B;

    while (currentBalance > 0 && month < 600) {
      const interest = currentBalance * r;
      const principal = p - interest;
      if (principal <= 0) {
        setResult('Payment is too low to reduce balance. Increase payment amount.');
        return;
      }
      currentBalance -= principal;
      totalInterest += interest;
      month++;
    }

    const totalPaid = B + totalInterest;

    setResult({
      months: month,
      interest: totalInterest.toFixed(2),
      totalPaid: totalPaid.toFixed(2)
    });
  };

  return (
    <CalculatorLayout title="💳 Credit Card Payoff Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem', lineHeight: '1.6',
        marginBottom: '24px', color: '#444'
      }}>
        Estimate how long it’ll take to pay off your credit card and how much interest you’ll pay. Enter your current balance, interest rate, and fixed monthly payment.
      </p>

      {/* 🔢 Inputs */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        gap: '12px', maxWidth: '400px',
        margin: '0 auto', marginBottom: '20px'
      }}>
        <input
          type="number"
          placeholder="Credit Card Balance ($)"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
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
          placeholder="Monthly Payment ($)"
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <button
          onClick={calculatePayoff}
          style={{
            padding: '10px',
            backgroundColor: '#3f51b5', color: '#fff',
            border: 'none', borderRadius: '6px',
            fontSize: '1rem', cursor: 'pointer'
          }}
        >
          Calculate Payoff
        </button>
      </div>

      {/* 📊 Result */}
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
            <p><strong>Months to Pay Off:</strong> {result.months}</p>
            <p><strong>Total Interest:</strong> ${result.interest}</p>
            <p><strong>Total Paid:</strong> ${result.totalPaid}</p>
          </div>
        )
      )}
    </CalculatorLayout>
  );
}