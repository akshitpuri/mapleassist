import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function FeetInchesCalculator() {
  const [feet1, setFeet1] = useState('');
  const [inches1, setInches1] = useState('');
  const [feet2, setFeet2] = useState('');
  const [inches2, setInches2] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState(null);

  const convertToInches = (ft, inVal) => (ft * 12) + inVal;

  const formatOutput = (totalInches) => {
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return `${feet}ft ${inches}in`;
  };

  const calculate = () => {
    const f1 = parseFloat(feet1) || 0;
    const i1 = parseFloat(inches1) || 0;
    const f2 = parseFloat(feet2) || 0;
    const i2 = parseFloat(inches2) || 0;

    const val1 = convertToInches(f1, i1);
    const val2 = convertToInches(f2, i2);

    let resultInches = 0;

    switch (operation) {
      case 'add':
        resultInches = val1 + val2;
        break;
      case 'subtract':
        resultInches = val1 - val2;
        break;
      case 'multiply':
        resultInches = val1 * val2;
        break;
      case 'divide':
        if (val2 === 0) {
          setResult('Cannot divide by zero.');
          return;
        }
        resultInches = val1 / val2;
        setResult(`${resultInches.toFixed(2)} times`);
        return;
      default:
        setResult('Invalid operation');
        return;
    }

    if (resultInches < 0) {
      setResult('Result is negative — check inputs.');
      return;
    }

    setResult(formatOutput(resultInches));
  };

  return (
    <CalculatorLayout title="📐 Feet and Inches Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem', lineHeight: '1.6',
        marginBottom: '24px', color: '#444'
      }}>
        Perform math operations on feet and inches: add, subtract, multiply, or divide. This tool simplifies imperial unit calculations for measurements and construction.
      </p>

      <div style={{
        display: 'flex', flexDirection: 'column',
        gap: '12px', maxWidth: '400px',
        margin: '0 auto', marginBottom: '20px'
      }}>
        <input
          type="number" placeholder="Feet (1st)"
          value={feet1}
          onChange={(e) => setFeet1(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="number" placeholder="Inches (1st)"
          value={inches1}
          onChange={(e) => setInches1(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="number" placeholder="Feet (2nd)"
          value={feet2}
          onChange={(e) => setFeet2(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="number" placeholder="Inches (2nd)"
          value={inches2}
          onChange={(e) => setInches2(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />

        <select value={operation} onChange={(e) => setOperation(e.target.value)} style={{
          padding: '10px', fontSize: '1rem',
          borderRadius: '8px', border: '1px solid #ccc'
        }}>
          <option value="add">Add</option>
          <option value="subtract">Subtract</option>
          <option value="multiply">Multiply</option>
          <option value="divide">Divide</option>
        </select>

        <button onClick={calculate} style={{
          padding: '10px', backgroundColor: '#3f51b5',
          color: '#fff', border: 'none',
          borderRadius: '6px', fontSize: '1rem',
          cursor: 'pointer'
        }}>
          Calculate
        </button>
      </div>

      {result && (
        <div style={{
          backgroundColor: '#fff', padding: '20px',
          borderRadius: '10px', boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
          maxWidth: '500px', margin: '0 auto',
          textAlign: 'center', fontSize: '1.1rem',
          color: '#333'
        }}>
          <strong>Result:</strong><br />
          {result}
        </div>
      )}
    </CalculatorLayout>
  );
}