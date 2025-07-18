import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function BinaryCalculator() {
  const [mode, setMode] = useState('add'); // add, subtract, multiply, divide, bin2dec, dec2bin
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [result, setResult] = useState(null);

  const isBinary = (str) => /^[01]+$/.test(str);
  const isDecimal = (str) => /^\d+$/.test(str);

  const calculate = () => {
    let res;

    if (mode === 'bin2dec') {
      if (!isBinary(input1)) {
        setResult('Please enter a valid binary number.');
        return;
      }
      res = parseInt(input1, 2).toString(10);
    } else if (mode === 'dec2bin') {
      if (!isDecimal(input1)) {
        setResult('Please enter a valid decimal number.');
        return;
      }
      res = parseInt(input1, 10).toString(2);
    } else {
      if (!isBinary(input1) || !isBinary(input2)) {
        setResult('Please enter valid binary numbers.');
        return;
      }

      const a = parseInt(input1, 2);
      const b = parseInt(input2, 2);

      switch (mode) {
        case 'add':
          res = (a + b).toString(2);
          break;
        case 'subtract':
          res = (a - b).toString(2);
          break;
        case 'multiply':
          res = (a * b).toString(2);
          break;
        case 'divide':
          if (b === 0) {
            setResult('Cannot divide by zero.');
            return;
          }
          res = Math.floor(a / b).toString(2);
          break;
        default:
          res = 'Invalid operation.';
      }
    }

    setResult(res);
  };

  return (
    <CalculatorLayout title="🔢 Binary Calculator">
      <Helmet>
        <title>Binary Calculator – MapleAssist</title>
        <meta name="description" content="Perform binary arithmetic and convert between binary and decimal formats. Supports addition, subtraction, multiplication, division, and base conversion." />
        <meta name="keywords" content="binary calculator, binary converter, binary arithmetic, base conversion, mapleassist math tool" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Choose an operation and enter binary or decimal values to calculate. This tool supports binary arithmetic and conversion between binary and decimal formats.
      </p>

      {/* 🔘 Mode Selection */}
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <select
          value={mode}
          onChange={(e) => {
            setMode(e.target.value);
            setResult(null);
          }}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        >
          <option value="add">Binary Addition</option>
          <option value="subtract">Binary Subtraction</option>
          <option value="multiply">Binary Multiplication</option>
          <option value="divide">Binary Division</option>
          <option value="bin2dec">Binary to Decimal</option>
          <option value="dec2bin">Decimal to Binary</option>
        </select>
      </div>

      {/* 🔢 Inputs */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '500px',
        margin: '0 auto',
        marginBottom: '20px'
      }}>
        <input
          type="text"
          placeholder={mode === 'dec2bin' ? 'Decimal number' : 'Binary number 1'}
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        {['add', 'subtract', 'multiply', 'divide'].includes(mode) && (
          <input
            type="text"
            placeholder="Binary number 2"
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
            style={{
              padding: '10px',
              fontSize: '1rem',
              borderRadius: '8px',
              border: '1px solid #ccc'
            }}
          />
        )}
        <button
          onClick={calculate}
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
          Calculate
        </button>
      </div>

      {/* 📊 Result */}
      {result && (
        <div style={{
          backgroundColor: result.includes('Please') || result.includes('Cannot')
            ? '#fff6f6' : '#fff',
          color: result.includes('Please') || result.includes('Cannot')
            ? '#f44336' : '#333',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
          maxWidth: '500px',
          margin: '0 auto',
          fontSize: '1.1rem',
          textAlign: 'center'
        }}>
          <strong>Result:</strong> {result}
        </div>
      )}
    </CalculatorLayout>
  );
}