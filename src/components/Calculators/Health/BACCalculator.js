import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function BACCalculator() {
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('male');
  const [drinks, setDrinks] = useState('');
  const [hours, setHours] = useState('');
  const [result, setResult] = useState(null);

  const calculateBAC = () => {
    const W = parseFloat(weight);
    const D = parseFloat(drinks);
    const H = parseFloat(hours);

    if (isNaN(W) || isNaN(D) || isNaN(H) || W <= 0 || D <= 0 || H < 0) {
      setResult('Please enter valid positive numbers.');
      return;
    }

    const r = gender === 'male' ? 0.68 : 0.55;
    const alcoholGrams = D * 14;
    const bac = (alcoholGrams / (W * r)) * 100 - (0.015 * H);
    const bacValue = Math.max(0, bac.toFixed(3));

    let status = '';
    if (bacValue < 0.03) status = 'No noticeable effects';
    else if (bacValue < 0.06) status = 'Mild euphoria';
    else if (bacValue < 0.10) status = 'Legally impaired (reaction slowed)';
    else if (bacValue < 0.20) status = 'Poor coordination & judgment';
    else status = 'High risk of severe impairment';

    setResult({ bacValue, status });
  };

  return (
    <CalculatorLayout title="🍷 BAC Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem', lineHeight: '1.6',
        marginBottom: '24px', color: '#444'
      }}>
        Estimate your current Blood Alcohol Concentration (BAC) level by entering gender, body weight, number of drinks, and time elapsed. Useful for general awareness — not a legal test.
      </p>

      {/* 🔢 Inputs */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        gap: '12px', maxWidth: '400px', margin: '0 auto',
        marginBottom: '20px'
      }}>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input
          type="number" placeholder="Body Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="number" placeholder="Number of Drinks"
          value={drinks}
          onChange={(e) => setDrinks(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="number" placeholder="Hours Since First Drink"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <button
          onClick={calculateBAC}
          style={{
            padding: '10px', backgroundColor: '#3f51b5',
            color: '#fff', border: 'none',
            borderRadius: '6px', fontSize: '1rem', cursor: 'pointer'
          }}
        >
          Calculate BAC
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
            <p><strong>Estimated BAC:</strong> {result.bacValue}%</p>
            <p><strong>Status:</strong> {result.status}</p>
          </div>
        )
      )}
    </CalculatorLayout>
  );
}