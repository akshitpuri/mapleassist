import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function CaloriesBurnedCalculator() {
  const [weight, setWeight] = useState('');
  const [duration, setDuration] = useState('');
  const [activity, setActivity] = useState('walking');
  const [result, setResult] = useState(null);

  const MET_VALUES = {
    walking: 3.5,
    running: 9.8,
    cycling: 7.5,
    swimming: 8.0,
    yoga: 2.5,
    strength_training: 6.0,
    dancing: 5.0
  };

  const calculateBurn = () => {
    const W = parseFloat(weight);
    const T = parseFloat(duration);
    const MET = MET_VALUES[activity];

    if (isNaN(W) || isNaN(T) || W <= 0 || T <= 0) {
      setResult('Please enter valid weight and duration.');
      return;
    }

    const burned = (MET * 3.5 * W / 200) * T;
    setResult(`Estimated Calories Burned: ${burned.toFixed(2)} kcal`);
  };

  return (
    <CalculatorLayout title="🏃‍♂️ Calories Burned Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem', lineHeight: '1.6',
        marginBottom: '24px', color: '#444'
      }}>
        Estimate calories burned by selecting an activity, entering your body weight, and the time spent. MET values are used for accurate energy expenditure.
      </p>

      {/* 🔢 Inputs */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        gap: '12px', maxWidth: '400px',
        margin: '0 auto', marginBottom: '20px'
      }}>
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
          type="number" placeholder="Duration (minutes)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <select
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        >
          <option value="walking">Walking</option>
          <option value="running">Running</option>
          <option value="cycling">Cycling</option>
          <option value="swimming">Swimming</option>
          <option value="yoga">Yoga</option>
          <option value="strength_training">Strength Training</option>
          <option value="dancing">Dancing</option>
        </select>
        <button
          onClick={calculateBurn}
          style={{
            padding: '10px', backgroundColor: '#3f51b5',
            color: '#fff', border: 'none',
            borderRadius: '6px', fontSize: '1rem', cursor: 'pointer'
          }}
        >
          Calculate Calories Burned
        </button>
      </div>

      {/* 📊 Output */}
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
            <strong>{result}</strong>
          </div>
        )
      )}
    </CalculatorLayout>
  );
}