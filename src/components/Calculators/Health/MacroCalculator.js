import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function MacroCalculator() {
  const [calories, setCalories] = useState('');
  const [goal, setGoal] = useState('balance');
  const [result, setResult] = useState(null);

  const calculateMacros = () => {
    const totalCalories = parseFloat(calories);
    if (isNaN(totalCalories) || totalCalories <= 0) {
      setResult('Please enter a valid daily calorie target.');
      return;
    }

    let proteinPct, fatPct, carbPct;

    switch (goal) {
      case 'muscle-gain':
        proteinPct = 0.30;
        fatPct = 0.20;
        carbPct = 0.50;
        break;
      case 'fat-loss':
        proteinPct = 0.40;
        fatPct = 0.25;
        carbPct = 0.35;
        break;
      default:
        proteinPct = 0.30;
        fatPct = 0.25;
        carbPct = 0.45;
    }

    const proteinGrams = (totalCalories * proteinPct) / 4;
    const fatGrams = (totalCalories * fatPct) / 9;
    const carbGrams = (totalCalories * carbPct) / 4;

    setResult({
      protein: proteinGrams.toFixed(1),
      fats: fatGrams.toFixed(1),
      carbs: carbGrams.toFixed(1)
    });
  };

  return (
    <CalculatorLayout title="📊 Macro Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Calculate your daily macro targets based on your fitness goal and calorie intake. Great for tracking nutrition and designing meal plans.
      </p>

      {/* 🔢 Inputs */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        gap: '12px', maxWidth: '400px',
        margin: '0 auto', marginBottom: '20px'
      }}>
        <input
          type="number" placeholder="Daily Calories"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <select
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        >
          <option value="balance">Balanced</option>
          <option value="fat-loss">Fat Loss</option>
          <option value="muscle-gain">Muscle Gain</option>
        </select>
        <button
          onClick={calculateMacros}
          style={{
            padding: '10px', backgroundColor: '#3f51b5',
            color: '#fff', border: 'none',
            borderRadius: '6px', fontSize: '1rem', cursor: 'pointer'
          }}
        >
          Calculate Macros
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
            fontSize: '1.1rem', color: '#333'
          }}>
            <p><strong>Protein:</strong> {result.protein}g/day</p>
            <p><strong>Fat:</strong> {result.fats}g/day</p>
            <p><strong>Carbohydrates:</strong> {result.carbs}g/day</p>
          </div>
        )
      )}
    </CalculatorLayout>
  );
}