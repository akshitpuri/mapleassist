import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function TDEECalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [activity, setActivity] = useState('1.2');
  const [result, setResult] = useState(null);

  const calculateTDEE = () => {
    const W = parseFloat(weight);
    const H = parseFloat(height);
    const A = parseFloat(age);
    const factor = parseFloat(activity);

    if (isNaN(W) || isNaN(H) || isNaN(A) || W <= 0 || H <= 0 || A <= 0) {
      setResult('Please enter valid positive values.');
      return;
    }

    const BMR = gender === 'male'
      ? 10 * W + 6.25 * H - 5 * A + 5
      : 10 * W + 6.25 * H - 5 * A - 161;

    const TDEE = BMR * factor;
    setResult(`Estimated TDEE: ${TDEE.toFixed(2)} calories/day`);
  };

  return (
    <CalculatorLayout title="⚡ TDEE Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Calculate your Total Daily Energy Expenditure using BMR and activity level. Helps guide calorie intake for weight management and fitness planning.
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
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input
          type="number" placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <input
          type="number" placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <input
          type="number" placeholder="Age (years)"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <select
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        >
          <option value="1.2">Sedentary (little or no exercise)</option>
          <option value="1.375">Lightly active (1–3 days/week)</option>
          <option value="1.55">Moderately active (3–5 days/week)</option>
          <option value="1.725">Very active (6–7 days/week)</option>
          <option value="1.9">Extra active (physical job or intense training)</option>
        </select>
        <button
          onClick={calculateTDEE}
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
          Calculate TDEE
        </button>
      </div>

      {/* 📊 Output */}
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
            maxWidth: '500px',
            margin: '0 auto',
            textAlign: 'center',
            fontSize: '1.1rem',
            color: '#333'
          }}>
            <strong>{result}</strong>
          </div>
        )
      )}
    </CalculatorLayout>
  );
}