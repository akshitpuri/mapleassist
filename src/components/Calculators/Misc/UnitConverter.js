import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function UnitConverter() {
  const [category, setCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [value, setValue] = useState('');
  const [result, setResult] = useState(null);

  const units = {
    length: ['meter', 'kilometer', 'centimeter', 'millimeter', 'mile', 'yard', 'foot', 'inch'],
    weight: ['gram', 'kilogram', 'milligram', 'pound', 'ounce'],
    volume: ['liter', 'milliliter', 'gallon', 'quart', 'pint', 'cup', 'fluid ounce'],
    temperature: ['celsius', 'fahrenheit', 'kelvin'],
    time: ['second', 'minute', 'hour', 'day']
  };

  const conversions = {
    length: {
      meter: 1,
      kilometer: 1000,
      centimeter: 0.01,
      millimeter: 0.001,
      mile: 1609.34,
      yard: 0.9144,
      foot: 0.3048,
      inch: 0.0254
    },
    weight: {
      gram: 1,
      kilogram: 1000,
      milligram: 0.001,
      pound: 453.592,
      ounce: 28.3495
    },
    volume: {
      liter: 1,
      milliliter: 0.001,
      gallon: 3.78541,
      quart: 0.946353,
      pint: 0.473176,
      cup: 0.24,
      'fluid ounce': 0.0295735
    },
    time: {
      second: 1,
      minute: 60,
      hour: 3600,
      day: 86400
    }
  };

  const convert = () => {
    const input = parseFloat(value);
    if (isNaN(input) || input <= 0 || !fromUnit || !toUnit) {
      setResult('Please enter valid numeric value and units.');
      return;
    }

    if (category === 'temperature') {
      let output;
      if (fromUnit === toUnit) {
        output = input;
      } else if (fromUnit === 'celsius') {
        output = toUnit === 'fahrenheit' ? input * 9/5 + 32 : input + 273.15;
      } else if (fromUnit === 'fahrenheit') {
        output = toUnit === 'celsius' ? (input - 32) * 5/9 : (input - 32) * 5/9 + 273.15;
      } else {
        output = toUnit === 'celsius' ? input - 273.15 : (input - 273.15) * 9/5 + 32;
      }
      setResult(`${input} ${fromUnit} = ${output.toFixed(2)} ${toUnit}`);
    } else {
      const base = input * conversions[category][fromUnit];
      const output = base / conversions[category][toUnit];
      setResult(`${input} ${fromUnit} = ${output.toFixed(4)} ${toUnit}`);
    }
  };

  return (
    <CalculatorLayout title="🔁 Unit Converter">
      <BackButton />
      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Convert between common measurement units across categories like length, weight, volume, temperature, and time. Great for school, travel, and work.
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
        <select value={category} onChange={(e) => {
          setCategory(e.target.value);
          setFromUnit('');
          setToUnit('');
        }} style={{
          padding: '10px',
          fontSize: '1rem',
          borderRadius: '8px',
          border: '1px solid #ccc'
        }}>
          {Object.keys(units).map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />

        <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} style={{
          padding: '10px',
          fontSize: '1rem',
          borderRadius: '8px',
          border: '1px solid #ccc'
        }}>
          <option value="">From Unit</option>
          {units[category].map(unit => (
            <option key={unit} value={unit}>{unit}</option>
          ))}
        </select>

        <select value={toUnit} onChange={(e) => setToUnit(e.target.value)} style={{
          padding: '10px',
          fontSize: '1rem',
          borderRadius: '8px',
          border: '1px solid #ccc'
        }}>
          <option value="">To Unit</option>
          {units[category].map(unit => (
            <option key={unit} value={unit}>{unit}</option>
          ))}
        </select>

        <button onClick={convert} style={{
          padding: '10px',
          backgroundColor: '#3f51b5',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '1rem',
          cursor: 'pointer'
        }}>
          Convert Units
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
          <strong>{result}</strong>
        </div>
      )}
    </CalculatorLayout>
  );
}