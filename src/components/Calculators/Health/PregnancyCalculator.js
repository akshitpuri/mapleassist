import React, { useState } from 'react';
import dayjs from 'dayjs';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function PregnancyCalculator() {
  const [method, setMethod] = useState('last-period');
  const [date, setDate] = useState('');
  const [result, setResult] = useState(null);

  const calculatePregnancy = () => {
    if (!date) {
      setResult('Please enter a valid date.');
      return;
    }

    const baseDate = dayjs(date);
    let conceptionDate, dueDate;

    switch (method) {
      case 'last-period':
        conceptionDate = baseDate.add(14, 'day');
        dueDate = baseDate.add(280, 'day');
        break;
      case 'due-date':
        conceptionDate = baseDate.subtract(266, 'day');
        dueDate = baseDate;
        break;
      case 'conception':
        dueDate = baseDate.add(266, 'day');
        conceptionDate = baseDate;
        break;
      case 'ultrasound':
        conceptionDate = baseDate.subtract(14, 'day');
        dueDate = baseDate.subtract(14, 'day').add(280, 'day');
        break;
      case 'ivf-transfer':
        dueDate = baseDate.add(266, 'day');
        conceptionDate = baseDate.subtract(1, 'day');
        break;
      default:
        setResult('Invalid method');
        return;
    }

    const today = dayjs();
    const daysPregnant = today.diff(conceptionDate, 'day');
    const weeksPregnant = Math.floor(daysPregnant / 7);

    let trimester;
    if (weeksPregnant < 13) {
      trimester = 'First Trimester';
    } else if (weeksPregnant < 27) {
      trimester = 'Second Trimester';
    } else {
      trimester = 'Third Trimester';
    }

    setResult({
      conception: conceptionDate.format('MMM D, YYYY'),
      due: dueDate.format('MMM D, YYYY'),
      weeks: weeksPregnant,
      trimester
    });
  };

  return (
    <CalculatorLayout title="🤰 Pregnancy Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem', lineHeight: '1.6', marginBottom: '24px', color: '#444'
      }}>
        Estimate pregnancy progress and due date using any of the following: last menstrual period, ultrasound, IVF transfer, conception date, or expected due date.
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
          <option value="conception">Conception Date</option>
          <option value="ultrasound">Ultrasound Date</option>
          <option value="ivf-transfer">IVF Transfer Date</option>
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
          onClick={calculatePregnancy}
          style={{
            padding: '10px', backgroundColor: '#3f51b5', color: '#fff',
            border: 'none', borderRadius: '6px', fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          Calculate Pregnancy
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
            <p><strong>Conception Date:</strong> {result.conception}</p>
            <p><strong>Estimated Due Date:</strong> {result.due}</p>
            <p><strong>Pregnancy Week:</strong> {result.weeks}</p>
            <p><strong>Trimester:</strong> {result.trimester}</p>
          </div>
        )
      )}
    </CalculatorLayout>
  );
}