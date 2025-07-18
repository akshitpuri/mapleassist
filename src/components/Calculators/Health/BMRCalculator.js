import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function BMRCalculator() {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('male');
  const [bmr, setBmr] = useState(null);

  const calculateBMR = () => {
    const a = parseInt(age);
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (isNaN(a) || isNaN(w) || isNaN(h) || a <= 0 || w <= 0 || h <= 0) {
      setBmr('Please enter valid positive values.');
      return;
    }

    let result;
    if (gender === 'male') {
      result = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      result = 10 * w + 6.25 * h - 5 * a - 161;
    }

    setBmr(`${result.toFixed(0)} calories/day`);
  };

  return (
    <CalculatorLayout title="🔥 BMR Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Your <strong>Basal Metabolic Rate (BMR)</strong> tells you how many calories your body needs at rest. Enter your details to estimate your daily energy burn using the Mifflin-St Jeor formula.
      </p>

      {/* 📥 Inputs */}
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
          placeholder="Age in years"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ccc'
          }}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input
          type="number"
          placeholder="Height in cm"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="number"
          placeholder="Weight in kg"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <button
          onClick={calculateBMR}
          style={{
            padding: '10px', backgroundColor: '#3f51b5', color: '#fff',
            border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer'
          }}
        >
          Calculate BMR
        </button>
      </div>

      {/* 📊 Output */}
      {bmr && (
        typeof bmr === 'string' ? (
          <div style={{
            textAlign: 'center', fontSize: '1.1rem',
            color: '#e53935', marginTop: '20px'
          }}>
            <strong>{bmr}</strong>
          </div>
        ) : (
          <div style={{
            backgroundColor: '#fff', padding: '20px', borderRadius: '10px',
            boxShadow: '0 1px 6px rgba(0,0,0,0.08)', maxWidth: '500px',
            margin: '0 auto', textAlign: 'center', fontSize: '1.1rem', color: '#333'
          }}>
            <strong>{bmr}</strong>
          </div>
        )
      )}
    </CalculatorLayout>
  );
}