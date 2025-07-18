import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function SignificantFiguresCalculator() {
  const [input, setInput] = useState('');
  const [sigFigs, setSigFigs] = useState('');
  const [result, setResult] = useState(null);

  const countSigFigs = (str) => {
    const trimmed = str.trim();
    if (!/^[+-]?\d*\.?\d+(e[+-]?\d+)?$/i.test(trimmed)) return 0;

    const [base] = trimmed.toLowerCase().split('e');
    const digits = base.replace(/^[-+]/, '');

    if (digits.includes('.')) {
      return digits.replace(/^0+/, '').replace('.', '').length;
    } else {
      return digits.replace(/0+$/, '').length;
    }
  };

  const roundToSigFigs = (num, figs) => {
    if (isNaN(num) || figs < 1) return 'Invalid input';
    const exponent = Math.floor(Math.log10(Math.abs(num)));
    const factor = Math.pow(10, exponent - figs + 1);
    return (Math.round(num / factor) * factor).toPrecision(figs);
  };

  const calculate = () => {
    const num = parseFloat(input);
    const count = countSigFigs(input);
    const rounded = sigFigs ? roundToSigFigs(num, parseInt(sigFigs)) : null;
    const sci = num.toExponential(count);

    setResult({
      original: input,
      sigCount: count,
      rounded,
      scientific: sci
    });
  };

  return (
    <CalculatorLayout title="🧮 Significant Figures Calculator">
      <Helmet>
        <title>Significant Figures Calculator – MapleAssist</title>
        <meta name="description" content="Count and round significant figures, convert to scientific notation, and format numbers with precision." />
        <meta name="keywords" content="significant figures calculator, sig fig counter, scientific notation, mapleassist math tool" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Enter a number to count its <strong>significant figures</strong>, round to a specified number of sig figs, and convert to scientific notation.
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
        <input
          type="text"
          placeholder="Enter number (e.g. 0.005130)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <input
          type="number"
          placeholder="Round to Sig Figs (optional)"
          value={sigFigs}
          onChange={(e) => setSigFigs(e.target.value)}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
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
      {result && (
        <div style={{
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
          maxWidth: '600px',
          margin: '0 auto',
          fontSize: '1.1rem',
          color: '#333'
        }}>
          <p><strong>Input:</strong> {result.original}</p>
          <p><strong>Significant Figures:</strong> {result.sigCount}</p>
          {result.rounded && <p><strong>Rounded:</strong> {result.rounded}</p>}
          <p><strong>Scientific Notation:</strong> {result.scientific}</p>
        </div>
      )}
    </CalculatorLayout>
  );
}