import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function BraSizeCalculator() {
  const [bandSize, setBandSize] = useState('');
  const [bustSize, setBustSize] = useState('');
  const [result, setResult] = useState(null);

  const calculateBraSize = () => {
    const band = parseInt(bandSize);
    const bust = parseInt(bustSize);

    if (isNaN(band) || isNaN(bust) || band <= 0 || bust <= 0) {
      setResult('Please enter valid measurements.');
      return;
    }

    const cupDifference = bust - band;
    const cupSizes = [
      'AA', 'A', 'B', 'C', 'D', 'DD', 'E', 'F', 'G', 'H', 'I', 'J', 'K'
    ];

    const cupIndex = Math.min(Math.max(cupDifference, 0), cupSizes.length - 1);
    const braSize = `${band}${cupSizes[cupIndex]}`;

    setResult(`Estimated Bra Size: ${braSize}`);
  };

  return (
    <CalculatorLayout title="👙 Bra Size Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem', lineHeight: '1.6',
        marginBottom: '24px', color: '#444'
      }}>
        Estimate your bra size using bust and band measurements. This calculator applies standard sizing logic to help you find a comfortable fit — useful for online shopping and wardrobe planning.
      </p>

      {/* 🔢 Inputs */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        gap: '12px', maxWidth: '400px',
        margin: '0 auto', marginBottom: '20px'
      }}>
        <input
          type="number"
          placeholder="Band Measurement (inches)"
          value={bandSize}
          onChange={(e) => setBandSize(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="number"
          placeholder="Bust Measurement (inches)"
          value={bustSize}
          onChange={(e) => setBustSize(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <button
          onClick={calculateBraSize}
          style={{
            padding: '10px', backgroundColor: '#3f51b5',
            color: '#fff', border: 'none',
            borderRadius: '6px', fontSize: '1rem', cursor: 'pointer'
          }}
        >
          Calculate Bra Size
        </button>
      </div>

      {/* 📊 Results */}
      {result && (
        typeof result === 'string' ? (
          <div style={{
            backgroundColor: '#fff', padding: '20px',
            borderRadius: '10px', boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
            maxWidth: '500px', margin: '0 auto',
            textAlign: 'center', fontSize: '1.1rem', color: '#333'
          }}>
            <strong>{result}</strong>
          </div>
        ) : null
      )}
    </CalculatorLayout>
  );
}