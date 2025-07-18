import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function WorkHoursCalculator() {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [breakMinutes, setBreakMinutes] = useState('');
  const [result, setResult] = useState(null);

  const parseTime = (str) => {
    const [h, m] = str.split(':').map(Number);
    return h * 60 + (m || 0);
  };

  const formatTime = (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = Math.round(minutes % 60);
    return `${h}h ${m}m`;
  };

  const calculateHours = () => {
    if (!startTime || !endTime) {
      setResult('Please enter both start and end times.');
      return;
    }

    const start = parseTime(startTime);
    const end = parseTime(endTime);
    const breakMin = parseFloat(breakMinutes) || 0;

    let worked = end - start - breakMin;
    if (worked < 0) {
      setResult('End time must be after start time.');
      return;
    }

    const decimalHours = (worked / 60).toFixed(2);
    const formatted = formatTime(worked);

    setResult({
      formatted,
      decimalHours
    });
  };

  return (
    <CalculatorLayout title="⏰ Work Hours Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem', lineHeight: '1.6',
        marginBottom: '24px', color: '#444'
      }}>
        Calculate total hours worked in a day by entering start time, end time, and break duration. Results are shown in both HH:MM and decimal formats.
      </p>

      {/* 🔢 Inputs */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        gap: '12px', maxWidth: '400px',
        margin: '0 auto', marginBottom: '20px'
      }}>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          placeholder="Start Time"
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          placeholder="End Time"
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="number"
          placeholder="Break (minutes)"
          value={breakMinutes}
          onChange={(e) => setBreakMinutes(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <button onClick={calculateHours} style={{
          padding: '10px', backgroundColor: '#3f51b5',
          color: '#fff', border: 'none',
          borderRadius: '6px', fontSize: '1rem',
          cursor: 'pointer'
        }}>
          Calculate Work Hours
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
          <p><strong>Total Time:</strong> {result.formatted}</p>
          <p><strong>Decimal Hours:</strong> {result.decimalHours} hrs</p>
        </div>
      )}
    </CalculatorLayout>
  );
}