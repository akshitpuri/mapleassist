import React, { useState } from 'react';
import dayjs from 'dayjs';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function PregnancyWeightGainCalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [week, setWeek] = useState('');
  const [result, setResult] = useState(null);

  const calculateGain = () => {
    const W = parseFloat(weight);
    const H = parseFloat(height);
    const currentWeek = parseInt(week);

    if (isNaN(W) || isNaN(H) || isNaN(currentWeek) || W <= 0 || H <= 0 || currentWeek <= 0 || currentWeek > 40) {
      setResult('Please enter valid values.');
      return;
    }

    const heightMeters = H / 100;
    const bmi = W / (heightMeters * heightMeters);
    let category = '', totalRange = [0, 0], weeklyGain = [0, 0];

    if (bmi < 18.5) {
      category = 'Underweight';
      totalRange = [12.5, 18];
      weeklyGain = [0.44, 0.58];
    } else if (bmi < 25) {
      category = 'Normal weight';
      totalRange = [11.5, 16];
      weeklyGain = [0.35, 0.50];
    } else if (bmi < 30) {
      category = 'Overweight';
      totalRange = [7, 11.5];
      weeklyGain = [0.23, 0.33];
    } else {
      category = 'Obese';
      totalRange = [5, 9];
      weeklyGain = [0.17, 0.27];
    }

    let gainMin = 0, gainMax = 0;
    if (currentWeek <= 13) {
      gainMin = 0;
      gainMax = 2;
    } else {
      gainMin = 2 + (currentWeek - 13) * weeklyGain[0];
      gainMax = 2 + (currentWeek - 13) * weeklyGain[1];
    }

    setResult({
      bmi: bmi.toFixed(1),
      category,
      week: currentWeek,
      rangeMin: gainMin.toFixed(1),
      rangeMax: gainMax.toFixed(1),
      totalMin: totalRange[0],
      totalMax: totalRange[1]
    });
  };

  return (
    <CalculatorLayout title="⚖️ Pregnancy Weight Gain Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem', lineHeight: '1.6',
        marginBottom: '24px', color: '#444'
      }}>
        Estimate recommended pregnancy weight gain based on your height, pre-pregnancy weight, and current week. Guidelines are based on BMI ranges defined by the Institute of Medicine.
      </p>

      {/* 🔢 Inputs */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: '12px',
        maxWidth: '400px', margin: '0 auto', marginBottom: '20px'
      }}>
        <input
          type="number" placeholder="Pre-pregnancy Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
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
          type="number" placeholder="Current Pregnancy Week"
          value={week}
          onChange={(e) => setWeek(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <button
          onClick={calculateGain}
          style={{
            padding: '10px', backgroundColor: '#3f51b5', color: '#fff',
            border: 'none', borderRadius: '6px', fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          Calculate Weight Gain
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
            <p><strong>BMI:</strong> {result.bmi} ({result.category})</p>
            <p><strong>Week {result.week} Weight Gain Range:</strong> {result.rangeMin}kg – {result.rangeMax}kg</p>
            <p><strong>Total Recommended Gain:</strong> {result.totalMin}kg – {result.totalMax}kg</p>
          </div>
        )
      )}
    </CalculatorLayout>
  );
}