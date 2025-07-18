import React, { useState, useEffect, useRef } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function TimerTool() {
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [timeLeft, setTimeLeft] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  const startTimer = () => {
    const totalSeconds =
      (parseInt(hours) || 0) * 3600 +
      (parseInt(minutes) || 0) * 60 +
      (parseInt(seconds) || 0);

    if (totalSeconds > 0) {
      setTimeLeft(totalSeconds);
      setIsRunning(true);
    }
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setTimeLeft(null);
    setIsRunning(false);
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(timerRef.current);
      setIsRunning(false);
      alert('⏰ Time’s up!');
    }
  }, [timeLeft]);

  const formatTime = (total) => {
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    return `${h.toString().padStart(2, '0')}:${m
      .toString()
      .padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <CalculatorLayout title="⏲️ Timer">
      <Helmet>
        <title>Timer – MapleAssist</title>
        <meta name="description" content="Set a countdown timer with hours, minutes, and seconds. Perfect for productivity, workouts, and focus sessions." />
        <meta name="keywords" content="timer, countdown, online timer, mapleassist, productivity timer" />
      </Helmet>

      <BackButton />

      <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '24px', color: '#444' }}>
        Set a countdown timer for any task — whether it’s a Pomodoro session, workout, or baking a cake. Runs fully offline in your browser.
      </p>

      {/* ⏱ Inputs */}
      {!isRunning && (
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
          <input
            type="number"
            min="0"
            placeholder="Hours"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            style={{ padding: '10px', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ccc', width: '100px' }}
          />
          <input
            type="number"
            min="0"
            placeholder="Minutes"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            style={{ padding: '10px', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ccc', width: '100px' }}
          />
          <input
            type="number"
            min="0"
            placeholder="Seconds"
            value={seconds}
            onChange={(e) => setSeconds(e.target.value)}
            style={{ padding: '10px', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ccc', width: '100px' }}
          />
          <button
            onClick={startTimer}
            style={{ padding: '10px 16px', backgroundColor: '#3f51b5', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer' }}
          >
            Start Timer
          </button>
        </div>
      )}

      {/* 📊 Countdown Display */}
      {timeLeft !== null && (
        <div style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px', color: '#333' }}>
          {formatTime(timeLeft)}
        </div>
      )}

      {/* 🔁 Reset Button */}
      {isRunning && (
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={resetTimer}
            style={{ padding: '10px 16px', backgroundColor: '#f44336', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer' }}
          >
            Reset Timer
          </button>
        </div>
      )}
    </CalculatorLayout>
  );
}