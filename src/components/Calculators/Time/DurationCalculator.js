import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function DurationCalculator() {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [result, setResult] = useState(null);

  const calculateDuration = () => {
    if (!startTime || !endTime) return;

    const start = new Date(`1970-01-01T${startTime}`);
    const end = new Date(`1970-01-01T${endTime}`);

    let diff = (end - start) / 1000;
    if (diff < 0) diff += 86400; // handle overnight wrap

    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    const seconds = Math.floor(diff % 60);

    setResult({ hours, minutes, seconds });
  };

  return (
    <CalculatorLayout title="⏳ Duration Calculator">
      <Helmet>
        <title>Duration Calculator – MapleAssist</title>
        <meta name="description" content="Calculate the time difference between two timestamps in HH:MM:SS format. Includes AM/PM support and overnight handling." />
        <meta name="keywords" content="duration calculator, time difference, mapleassist, time gap, AM PM calculator" />
      </Helmet>

      <BackButton />

      <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '24px', color: '#444' }}>
        Enter two times to calculate the duration between them. Supports 24-hour and AM/PM formats, including overnight spans.
      </p>

      {/* 🕒 Inputs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px', margin: '0 auto', marginBottom: '20px' }}>
        <label>
          Start Time:
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            style={{ padding: '10px', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ccc', marginTop: '6px', width: '100%' }}
          />
        </label>
        <label>
          End Time:
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            style={{ padding: '10px', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ccc', marginTop: '6px', width: '100%' }}
          />
        </label>
        <button
          onClick={calculateDuration}
          style={{ padding: '10px', backgroundColor: '#3f51b5', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer', marginTop: '12px' }}
        >
          Calculate Duration
        </button>
      </div>

      {/* 📊 Result */}
      {result && (
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 1px 6px rgba(0,0,0,0.08)', maxWidth: '500px', margin: '0 auto', fontSize: '1.1rem', color: '#333', textAlign: 'center' }}>
          <p><strong>Duration:</strong></p>
          <p>{result.hours} hours, {result.minutes} minutes, {result.seconds} seconds</p>
        </div>
      )}
    </CalculatorLayout>
  );
}