import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function HoursAndMinutesCalculator() {
  const [entries, setEntries] = useState([{ hours: '', minutes: '' }]);
  const [totalTime, setTotalTime] = useState(null);

  const handleChange = (index, field, value) => {
    const newEntries = [...entries];
    newEntries[index][field] = value;
    setEntries(newEntries);
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

    const finalHours = Math.floor(totalMinutes / 60);
    const finalMinutes = totalMinutes % 60;
    setTotalTime(`${finalHours} hrs ${finalMinutes} mins`);
  };

  return (
    <CalculatorLayout title="🕒 Hours and Minutes Calculator">
      <Helmet>
        <title>Hours and Minutes Calculator – MapleAssist</title>
        <meta name="description" content="Quickly add multiple time entries using hours and minutes with MapleAssist's smart calculator." />
        <meta name="keywords" content="hours calculator, minutes calculator, time tracker, mapleassist, offline calculator" />
      </Helmet>

      <BackButton />
      <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '24px', color: '#444' }}>
        Add hours and minutes from different logs to get a total time — ideal for work tracking, study sessions, or task batching.
      </p>

      {/* ⏱ Inputs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
        {entries.map((entry, idx) => (
          <div key={idx} style={{ display: 'flex', gap: '12px' }}>
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
          Calculate Total Time
        </button>
      </div>

      {/* 📊 Result */}
      {totalTime && (
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 1px 6px rgba(0,0,0,0.08)', maxWidth: '500px', margin: '0 auto', textAlign: 'center', fontSize: '1.1rem', color: '#333' }}>
          <strong>Total Time:</strong>
          <p>{totalTime}</p>
        </div>
      )}
    </CalculatorLayout>
  );
}