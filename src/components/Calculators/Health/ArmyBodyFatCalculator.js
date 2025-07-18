import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function ArmyBodyFatCalculator() {
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [neck, setNeck] = useState('');
  const [waist, setWaist] = useState('');
  const [hip, setHip] = useState('');
  const [result, setResult] = useState(null);

  const calculateArmyBodyFat = () => {
    const a = parseInt(age);
    const h = parseFloat(height);
    const n = parseFloat(neck);
    const w = parseFloat(waist);
    const hi = parseFloat(hip);

    if (isNaN(h) || isNaN(n) || isNaN(w) || isNaN(a) || h <= 0 || n <= 0 || w <= 0 || a <= 0) {
      setResult('Please enter valid measurements.');
      return;
    }

    let bodyFat = 0;

    if (gender === 'male') {
      bodyFat = 86.010 * Math.log10(w - n) - 70.041 * Math.log10(h) + 36.76;
    } else {
      if (isNaN(hi) || hi <= 0) {
        setResult('Please enter valid hip measurement.');
        return;
      }
      bodyFat = 163.205 * Math.log10(w + hi - n) - 97.684 * Math.log10(h) - 78.387;
    }

    setResult(`Estimated Army Body Fat: ${bodyFat.toFixed(2)}%`);
  };

  return (
    <CalculatorLayout title="🎖️ Army Body Fat Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem', lineHeight: '1.6',
        marginBottom: '24px', color: '#444'
      }}>
        Calculate body fat percentage using U.S. Army standards. Enter age, gender, height, and body measurements to evaluate fitness status.
      </p>

      {/* 🔢 Inputs */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: '12px',
        maxWidth: '400px', margin: '0 auto', marginBottom: '20px'
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
          type="number" placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="number" placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="number" placeholder="Neck Circumference (cm)"
          value={neck}
          onChange={(e) => setNeck(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="number" placeholder="Waist Circumference (cm)"
          value={waist}
          onChange={(e) => setWaist(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        {gender === 'female' && (
          <input
            type="number" placeholder="Hip Circumference (cm)"
            value={hip}
            onChange={(e) => setHip(e.target.value)}
            style={{
              padding: '10px', fontSize: '1rem',
              borderRadius: '8px', border: '1px solid #ccc'
            }}
          />
        )}
        <button
          onClick={calculateArmyBodyFat}
          style={{
            padding: '10px', backgroundColor: '#3f51b5', color: '#fff',
            border: 'none', borderRadius: '6px', fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          Calculate Army Body Fat
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