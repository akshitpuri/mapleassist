import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function VelocityCalculator() {
  const [mode, setMode] = useState('velocity'); // 'velocity', 'distance', 'time'
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');
  const [velocity, setVelocity] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const d = parseFloat(distance);
    const t = parseFloat(time);
    const v = parseFloat(velocity);

    switch (mode) {
      case 'velocity':
        if (isNaN(d) || isNaN(t) || t === 0) {
          setResult('Please enter valid distance and time.');
          return;
        }
        setResult({
          type: 'Velocity',
          value: (d / t).toFixed(4),
          units: 'm/s'
        });
        break;
      case 'distance':
        if (isNaN(v) || isNaN(t)) {
          setResult('Please enter valid velocity and time.');
          return;
        }
        setResult({
          type: 'Distance',
          value: (v * t).toFixed(4),
          units: 'm'
        });
        break;
      case 'time':
        if (isNaN(d) || isNaN(v) || v === 0) {
          setResult('Please enter valid distance and velocity.');
          return;
        }
        setResult({
          type: 'Time',
          value: (d / v).toFixed(4),
          units: 's'
        });
        break;
      default:
        setResult('Invalid calculation mode.');
    }
  };

  return (
    <CalculatorLayout title="🚗 Velocity Calculator">
      <Helmet>
        <title>Velocity Calculator – MapleAssist</title>
        <meta name="description" content="Calculate velocity, distance, or time using the formula v = d/t. Supports physics and motion analysis." />
        <meta name="keywords" content="velocity calculator, distance time speed, motion physics, mapleassist science calculator" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Select what you want to calculate — <strong>velocity</strong>, <strong>distance</strong>, or <strong>time</strong> — and enter the other two values. This tool uses:
        <br />
        <code>v = d / t</code>
      </p>

      {/* 🔘 Mode Selector */}
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
          <option value="velocity">Calculate Velocity</option>
          <option value="distance">Calculate Distance</option>
          <option value="time">Calculate Time</option>
        </select>
      </div>

      {/* 🔢 Inputs */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '400px',
        margin: '0 auto',
        marginBottom: '20px'
      }}>
        {(mode === 'velocity' || mode === 'time') && (
          <input
            type="number"
            placeholder="Distance (m)"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          />
        )}
        {(mode === 'velocity' || mode === 'distance') && (
          <input
            type="number"
            placeholder="Time (s)"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        )}
        {(mode === 'distance' || mode === 'time') && (
          <input
            type="number"
            placeholder="Velocity (m/s)"
            value={velocity}
            onChange={(e) => setVelocity(e.target.value)}
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

      {/* 📊 Output */}
      {typeof result === 'string' ? (
        <div style={{
          color: '#f44336',
          backgroundColor: '#fff6f6',
          padding: '12px',
          borderRadius: '6px',
          maxWidth: '500px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          {result}
        </div>
      ) : result && (
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
          <p><strong>{result.type}:</strong> {result.value} {result.units}</p>
        </div>
      )}
    </CalculatorLayout>
  );
}