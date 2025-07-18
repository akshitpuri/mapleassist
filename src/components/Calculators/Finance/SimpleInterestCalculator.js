import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function SimpleInterestCalculator() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [interest, setInterest] = useState(null);

  const calculateInterest = () => {
    const P = parseFloat(principal);
    const R = parseFloat(rate);
    const T = parseFloat(time);

    if (isNaN(P) || isNaN(R) || isNaN(T) || P <= 0 || R <= 0 || T <= 0) {
      setInterest('Please enter valid positive values.');
      return;
    }

    const SI = (P * R * T) / 100;
    setInterest(`Simple Interest: $${SI.toFixed(2)}`);
  };

  return (
    <CalculatorLayout title="💰 Simple Interest Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem', lineHeight: '1.6',
        marginBottom: '24px', color: '#444'
      }}>
        Enter the principal, interest rate, and time to calculate <strong>simple interest</strong>. This tool is ideal for quick estimates on fixed-rate loans or deposits.
      </p>

      {/* 🔢 Inputs */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: '12px',
        maxWidth: '400px', margin: '0 auto', marginBottom: '20px'
      }}>
        <input
          type="number" placeholder="Principal ($)"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="number" placeholder="Rate (%)"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="number" placeholder="Time (years)"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <button
          onClick={calculateInterest}
          style={{
            padding: '10px', backgroundColor: '#3f51b5', color: '#fff',
            border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer'
          }}
        >
          Calculate Interest
        </button>
      </div>

      {/* 📊 Result */}
      {interest && (
        typeof interest === 'string' ? (
          <div style={{
            textAlign: 'center', fontSize: '1.1rem',
            color: '#e53935', marginTop: '20px'
          }}>
            <strong>{interest}</strong>
          </div>
        ) : (
          <div style={{
            backgroundColor: '#fff', padding: '20px', borderRadius: '10px',
            boxShadow: '0 1px 6px rgba(0,0,0,0.08)', maxWidth: '500px',
            margin: '0 auto', textAlign: 'center', fontSize: '1.1rem', color: '#333'
          }}>
            <strong>{interest}</strong>
          </div>
        )
      )}
    </CalculatorLayout>
  );
}