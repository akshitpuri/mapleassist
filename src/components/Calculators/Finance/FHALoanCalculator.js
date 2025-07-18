import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function FHALoanCalculator() {
  const [loanAmount, setLoanAmount] = useState('');
  const [rate, setRate] = useState('');
  const [term, setTerm] = useState('');
  const [upfrontMIP, setUpfrontMIP] = useState('1.75'); // FHA default upfront fee %
  const [annualMIP, setAnnualMIP] = useState('0.85'); // FHA default annual fee %
  const [result, setResult] = useState(null);

  const calculateFHA = () => {
    const baseLoan = parseFloat(loanAmount);
    const monthlyRate = parseFloat(rate) / 100 / 12;
    const years = parseInt(term);
    const upfrontRate = parseFloat(upfrontMIP) / 100;
    const annualRate = parseFloat(annualMIP) / 100;

    if (
      isNaN(baseLoan) || isNaN(monthlyRate) || isNaN(years) ||
      isNaN(upfrontRate) || isNaN(annualRate) ||
      baseLoan <= 0 || monthlyRate <= 0 || years <= 0
    ) {
      setResult('Please enter valid positive values.');
      return;
    }

    const financedMIP = baseLoan * upfrontRate;
    const totalLoan = baseLoan + financedMIP;
    const principalAndInterest = (totalLoan * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -(years * 12)));
    const mipMonthly = (baseLoan * annualRate) / 12;
    const totalMonthly = principalAndInterest + mipMonthly;

    setResult({
      totalLoan: totalLoan.toFixed(2),
      principalAndInterest: principalAndInterest.toFixed(2),
      mipMonthly: mipMonthly.toFixed(2),
      totalMonthly: totalMonthly.toFixed(2)
    });
  };

  return (
    <CalculatorLayout title="🏘️ FHA Loan Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem', lineHeight: '1.6',
        marginBottom: '24px', color: '#444'
      }}>
        Estimate your FHA loan costs including principal & interest, Upfront Mortgage Insurance Premium (MIP), and monthly MIP payments. This tool uses standard FHA MIP rates (1.75% upfront, 0.85% annual).
      </p>

      {/* 🔢 Inputs */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        gap: '12px', maxWidth: '400px',
        margin: '0 auto', marginBottom: '20px'
      }}>
        <input
          type="number" placeholder="Base Loan Amount ($)"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="number" placeholder="Interest Rate (%)"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="number" placeholder="Loan Term (Years)"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <button
          onClick={calculateFHA}
          style={{
            padding: '10px', backgroundColor: '#3f51b5',
            color: '#fff', border: 'none',
            borderRadius: '6px', fontSize: '1rem', cursor: 'pointer'
          }}
        >
          Calculate
        </button>
      </div>

      {/* 📊 Results */}
      {result && (
        typeof result === 'string' ? (
          <div style={{
            textAlign: 'center', fontSize: '1.1rem',
            color: '#e53935', marginTop: '20px'
          }}>
            <strong>{result}</strong>
          </div>
        ) : (
          <div style={{
            backgroundColor: '#fff', padding: '20px',
            borderRadius: '10px', boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
            maxWidth: '500px', margin: '0 auto',
            fontSize: '1.1rem', color: '#333', textAlign: 'center'
          }}>
            <p><strong>Total FHA Loan:</strong> ${result.totalLoan}</p>
            <p><strong>Principal & Interest:</strong> ${result.principalAndInterest}</p>
            <p><strong>Monthly MIP:</strong> ${result.mipMonthly}</p>
            <p><strong>Total Monthly Payment:</strong> ${result.totalMonthly}</p>
          </div>
        )
      )}
    </CalculatorLayout>
  );
}