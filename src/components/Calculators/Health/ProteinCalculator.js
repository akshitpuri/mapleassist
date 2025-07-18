import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function ProteinCalculator() {
  const [weight, setWeight] = useState('');
  const [goal, setGoal] = useState('maintenance');
  const [result, setResult] = useState(null);

  const calculateProtein = () => {
    const W = parseFloat(weight);
    if (isNaN(W) || W <= 0) {
      setResult('Please enter a valid weight.');
      return;
    }

    let multiplier;
    switch (goal) {
      case 'fat-loss':
        multiplier = 1.6;
        break;
      case 'muscle-gain':
        multiplier = 2.0;
        break;
      default:
        multiplier = 1.2;
    }

    const proteinGrams = W * multiplier;
    setResult(`Recommended Protein Intake: ${proteinGrams.toFixed(1)}g/day`);
  };

  return (
    <CalculatorLayout title="🥩 Protein Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Estimate daily protein intake based on your body weight and fitness goal. Helps guide macro planning for maintenance, fat loss, or muscle gain.
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
          placeholder="Body Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <select
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        >
          <option value="maintenance">Maintenance</option>
          <option value="fat-loss">Fat Loss</option>
          <option value="muscle-gain">Muscle Gain</option>
        </select>
        <button
          onClick={calculateProtein}
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
          Calculate Protein Intake
        </button>
      </div>

      {/* 📊 Result */}
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
            fontSize: '1.1rem',
            color: '#333',
            textAlign: 'center'
          }}>
            <strong>{result}</strong>
          </div>
        )
      )}
    </CalculatorLayout>
  );
}