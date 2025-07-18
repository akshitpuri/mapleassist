import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function SequenceCalculator() {
  const [type, setType] = useState('arithmetic'); // 'arithmetic' or 'geometric'
  const [firstTerm, setFirstTerm] = useState('');
  const [step, setStep] = useState('');
  const [count, setCount] = useState('');
  const [result, setResult] = useState(null);

  const calculateSequence = () => {
    const a1 = parseFloat(firstTerm);
    const dOrR = parseFloat(step);
    const n = parseInt(count);

    if (isNaN(a1) || isNaN(dOrR) || isNaN(n) || n < 1) {
      setResult('Please enter valid values for all fields.');
      return;
    }

    const terms = [];
    let an, sum;

    if (type === 'arithmetic') {
      for (let i = 0; i < n; i++) {
        terms.push(a1 + i * dOrR);
      }
      an = a1 + (n - 1) * dOrR;
      sum = (n * (a1 + an)) / 2;
    } else {
      for (let i = 0; i < n; i++) {
        terms.push(a1 * Math.pow(dOrR, i));
      }
      an = a1 * Math.pow(dOrR, n - 1);
      sum = a1 * (1 - Math.pow(dOrR, n)) / (1 - dOrR);
    }

    setResult({
      type,
      terms: terms.map(t => t.toFixed(6)),
      nthTerm: an.toFixed(6),
      sum: sum.toFixed(6)
    });
  };

  return (
    <CalculatorLayout title="📈 Sequence Calculator">
      <Helmet>
        <title>Arithmetic & Geometric Sequence Calculator – MapleAssist</title>
        <meta name="description" content="Calculate terms and sums of arithmetic and geometric sequences. Supports full sequence display and clean formatting." />
        <meta name="keywords" content="sequence calculator, arithmetic sequence, geometric sequence, nth term, mapleassist math tool" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Choose a sequence type and enter the first term, common difference or ratio, and number of terms. This tool calculates the <strong>n-th term</strong>, <strong>sum</strong>, and displays the full sequence.
      </p>

      {/* 🔘 Type Selector */}
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            setResult(null);
          }}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        >
          <option value="arithmetic">Arithmetic Sequence</option>
          <option value="geometric">Geometric Sequence</option>
        </select>
      </div>

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
          type="number"
          placeholder="First Term (a₁)"
          value={firstTerm}
          onChange={(e) => setFirstTerm(e.target.value)}
        />
        <input
          type="number"
          placeholder={type === 'arithmetic' ? 'Common Difference (d)' : 'Common Ratio (r)'}
          value={step}
          onChange={(e) => setStep(e.target.value)}
        />
        <input
          type="number"
          placeholder="Number of Terms (n)"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button
          onClick={calculateSequence}
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
          Calculate Sequence
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
          color: '#333'
        }}>
          <p><strong>Sequence Type:</strong> {result.type}</p>
          <p><strong>Terms:</strong> {result.terms.join(', ')}</p>
          <p><strong>n-th Term:</strong> {result.nthTerm}</p>
          <p><strong>Sum of Terms:</strong> {result.sum}</p>
        </div>
      )}
    </CalculatorLayout>
  );
}