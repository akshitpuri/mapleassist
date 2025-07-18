import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function SlopeCalculator() {
  const [x1, setX1] = useState('');
  const [y1, setY1] = useState('');
  const [x2, setX2] = useState('');
  const [y2, setY2] = useState('');
  const [result, setResult] = useState(null);

  const calculateSlope = () => {
    const X1 = parseFloat(x1);
    const Y1 = parseFloat(y1);
    const X2 = parseFloat(x2);
    const Y2 = parseFloat(y2);

    if ([X1, Y1, X2, Y2].some((v) => isNaN(v))) {
      setResult('Please enter valid coordinates for both points.');
      return;
    }

    const deltaX = X2 - X1;
    const deltaY = Y2 - Y1;

    if (deltaX === 0) {
      setResult({ type: 'Vertical Line', slope: 'Undefined' });
      return;
    }

    const slope = +(deltaY / deltaX).toFixed(4);
    setResult({ type: 'Slope', slope, deltaX, deltaY });
  };

  return (
    <CalculatorLayout title="📈 Slope Calculator">
      <Helmet>
        <title>Slope Calculator – MapleAssist</title>
        <meta name="description" content="Calculate the slope between two points using the rise-over-run formula. Handles vertical and horizontal lines." />
        <meta name="keywords" content="slope calculator, rise over run, line gradient, mapleassist math tool" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Enter two coordinate points to calculate the slope of the line between them. This tool uses the formula <code>(y₂ − y₁) / (x₂ − x₁)</code> and handles vertical lines as undefined.
      </p>

      {/* 🔢 Inputs */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        maxWidth: '500px',
        margin: '0 auto',
        marginBottom: '20px'
      }}>
        <div>
          <h4>Point 1</h4>
          <input type="number" placeholder="x₁" value={x1} onChange={(e) => setX1(e.target.value)} />
          <input type="number" placeholder="y₁" value={y1} onChange={(e) => setY1(e.target.value)} />
        </div>
        <div>
          <h4>Point 2</h4>
          <input type="number" placeholder="x₂" value={x2} onChange={(e) => setX2(e.target.value)} />
          <input type="number" placeholder="y₂" value={y2} onChange={(e) => setY2(e.target.value)} />
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button
          onClick={calculateSlope}
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
          Calculate Slope
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
          <p><strong>Type:</strong> {result.type}</p>
          <p><strong>Slope:</strong> {result.slope}</p>
          {result.deltaX !== undefined && <p><strong>Δx:</strong> {result.deltaX}</p>}
          {result.deltaY !== undefined && <p><strong>Δy:</strong> {result.deltaY}</p>}
        </div>
      )}
    </CalculatorLayout>
  );
}