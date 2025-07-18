import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackButton from '../../BackButton';


const timeTools = [
  {
    name: 'Age Calculator',
    path: '/calculators/time/age',
    description: 'Determine your exact age in years, months, and days using your birthdate.',
    icon: '🎂'
  },
  {
    name: 'Date Calculator',
    path: '/calculators/time/date',
    description: 'Find the date difference between two calendar dates.',
    icon: '📆'
  },
  {
    name: 'Duration Calculator',
    path: '/calculators/time/duration',
    description: 'Calculate duration between two times, including AM/PM format.',
    icon: '⏱️'
  },
  {
    name: 'Hours Calculator',
    path: '/calculators/time/hours',
    description: 'Add or subtract hours to quickly get total working time.',
    icon: '🕑'
  },
  {
    name: 'Time Calculator',
    path: '/calculators/time/time',
    description: 'Convert and manipulate time formats across hours, minutes, and seconds.',
    icon: '⌚'
  },
  {
    name: 'Hours and Minutes Calculator',
    path: '/calculators/time/hours-minutes',
    description: 'Easily total multiple time entries in hours and minutes — ideal for work tracking and task logging.',
    icon: '🕒'
  },
  {
    name: 'Time to Decimal Calculator',
    path: '/calculators/time/time-to-decimal',
    description: 'Convert HH:MM:SS into decimal hours or minutes for accurate reporting and formatting.',
    icon: '📐'
  },
  {
    name: 'Days Calculator',
    path: '/calculators/time/days-between',
    description: 'Count days between any two dates, with options to exclude weekends or holidays.',
    icon: '📆'
  },
  {
    name: 'Timer',
    path: '/calculators/time/timer',
    description: 'Use a simple online timer to manage sessions, breaks, workouts, and focus blocks.',
    icon: '⏲️'
  },
  {
    name: 'Stopwatch',
    path: '/calculators/time/stopwatch',
    description: 'Start a precision stopwatch for sports, productivity, and timing tasks.',
    icon: '⏱️'
  },
  {
    name: 'Alarm Clock',
    path: '/calculators/time/alarm-clock',
    description: 'Set custom alarm times to boost your schedule or wake routine — fully browser-based.',
    icon: '🔔'
  },
  {
    name: 'Metronome',
    path: '/calculators/time/metronome',
    description: 'Steady your rhythm with a customizable metronome — great for musicians and timing drills.',
    icon: '🎼'
  }

];

export default function TimeHome() {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filteredTools = timeTools.filter(tool =>
    tool.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main style={{
      backgroundColor: '#f7f9fb',
      minHeight: '100vh',
      padding: '40px 20px',
      display: 'flex',
      justifyContent: 'center'
    }}>
      <div style={{ width: '100%', maxWidth: '1100px' }}>
        {/* ⏳ Title + Back Button */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: isMobile ? 'center' : 'space-between',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '32px',
          textAlign: isMobile ? 'center' : 'left',
          flexWrap: 'wrap'
        }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 700,
            color: '#2c2c2c',
            margin: 0,
            textAlign: isMobile ? 'center' : 'left'
          }}>
            Time Calculators
          </h1>
          <div style={{
            display: 'flex',
            justifyContent: isMobile ? 'center' : 'flex-end',
            width: isMobile ? '100%' : 'auto'
          }}>
            <BackButton />
          </div>
        </div>

        {/* 🧭 Introduction */}
        <section style={{
          marginBottom: '36px',
          color: '#4a4a4a',
          fontSize: '1rem',
          lineHeight: '1.6'
        }}>
          <p style={{ marginBottom: '16px' }}>
            MapleAssist’s time calculators help users organize, compute, and plan chronologically with confidence. From date differences to age tracking, these tools simplify workflows and enhance precision—fully offline, distraction-free, and mobile-ready.
          </p>
          <ul style={{
            paddingLeft: '20px',
            marginBottom: '16px',
            fontSize: '0.95rem',
            color: '#555',
            lineHeight: '1.6'
          }}>
            <li>🎂 Age and birthday difference calculators</li>
            <li>⏳ Duration and total time format converters</li>
            <li>⏱️ Timers, alarms and stopwatch utilities</li>
            <li>🔒 Built with privacy-first design — no data tracking</li>
          </ul>
        </section>

        {/* 🔍 Search Input */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search time tools..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              padding: '10px 14px',
              fontSize: '1rem',
              borderRadius: '8px',
              border: '1px solid #ccc',
              width: '100%',
              maxWidth: '400px'
            }}
          />
        </div>

        {/* 🧮 Tool Grid */}
        <section style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '28px',
          marginBottom: '60px'
        }}>
          {filteredTools.map(({ name, path, icon, description }, i) => (
            <Link key={i} to={path} style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '12px',
              boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
              textDecoration: 'none',
              color: '#2c2c2c',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              transition: 'transform 0.2s ease-in-out'
            }}>
              <div style={{ fontSize: '1.8rem' }}>{icon}</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 600 }}>{name}</h3>
              <p style={{ fontSize: '0.95rem', color: '#555', lineHeight: '1.5' }}>{description}</p>
            </Link>
          ))}

          {filteredTools.length === 0 && (
            <p style={{
              textAlign: 'center',
              fontSize: '1rem',
              color: '#888',
              gridColumn: '1 / -1'
            }}>
              No matching calculators found.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
