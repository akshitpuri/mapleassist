import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function IntegerCalculator() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const a = parseInt(num1);
    const b = parseInt(num2);

    if (isNaN(a) || isNaN(b)) {
      setResult('Please enter valid integers.');
      return;
    }

    let res;
    switch (operation) {
      case 'add': res = a + b; break;
      case 'subtract': res = a - b; break;
      case 'multiply': res = a * b; break;
      case 'divide':
        if (b === 0) {
          setResult('Division by zero is undefined.');
          return;
        }
        res = Math.floor(a / b); break;
      default: res = 'Invalid operation';
    }

    setResult(`${a} ${operation === 'add' ? '+' : operation === 'subtract' ? '-' : operation === 'multiply' ? '×' : '÷'} ${b} = ${res}`);
  };

  return (
    <CalculatorLayout title="🔢 Integer Calculator">
      <Helmet>
        <title>Integer Calculator – MapleAssist</title>
        <meta name="description" content="Perform arithmetic operations on integers including addition, subtraction, multiplication, and division. Supports negative numbers and clean formatting." />
        <meta name="keywords" content="integer calculator, add integers, subtract integers, multiply integers, divide integers, mapleassist math tool" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Enter two integers and select an operation to perform. This tool supports:
        <br />
        <code>Add, Subtract, Multiply, Divide</code> — including negative numbers.
      </p>

      {/* 🔢 Inputs */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        maxWidth: '500px',
        margin: '0 auto',
        marginBottom: '20px'
      }}>
        <input type="number" placeholder="Integer 1" value={num1} onChange={(e) => setNum1(e.target.value)} />
        <input type="number" placeholder="Integer 2" value={num2} onChange={(e) => setNum2(e.target.value)} />
      </div>

      {/* 🔘 Operation Selector */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <select
          value={operation}
          onChange={(e) => {
            setOperation(e.target.value);
            setResult(null);
          }}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        >
          <option value="add">Add</option>
          <option value="subtract">Subtract</option>
          <option value="multiply">Multiply</option>
          <option value="divide">Divide</option>
        </select>
      </div>

      {/* 🧮 Calculate Button */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
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
          backgroundColor: result.includes('undefined') || result.includes('valid')
            ? '#fff6f6' : '#fff',
          color: result.includes('undefined') || result.includes('valid')
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