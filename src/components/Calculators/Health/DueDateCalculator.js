import React, { useState } from 'react';
import dayjs from 'dayjs';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function DueDateCalculator() {
  const [lmpDate, setLmpDate] = useState('');
  const [result, setResult] = useState(null);

  const calculateDueDate = () => {
    if (!lmpDate) {
      setResult('Please enter your last menstrual period date.');
      return;
    }

    const lmp = dayjs(lmpDate);
    const due = lmp.add(280, 'day');
    const today = dayjs();
    const weeks = Math.floor(today.diff(lmp, 'day') / 7);

    let trimester;
    if (weeks < 13) {
      trimester = 'First Trimester';
    } else if (weeks < 27) {
      trimester = 'Second Trimester';
    } else {
      trimester = 'Third Trimester';
    }

    setResult({
      due: due.format('MMM D, YYYY'),
      weeks,
      trimester
    });
  };

  return (
    <CalculatorLayout title="📅 Due Date Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Estimate your expected due date using the date of your last menstrual period (LMP). This calculator also shows your current week and trimester.
      </p>

      {/* 🔢 Inputs */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '400px',
        margin: '0 auto',
        marginBottom: '20px'
      }}>
        <input
          type="date"
          value={lmpDate}
          onChange={(e) => setLmpDate(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={calculateDueDate}
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
          Calculate Due Date
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
            fontSize: '1.1rem',
            color: '#333'
          }}>
            <p><strong>Estimated Due Date:</strong> {result.due}</p>
            <p><strong>Current Pregnancy Week:</strong> {result.weeks}</p>
            <p><strong>Trimester:</strong> {result.trimester}</p>
          </div>
        )
      )}
    </CalculatorLayout>
  );
}