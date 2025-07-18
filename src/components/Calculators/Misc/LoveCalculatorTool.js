import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function LoveCalculatorTool() {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState('');

  const calculateCompatibility = () => {
    const combined = (name1 + name2).toLowerCase().replace(/[^a-z]/g, '');
    let score = 0;
    for (let i = 0; i < combined.length; i++) {
      score += combined.charCodeAt(i);
    }
    const percent = score % 101;

    let message = '';
    if (percent > 80) message = '💖 Soulmate vibes!';
    else if (percent > 60) message = '💕 Pretty compatible!';
    else if (percent > 40) message = '💬 Worth getting to know.';
    else if (percent > 20) message = '😶 Maybe just friends.';
    else message = '😅 Love mismatch… or total chaos!';

    setResult(`❤️ Compatibility: ${percent}%\n${message}`);
  };

  return (
    <CalculatorLayout title="❤️ Love Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Just for fun! Enter two names and get a playful love compatibility score. No real science involved — just warm fuzzy feelings 💘
      </p>

      {/* 💑 Inputs */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '400px',
        margin: '0 auto',
        marginBottom: '20px'
      }}>
        <input
          type="text"
          placeholder="Your name"
          value={name1}
          onChange={(e) => setName1(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <input
          type="text"
          placeholder="Their name"
          value={name2}
          onChange={(e) => setName2(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <button onClick={calculateCompatibility} style={{
          padding: '10px',
          backgroundColor: '#e91e63',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '1rem',
          cursor: 'pointer'
        }}>
          Calculate Love 💘
        </button>
      </div>

      {/* 🎯 Output */}
      {result && (
        <div style={{
          backgroundColor: '#fff0f5',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
          maxWidth: '500px',
          margin: '0 auto',
          textAlign: 'center',
          fontSize: '1.1rem',
          color: '#c2185b',
          whiteSpace: 'pre-wrap'
        }}>
          {result}
        </div>
      )}
    </CalculatorLayout>
  );
}