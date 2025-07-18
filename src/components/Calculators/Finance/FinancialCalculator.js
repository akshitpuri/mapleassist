import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function FinancialCalculator() {
  const [mode, setMode] = useState('fv'); // 'fv', 'pv', 'rate', 'pmt', 'n'
  const [inputs, setInputs] = useState({
    pv: '', fv: '', rate: '', pmt: '', n: ''
  });
  const [result, setResult] = useState(null);

  const handleChange = (field, value) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculate = () => {
    const { pv, fv, rate, pmt, n } = inputs;
    const r = parseFloat(rate) / 100;
    const numPeriods = parseFloat(n);
    const PV = parseFloat(pv);
    const FV = parseFloat(fv);
    const PMT = parseFloat(pmt);

    try {
      let output;
      switch (mode) {
        case 'fv':
          output = PV * Math.pow(1 + r, numPeriods);
          break;
        case 'pv':
          output = FV / Math.pow(1 + r, numPeriods);
          break;
        case 'rate':
          output = ((FV / PV) ** (1 / numPeriods)) - 1;
          output *= 100;
          break;
        case 'pmt':
          output = (FV * r) / (Math.pow(1 + r, numPeriods) - 1);
          break;
        case 'n':
          output = Math.log(FV / PV) / Math.log(1 + r);
          break;
        default:
          output = 'Invalid mode';
      }

      setResult(`Result: ${output.toFixed(2)} ${mode === 'rate' ? '%' : ''}`);
    } catch {
      setResult('Please enter valid numerical inputs.');
    }
  };

  return (
    <CalculatorLayout title="🧮 Financial Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem', lineHeight: '1.6',
        marginBottom: '24px', color: '#444'
      }}>
        Select a financial variable to compute. Enter required values for <strong>PV, FV, PMT, I/Y, or N</strong> based on your choice.
      </p>

      {/* 🎛 Mode Toggle */}
      <div style={{
        display: 'flex', gap: '10px',
        flexWrap: 'wrap', justifyContent: 'center',
        marginBottom: '20px'
      }}>
        {['fv', 'pv', 'rate', 'pmt', 'n'].map((label) => (
          <button
            key={label}
            onClick={() => setMode(label)}
            style={{
              padding: '8px 12px',
              backgroundColor: mode === label ? '#3f51b5' : '#f0f0f0',
              color: mode === label ? '#fff' : '#333',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            {label.toUpperCase()}
          </button>
        ))}
      </div>

      {/* 🧮 Inputs */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        gap: '12px', maxWidth: '400px',
        margin: '0 auto', marginBottom: '20px'
      }}>
        {Object.keys(inputs).map((key) => (
          <input
            key={key}
            type="number"
            placeholder={`${key.toUpperCase()} ${mode === 'rate' && key === 'rate' ? '(%)' : ''}`}
            value={inputs[key]}
            onChange={(e) => handleChange(key, e.target.value)}
            style={{
              padding: '10px', fontSize: '1rem',
              borderRadius: '8px', border: '1px solid #ccc'
            }}
          />
        ))}
        <button
          onClick={calculate}
          style={{
            padding: '10px', backgroundColor: '#3f51b5', color: '#fff',
            border: 'none', borderRadius: '6px', fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          Calculate
        </button>
      </div>

      {/* 📊 Output */}
      {result && (
        <div style={{
          backgroundColor: '#fff', padding: '20px',
          borderRadius: '10px', boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
          maxWidth: '500px', margin: '0 auto',
          textAlign: 'center', fontSize: '1.1rem', color: '#333'
        }}>
          <strong>{result}</strong>
        </div>
      )}
    </CalculatorLayout>
  );
}