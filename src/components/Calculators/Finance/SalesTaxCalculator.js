import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function SalesTaxCalculator() {
  const [amount, setAmount] = useState('');
  const [taxRate, setTaxRate] = useState('');
  const [result, setResult] = useState(null);

  const calculateTax = () => {
    const price = parseFloat(amount);
    const rate = parseFloat(taxRate);

    if (isNaN(price) || isNaN(rate) || price <= 0 || rate < 0) {
      setResult('Please enter a valid price and tax rate.');
      return;
    }

    const tax = (price * rate) / 100;
    const total = price + tax;

    setResult({
      tax: tax.toFixed(2),
      total: total.toFixed(2)
    });
  };

  return (
    <CalculatorLayout title="🏷️ Sales Tax Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem', lineHeight: '1.6',
        marginBottom: '24px', color: '#444'
      }}>
        Calculate sales tax and total amount after tax for any product or service. Just enter the price and local tax rate.
      </p>

      {/* 🔢 Inputs */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        gap: '12px', maxWidth: '400px',
        margin: '0 auto', marginBottom: '20px'
      }}>
        <input
          type="number" placeholder="Price ($)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="number" placeholder="Tax Rate (%)"
          value={taxRate}
          onChange={(e) => setTaxRate(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <button
          onClick={calculateTax}
          style={{
            padding: '10px', backgroundColor: '#3f51b5',
            color: '#fff', border: 'none',
            borderRadius: '6px', fontSize: '1rem',
            cursor: 'pointer'
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
            <p><strong>Tax:</strong> ${result.tax}</p>
            <p><strong>Total Amount:</strong> ${result.total}</p>
          </div>
        )
      )}
    </CalculatorLayout>
  );
}