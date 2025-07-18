import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function ZScoreCalculator() {
  const [rawScore, setRawScore] = useState('');
  const [mean, setMean] = useState('');
  const [stdDev, setStdDev] = useState('');
  const [result, setResult] = useState(null);

  const calculateZScore = () => {
    const x = parseFloat(rawScore);
    const mu = parseFloat(mean);
    const sigma = parseFloat(stdDev);

    if (isNaN(x) || isNaN(mu) || isNaN(sigma) || sigma === 0) {
      setResult('Please enter valid numbers. Standard deviation must not be zero.');
      return;
    }

    const z = +((x - mu) / sigma).toFixed(4);
    setResult({ z });
  };

  return (
    <CalculatorLayout title="🔍 Z-Score Calculator">
      <Helmet>
        <title>Z-Score Calculator – MapleAssist</title>
        <meta name="description" content="Calculate the z-score of a data point using population mean and standard deviation. Useful for normal distribution analysis and outlier detection." />
        <meta name="keywords" content="z-score calculator, standard score, normal distribution, mapleassist statistics tool" />
      </Helmet>

      <BackButton />

      <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '24px', color: '#444' }}>
        Enter a raw score, population mean, and standard deviation to calculate the z-score. This tool helps you understand how far a value lies from the mean in terms of standard deviations.
      </p>

      {/* 🔢 Inputs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px', margin: '0 auto', marginBottom: '20px' }}>
        <input
          type="number"
          placeholder="Raw Score (x)"
          value={rawScore}
          onChange={(e) => setRawScore(e.target.value)}
          style={{ padding: '10px', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ccc' }}
        />
        <input
          type="number"
          placeholder="Mean (μ)"
          value={mean}
          onChange={(e) => setMean(e.target.value)}
          style={{ padding: '10px', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ccc' }}
        />
        <input
          type="number"
          placeholder="Standard Deviation (σ)"
          value={stdDev}
          onChange={(e) => setStdDev(e.target.value)}
          style={{ padding: '10px', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ccc' }}
        />
        <button
          onClick={calculateZScore}
          style={{ padding: '10px', backgroundColor: '#3f51b5', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer' }}
        >
          Calculate Z-Score
        </button>
      </div>

      {/* 📊 Result */}
      {typeof result === 'string' ? (
        <div style={{ color: '#f44336', backgroundColor: '#fff6f6', padding: '12px', borderRadius: '6px', maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
          {result}
        </div>
      ) : result && (
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 1px 6px rgba(0,0,0,0.08)', maxWidth: '500px', margin: '0 auto', fontSize: '1.1rem', color: '#333', textAlign: 'center' }}>
          <p><strong>Z-Score:</strong> {result.z}</p>
        </div>
      )}
    </CalculatorLayout>
  );
}