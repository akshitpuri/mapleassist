import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function ScientificCalculator() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState(null);

  const evaluateExpression = () => {
    try {
      // Replace common math symbols with JS equivalents
      let expr = expression
        .replace(/π/g, Math.PI)
        .replace(/e/g, Math.E)
        .replace(/√\(/g, 'Math.sqrt(')
        .replace(/sin\(/g, 'Math.sin(')
        .replace(/cos\(/g, 'Math.cos(')
        .replace(/tan\(/g, 'Math.tan(')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/\^/g, '**');

      const value = eval(expr);
      setResult(value.toFixed(6));
    } catch (err) {
      setResult('Invalid expression. Please check your syntax.');
    }
  };

  return (
    <CalculatorLayout title="🔬 Scientific Calculator">
      <Helmet>
        <title>Scientific Calculator – MapleAssist</title>
        <meta name="description" content="Evaluate complex math expressions including trigonometry, logarithms, powers, and constants like π and e." />
        <meta name="keywords" content="scientific calculator, trig functions, logarithms, math expression evaluator, mapleassist" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Enter a math expression using functions like <code>sin()</code>, <code>cos()</code>, <code>tan()</code>, <code>log()</code>, <code>ln()</code>, <code>√()</code>, and constants like <code>π</code> and <code>e</code>. Use <code>^</code> for powers.
      </p>

      {/* 🔢 Input */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '500px',
        margin: '0 auto',
        marginBottom: '20px'
      }}>
        <input
          type="text"
          placeholder="e.g. sin(π/2) + log(100)"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          style={{
            padding: '12px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={evaluateExpression}
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
          Evaluate
        </button>
      </div>

      {/* 📊 Result */}
      {result && (
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
          <p><strong>Result:</strong> {result}</p>
        </div>
      )}
    </CalculatorLayout>
  );
}