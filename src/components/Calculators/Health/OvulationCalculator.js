import React, { useState } from 'react';
import dayjs from 'dayjs';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function OvulationCalculator() {
  const [lastPeriod, setLastPeriod] = useState('');
  const [cycleLength, setCycleLength] = useState('');
  const [result, setResult] = useState(null);

  const calculateOvulation = () => {
    const lpDate = dayjs(lastPeriod);
    const cycle = parseInt(cycleLength);

    if (!lastPeriod || isNaN(cycle) || cycle <= 0) {
      setResult('Please enter valid inputs.');
      return;
    }

    const ovulationDate = lpDate.add(cycle - 14, 'day');
    const fertileStart = ovulationDate.subtract(4, 'day');
    const fertileEnd = ovulationDate.add(1, 'day');

    setResult({
      ovulation: ovulationDate.format('MMM D, YYYY'),
      fertileStart: fertileStart.format('MMM D, YYYY'),
      fertileEnd: fertileEnd.format('MMM D, YYYY')
    });
  };

  return (
    <CalculatorLayout title="🌸 Ovulation Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem', lineHeight: '1.6',
        marginBottom: '24px', color: '#444'
      }}>
        Find out your ovulation date and fertile window by entering the start date of your last menstrual period and average cycle length. This tool supports fertility tracking and conception efforts.
      </p>

      {/* 🔢 Inputs */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        gap: '12px', maxWidth: '400px',
        margin: '0 auto', marginBottom: '20px'
      }}>
        <input
          type="date"
          value={lastPeriod}
          onChange={(e) => setLastPeriod(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <input
          type="number"
          placeholder="Average Cycle Length (days)"
          value={cycleLength}
          onChange={(e) => setCycleLength(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={calculateOvulation}
          style={{
            padding: '10px',
            backgroundColor: '#3f51b5',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          Calculate Ovulation
        </button>
      </div>

      {/* 📊 Results */}
      {result && (
        typeof result === 'string' ? (
          <div style={{
            textAlign: 'center',
            fontSize: '1.1rem',
            color: '#e53935',
            marginTop: '20px'
          }}>
            <strong>{result}</strong>
          </div>
        ) : (
          <div style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
            maxWidth: '500px',
            margin: '0 auto',
            textAlign: 'center',
            fontSize: '1.1rem', color: '#333'
          }}>
            <p><strong>Ovulation Date:</strong> {result.ovulation}</p>
            <p><strong>Fertile Window:</strong> {result.fertileStart} – {result.fertileEnd}</p>
          </div>
        )
      )}
    </CalculatorLayout>
  );
}