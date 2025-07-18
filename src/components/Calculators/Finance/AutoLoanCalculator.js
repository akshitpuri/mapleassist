import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function AutoLoanCalculator() {
  const [price, setPrice] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [monthly, setMonthly] = useState(null);

  const calculateLoan = () => {
    const vehiclePrice = parseFloat(price);
    const down = parseFloat(downPayment);
    const interestRate = parseFloat(rate);
    const termYears = parseInt(years);

    if (
      isNaN(vehiclePrice) || isNaN(down) || isNaN(interestRate) || isNaN(termYears) ||
      vehiclePrice <= 0 || down < 0 || interestRate <= 0 || termYears <= 0 || down >= vehiclePrice
    ) {
      setMonthly('Please enter valid loan details. Down payment must be less than vehicle price.');
      return;
    }

    const principal = vehiclePrice - down;
    const monthlyRate = interestRate / 12 / 100;
    const totalMonths = termYears * 12;

    const payment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalMonths));
    setMonthly(`Estimated Monthly Payment: $${payment.toFixed(2)}`);
  };

  return (
    <CalculatorLayout title="🚗 Auto Loan Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Estimate your car loan monthly payment. Input vehicle cost, down payment, loan rate, and repayment term to get a quick breakdown of financing needs.
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
          placeholder="Vehicle Price ($)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="number"
          placeholder="Down Payment ($)"
          value={downPayment}
          onChange={(e) => setDownPayment(e.target.value)}
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
          value={years}
          onChange={(e) => setYears(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <button
          onClick={calculateLoan}
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
          Calculate Payment
        </button>
      </div>

      {/* 📊 Output */}
      {monthly && (
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
          <strong>{monthly}</strong>
        </div>
      )}
    </CalculatorLayout>
  );
}