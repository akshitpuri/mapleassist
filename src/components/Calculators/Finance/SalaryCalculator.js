import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function SalaryCalculator() {
  const [hourlyRate, setHourlyRate] = useState('');
  const [hoursPerWeek, setHoursPerWeek] = useState('');
  const [taxRate, setTaxRate] = useState('');
  const [result, setResult] = useState(null);

  const calculateSalary = () => {
    const rate = parseFloat(hourlyRate);
    const hours = parseFloat(hoursPerWeek);
    const tax = parseFloat(taxRate);

    if (
      isNaN(rate) || isNaN(hours) || rate <= 0 || hours <= 0 ||
      (taxRate !== '' && (isNaN(tax) || tax < 0 || tax >= 100))
    ) {
      setResult('Please enter valid positive values. Tax rate must be between 0–99.');
      return;
    }

    const grossWeekly = rate * hours;
    const grossMonthly = grossWeekly * 4;
    const grossAnnual = grossWeekly * 52;

    const netMultiplier = 1 - (taxRate ? tax / 100 : 0);
    const netWeekly = grossWeekly * netMultiplier;
    const netMonthly = grossMonthly * netMultiplier;
    const netAnnual = grossAnnual * netMultiplier;

    setResult({
      grossWeekly: grossWeekly.toFixed(2),
      grossMonthly: grossMonthly.toFixed(2),
      grossAnnual: grossAnnual.toFixed(2),
      netWeekly: netWeekly.toFixed(2),
      netMonthly: netMonthly.toFixed(2),
      netAnnual: netAnnual.toFixed(2)
    });
  };

  return (
    <CalculatorLayout title="💼 Salary Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Calculate estimated salary based on hourly wage and hours worked per week. Optionally include your tax rate to see net income across weekly, monthly, and yearly timeframes.
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
          placeholder="Hourly Rate ($)"
          value={hourlyRate}
          onChange={(e) => setHourlyRate(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <input
          type="number"
          placeholder="Hours per Week"
          value={hoursPerWeek}
          onChange={(e) => setHoursPerWeek(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <input
          type="number"
          placeholder="Tax Rate (%) — Optional"
          value={taxRate}
          onChange={(e) => setTaxRate(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={calculateSalary}
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
          Calculate Salary
        </button>
      </div>

      {/* 📊 Results */}
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
            maxWidth: '600px',
            margin: '0 auto',
            fontSize: '1.05rem',
            color: '#333'
          }}>
            <p><strong>Gross Weekly:</strong> ${result.grossWeekly}</p>
            <p><strong>Gross Monthly:</strong> ${result.grossMonthly}</p>
            <p><strong>Gross Annual:</strong> ${result.grossAnnual}</p>
            <hr />
            <p><strong>Net Weekly:</strong> ${result.netWeekly}</p>
            <p><strong>Net Monthly:</strong> ${result.netMonthly}</p>
            <p><strong>Net Annual:</strong> ${result.netAnnual}</p>
          </div>
        )
      )}
    </CalculatorLayout>
  );
}