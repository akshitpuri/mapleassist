import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function QuadraticFormulaCalculator() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [result, setResult] = useState(null);

  const calculateRoots = () => {
    const A = parseFloat(a);
    const B = parseFloat(b);
    const C = parseFloat(c);

    if (isNaN(A) || isNaN(B) || isNaN(C) || A === 0) {
      setResult('Please enter valid numbers. Coefficient "a" must not be zero.');
      return;
    }

    const discriminant = B * B - 4 * A * C;
    const twoA = 2 * A;

    let roots;
    if (discriminant > 0) {
      const sqrtD = Math.sqrt(discriminant);
      const x1 = ((-B + sqrtD) / twoA).toFixed(4);
      const x2 = ((-B - sqrtD) / twoA).toFixed(4);
      roots = { type: 'Two Real Roots', x1, x2 };
    } else if (discriminant === 0) {
      const x = (-B / twoA).toFixed(4);
      roots = { type: 'One Real Root', x };
    } else {
      const realPart = (-B / twoA).toFixed(4);
      const imagPart = (Math.sqrt(-discriminant) / twoA).toFixed(4);
      roots = {
        type: 'Two Complex Roots',
        x1: `${realPart} + ${imagPart}i`,
        x2: `${realPart} - ${imagPart}i`
      };
    }

    setResult({ discriminant, ...roots });
  };

  return (
    <CalculatorLayout title="📄 Quadratic Formula Calculator">
      <Helmet>
        <title>Quadratic Formula Calculator – MapleAssist</title>
        <meta name="description" content="Solve quadratic equations using the quadratic formula. Handles real and complex roots with step-by-step output." />
        <meta name="keywords" content="quadratic formula calculator, solve ax² + bx + c = 0, mapleassist math tool" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Enter the coefficients <strong>a</strong>, <strong>b</strong>, and <strong>c</strong> to solve the quadratic equation using the formula:
        <br />
        <code>x = (-b ± √(b² - 4ac)) / 2a</code>
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
          placeholder="Coefficient a"
          value={a}
          onChange={(e) => setA(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <input
          type="number"
          placeholder="Coefficient b"
          value={b}
          onChange={(e) => setB(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <input
          type="number"
          placeholder="Coefficient c"
          value={c}
          onChange={(e) => setC(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={calculateRoots}
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
          Calculate Roots
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
          <p><strong>Discriminant:</strong> {result.discriminant}</p>
          <p><strong>{result.type}:</strong></p>
          {result.x ? (
            <p><strong>x =</strong> {result.x}</p>
          ) : (
            <>
              <p><strong>x₁ =</strong> {result.x1}</p>
              <p><strong>x₂ =</strong> {result.x2}</p>
            </>
          )}
        </div>
      )}
    </CalculatorLayout>
  );
}