import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function HoursCalculator() {
  const [entries, setEntries] = useState([{ hours: '', minutes: '' }]);
  const [result, setResult] = useState(null);

  const handleChange = (index, field, value) => {
    const updated = [...entries];
    updated[index][field] = value;
    setEntries(updated);
  };

  const addEntry = () => {
    setEntries([...entries, { hours: '', minutes: '' }]);
  };

  const calculateTotal = () => {
    let totalMinutes = 0;
    for (let { hours, minutes } of entries) {
      const h = parseInt(hours) || 0;
      const m = parseInt(minutes) || 0;
      totalMinutes += h * 60 + m;
    }

    const hh = Math.floor(totalMinutes / 60);
    const mm = totalMinutes % 60;
    const decimal = +(totalMinutes / 60).toFixed(2);

    setResult({ hh, mm, decimal });
  };

  return (
    <CalculatorLayout title="🕑 Hours Calculator">
      <Helmet>
        <title>Hours Calculator – MapleAssist</title>
        <meta name="description" content="Add or subtract hours and minutes to calculate total working time. Get results in HH:MM and decimal formats." />
        <meta name="keywords" content="hours calculator, time adder, total hours, mapleassist, decimal hours" />
      </Helmet>

      <BackButton />

      <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '24px', color: '#444' }}>
        Add multiple time entries in hours and minutes to get a total duration. Useful for tracking work logs, study sessions, or shift totals.
      </p>

      {/* ⏱ Inputs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
        {entries.map((entry, idx) => (
          <div key={idx} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <input
              type="number"
              min="0"
              placeholder="Hours"
              value={entry.hours}
              onChange={(e) => handleChange(idx, 'hours', e.target.value)}
              style={{ padding: '10px', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ccc', width: '120px' }}
            />
            <input
              type="number"
              min="0"
              placeholder="Minutes"
              value={entry.minutes}
              onChange={(e) => handleChange(idx, 'minutes', e.target.value)}
              style={{ padding: '10px', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ccc', width: '120px' }}
            />
          </div>
        ))}

        <button
          onClick={addEntry}
          style={{ padding: '8px 12px', backgroundColor: '#f5f5f5', border: '1px solid #aaa', borderRadius: '6px', fontSize: '0.95rem', cursor: 'pointer', color: '#333' }}
        >
          + Add Entry
        </button>

        <button
          onClick={calculateTotal}
          style={{ padding: '10px', backgroundColor: '#3f51b5', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer' }}
        >
          Calculate Total
        </button>
      </div>

      {/* 📊 Result */}
      {result && (
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 1px 6px rgba(0,0,0,0.08)', maxWidth: '500px', margin: '0 auto', textAlign: 'center', fontSize: '1.1rem', color: '#333' }}>
          <p><strong>Total Time:</strong></p>
          <p>{result.hh} hours, {result.mm} minutes</p>
          <p><strong>Decimal Format:</strong> {result.decimal} hours</p>
        </div>
      )}
    </CalculatorLayout>
  );
}