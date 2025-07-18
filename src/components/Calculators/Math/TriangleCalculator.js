import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function TriangleCalculator() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [base, setBase] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState(null);

  const calculateTriangle = () => {
    const A = parseFloat(a);
    const B = parseFloat(b);
    const C = parseFloat(c);
    const baseVal = parseFloat(base);
    const heightVal = parseFloat(height);

    // Base-height method
    if (!isNaN(baseVal) && !isNaN(heightVal) && baseVal > 0 && heightVal > 0) {
      const area = 0.5 * baseVal * heightVal;
      setResult({
        method: 'Base-Height',
        area: area.toFixed(2),
        base: baseVal,
        height: heightVal
      });
      return;
    }

    // Heron's formula
    if (!isNaN(A) && !isNaN(B) && !isNaN(C) && A > 0 && B > 0 && C > 0) {
      const s = (A + B + C) / 2;
      const area = Math.sqrt(s * (s - A) * (s - B) * (s - C));
      const perimeter = A + B + C;
      setResult({
        method: 'Heron',
        a: A,
        b: B,
        c: C,
        area: area.toFixed(2),
        perimeter: perimeter.toFixed(2)
      });
      return;
    }

    setResult('Please enter valid triangle dimensions.');
  };

  return (
    <CalculatorLayout title="📐 Triangle Calculator">
      <Helmet>
        <title>Triangle Calculator – MapleAssist</title>
        <meta name="description" content="Calculate triangle area, perimeter, and height using side lengths or base-height input. Supports Heron's formula and base-height method." />
        <meta name="keywords" content="triangle calculator, heron formula, base height triangle area, mapleassist math tool" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Enter either all three sides or a base and height to calculate the <strong>area</strong>, <strong>perimeter</strong>, and <strong>height</strong> of a triangle. This tool supports Heron's formula and the base-height method.
      </p>

      {/* 🔢 Inputs */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        maxWidth: '600px',
        margin: '0 auto',
        marginBottom: '20px'
      }}>
        <div>
          <h4>Three Sides (Heron's Formula)</h4>
          <input type="number" placeholder="Side a" value={a} onChange={(e) => setA(e.target.value)} />
          <input type="number" placeholder="Side b" value={b} onChange={(e) => setB(e.target.value)} />
          <input type="number" placeholder="Side c" value={c} onChange={(e) => setC(e.target.value)} />
        </div>
        <div>
          <h4>Base & Height</h4>
          <input type="number" placeholder="Base" value={base} onChange={(e) => setBase(e.target.value)} />
          <input type="number" placeholder="Height" value={height} onChange={(e) => setHeight(e.target.value)} />
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button
          onClick={calculateTriangle}
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
          Calculate Triangle
        </button>
      </div>

      {/* 📊 Result */}
      {typeof result === 'string' ? (
        <div style={{
          color: '#f44336',
          backgroundColor: '#fff6f6',
          padding: '12px',
          borderRadius: '6px',
          maxWidth: '600px',
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
          maxWidth: '600px',
          margin: '0 auto',
          fontSize: '1.1rem',
          color: '#333',
          textAlign: 'center'
        }}>
          <p><strong>Method:</strong> {result.method}</p>
          {result.method === 'Heron' && (
            <>
              <p><strong>Sides:</strong> a = {result.a}, b = {result.b}, c = {result.c}</p>
              <p><strong>Area:</strong> {result.area}</p>
              <p><strong>Perimeter:</strong> {result.perimeter}</p>
            </>
          )}
          {result.method === 'Base-Height' && (
            <>
              <p><strong>Base:</strong> {result.base}</p>
              <p><strong>Height:</strong> {result.height}</p>
              <p><strong>Area:</strong> {result.area}</p>
            </>
          )}
        </div>
      )}
    </CalculatorLayout>
  );
}