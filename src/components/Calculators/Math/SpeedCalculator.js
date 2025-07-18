import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function SpeedCalculator() {
  const [mode, setMode] = useState('speed'); // 'speed', 'distance', 'time'
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');
  const [speed, setSpeed] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const d = parseFloat(distance);
    const t = parseFloat(time);
    const s = parseFloat(speed);

    switch (mode) {
      case 'speed':
        if (isNaN(d) || isNaN(t) || t <= 0) {
          setResult('Please enter valid distance and time. Time must be greater than zero.');
          return;
        }
        setResult({ type: 'Speed', value: (d / t).toFixed(4), units: 'units/time' });
        break;
      case 'distance':
        if (isNaN(s) || isNaN(t) || t <= 0) {
          setResult('Please enter valid speed and time. Time must be greater than zero.');
          return;
        }
        setResult({ type: 'Distance', value: (s * t).toFixed(4), units: 'units' });
        break;
      case 'time':
        if (isNaN(d) || isNaN(s) || s <= 0) {
          setResult('Please enter valid distance and speed. Speed must be greater than zero.');
          return;
        }
        setResult({ type: 'Time', value: (d / s).toFixed(4), units: 'time units' });
        break;
      default:
        setResult('Invalid calculation mode.');
    }
  };

  return (
    <CalculatorLayout title="🚗 Speed Calculator">
      <Helmet>
        <title>Speed Calculator – MapleAssist</title>
        <meta name="description" content="Calculate speed, distance, or time using the formula speed = distance / time. Supports flexible input formats and clean output." />
        <meta name="keywords" content="speed calculator, distance time calculator, travel speed, mapleassist math tool" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Select what you want to calculate — <strong>speed</strong>, <strong>distance</strong>, or <strong>time</strong> — and enter the other two values. The formula used is:
        <br />
        <code>Speed = Distance ÷ Time</code>
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
          <option value="speed">Calculate Speed</option>
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
        {(mode === 'speed' || mode === 'time') && (
          <input
            type="number"
            placeholder="Distance"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            style={{
              padding: '10px',
              fontSize: '1rem',
              borderRadius: '8px',
              border: '1px solid #ccc'
            }}
          />
        )}
        {(mode === 'speed' || mode === 'distance') && (
          <input
            type="number"
            placeholder="Time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            style={{
              padding: '10px',
              fontSize: '1rem',
              borderRadius: '8px',
              border: '1px solid #ccc'
            }}
          />
        )}
        {(mode === 'distance' || mode === 'time') && (
          <input
            type="number"
            placeholder="Speed"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
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

      {/* 📊 Result Display */}
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