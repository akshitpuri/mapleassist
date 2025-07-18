import React, { useState } from 'react';
import dayjs from 'dayjs';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function PeriodCalculator() {
  const [lastPeriod, setLastPeriod] = useState('');
  const [cycleLength, setCycleLength] = useState('');
  const [periodDuration, setPeriodDuration] = useState('');
  const [result, setResult] = useState(null);

  const calculatePeriod = () => {
    const lpDate = dayjs(lastPeriod);
    const cycle = parseInt(cycleLength);
    const duration = parseInt(periodDuration);

    if (!lastPeriod || isNaN(cycle) || isNaN(duration) || cycle <= 0 || duration <= 0) {
      setResult('Please enter valid cycle and duration info.');
      return;
    }

    const nextPeriodStart = lpDate.add(cycle, 'day');
    const nextPeriodEnd = nextPeriodStart.add(duration - 1, 'day');
    const ovulationDay = lpDate.add(cycle - 14, 'day');
    const fertileStart = ovulationDay.subtract(4, 'day');
    const fertileEnd = ovulationDay.add(1, 'day');

    setResult({
      nextStart: nextPeriodStart.format('MMM D, YYYY'),
      nextEnd: nextPeriodEnd.format('MMM D, YYYY'),
      fertileStart: fertileStart.format('MMM D, YYYY'),
      fertileEnd: fertileEnd.format('MMM D, YYYY')
    });
  };

  return (
    <CalculatorLayout title="🩸 Period Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem', lineHeight: '1.6', marginBottom: '24px', color: '#444'
      }}>
        Predict your next period and fertile window by entering the start date of your last period, your average cycle length, and period duration.
      </p>

      {/* 🔢 Inputs */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: '12px',
        maxWidth: '400px', margin: '0 auto', marginBottom: '20px'
      }}>
        <input
          type="date"
          value={lastPeriod}
          onChange={(e) => setLastPeriod(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="number" placeholder="Average Cycle Length (days)"
          value={cycleLength}
          onChange={(e) => setCycleLength(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="number" placeholder="Period Duration (days)"
          value={periodDuration}
          onChange={(e) => setPeriodDuration(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <button
          onClick={calculatePeriod}
          style={{
            padding: '10px', backgroundColor: '#3f51b5', color: '#fff',
            border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer'
          }}
        >
          Calculate Cycle
        </button>
      </div>

      {/* 📊 Results */}
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
            <p><strong>Next Period:</strong> {result.nextStart} – {result.nextEnd}</p>
            <p><strong>Fertile Window:</strong> {result.fertileStart} – {result.fertileEnd}</p>
          </div>
        )
      )}
    </CalculatorLayout>
  );
}