import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function TimeCalculator() {
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [result, setResult] = useState(null);

  const convertTime = () => {
    const h = parseFloat(hours) || 0;
    const m = parseFloat(minutes) || 0;
    const s = parseFloat(seconds) || 0;

    const totalSeconds = h * 3600 + m * 60 + s;
    const totalMinutes = +(totalSeconds / 60).toFixed(2);
    const totalHours = +(totalSeconds / 3600).toFixed(4);

    setResult({ totalSeconds, totalMinutes, totalHours });
  };

  return (
    <CalculatorLayout title="⌚ Time Calculator">
      <Helmet>
        <title>Time Calculator – MapleAssist</title>
        <meta name="description" content="Convert time between hours, minutes, and seconds. Get total duration in multiple formats with MapleAssist's smart time calculator." />
        <meta name="keywords" content="time calculator, convert time, hours to minutes, mapleassist, seconds to hours" />
      </Helmet>

      <BackButton />

      <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '24px', color: '#444' }}>
        Enter hours, minutes, and seconds to convert total time into multiple formats. Great for time tracking, billing, and scheduling.
      </p>

      {/* ⏱ Inputs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px', margin: '0 auto', marginBottom: '20px' }}>
        <input
          type="number"
          min="0"
          placeholder="Hours"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          style={{ padding: '10px', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ccc' }}
        />
        <input
          type="number"
          min="0"
          placeholder="Minutes"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          style={{ padding: '10px', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ccc' }}
        />
        <input
          type="number"
          min="0"
          placeholder="Seconds"
          value={seconds}
          onChange={(e) => setSeconds(e.target.value)}
          style={{ padding: '10px', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ccc' }}
        />
        <button
          onClick={convertTime}
          style={{ padding: '10px', backgroundColor: '#3f51b5', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer' }}
        >
          Convert Time
        </button>
      </div>

      {/* 📊 Results */}
      {result && (
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 1px 6px rgba(0,0,0,0.08)', maxWidth: '500px', margin: '0 auto', fontSize: '1.1rem', color: '#333', textAlign: 'center' }}>
          <p><strong>Total Seconds:</strong> {result.totalSeconds}</p>
          <p><strong>Total Minutes:</strong> {result.totalMinutes}</p>
          <p><strong>Total Hours:</strong> {result.totalHours}</p>
        </div>
      )}
    </CalculatorLayout>
  );
}