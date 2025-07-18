import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function TipCalculator() {
  const [billAmount, setBillAmount] = useState('');
  const [tipPercentage, setTipPercentage] = useState('');
  const [splitCount, setSplitCount] = useState(1);
  const [result, setResult] = useState(null);

  const calculateTip = () => {
    const bill = parseFloat(billAmount);
    const tip = parseFloat(tipPercentage);
    const people = parseInt(splitCount);

    if (isNaN(bill) || isNaN(tip) || isNaN(people) || bill <= 0 || tip < 0 || people < 1) {
      setResult('Please enter valid values for bill, tip and people count.');
      return;
    }

    const tipAmount = (bill * tip) / 100;
    const total = bill + tipAmount;
    const perPerson = total / people;

    setResult({
      tipAmount: tipAmount.toFixed(2),
      totalAmount: total.toFixed(2),
      amountPerPerson: perPerson.toFixed(2)
    });
  };

  return (
    <CalculatorLayout title="🍽️ Tip Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem', lineHeight: '1.6',
        marginBottom: '24px', color: '#444'
      }}>
        Calculate how much to tip and split the total among multiple people. Quick and easy for group dinners, cafes, or ride shares.
      </p>

      {/* 🔢 Inputs */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        gap: '12px', maxWidth: '400px',
        margin: '0 auto', marginBottom: '20px'
      }}>
        <input
          type="number" placeholder="Bill Amount ($)"
          value={billAmount}
          onChange={(e) => setBillAmount(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="number" placeholder="Tip Percentage (%)"
          value={tipPercentage}
          onChange={(e) => setTipPercentage(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="number" placeholder="Number of People"
          value={splitCount}
          onChange={(e) => setSplitCount(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <button
          onClick={calculateTip}
          style={{
            padding: '10px', backgroundColor: '#3f51b5',
            color: '#fff', border: 'none',
            borderRadius: '6px', fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          Calculate Tip
        </button>
      </div>

      {/* 📊 Result */}
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
            textAlign: 'center', fontSize: '1.1rem', color: '#333'
          }}>
            <p><strong>Tip Amount:</strong> ${result.tipAmount}</p>
            <p><strong>Total Bill:</strong> ${result.totalAmount}</p>
            <p><strong>Per Person:</strong> ${result.amountPerPerson}</p>
          </div>
        )
      )}
    </CalculatorLayout>
  );
}