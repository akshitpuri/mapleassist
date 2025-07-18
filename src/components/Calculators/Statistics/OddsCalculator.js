import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function OddsCalculator() {
  const [oddsType, setOddsType] = useState('decimal');
  const [oddsValue, setOddsValue] = useState('');
  const [betAmount, setBetAmount] = useState('');
  const [result, setResult] = useState(null);

  const calculateOdds = () => {
    const odds = parseFloat(oddsValue);
    const bet = parseFloat(betAmount);

    if (isNaN(odds) || isNaN(bet) || odds <= 0 || bet <= 0) {
      setResult('Please enter valid positive numbers for odds and bet amount.');
      return;
    }

    let impliedProbability, payout;

    if (oddsType === 'decimal') {
      impliedProbability = +(100 / odds).toFixed(2);
      payout = +(bet * odds).toFixed(2);
    } else if (oddsType === 'fractional') {
      const [num, denom] = oddsValue.split('/').map(Number);
      if (!num || !denom || denom === 0) {
        setResult('Please enter valid fractional odds (e.g. 5/2).');
        return;
      }
      impliedProbability = +(100 / (num / denom + 1)).toFixed(2);
      payout = +(bet * (num / denom + 1)).toFixed(2);
    } else if (oddsType === 'american') {
      if (odds > 0) {
        impliedProbability = +(100 / (odds + 100) * 100).toFixed(2);
        payout = +(bet * (odds / 100 + 1)).toFixed(2);
      } else {
        impliedProbability = +(-odds / (-odds + 100) * 100).toFixed(2);
        payout = +(bet * (100 / -odds + 1)).toFixed(2);
      }
    }

    setResult({ impliedProbability, payout });
  };

  return (
    <CalculatorLayout title="🎲 Odds Calculator">
      <Helmet>
        <title>Odds Calculator – MapleAssist</title>
        <meta name="description" content="Convert between American, Decimal, and Fractional odds. Calculate implied probability and potential payout from your bet." />
        <meta name="keywords" content="odds calculator, betting odds, implied probability, payout calculator, mapleassist statistics tool" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Enter your odds and bet amount to calculate the implied probability and total payout. Supports American, Decimal, and Fractional formats.
      </p>

      {/* 🎯 Inputs */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '400px',
        margin: '0 auto',
        marginBottom: '20px'
      }}>
        <select
          value={oddsType}
          onChange={(e) => setOddsType(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        >
          <option value="decimal">Decimal Odds</option>
          <option value="fractional">Fractional Odds</option>
          <option value="american">American Odds</option>
        </select>
        <input
          type="text"
          placeholder={oddsType === 'fractional' ? 'e.g. 5/2' : 'Odds'}
          value={oddsValue}
          onChange={(e) => setOddsValue(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <input
          type="number"
          min="0"
          placeholder="Bet Amount"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={calculateOdds}
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

      {/* 📊 Result */}
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
          <p><strong>Implied Probability:</strong> {result.impliedProbability}%</p>
          <p><strong>Total Payout:</strong> ${result.payout}</p>
        </div>
      )}
    </CalculatorLayout>
  );
}