import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function ProbabilityCalculator() {
  const [favorable, setFavorable] = useState('');
  const [total, setTotal] = useState('');
  const [probability, setProbability] = useState(null);

  const calculateProbability = () => {
    const f = parseFloat(favorable);
    const t = parseFloat(total);

    if (isNaN(f) || isNaN(t) || f < 0 || t <= 0 || f > t) {
      setProbability('Please enter valid numbers. Favorable ≤ Total and Total > 0.');
      return;
    }

    const p = +(f / t).toFixed(4);
    const complement = +(1 - p).toFixed(4);

    setProbability({ p, complement, f, t });
  };

  return (
    <CalculatorLayout title="🎯 Probability Calculator">
      <Helmet>
        <title>Probability Calculator – MapleAssist</title>
        <meta name="description" content="Calculate the probability of an event occurring based on favorable and total outcomes. Includes complement and decimal output." />
        <meta name="keywords" content="probability calculator, event likelihood, statistics tool, mapleassist" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Enter the number of favorable outcomes and total possible outcomes to calculate the probability of an event. This tool also shows the complement probability.
      </p>

      {/* 🎲 Inputs */}
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
          min="0"
          placeholder="Favorable outcomes"
          value={favorable}
          onChange={(e) => setFavorable(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <input
          type="number"
          min="1"
          placeholder="Total outcomes"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={calculateProbability}
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
          Calculate Probability
        </button>
      </div>

      {/* 📊 Result */}
      {typeof probability === 'string' ? (
        <div style={{
          color: '#f44336',
          backgroundColor: '#fff6f6',
          padding: '12px',
          borderRadius: '6px',
          maxWidth: '500px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          {probability}
        </div>
      ) : probability && (
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
          <p><strong>Favorable:</strong> {probability.f}</p>
          <p><strong>Total:</strong> {probability.t}</p>
          <p><strong>Probability:</strong> {probability.p}</p>
          <p><strong>Complement:</strong> {probability.complement}</p>
        </div>
      )}
    </CalculatorLayout>
  );
}