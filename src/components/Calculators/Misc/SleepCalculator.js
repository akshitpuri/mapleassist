import React, { useState, useEffect } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function SleepCalculator() {
  const [mode, setMode] = useState('wake'); // 'wake' or 'sleep'
  const [time, setTime] = useState('');
  const [cycleCount, setCycleCount] = useState(5); // 3–6 cycles
  const [results, setResults] = useState([]);
  const [nextDiff, setNextDiff] = useState(null);

  // 🌀 Inject keyframe animation on mount
  useEffect(() => {
    const keyframes = `
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-6px); }
        100% { transform: translateY(0px); }
      }
    `;
    const styleEl = document.createElement('style');
    styleEl.innerHTML = keyframes;
    document.head.appendChild(styleEl);
  }, []);

  const calculateTimes = () => {
    if (!time) return;

    const inputTime = new Date(`1970-01-01T${time}`);
    const times = [];

    for (let i = 1; i <= cycleCount; i++) {
      const offset = 90 * i * 60 * 1000;
      const target = new Date(
        mode === 'wake'
          ? inputTime.getTime() - offset
          : inputTime.getTime() + offset
      );

      times.push(target);
    }

    const readableTimes = times.map((t) =>
      t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );
    setResults(readableTimes);

    const now = new Date();
    const nextTime = times[0];
    const diffMs = Math.abs(nextTime - now);
    const hrs = Math.floor(diffMs / 3600000);
    const mins = Math.round((diffMs % 3600000) / 60000);
    setNextDiff({ hrs, mins });
  };

  return (
    <CalculatorLayout title="💤 Sleep Cycle Calculator">
      <BackButton />

      <p style={description}>
        Discover the best times to sleep or wake up — based on science-backed 90-minute sleep cycles.
      </p>

      {/* 🛏️ Input Controls */}
      <div style={controls}>
        <select value={mode} onChange={(e) => setMode(e.target.value)} style={selectStyle}>
          <option value="wake">I want to wake up at</option>
          <option value="sleep">I want to go to bed at</option>
        </select>

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          style={selectStyle}
        />

        <select value={cycleCount} onChange={(e) => setCycleCount(Number(e.target.value))} style={selectStyle}>
          {[3, 4, 5, 6].map((c) => (
            <option key={c} value={c}>{c} cycles ({(c * 1.5).toFixed(1)} hrs)</option>
          ))}
        </select>

        <button onClick={calculateTimes} style={buttonStyle}>
          Calculate Sleep Times
        </button>
      </div>

      {/* 🌙 Results */}
      {results.length > 0 && (
        <div style={resultBox}>
          <h3 style={{ marginBottom: '12px' }}>
            Recommended {mode === 'wake' ? 'bedtimes' : 'wake-up times'}:
          </h3>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            {results.map((t, i) => (
              <li key={i} style={{ padding: '6px 0' }}>🛏️ {t}</li>
            ))}
          </ul>

          {nextDiff && (
            <p style={nextTag}>
              ⏱️ Your next suggested {mode === 'wake' ? 'bedtime' : 'wake-up time'} is in {nextDiff.hrs}h {nextDiff.mins}m
            </p>
          )}

          <div style={moonStyle}>🌙✨</div>
        </div>
      )}
    </CalculatorLayout>
  );
}

// 🎨 Inline styles
const description = {
  fontSize: '1rem',
  lineHeight: '1.6',
  marginBottom: '20px',
  color: '#444',
  textAlign: 'center'
};

const controls = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  maxWidth: '420px',
  margin: '0 auto',
  marginBottom: '20px'
};

const selectStyle = {
  padding: '10px',
  fontSize: '1rem',
  borderRadius: '8px',
  border: '1px solid #ccc'
};

const buttonStyle = {
  padding: '10px',
  backgroundColor: '#b22222',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  fontSize: '1rem',
  cursor: 'pointer'
};

const resultBox = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
  maxWidth: '500px',
  margin: '0 auto',
  textAlign: 'center',
  fontSize: '1.1rem',
  color: '#333'
};

const nextTag = {
  marginTop: '12px',
  fontStyle: 'italic',
  color: '#555',
  fontSize: '0.95rem'
};

const moonStyle = {
  fontSize: '2rem',
  marginTop: '14px',
  animation: 'float 4s infinite ease-in-out'
};