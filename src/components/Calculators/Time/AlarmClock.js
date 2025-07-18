import React, { useState, useEffect } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function AlarmClock() {
  const [currentTime, setCurrentTime] = useState('');
  const [alarmTime, setAlarmTime] = useState('');
  const [alarmSet, setAlarmSet] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formatted = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setCurrentTime(formatted);

      if (alarmSet && formatted === alarmTime) {
        alert('⏰ Alarm ringing!');
        setAlarmSet(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [alarmTime, alarmSet]);

  const handleSetAlarm = () => {
    if (alarmTime) {
      setAlarmSet(true);
    }
  };

  const handleClearAlarm = () => {
    setAlarmSet(false);
    setAlarmTime('');
  };

  return (
    <CalculatorLayout title="🔔 Alarm Clock">
      <Helmet>
        <title>Alarm Clock – MapleAssist</title>
        <meta name="description" content="Set a custom alarm time and get notified when it rings. A simple browser-based alarm clock from MapleAssist." />
        <meta name="keywords" content="alarm clock, set alarm, mapleassist, time alert, wake up tool" />
      </Helmet>

      <BackButton />

      <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '24px', color: '#444' }}>
        Set an alarm for a specific time and get notified when it rings. Works offline and updates every second.
      </p>

      {/* 🕒 Current Time Display */}
      <div style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px', color: '#333' }}>
        Current Time: {currentTime}
      </div>

      {/* ⏰ Alarm Input */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '300px', margin: '0 auto', marginBottom: '20px' }}>
        <label>
          Set Alarm Time:
          <input
            type="time"
            value={alarmTime}
            onChange={(e) => setAlarmTime(e.target.value)}
            style={{ padding: '10px', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ccc', marginTop: '6px', width: '100%' }}
          />
        </label>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={handleSetAlarm}
            style={{ padding: '10px', backgroundColor: '#3f51b5', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer', flex: 1 }}
          >
            Set Alarm
          </button>
          <button
            onClick={handleClearAlarm}
            style={{ padding: '10px', backgroundColor: '#f44336', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer', flex: 1 }}
          >
            Clear
          </button>
        </div>
      </div>

      {/* 🔔 Status */}
      {alarmSet && (
        <div style={{ textAlign: 'center', fontSize: '1rem', color: '#4caf50' }}>
          Alarm set for <strong>{alarmTime}</strong>
        </div>
      )}
    </CalculatorLayout>
  );
}