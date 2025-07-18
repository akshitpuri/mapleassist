import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function AmortizationCalculator() {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [schedule, setSchedule] = useState([]);

  const calculateAmortization = () => {
    const principal = parseFloat(amount);
    const annualRate = parseFloat(rate);
    const term = parseInt(years);

    if (
      isNaN(principal) || isNaN(annualRate) || isNaN(term) ||
      principal <= 0 || annualRate <= 0 || term <= 0
    ) {
      setSchedule([{ error: 'Please enter valid positive values.' }]);
      return;
    }

    const monthlyRate = annualRate / 12 / 100;
    const months = term * 12;
    const monthlyPayment =
      (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
    let balance = principal;
    const table = [];

    for (let i = 1; i <= months; i++) {
      const interest = balance * monthlyRate;
      const principalPaid = monthlyPayment - interest;
      balance -= principalPaid;

      table.push({
        month: i,
        payment: monthlyPayment,
        principalPaid,
        interestPaid: interest,
        remainingBalance: balance
      });
    }

    setSchedule(table);
  };

  return (
    <CalculatorLayout title="💰 Amortization Calculator">
      <BackButton />

      {/* 📘 Overview */}
      <p style={{
        fontSize: '1rem', lineHeight: '1.6',
        marginBottom: '24px', color: '#444'
      }}>
        Calculate monthly payments and view a full amortization schedule for loans using interest rate, principal, and term. See how each payment breaks down over time.
      </p>

      {/* 🔢 Inputs */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: '12px',
        maxWidth: '400px', margin: '0 auto', marginBottom: '20px'
      }}>
        <input
          type="number" placeholder="Loan Amount" value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="number" placeholder="Interest Rate (%)" value={rate}
          onChange={(e) => setRate(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="number" placeholder="Term (Years)" value={years}
          onChange={(e) => setYears(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <button
          onClick={calculateAmortization}
          style={{
            padding: '10px', backgroundColor: '#3f51b5', color: '#fff',
            border: 'none', borderRadius: '6px', fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          Calculate Schedule
        </button>
      </div>

      {/* 📊 Table Output */}
      {schedule.length > 0 && (
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          {schedule[0]?.error ? (
            <div style={{ textAlign: 'center', fontSize: '1.1rem', color: '#e53935' }}>
              <strong>{schedule[0].error}</strong>
            </div>
          ) : (
            <table style={{
              width: '100%', borderCollapse: 'collapse',
              backgroundColor: '#fff', marginTop: '20px',
              fontSize: '0.95rem', boxShadow: '0 1px 6px rgba(0,0,0,0.08)'
            }}>
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Payment</th>
                  <th>Principal</th>
                  <th>Interest</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.month}</td>
                    <td>${row.payment.toFixed(2)}</td>
                    <td>${row.principalPaid.toFixed(2)}</td>
                    <td>${row.interestPaid.toFixed(2)}</td>
                    <td>${Math.max(row.remainingBalance, 0).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </CalculatorLayout>
  );
}