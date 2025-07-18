import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function CalorieCalculator() {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('male');
  const [activity, setActivity] = useState('moderate');
  const [calories, setCalories] = useState(null);

  const calculateCalories = () => {
    const a = parseInt(age);
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (isNaN(a) || isNaN(w) || isNaN(h) || a <= 0 || w <= 0 || h <= 0) {
      setCalories('Please enter valid positive values.');
      return;
    }

    let bmr;
    if (gender === 'male') {
      bmr = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161;
    }

    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    };

    const multiplier = activityMultipliers[activity];
    const totalCalories = bmr * multiplier;

    setCalories(`Estimated Daily Calories: ${Math.round(totalCalories)} kcal`);
  };

  return (
    <CalculatorLayout title="🔥 Calorie Needs Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem', lineHeight: '1.6',
        marginBottom: '24px', color: '#444'
      }}>
        Estimate your daily calorie needs based on your activity level and personal details. Useful for setting goals like weight loss, maintenance, or muscle gain.
      </p>

      {/* 🧮 Inputs */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: '12px',
        maxWidth: '400px', margin: '0 auto', marginBottom: '20px'
      }}>
        <input
          type="number" placeholder="Age in years" value={age}
          onChange={(e) => setAge(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
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
          type="number" placeholder="Height in cm" value={height}
          onChange={(e) => setHeight(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="number" placeholder="Weight in kg" value={weight}
          onChange={(e) => setWeight(e.target.value)}
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
          <option value="sedentary">Sedentary (little or no exercise)</option>
          <option value="light">Light (1–3 days/week)</option>
          <option value="moderate">Moderate (3–5 days/week)</option>
          <option value="active">Active (6–7 days/week)</option>
          <option value="very_active">Very Active (twice daily or intense training)</option>
        </select>
        <button
          onClick={calculateCalories}
          style={{
            padding: '10px', backgroundColor: '#3f51b5', color: '#fff',
            border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer'
          }}
        >
          Calculate Calories
        </button>
      </div>

      {/* 📊 Output */}
      {calories && (
        typeof calories === 'string' ? (
          <div style={{
            textAlign: 'center', fontSize: '1.1rem',
            color: '#e53935', marginTop: '20px'
          }}>
            <strong>{calories}</strong>
          </div>
        ) : (
          <div style={{
            backgroundColor: '#fff', padding: '20px', borderRadius: '10px',
            boxShadow: '0 1px 6px rgba(0,0,0,0.08)', maxWidth: '500px',
            margin: '0 auto', textAlign: 'center', fontSize: '1.1rem', color: '#333'
          }}>
            <strong>{calories}</strong>
          </div>
        )
      )}
    </CalculatorLayout>
  );
}