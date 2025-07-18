import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function GasCostCalculator() {
  const [distance, setDistance] = useState('');
  const [efficiency, setEfficiency] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('mpg'); // mpg or L/100km
  const [result, setResult] = useState(null);

  const calculateCost = () => {
    const D = parseFloat(distance);
    const E = parseFloat(efficiency);
    const P = parseFloat(price);

    if ([D, E, P].some(v => isNaN(v) || v <= 0)) {
      setResult('Please enter valid values.');
      return;
    }

    let fuelUsed = 0;
    if (unit === 'mpg') {
      fuelUsed = D / E;
    } else {
      fuelUsed = (D * E) / 100;
    }

    const cost = fuelUsed * P;

    setResult({
      fuelUsed: fuelUsed.toFixed(2),
      cost: cost.toFixed(2),
      unit: unit === 'mpg' ? 'gallons' : 'liters',
      currency: '$'
    });
  };

  return (
    <CalculatorLayout title="⛽ Gas Cost Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem', lineHeight: '1.6',
        marginBottom: '24px', color: '#444'
      }}>
        Estimate the fuel cost of a trip by entering distance, fuel efficiency, and gas price. Supports both MPG and L/100km formats.
      </p>

      {/* 🔢 Inputs */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        gap: '12px', maxWidth: '400px',
        margin: '0 auto', marginBottom: '20px'
      }}>
        <select value={unit} onChange={(e) => setUnit(e.target.value)} style={{
          padding: '10px', fontSize: '1rem',
          borderRadius: '8px', border: '1px solid #ccc'
        }}>
          <option value="mpg">Miles per Gallon (MPG)</option>
          <option value="l/100km">Liters per 100km (L/100km)</option>
        </select>

        <input
          type="number" placeholder={`Distance (${unit === 'mpg' ? 'miles' : 'km'})`}
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="number" placeholder={`Fuel Efficiency (${unit})`}
          value={efficiency}
          onChange={(e) => setEfficiency(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <input
          type="number" placeholder={`Fuel Price (${unit === 'mpg' ? 'per gallon' : 'per liter'})`}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{
            padding: '10px', fontSize: '1rem',
            borderRadius: '8px', border: '1px solid #ccc'
          }}
        />
        <button onClick={calculateCost} style={{
          padding: '10px', backgroundColor: '#3f51b5',
          color: '#fff', border: 'none',
          borderRadius: '6px', fontSize: '1rem',
          cursor: 'pointer'
        }}>
          Calculate Fuel Cost
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
          <p><strong>Fuel Used:</strong> {result.fuelUsed} {result.unit}</p>
          <p><strong>Estimated Cost:</strong> {result.currency}{result.cost}</p>
        </div>
      )}
    </CalculatorLayout>
  );
}