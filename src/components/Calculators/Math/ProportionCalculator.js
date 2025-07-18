import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function ProportionCalculator() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [d, setD] = useState('');
  const [result, setResult] = useState(null);

  const calculateProportion = () => {
    const aNum = parseFloat(a);
    const bNum = parseFloat(b);
    const cNum = parseFloat(c);
    const dNum = parseFloat(d);

    if ([a, b, c, d].filter(v => v.toLowerCase() === 'x').length !== 1) {
      setResult('Please enter exactly one unknown as "x".');
      return;
    }

    try {
      let x;
      if (a.toLowerCase() === 'x') x = (bNum * cNum) / dNum;
      else if (b.toLowerCase() === 'x') x = (aNum * dNum) / cNum;
      else if (c.toLowerCase() === 'x') x = (aNum * dNum) / bNum;
      else if (d.toLowerCase() === 'x') x = (bNum * cNum) / aNum;

      setResult(`x = ${x.toFixed(6)}`);
    } catch {
      setResult('Invalid input or division by zero.');
    }
  };

  return (
    <CalculatorLayout title="🔢 Proportion Calculator">
      <Helmet>
        <title>Proportion Calculator – MapleAssist</title>
        <meta name="description" content="Solve proportions by finding the unknown value using cross multiplication. Supports fractional and decimal inputs." />
        <meta name="keywords" content="proportion calculator, solve proportions, cross multiplication, mapleassist math tool" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Enter values for a proportion in the form <code>a : b = c : d</code>, using <code>x</code> for the unknown. This tool solves for <strong>x</strong> using cross multiplication:
        <br />
        <code>a × d = b × c</code>
      </p>

      {/* 🔢 Inputs */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '12px',
        maxWidth: '600px',
        margin: '0 auto',
        marginBottom: '20px'
      }}>
        <input type="text" placeholder="a" value={a} onChange={(e) => setA(e.target.value)} />
        <input type="text" placeholder="b" value={b} onChange={(e) => setB(e.target.value)} />
        <input type="text" placeholder="c" value={c} onChange={(e) => setC(e.target.value)} />
        <input type="text" placeholder="d" value={d} onChange={(e) => setD(e.target.value)} />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button
          onClick={calculateProportion}
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
          Solve Proportion
        </button>
      </div>

      {/* 📊 Result */}
      {result && (
        <div style={{
          backgroundColor: result.includes('Invalid') || result.includes('Please')
            ? '#fff6f6' : '#fff',
          color: result.includes('Invalid') || result.includes('Please')
            ? '#f44336' : '#333',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
          maxWidth: '500px',
          margin: '0 auto',
          fontSize: '1.1rem',
          textAlign: 'center'
        }}>
          <strong>Result:</strong> {result}
        </div>
      )}
    </CalculatorLayout>
  );
}