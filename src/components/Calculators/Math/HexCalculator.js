import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function HexCalculator() {
  const [mode, setMode] = useState('add'); // add, subtract, multiply, divide, hex2dec, dec2hex, hex2bin, bin2hex
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [result, setResult] = useState(null);

  const isHex = (str) => /^[0-9A-Fa-f]+$/.test(str);
  const isDec = (str) => /^\d+$/.test(str);
  const isBin = (str) => /^[01]+$/.test(str);

  const calculate = () => {
    let res;

    try {
      switch (mode) {
        case 'hex2dec':
          if (!isHex(input1)) throw 'Invalid hex input';
          res = parseInt(input1, 16).toString(10);
          break;
        case 'dec2hex':
          if (!isDec(input1)) throw 'Invalid decimal input';
          res = parseInt(input1, 10).toString(16).toUpperCase();
          break;
        case 'hex2bin':
          if (!isHex(input1)) throw 'Invalid hex input';
          res = parseInt(input1, 16).toString(2);
          break;
        case 'bin2hex':
          if (!isBin(input1)) throw 'Invalid binary input';
          res = parseInt(input1, 2).toString(16).toUpperCase();
          break;
        default: {
          if (!isHex(input1) || !isHex(input2)) throw 'Invalid hex inputs';
          const a = parseInt(input1, 16);
          const b = parseInt(input2, 16);
          switch (mode) {
            case 'add': res = (a + b).toString(16).toUpperCase(); break;
            case 'subtract': res = (a - b).toString(16).toUpperCase(); break;
            case 'multiply': res = (a * b).toString(16).toUpperCase(); break;
            case 'divide':
              if (b === 0) throw 'Cannot divide by zero';
              res = Math.floor(a / b).toString(16).toUpperCase();
              break;
            default: throw 'Invalid operation';
          }
        }
      }

      setResult(res);
    } catch (err) {
      setResult(typeof err === 'string' ? err : 'Invalid input');
    }
  };

  return (
    <CalculatorLayout title="🔢 Hex Calculator">
      <Helmet>
        <title>Hex Calculator – MapleAssist</title>
        <meta name="description" content="Perform hexadecimal arithmetic and convert between hex, decimal, and binary formats. Supports addition, subtraction, multiplication, division, and base conversion." />
        <meta name="keywords" content="hex calculator, hexadecimal converter, hex arithmetic, base conversion, mapleassist math tool" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Choose an operation and enter hexadecimal, decimal, or binary values to calculate. This tool supports hex arithmetic and base conversions.
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
          <option value="add">Hex Addition</option>
          <option value="subtract">Hex Subtraction</option>
          <option value="multiply">Hex Multiplication</option>
          <option value="divide">Hex Division</option>
          <option value="hex2dec">Hex to Decimal</option>
          <option value="dec2hex">Decimal to Hex</option>
          <option value="hex2bin">Hex to Binary</option>
          <option value="bin2hex">Binary to Hex</option>
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
          placeholder={mode.includes('dec') ? 'Decimal input' : mode.includes('bin') ? 'Binary input' : 'Hex input 1'}
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
            placeholder="Hex input 2"
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
          backgroundColor: result.includes('Invalid') || result.includes('Cannot')
            ? '#fff6f6' : '#fff',
          color: result.includes('Invalid') || result.includes('Cannot')
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