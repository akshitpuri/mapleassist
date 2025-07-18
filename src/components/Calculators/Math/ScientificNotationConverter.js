import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function ScientificNotationConverter() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const convertNotation = () => {
    let value = input.trim();

    // Handle E-notation
    if (/^[\d.+-]+e[\d+-]+$/i.test(value)) {
      try {
        const num = Number(value);
        setResult({
          type: 'E-Notation',
          scientific: num.toExponential(),
          standard: num.toLocaleString('en-US'),
          real: num
        });
        return;
      } catch {
        setResult('Invalid E-notation input.');
        return;
      }
    }

    // Handle scientific notation like "3.45 x 10^5"
    const sciMatch = value.match(/^([\d.+-]+)\s*x\s*10\^([\d+-]+)$/i);
    if (sciMatch) {
      const base = parseFloat(sciMatch[1]);
      const exponent = parseInt(sciMatch[2]);
      if (!isNaN(base) && !isNaN(exponent)) {
        const num = base * Math.pow(10, exponent);
        setResult({
          type: 'Scientific Notation',
          scientific: `${base} × 10^${exponent}`,
          standard: num.toLocaleString('en-US'),
          real: num
        });
        return;
      }
    }

    // Handle plain decimal or integer
    const num = parseFloat(value);
    if (!isNaN(num)) {
      setResult({
        type: 'Standard Number',
        scientific: num.toExponential(),
        eNotation: num.toExponential().replace('e', 'E'),
        standard: num.toLocaleString('en-US'),
        real: num
      });
      return;
    }

    setResult('Please enter a valid number or scientific notation.');
  };

  return (
    <CalculatorLayout title="🔬 Scientific Notation Converter">
      <Helmet>
        <title>Scientific Notation Converter – MapleAssist</title>
        <meta name="description" content="Convert numbers to and from scientific notation, E-notation, and standard form. Supports large and small values with clean formatting." />
        <meta name="keywords" content="scientific notation converter, e notation, standard form, mapleassist math tool" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Enter a number in decimal, scientific notation (e.g. <code>3.45 × 10^5</code>), or E-notation (e.g. <code>3.45e5</code>) to convert between formats. This tool supports large and small values with automatic formatting.
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
          placeholder="e.g. 345600000, 3.45e5, 3.45 × 10^5"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            padding: '12px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={convertNotation}
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
          Convert
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
          <p><strong>Scientific:</strong> {result.scientific}</p>
          {result.eNotation && <p><strong>E-Notation:</strong> {result.eNotation}</p>}
          <p><strong>Standard:</strong> {result.standard}</p>
          <p><strong>Real Number:</strong> {result.real}</p>
        </div>
      )}
    </CalculatorLayout>
  );
}