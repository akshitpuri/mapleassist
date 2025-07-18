import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function CarLoanCalculator() {
  const [price, setPrice] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [rate, setRate] = useState('');
  const [termYears, setTermYears] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const calculateCarLoan = () => {
    const vehiclePrice = parseFloat(price);
    const down = parseFloat(downPayment);
    const annualRate = parseFloat(rate) / 100;
    const years = parseInt(termYears);

    if (
      isNaN(vehiclePrice) || isNaN(down) || isNaN(annualRate) || isNaN(years) ||
      vehiclePrice <= 0 || down < 0 || annualRate <= 0 || years <= 0 || down >= vehiclePrice
    ) {
      setMonthlyPayment('Please enter valid values. Down payment must be less than vehicle price.');
      return;
    }

    const principal = vehiclePrice - down;
    const monthlyRate = annualRate / 12;
    const totalMonths = years * 12;

    const payment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalMonths));
    setMonthlyPayment(`Estimated Monthly Payment: $${payment.toFixed(2)}`);
  };

  return (
    <CalculatorLayout title="🚘 Car Loan Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem', lineHeight: '1.6',
        marginBottom: '24px', color: '#444'
      }}>
        Estimate your car loan monthly payment. Enter vehicle price, down payment, interest rate, and loan term to see your expected financing cost.
      </p>

      {/* 🔢 Inputs */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        gap: '12px', maxWidth: '400px',
        margin: '0 auto', marginBottom: '20px'
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
          value={termYears}
          onChange={(e) => setTermYears(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <button
          onClick={calculateCarLoan}
          style={{
            padding: '10px', backgroundColor: '#3f51b5',
            color: '#fff', border: 'none',
            borderRadius: '6px', fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          Calculate Payment
        </button>
      </div>

      {/* 📊 Results */}
      {monthlyPayment && (
        <div style={{
          backgroundColor: '#fff', padding: '20px',
          borderRadius: '10px', boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
          maxWidth: '500px', margin: '0 auto',
          textAlign: 'center', fontSize: '1.1rem', color: '#333'
        }}>
          <strong>{monthlyPayment}</strong>
        </div>
      )}
    </CalculatorLayout>
  );
}