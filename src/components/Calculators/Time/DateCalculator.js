import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function DateCalculator() {
  const [startDate, setStartDate] = useState('');
  const [years, setYears] = useState('');
  const [months, setMonths] = useState('');
  const [days, setDays] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState(null);

  const calculateDate = () => {
    if (!startDate) return;

    const baseDate = new Date(startDate);
    const y = parseInt(years) || 0;
    const m = parseInt(months) || 0;
    const d = parseInt(days) || 0;

    let newDate = new Date(baseDate);

    if (operation === 'add') {
      newDate.setFullYear(newDate.getFullYear() + y);
      newDate.setMonth(newDate.getMonth() + m);
      newDate.setDate(newDate.getDate() + d);
    } else {
      newDate.setFullYear(newDate.getFullYear() - y);
      newDate.setMonth(newDate.getMonth() - m);
      newDate.setDate(newDate.getDate() - d);
    }

    setResult(newDate.toDateString());
  };

  return (
    <CalculatorLayout title="📆 Date Calculator">
      <Helmet>
        <title>Date Calculator – MapleAssist</title>
        <meta name="description" content="Add or subtract days, months, or years from a given date. A simple and accurate date calculator from MapleAssist." />
        <meta name="keywords" content="date calculator, add days, subtract days, mapleassist, calendar math" />
      </Helmet>

      <BackButton />

      <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '24px', color: '#444' }}>
        Choose a start date and add or subtract years, months, or days to calculate a future or past date. Great for planning deadlines, anniversaries, or project timelines.
      </p>

      {/* 📅 Inputs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px', margin: '0 auto', marginBottom: '20px' }}>
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{ padding: '10px', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ccc', marginTop: '6px', width: '100%' }}
          />
        </label>

        <div style={{ display: 'flex', gap: '12px' }}>
          <input
            type="number"
            placeholder="Years"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            style={{ padding: '10px', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ccc', width: '100%' }}
          />
          <input
            type="number"
            placeholder="Months"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
            style={{ padding: '10px', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ccc', width: '100%' }}
          />
          <input
            type="number"
            placeholder="Days"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            style={{ padding: '10px', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ccc', width: '100%' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
          <button
            onClick={() => setOperation('add')}
            style={{
              padding: '10px',
              backgroundColor: operation === 'add' ? '#3f51b5' : '#e0e0e0',
              color: operation === 'add' ? '#fff' : '#333',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              cursor: 'pointer',
              flex: 1
            }}
          >
            Add
          </button>
          <button
            onClick={() => setOperation('subtract')}
            style={{
              padding: '10px',
              backgroundColor: operation === 'subtract' ? '#3f51b5' : '#e0e0e0',
              color: operation === 'subtract' ? '#fff' : '#333',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              cursor: 'pointer',
              flex: 1
            }}
          >
            Subtract
          </button>
        </div>

        <button
          onClick={calculateDate}
          style={{ padding: '10px', backgroundColor: '#4caf50', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer', marginTop: '12px' }}
        >
          Calculate Date
        </button>
      </div>

      {/* 📊 Result */}
      {result && (
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 1px 6px rgba(0,0,0,0.08)', maxWidth: '500px', margin: '0 auto', fontSize: '1.1rem', color: '#333', textAlign: 'center' }}>
          <p><strong>Resulting Date:</strong></p>
          <p>{result}</p>
        </div>
      )}
    </CalculatorLayout>
  );
}