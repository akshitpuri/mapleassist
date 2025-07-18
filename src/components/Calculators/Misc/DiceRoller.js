import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function DiceRoller() {
  const [diceCount, setDiceCount] = useState(1);
  const [results, setResults] = useState([]);

  const rollDice = () => {
    const rolls = Array.from({ length: diceCount }, () =>
      Math.floor(Math.random() * 6) + 1
    );
    setResults(rolls);
  };

  return (
    <CalculatorLayout title="🎲 Dice Roller">
      <BackButton />
      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Select how many dice you'd like to roll. Click the button and get random results like in a classic tabletop game. Each die generates a number from <strong>1 to 6</strong>.
      </p>

      {/* 🔢 Input */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '400px',
        margin: '0 auto',
        marginBottom: '20px'
      }}>
        <input
          type="number"
          min="1"
          max="10"
          placeholder="Number of dice to roll"
          value={diceCount}
          onChange={(e) =>
            setDiceCount(Math.min(Math.max(parseInt(e.target.value), 1), 10))
          }
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={rollDice}
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
          Roll Dice
        </button>
      </div>

      {/* 🎲 Results */}
      {results.length > 0 && (
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
          <p><strong>Results:</strong></p>
          <div style={{
            fontSize: '1.6rem',
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap'
          }}>
            {results.map((val, idx) => (
              <span key={idx}>🎲 {val}</span>
            ))}
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}