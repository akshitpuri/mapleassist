import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function TimeToDecimalCalculator() {
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [result, setResult] = useState(null);

  const convertTime = () => {
    const h = parseFloat(hours) || 0;
    const m = parseFloat(minutes) || 0;
    const s = parseFloat(seconds) || 0;

    const decimalHours = +(h + m / 60 + s / 3600).toFixed(6);
    const decimalMinutes = +(h * 60 + m + s / 60).toFixed(2);
    const totalSeconds = +(h * 3600 + m * 60 + s).toFixed(0);

    setResult({ decimalHours, decimalMinutes, totalSeconds });
  };

  return (
    <CalculatorLayout title="📐 Time to Decimal Calculator">
      <Helmet>
        <title>Time to Decimal Calculator – MapleAssist</title>
        <meta name="description" content="Convert hours, minutes, and seconds into decimal format instantly. Ideal for payroll, timesheets, and time tracking." />
        <meta name="keywords" content="time to decimal, convert time, decimal hours, decimal minutes, mapleassist calculator" />
      </Helmet>

      <BackButton />

      <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '24px', color: '#444' }}>
        Convert time from <code>HH:MM:SS</code> into decimal hours, minutes, and total seconds. Perfect for payroll, billing, and time tracking.
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
          Convert to Decimal
        </button>
      </div>

      {/* 📊 Results */}
      {result && (
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 1px 6px rgba(0,0,0,0.08)', maxWidth: '500px', margin: '0 auto', fontSize: '1.05rem', color: '#333', textAlign: 'center' }}>
          <p><strong>Decimal Hours:</strong> {result.decimalHours}</p>
          <p><strong>Decimal Minutes:</strong> {result.decimalMinutes}</p>
          <p><strong>Total Seconds:</strong> {result.totalSeconds}</p>
        </div>
      )}
    </CalculatorLayout>
  );
}