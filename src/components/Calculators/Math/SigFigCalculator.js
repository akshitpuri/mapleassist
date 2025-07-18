import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function SigFigCalculator() {
  const [input, setInput] = useState('');
  const [roundTo, setRoundTo] = useState('');
  const [result, setResult] = useState(null);

  const countSigFigs = (value) => {
    const str = value.trim();

    if (/^0*\.?0*$/.test(str)) return 0;

    const sci = Number(str).toExponential();
    const [mantissa] = sci.split('e');
    return mantissa.replace('.', '').replace(/^0+/, '').length;
  };

  const roundSigFigs = (value, sigFigs) => {
    const num = parseFloat(value);
    if (isNaN(num) || sigFigs < 1) return null;
    return Number(num.toPrecision(sigFigs));
  };

  const calculate = () => {
    if (!input) {
      setResult('Please enter a number.');
      return;
    }

    const sigCount = countSigFigs(input);
    const rounded = roundTo ? roundSigFigs(input, parseInt(roundTo)) : null;

    setResult({
      original: input,
      sigFigs: sigCount,
      rounded: rounded !== null ? rounded : undefined
    });
  };

  return (
    <CalculatorLayout title="🔬 Sig Fig Calculator">
      <Helmet>
        <title>Sig Fig Calculator – MapleAssist</title>
        <meta name="description" content="Count and round significant figures in numbers. Supports scientific notation and precision rounding." />
        <meta name="keywords" content="sig fig calculator, significant figures, precision rounding, mapleassist math tool" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Enter a number to count its <strong>significant figures</strong>. Optionally, round it to a specific number of sig figs. This tool supports decimals, scientific notation, and E-notation.
      </p>

      {/* 🔢 Inputs */}
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
          placeholder="Enter number (e.g. 0.00560, 3.45e5)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            padding: '12px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <input
          type="number"
          min="1"
          placeholder="Round to sig figs (optional)"
          value={roundTo}
          onChange={(e) => setRoundTo(e.target.value)}
          style={{
            padding: '12px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={calculate}
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
          <p><strong>Input:</strong> {result.original}</p>
          <p><strong>Significant Figures:</strong> {result.sigFigs}</p>
          {result.rounded !== undefined && (
            <p><strong>Rounded:</strong> {result.rounded}</p>
          )}
        </div>
      )}
    </CalculatorLayout>
  );
}