import React, { useState } from 'react';
import dayjs from 'dayjs';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function ConceptionDateCalculator() {
  const [method, setMethod] = useState('last-period');
  const [date, setDate] = useState('');
  const [result, setResult] = useState(null);

  const calculateConception = () => {
    if (!date) {
      setResult('Please enter a valid date.');
      return;
    }

    const baseDate = dayjs(date);
    let conception;

    switch (method) {
      case 'last-period':
        conception = baseDate.add(14, 'day');
        break;
      case 'due-date':
        conception = baseDate.subtract(266, 'day');
        break;
      case 'ultrasound':
        conception = baseDate.subtract(14, 'day');
        break;
      default:
        setResult('Invalid method');
        return;
    }

    setResult(`Estimated Conception Date: ${conception.format('MMM D, YYYY')}`);
  };

  return (
    <CalculatorLayout title="🧬 Conception Date Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem', lineHeight: '1.6',
        marginBottom: '24px', color: '#444'
      }}>
        Estimate your conception date using last period, due date, or ultrasound timing. This tool helps predict when pregnancy likely began.
      </p>

      {/* 🔢 Inputs */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: '12px',
        maxWidth: '400px', margin: '0 auto', marginBottom: '20px'
      }}>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        >
          <option value="last-period">Last Menstrual Period</option>
          <option value="due-date">Estimated Due Date</option>
          <option value="ultrasound">Ultrasound Date</option>
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <button
          onClick={calculateConception}
          style={{
            padding: '10px', backgroundColor: '#3f51b5', color: '#fff',
            border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer'
          }}
        >
          Calculate Conception Date
        </button>
      </div>

      {/* 📊 Output */}
      {result && (
        typeof result === 'string' ? (
          <div style={{
            backgroundColor: '#fff', padding: '20px', borderRadius: '10px',
            boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
            maxWidth: '500px', margin: '0 auto',
            textAlign: 'center', fontSize: '1.1rem', color: '#333'
          }}>
            <strong>{result}</strong>
          </div>
        ) : null
      )}
    </CalculatorLayout>
  );
}