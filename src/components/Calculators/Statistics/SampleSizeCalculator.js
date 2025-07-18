import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function SampleSizeCalculator() {
  const [confidenceLevel, setConfidenceLevel] = useState('95');
  const [marginOfError, setMarginOfError] = useState('');
  const [populationSize, setPopulationSize] = useState('');
  const [proportion, setProportion] = useState('50');
  const [result, setResult] = useState(null);

  const zScores = {
    '90': 1.645,
    '95': 1.96,
    '99': 2.576
  };

  const calculateSampleSize = () => {
    const z = zScores[confidenceLevel];
    const e = parseFloat(marginOfError) / 100;
    const p = parseFloat(proportion) / 100;
    const N = parseInt(populationSize);

    if (isNaN(e) || isNaN(p) || e <= 0 || p <= 0 || p > 1) {
      setResult('Please enter valid values for margin of error and proportion.');
      return;
    }

    const numerator = Math.pow(z, 2) * p * (1 - p);
    const denominator = Math.pow(e, 2);
    let n = numerator / denominator;

    if (!isNaN(N) && N > 0) {
      n = n / (1 + ((n - 1) / N));
    }

    setResult({ sampleSize: Math.ceil(n), confidenceLevel, marginOfError, proportion, populationSize: N || '∞' });
  };

  return (
    <CalculatorLayout title="📊 Sample Size Calculator">
      <Helmet>
        <title>Sample Size Calculator – MapleAssist</title>
        <meta name="description" content="Estimate the minimum sample size needed for surveys or studies based on confidence level, margin of error, and population size." />
        <meta name="keywords" content="sample size calculator, survey planning, confidence level, margin of error, mapleassist statistics tool" />
      </Helmet>

      <BackButton />

      <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '24px', color: '#444' }}>
        Enter your desired confidence level, margin of error, population size, and expected proportion to calculate the minimum sample size required for statistically valid results.
      </p>

      {/* 🔢 Inputs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px', margin: '0 auto', marginBottom: '20px' }}>
        <select
          value={confidenceLevel}
          onChange={(e) => setConfidenceLevel(e.target.value)}
          style={{ padding: '10px', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ccc' }}
        >
          <option value="90">90% Confidence</option>
          <option value="95">95% Confidence</option>
          <option value="99">99% Confidence</option>
        </select>
        <input
          type="number"
          placeholder="Margin of Error (%)"
          value={marginOfError}
          onChange={(e) => setMarginOfError(e.target.value)}
          style={{ padding: '10px', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ccc' }}
        />
        <input
          type="number"
          placeholder="Population Size (leave blank if unknown)"
          value={populationSize}
          onChange={(e) => setPopulationSize(e.target.value)}
          style={{ padding: '10px', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ccc' }}
        />
        <input
          type="number"
          placeholder="Expected Proportion (%)"
          value={proportion}
          onChange={(e) => setProportion(e.target.value)}
          style={{ padding: '10px', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ccc' }}
        />
        <button
          onClick={calculateSampleSize}
          style={{ padding: '10px', backgroundColor: '#3f51b5', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer' }}
        >
          Calculate Sample Size
        </button>
      </div>

      {/* 📊 Result */}
      {typeof result === 'string' ? (
        <div style={{ color: '#f44336', backgroundColor: '#fff6f6', padding: '12px', borderRadius: '6px', maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
          {result}
        </div>
      ) : result && (
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 1px 6px rgba(0,0,0,0.08)', maxWidth: '500px', margin: '0 auto', fontSize: '1.1rem', color: '#333', textAlign: 'center' }}>
          <p><strong>Required Sample Size:</strong> {result.sampleSize}</p>
          <p><strong>Confidence Level:</strong> {result.confidenceLevel}%</p>
          <p><strong>Margin of Error:</strong> ±{result.marginOfError}%</p>
          <p><strong>Population Size:</strong> {result.populationSize}</p>
          <p><strong>Expected Proportion:</strong> {result.proportion}%</p>
        </div>
      )}
    </CalculatorLayout>
  );
}