import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function DaysCalculator() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [excludeWeekends, setExcludeWeekends] = useState(false);
  const [result, setResult] = useState(null);

  const calculateDays = () => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);
    let count = 0;

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const day = d.getDay();
      if (excludeWeekends && (day === 0 || day === 6)) continue;
      count++;
    }

    setResult(count);
  };

  return (
    <CalculatorLayout title="📆 Days Calculator">
      <Helmet>
        <title>Days Calculator – MapleAssist</title>
        <meta name="description" content="Count the number of days between two dates with optional weekend exclusion. Perfect for planning, deadlines, and scheduling." />
        <meta name="keywords" content="days calculator, date difference, count days, mapleassist, exclude weekends" />
      </Helmet>

      <BackButton />

      <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '24px', color: '#444' }}>
        Select two dates to calculate the number of days between them. You can choose to exclude weekends for business or academic planning.
      </p>

      {/* 📅 Inputs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px', margin: '0 auto', marginBottom: '20px' }}>
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{ padding: '10px', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ccc', marginTop: '4px' }}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={{ padding: '10px', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ccc', marginTop: '4px' }}
          />
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="checkbox"
            checked={excludeWeekends}
            onChange={(e) => setExcludeWeekends(e.target.checked)}
          />
          Exclude Weekends
        </label>
        <button
          onClick={calculateDays}
          style={{ padding: '10px', backgroundColor: '#3f51b5', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer' }}
        >
          Calculate Days
        </button>
      </div>

      {/* 📊 Result */}
      {result !== null && (
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 1px 6px rgba(0,0,0,0.08)', maxWidth: '500px', margin: '0 auto', fontSize: '1.05rem', color: '#333', textAlign: 'center' }}>
          <p><strong>Total Days:</strong> {result}</p>
        </div>
      )}
    </CalculatorLayout>
  );
}