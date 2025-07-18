import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function RomanNumeralDateConverter() {
  const [mode, setMode] = useState('to-roman');
  const [dateInput, setDateInput] = useState('');
  const [result, setResult] = useState(null);

  const romanMap = [
    { value: 1000, numeral: 'M' },
    { value: 900, numeral: 'CM' },
    { value: 500, numeral: 'D' },
    { value: 400, numeral: 'CD' },
    { value: 100, numeral: 'C' },
    { value: 90, numeral: 'XC' },
    { value: 50, numeral: 'L' },
    { value: 40, numeral: 'XL' },
    { value: 10, numeral: 'X' },
    { value: 9, numeral: 'IX' },
    { value: 5, numeral: 'V' },
    { value: 4, numeral: 'IV' },
    { value: 1, numeral: 'I' }
  ];

  const toRoman = (num) => {
    let result = '';
    for (const { value, numeral } of romanMap) {
      while (num >= value) {
        result += numeral;
        num -= value;
      }
    }
    return result;
  };

  const fromRoman = (str) => {
    const values = { M:1000, D:500, C:100, L:50, X:10, V:5, I:1 };
    let total = 0, prev = 0;

    for (let char of str.toUpperCase()) {
      const val = values[char];
      if (!val) return NaN;
      total += val < prev ? -val : val;
      prev = val;
    }
    return total;
  };

  const convertDate = () => {
    if (!dateInput) {
      setResult('Please enter a valid date.');
      return;
    }

    if (mode === 'to-roman') {
      const date = new Date(dateInput);
      if (isNaN(date.getTime())) {
        setResult('Invalid date.');
        return;
      }
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const romanDay = toRoman(day);
      const romanMonth = toRoman(month);
      const romanYear = toRoman(year);

      setResult(`${romanDay}/${romanMonth}/${romanYear}`);
    } else {
      const parts = dateInput.split('/');
      if (parts.length !== 3) {
        setResult('Enter format as DD/MM/YYYY in Roman numerals.');
        return;
      }

      const d = fromRoman(parts[0]);
      const m = fromRoman(parts[1]);
      const y = fromRoman(parts[2]);

      if (isNaN(d) || isNaN(m) || isNaN(y)) {
        setResult('Invalid Roman numeral format.');
        return;
      }

      const padded = (val) => val.toString().padStart(2, '0');
      setResult(`${padded(d)}/${padded(m)}/${y}`);
    }
  };

  return (
    <CalculatorLayout title="📆 Roman Numeral Date Converter">
      <BackButton />
      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Convert calendar dates to Roman numerals and back. Useful for events, history themes, inscriptions, or stylized displays.
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
        <select value={mode} onChange={(e) => {
          setMode(e.target.value);
          setDateInput('');
          setResult(null);
        }} style={{
          padding: '10px', fontSize: '1rem',
          borderRadius: '8px', border: '1px solid #ccc'
        }}>
          <option value="to-roman">Standard → Roman</option>
          <option value="from-roman">Roman → Standard</option>
        </select>

        <input
          type={mode === 'to-roman' ? 'date' : 'text'}
          placeholder={mode === 'to-roman' ? undefined : 'e.g. V/XI/MMXXIII'}
          value={dateInput}
          onChange={(e) => setDateInput(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />

        <button onClick={convertDate} style={{
          padding: '10px', backgroundColor: '#3f51b5',
          color: '#fff', border: 'none',
          borderRadius: '6px', fontSize: '1rem',
          cursor: 'pointer'
        }}>
          Convert Date
        </button>
      </div>

      {/* 📊 Output */}
      {result && (
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
          <strong>Converted Date:</strong><br />
          {result}
        </div>
      )}
    </CalculatorLayout>
  );
}