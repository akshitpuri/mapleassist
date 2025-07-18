import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function CoinFlipCalculator() {
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const flipCoin = () => {
    const outcome = Math.random() < 0.5 ? 'Heads' : 'Tails';
    setResult(outcome);
    setHistory([outcome, ...history.slice(0, 9)]);
  };

  return (
    <CalculatorLayout title="🪙 Flip a Coin">
      <Helmet>
        <title>Flip a Coin – MapleAssist</title>
        <meta name="description" content="Simulate a coin toss with random Heads or Tails. Track history and enjoy decision-making fun." />
        <meta name="keywords" content="flip a coin, coin toss simulator, heads or tails, mapleassist fun calculator" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Click the button to flip a virtual coin. This tool uses:
        <br />
        <code>Math.random() &lt; 0.5 ? 'Heads' : 'Tails'</code>
      </p>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button
          onClick={flipCoin}
          style={{
            padding: '12px 24px',
            backgroundColor: '#3f51b5',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1.2rem',
            cursor: 'pointer'
          }}
        >
          Flip Coin
        </button>
      </div>

      {result && (
        <div style={{
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
          maxWidth: '400px',
          margin: '0 auto',
          fontSize: '1.2rem',
          color: '#333',
          textAlign: 'center'
        }}>
          <p><strong>Result:</strong> {result}</p>
        </div>
      )}

      {history.length > 0 && (
        <div style={{
          marginTop: '30px',
          textAlign: 'center',
          fontSize: '1rem',
          color: '#555'
        }}>
          <p><strong>Last 10 Flips:</strong></p>
          <p>{history.join(', ')}</p>
        </div>
      )}
    </CalculatorLayout>
  );
}