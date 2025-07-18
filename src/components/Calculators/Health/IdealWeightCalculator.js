import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function IdealWeightCalculator() {
  const [gender, setGender] = useState('male');
  const [heightCm, setHeightCm] = useState('');
  const [result, setResult] = useState(null);

  const calculateIdealWeight = () => {
    const height = parseFloat(heightCm);

    if (isNaN(height) || height <= 0) {
      setResult('Please enter a valid height in cm.');
      return;
    }

    const heightInInches = height / 2.54;
    const baseHeight = 60; // 5 feet

    if (heightInInches < baseHeight) {
      setResult('Height must be at least 152.4 cm (5 feet) for this formula.');
      return;
    }

    const idealWeight = gender === 'male'
      ? 50 + 2.3 * (heightInInches - baseHeight)
      : 45.5 + 2.3 * (heightInInches - baseHeight);

    setResult(`Estimated Ideal Weight: ${idealWeight.toFixed(1)} kg`);
  };

  return (
    <CalculatorLayout title="⚖️ Ideal Weight Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem', lineHeight: '1.6',
        marginBottom: '24px', color: '#444'
      }}>
        Estimate your ideal body weight based on height and gender using the <strong>Devine formula</strong>. Commonly used in clinical and nutritional settings as a baseline for healthy ranges.
      </p>

      {/* 📥 Inputs */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        gap: '12px', maxWidth: '400px',
        margin: '0 auto', marginBottom: '20px'
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
          type="number"
          placeholder="Height in cm"
          value={heightCm}
          onChange={(e) => setHeightCm(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <button
          onClick={calculateIdealWeight}
          style={{
            padding: '10px', backgroundColor: '#3f51b5',
            color: '#fff', border: 'none',
            borderRadius: '6px', fontSize: '1rem', cursor: 'pointer'
          }}
        >
          Calculate Ideal Weight
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