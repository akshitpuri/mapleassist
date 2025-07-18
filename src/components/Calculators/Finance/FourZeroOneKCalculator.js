import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function FourZeroOneKCalculator() {
  const [contribution, setContribution] = useState('');
  const [match, setMatch] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [result, setResult] = useState(null);

  const calculate401k = () => {
    const c = parseFloat(contribution);
    const m = parseFloat(match);
    const r = parseFloat(rate) / 100;
    const y = parseInt(years);

    if (
      isNaN(c) || isNaN(m) || isNaN(r) || isNaN(y) ||
      c < 0 || m < 0 || r <= 0 || y <= 0
    ) {
      setResult('Please enter valid positive values.');
      return;
    }

    const annualTotal = c + m;
    let futureValue = 0;
    for (let i = 0; i < y; i++) {
      futureValue = (futureValue + annualTotal) * (1 + r);
    }

    setResult(`Estimated 401(k) Value After ${y} Years: $${futureValue.toFixed(2)}`);
  };

  return (
    <CalculatorLayout title="💼 401K Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Estimate your 401(k) retirement plan growth using annual contributions, employer match, interest rate, and time horizon. Helps you track long-term savings.
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
          placeholder="Annual Contribution ($)"
          value={contribution}
          onChange={(e) => setContribution(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <input
          type="number"
          placeholder="Employer Match ($)"
          value={match}
          onChange={(e) => setMatch(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <input
          type="number"
          placeholder="Interest Rate (%)"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <input
          type="number"
          placeholder="Years Until Retirement"
          value={years}
          onChange={(e) => setYears(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={calculate401k}
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
          Calculate
        </button>
      </div>

      {/* 📊 Output */}
      {result && (
        <div style={{
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
          maxWidth: '500px',
          margin: '0 auto',
          fontSize: '1.1rem',
          color: '#333',
          textAlign: 'center'
        }}>
          <strong>{result}</strong>
        </div>
      )}
    </CalculatorLayout>
  );
}