import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function PaceCalculator() {
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');
  const [pace, setPace] = useState('');
  const [result, setResult] = useState(null);

  const parseTime = (str) => {
    const [min, sec] = str.split(':').map(Number);
    return min * 60 + (sec || 0);
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.round(seconds % 60);
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  const calculatePaceData = () => {
    const D = parseFloat(distance);
    const T = time ? parseTime(time) : null;
    const P = pace ? parseTime(pace) : null;

    if (isNaN(D) || D <= 0) {
      setResult('Please enter valid distance.');
      return;
    }

    if (T && P) {
      setResult('Please fill only two of the three fields.');
      return;
    }

    if (T && !P) {
      const paceSec = T / D;
      setResult(`Your Pace: ${formatTime(paceSec)} per km`);
    } else if (!T && P) {
      const totalTime = D * P;
      setResult(`Estimated Time: ${formatTime(totalTime)}`);
    } else if (!T && !P) {
      setResult('Please enter at least two values.');
    } else {
      const totalDistance = T / P;
      setResult(`Estimated Distance: ${totalDistance.toFixed(2)} km`);
    }
  };

  return (
    <CalculatorLayout title="⏱️ Pace Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem', lineHeight: '1.6',
        marginBottom: '24px', color: '#444'
      }}>
        Calculate your running pace, total time, or estimated distance. Enter any two of the three to compute the third. Use format mm:ss for time and pace.
      </p>

      {/* 🔢 Inputs */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        gap: '12px', maxWidth: '400px',
        margin: '0 auto', marginBottom: '20px'
      }}>
        <input
          type="number" placeholder="Distance (km)"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="text" placeholder="Time (mm:ss)"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="text" placeholder="Pace (mm:ss per km)"
          value={pace}
          onChange={(e) => setPace(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <button
          onClick={calculatePaceData}
          style={{
            padding: '10px', backgroundColor: '#3f51b5',
            color: '#fff', border: 'none',
            borderRadius: '6px', fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          Calculate Pace
        </button>
      </div>

      {/* 📊 Output */}
      {result && (
        <div style={{
          backgroundColor: '#fff', padding: '20px',
          borderRadius: '10px', boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
          maxWidth: '500px', margin: '0 auto',
          textAlign: 'center', fontSize: '1.1rem', color: '#333'
        }}>
          <strong>{result}</strong>
        </div>
      )}
    </CalculatorLayout>
  );
}