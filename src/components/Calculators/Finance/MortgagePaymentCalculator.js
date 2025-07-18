import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function MortgagePaymentCalculator() {
  const [loan, setLoan] = useState('');
  const [rate, setRate] = useState('');
  const [term, setTerm] = useState('');
  const [extra, setExtra] = useState('');
  const [schedule, setSchedule] = useState([]);

  const calculateSchedule = () => {
    const principal = parseFloat(loan);
    const annualRate = parseFloat(rate);
    const years = parseInt(term);
    const extraPayment = parseFloat(extra) || 0;

    if (
      isNaN(principal) || isNaN(annualRate) || isNaN(years) || principal <= 0 ||
      annualRate <= 0 || years <= 0
    ) {
      setSchedule([{ error: 'Please enter valid positive values.' }]);
      return;
    }

    const monthlyRate = annualRate / 12 / 100;
    const totalMonths = years * 12;
    const monthlyPayment =
      (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalMonths));
    let balance = principal;
    const table = [];

    for (let month = 1; month <= totalMonths && balance > 0; month++) {
      const interest = balance * monthlyRate;
      let principalPaid = monthlyPayment - interest + extraPayment;
      if (principalPaid > balance) principalPaid = balance;
      balance -= principalPaid;

      table.push({
        month,
        payment: monthlyPayment + extraPayment,
        principalPaid,
        interestPaid: interest,
        remainingBalance: balance
      });
    }

    setSchedule(table);
  };

  return (
    <CalculatorLayout title="🏠 Mortgage Payment Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem', lineHeight: '1.6',
        marginBottom: '24px', color: '#444'
      }}>
        Plan mortgage payments with optional extra contributions. See how faster repayment affects interest cost and schedule.
      </p>

      {/* 🔢 Inputs */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        gap: '12px', maxWidth: '400px',
        margin: '0 auto', marginBottom: '20px'
      }}>
        <input
          type="number" placeholder="Loan Amount ($)"
          value={loan}
          onChange={(e) => setLoan(e.target.value)}
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
          type="number" placeholder="Term (Years)"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="number" placeholder="Extra Monthly Payment ($)"
          value={extra}
          onChange={(e) => setExtra(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <button
          onClick={calculateSchedule}
          style={{
            padding: '10px', backgroundColor: '#3f51b5',
            color: '#fff', border: 'none',
            borderRadius: '6px', fontSize: '1rem', cursor: 'pointer'
          }}
        >
          Calculate Payment Plan
        </button>
      </div>

      {/* 📊 Output */}
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
                  <th>Total Payment</th>
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