import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function ROICalculator() {
  const [cost, setCost] = useState('');
  const [returnAmount, setReturnAmount] = useState('');
  const [result, setResult] = useState(null);

  const calculateROI = () => {
    const C = parseFloat(cost);
    const R = parseFloat(returnAmount);

    if (isNaN(C) || isNaN(R) || C <= 0 || R <= 0) {
      setResult('Please enter valid positive values for cost and return.');
      return;
    }

    const gain = R - C;
    const roi = (gain / C) * 100;

    setResult({
      gain: gain.toFixed(2),
      roi: roi.toFixed(2)
    });
  };

  return (
    <CalculatorLayout title="📦 ROI Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem', lineHeight: '1.6', marginBottom: '24px',
        color: '#444'
      }}>
        Calculate your investment's return and ROI percentage by entering the initial cost and total returns. Perfect for business spending and portfolio analysis.
      </p>

      {/* 🔢 Inputs */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: '12px',
        maxWidth: '400px', margin: '0 auto', marginBottom: '20px'
      }}>
        <input
          type="number" placeholder="Investment Cost ($)"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="number" placeholder="Return Amount ($)"
          value={returnAmount}
          onChange={(e) => setReturnAmount(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <button
          onClick={calculateROI}
          style={{
            padding: '10px', backgroundColor: '#3f51b5',
            color: '#fff', border: 'none',
            borderRadius: '6px', fontSize: '1rem', cursor: 'pointer'
          }}
        >
          Calculate ROI
        </button>
      </div>

      {/* 📊 Results */}
      {result && (
        typeof result === 'string' ? (
          <div style={{
            textAlign: 'center', fontSize: '1.1rem',
            color: '#e53935', marginTop: '20px'
          }}>
            <strong>{result}</strong>
          </div>
        ) : (
          <div style={{
            backgroundColor: '#fff', padding: '20px',
            borderRadius: '10px', boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
            maxWidth: '500px', margin: '0 auto',
            textAlign: 'center', fontSize: '1.1rem', color: '#333'
          }}>
            <p><strong>Gain:</strong> ${result.gain}</p>
            <p><strong>ROI:</strong> {result.roi}%</p>
          </div>
        )
      )}
    </CalculatorLayout>
  );
}