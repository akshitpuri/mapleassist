import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function NumberToWords() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const ones = [
    '', 'one', 'two', 'three', 'four',
    'five', 'six', 'seven', 'eight', 'nine'
  ];

  const teens = [
    'ten', 'eleven', 'twelve', 'thirteen', 'fourteen',
    'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
  ];

  const tens = [
    '', '', 'twenty', 'thirty', 'forty',
    'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
  ];

  const scales = [
    '', 'thousand', 'million', 'billion', 'trillion'
  ];

  const convertChunk = (num) => {
    let result = '';
    if (num >= 100) {
      result += ones[Math.floor(num / 100)] + ' hundred ';
      num %= 100;
    }
    if (num >= 10 && num < 20) {
      result += teens[num - 10] + ' ';
    } else {
      if (num >= 20) {
        result += tens[Math.floor(num / 10)] + ' ';
        num %= 10;
      }
      if (num > 0) {
        result += ones[num] + ' ';
      }
    }
    return result.trim();
  };

  const convertNumberToWords = (num) => {
    if (num === 0) return 'zero';
    const chunks = [];
    while (num > 0) {
      chunks.push(num % 1000);
      num = Math.floor(num / 1000);
    }

    const words = chunks.map((chunk, idx) =>
      chunk ? `${convertChunk(chunk)} ${scales[idx]}`.trim() : ''
    ).filter(Boolean).reverse();

    return words.join(', ');
  };

  const handleConvert = () => {
    const number = parseInt(input);
    if (isNaN(number) || number < 0) {
      setOutput('Please enter a valid non-negative number.');
    } else {
      setOutput(convertNumberToWords(number));
    }
  };

  return (
    <CalculatorLayout title="🔢 Number to Words Converter">
      <BackButton />
      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Enter any whole number to convert it into its word form. Great for writing checks, documents, or understanding number structure. Example: <code>2025 → "two thousand, twenty-five"</code>.
      </p>

      {/* 🔢 Input */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '400px',
        margin: '0 auto',
        marginBottom: '20px'
      }}>
        <input
          type="number"
          min="0"
          placeholder="Enter a whole number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={handleConvert}
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
          Convert to Words
        </button>
      </div>

      {/* 📊 Result */}
      {output && (
        typeof output === 'string' ? (
          <div style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
            maxWidth: '500px',
            margin: '0 auto',
            fontSize: '1.1rem',
            color: '#333',
            textAlign: 'center'
          }}>
            <strong>{output}</strong>
          </div>
        ) : null
      )}
    </CalculatorLayout>
  );
}