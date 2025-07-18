import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function RentalPropertyCalculator() {
  const [propertyCost, setPropertyCost] = useState('');
  const [annualCashFlow, setAnnualCashFlow] = useState('');
  const [discountRate, setDiscountRate] = useState('');
  const [years, setYears] = useState('');
  const [result, setResult] = useState(null);

  const calculateRentalROI = () => {
    const cost = parseFloat(propertyCost);
    const cashFlow = parseFloat(annualCashFlow);
    const rate = parseFloat(discountRate) / 100;
    const n = parseInt(years);

    if (
      isNaN(cost) || isNaN(cashFlow) || isNaN(rate) || isNaN(n) ||
      cost <= 0 || cashFlow < 0 || rate <= 0 || n <= 0
    ) {
      setResult('Please enter valid positive values.');
      return;
    }

    let npv = 0;
    for (let i = 1; i <= n; i++) {
      npv += cashFlow / Math.pow(1 + rate, i);
    }

    const roi = ((npv - cost) / cost) * 100;

    setResult({
      npv: npv.toFixed(2),
      roi: roi.toFixed(2)
    });
  };

  return (
    <CalculatorLayout title="🏘️ Rental Property Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem', lineHeight: '1.6',
        marginBottom: '24px', color: '#444'
      }}>
        Evaluate the Net Present Value (NPV) and Return on Investment (ROI) of a rental property by entering purchase cost, expected annual cash flow, discount rate, and investment duration.
      </p>

      {/* 🔢 Inputs */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        gap: '12px', maxWidth: '400px',
        margin: '0 auto', marginBottom: '20px'
      }}>
        <input
          type="number" placeholder="Property Cost ($)"
          value={propertyCost}
          onChange={(e) => setPropertyCost(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="number" placeholder="Annual Cash Flow ($)"
          value={annualCashFlow}
          onChange={(e) => setAnnualCashFlow(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="number" placeholder="Discount Rate (%)"
          value={discountRate}
          onChange={(e) => setDiscountRate(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="number" placeholder="Investment Duration (Years)"
          value={years}
          onChange={(e) => setYears(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <button
          onClick={calculateRentalROI}
          style={{
            padding: '10px', backgroundColor: '#3f51b5',
            color: '#fff', border: 'none',
            borderRadius: '6px', fontSize: '1rem', cursor: 'pointer'
          }}
        >
          Calculate ROI
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
            <p><strong>Net Present Value (NPV):</strong> ${result.npv}</p>
            <p><strong>ROI:</strong> {result.roi}%</p>
          </div>
        )
      )}
    </CalculatorLayout>
  );
}