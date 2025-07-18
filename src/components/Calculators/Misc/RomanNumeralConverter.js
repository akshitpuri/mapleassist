import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function RomanNumeralConverter() {
  const [mode, setMode] = useState('to-roman');
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const toRoman = (num) => {
    if (num <= 0 || num > 3999999) return 'Out of range';
    const map = [
      [1000000, 'M̄'], [900000, 'C̄M̄'], [500000, 'D̄'], [400000, 'C̄D̄'],
      [100000, 'C̄'], [90000, 'X̄C̄'], [50000, 'L̄'], [40000, 'X̄L̄'],
      [10000, 'X̄'], [9000, 'ĪX̄'], [5000, 'V̄'], [4000, 'ĪV̄'],
      [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
      [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
      [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
    ];
    let result = '';
    for (let [value, numeral] of map) {
      while (num >= value) {
        result += numeral;
        num -= value;
      }
    }
    return result;
  };

  const fromRoman = (str) => {
    const romanMap = {
      M: 1000, D: 500, C: 100, L: 50,
      X: 10, V: 5, I: 1
    };
    let total = 0, prev = 0;
    for (let char of str.toUpperCase()) {
      const val = romanMap[char];
      if (!val) return 'Invalid Roman numeral';
      total += val < prev ? -val : val;
      prev = val;
    }
    return total;
  };

  const convert = () => {
    if (!input) {
      setResult('Please enter a value.');
      return;
    }
    let output;
    if (mode === 'to-roman') {
      const num = parseInt(input);
      output = isNaN(num) ? 'Invalid number' : toRoman(num);
    } else {
      output = fromRoman(input);
    }
    setResult(output);
  };

  return (
    <CalculatorLayout title="📜 Roman Numeral Converter">
      <BackButton />
      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Convert numbers to Roman numerals and vice versa. Supports values up to 3,999,999 with extended symbols. Great for dates, design, or historical projects.
      </p>

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
          setInput('');
          setResult(null);
        }} style={{
          padding: '10px', fontSize: '1rem',
          borderRadius: '8px', border: '1px solid #ccc'
        }}>
          <option value="to-roman">Arabic → Roman</option>
          <option value="from-roman">Roman → Arabic</option>
        </select>

        <input
          type="text"
          placeholder={mode === 'to-roman' ? 'Enter a number' : 'Enter a Roman numeral'}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />

        <button onClick={convert} style={{
          padding: '10px',
          backgroundColor: '#3f51b5',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '1rem',
          cursor: 'pointer'
        }}>
          Convert
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
          <strong>Result:</strong> <br />
          {result}
        </div>
      )}
    </CalculatorLayout>
  );
}