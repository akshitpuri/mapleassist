import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function MarginCalculator() {
  const [cost, setCost] = useState('');
  const [price, setPrice] = useState('');
  const [result, setResult] = useState(null);

  const calculateMargin = () => {
    const C = parseFloat(cost);
    const P = parseFloat(price);

    if (isNaN(C) || isNaN(P) || C <= 0 || P <= 0 || C >= P) {
      setResult('Please enter valid positive values. Cost must be less than price.');
      return;
    }

    const margin = ((P - C) / P) * 100;
    const markup = ((P - C) / C) * 100;

    setResult({
      margin: margin.toFixed(2),
      markup: markup.toFixed(2)
    });
  };

  return (
    <CalculatorLayout title="🧾 Margin Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Enter the product cost and sale price to calculate margin and markup percentages. Useful for profit planning, retail pricing, or business reporting.
      </p>

      {/* 🔢 Inputs */}
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
          placeholder="Cost ($)"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <input
          type="number"
          placeholder="Sale Price ($)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={calculateMargin}
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

      {/* 📊 Results */}
      {result && (
        typeof result === 'string' ? (
          <div style={{
            textAlign: 'center',
            fontSize: '1.1rem',
            color: '#e53935',
            marginTop: '20px'
          }}>
            <strong>{result}</strong>
          </div>
        ) : (
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
            <p><strong>Margin:</strong> {result.margin}%</p>
            <p><strong>Markup:</strong> {result.markup}%</p>
          </div>
        )
      )}
    </CalculatorLayout>
  );
}