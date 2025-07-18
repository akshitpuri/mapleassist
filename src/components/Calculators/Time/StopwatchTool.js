import React, { useState, useRef, useEffect } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function StopwatchTool() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  const formatTime = (t) => {
    const h = Math.floor(t / 3600);
    const m = Math.floor((t % 3600) / 60);
    const s = t % 60;
    return `${h.toString().padStart(2, '0')}:${m
      .toString()
      .padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const startStopwatch = () => {
    if (!isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
      setIsRunning(true);
    }
  };

  const pauseStopwatch = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const resetStopwatch = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setLaps([]);
    setIsRunning(false);
  };

  const addLap = () => {
    setLaps([...laps, formatTime(time)]);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <CalculatorLayout title="⏱️ Stopwatch">
      <Helmet>
        <title>Stopwatch – MapleAssist</title>
        <meta name="description" content="Track time with precision using MapleAssist's stopwatch. Start, pause, reset, and record lap times — perfect for sports, cooking, and productivity." />
        <meta name="keywords" content="stopwatch, lap timer, online stopwatch, mapleassist, time tracker" />
      </Helmet>

      <BackButton />

      <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '24px', color: '#444' }}>
        Start a stopwatch to measure elapsed time with second-level precision. Record lap intervals and reset anytime — ideal for workouts, tasks, or experiments.
      </p>

      {/* ⏱ Display */}
      <div style={{ fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px', color: '#333' }}>
        {formatTime(time)}
      </div>

      {/* 🎛 Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {!isRunning ? (
          <button
            onClick={startStopwatch}
            style={{ padding: '10px 16px', backgroundColor: '#3f51b5', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer' }}
          >
            Start
          </button>
        ) : (
          <button
            onClick={pauseStopwatch}
            style={{ padding: '10px 16px', backgroundColor: '#f57c00', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer' }}
          >
            Pause
          </button>
        )}
        <button
          onClick={resetStopwatch}
          style={{ padding: '10px 16px', backgroundColor: '#f44336', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer' }}
        >
          Reset
        </button>
        <button
          onClick={addLap}
          disabled={!isRunning}
          style={{ padding: '10px 16px', backgroundColor: '#4caf50', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer' }}
        >
          Lap
        </button>
      </div>

      {/* 🧾 Lap List */}
      {laps.length > 0 && (
        <div style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: '#fff', padding: '16px', borderRadius: '10px', boxShadow: '0 1px 6px rgba(0,0,0,0.08)' }}>
          <h3 style={{ marginBottom: '12px' }}>Lap Times:</h3>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            {laps.map((lap, idx) => (
              <li key={idx} style={{ padding: '6px 0', borderBottom: '1px solid #eee' }}>
                Lap {idx + 1}: {lap}
              </li>
            ))}
          </ul>
        </div>
      )}
    </CalculatorLayout>
  );
}