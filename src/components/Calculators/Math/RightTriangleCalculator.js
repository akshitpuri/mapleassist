import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function RightTriangleCalculator() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [result, setResult] = useState(null);

  const calculateTriangle = () => {
    const A = parseFloat(a);
    const B = parseFloat(b);
    const C = parseFloat(c);

    let known = [!isNaN(A), !isNaN(B), !isNaN(C)].filter(Boolean).length;
    if (known < 2) {
      setResult('Please enter at least two side lengths.');
      return;
    }

    let sideA = A;
    let sideB = B;
    let sideC = C;

    // Use Pythagorean theorem to find missing side
    if (isNaN(C) && !isNaN(A) && !isNaN(B)) {
      sideC = Math.sqrt(A ** 2 + B ** 2);
    } else if (isNaN(A) && !isNaN(B) && !isNaN(C)) {
      sideA = Math.sqrt(C ** 2 - B ** 2);
    } else if (isNaN(B) && !isNaN(A) && !isNaN(C)) {
      sideB = Math.sqrt(C ** 2 - A ** 2);
    }

    if ([sideA, sideB, sideC].some(v => isNaN(v) || v <= 0)) {
      setResult('Invalid triangle dimensions.');
      return;
    }

    const angleA = Math.asin(sideA / sideC) * (180 / Math.PI);
    const angleB = Math.asin(sideB / sideC) * (180 / Math.PI);
    const area = 0.5 * sideA * sideB;
    const perimeter = sideA + sideB + sideC;
    const height = (sideA * sideB) / sideC;

    setResult({
      a: sideA.toFixed(4),
      b: sideB.toFixed(4),
      c: sideC.toFixed(4),
      angleA: angleA.toFixed(2),
      angleB: angleB.toFixed(2),
      area: area.toFixed(4),
      perimeter: perimeter.toFixed(4),
      height: height.toFixed(4)
    });
  };

  return (
    <CalculatorLayout title="📐 Right Triangle Calculator">
      <Helmet>
        <title>Right Triangle Calculator – MapleAssist</title>
        <meta name="description" content="Calculate missing sides, angles, area, perimeter, and height of a right triangle using trigonometry and the Pythagorean theorem." />
        <meta name="keywords" content="right triangle calculator, triangle sides angles, pythagorean theorem, trigonometry, mapleassist math tool" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Enter any two side lengths of a right triangle to calculate the missing side, angles, area, perimeter, and height. This tool uses the Pythagorean theorem and trigonometric functions.
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
        <input type="number" placeholder="Side a (leg)" value={a} onChange={(e) => setA(e.target.value)} />
        <input type="number" placeholder="Side b (leg)" value={b} onChange={(e) => setB(e.target.value)} />
        <input type="number" placeholder="Side c (hypotenuse)" value={c} onChange={(e) => setC(e.target.value)} />
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
          <p><strong>Sides:</strong> a = {result.a}, b = {result.b}, c = {result.c}</p>
          <p><strong>Angles:</strong> α = {result.angleA}°, β = {result.angleB}°</p>
          <p><strong>Area:</strong> {result.area}</p>
          <p><strong>Perimeter:</strong> {result.perimeter}</p>
          <p><strong>Height:</strong> {result.height}</p>
        </div>
      )}
    </CalculatorLayout>
  );
}