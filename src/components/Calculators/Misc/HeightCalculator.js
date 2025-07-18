import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function HeightCalculator() {
  const [gender, setGender] = useState('male');
  const [fatherHeight, setFatherHeight] = useState('');
  const [motherHeight, setMotherHeight] = useState('');
  const [unit, setUnit] = useState('cm');
  const [result, setResult] = useState(null);

  const toCm = (val, unit) => unit === 'cm' ? val : val * 2.54;

  const calculateAdultHeight = () => {
    const fHeight = toCm(parseFloat(fatherHeight), unit);
    const mHeight = toCm(parseFloat(motherHeight), unit);

    if (isNaN(fHeight) || isNaN(mHeight) || fHeight <= 0 || mHeight <= 0) {
      setResult('Please enter valid parent heights.');
      return;
    }

    const predictedCm = gender === 'male'
      ? (fHeight + mHeight + 13) / 2
      : (fHeight + mHeight - 13) / 2;

    const cm = predictedCm.toFixed(1);
    const inches = predictedCm / 2.54;
    const feet = Math.floor(inches / 12);
    const inchRemainder = Math.round(inches % 12);

    setResult({
      cm,
      formatted: `${feet}ft ${inchRemainder}in`
    });
  };

  return (
    <CalculatorLayout title="📏 Height Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Estimate a child’s future adult height based on parent measurements. This tool uses the widely accepted mid-parental height method and converts units instantly.
      </p>

      {/* 🔢 Inputs */}
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
          <option value="male">Boy</option>
          <option value="female">Girl</option>
        </select>
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        >
          <option value="cm">Centimeters</option>
          <option value="in">Inches</option>
        </select>
        <input
          type="number" placeholder={`Father’s Height (${unit})`}
          value={fatherHeight}
          onChange={(e) => setFatherHeight(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="number" placeholder={`Mother’s Height (${unit})`}
          value={motherHeight}
          onChange={(e) => setMotherHeight(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <button
          onClick={calculateAdultHeight}
          style={{
            padding: '10px', backgroundColor: '#3f51b5',
            color: '#fff', border: 'none',
            borderRadius: '6px', fontSize: '1rem', cursor: 'pointer'
          }}
        >
          Calculate Height
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
            <p><strong>Estimated Adult Height:</strong></p>
            <p>{result.cm} cm &nbsp;/&nbsp; {result.formatted}</p>
          </div>
        )
      )}
    </CalculatorLayout>
  );
}