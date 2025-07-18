import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function GradeCalculator() {
  const [entries, setEntries] = useState([{ score: '', weight: '' }]);
  const [finalGrade, setFinalGrade] = useState(null);

  const handleChange = (index, field, value) => {
    const newEntries = [...entries];
    newEntries[index][field] = value;
    setEntries(newEntries);
  };

  const addEntry = () => {
    setEntries([...entries, { score: '', weight: '' }]);
  };

  const calculateGrade = () => {
    let totalWeightedScore = 0;
    let totalWeight = 0;

    for (let { score, weight } of entries) {
      const s = parseFloat(score);
      const w = parseFloat(weight);

      if (!isNaN(s) && !isNaN(w)) {
        totalWeightedScore += s * (w / 100);
        totalWeight += w;
      }
    }

    if (totalWeight !== 100) {
      setFinalGrade('Total weight should equal 100%.');
    } else {
      setFinalGrade(`Final Grade: ${totalWeightedScore.toFixed(2)}%`);
    }
  };

  return (
    <CalculatorLayout title="📝 Grade Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Enter each assignment or exam score along with its weight to calculate the final grade for a course. Make sure total weight adds up to <strong>100%</strong> for accurate results.
      </p>

      {/* 🔢 Input Fields */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        marginBottom: '20px'
      }}>
        {entries.map((entry, idx) => (
          <div key={idx} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <input
              type="number"
              step="0.1"
              placeholder="Score (%)"
              value={entry.score}
              onChange={(e) => handleChange(idx, 'score', e.target.value)}
              style={{
                padding: '10px',
                fontSize: '1rem',
                borderRadius: '8px',
                border: '1px solid #ccc',
                width: '120px'
              }}
            />
            <input
              type="number"
              step="0.1"
              placeholder="Weight (%)"
              value={entry.weight}
              onChange={(e) => handleChange(idx, 'weight', e.target.value)}
              style={{
                padding: '10px',
                fontSize: '1rem',
                borderRadius: '8px',
                border: '1px solid #ccc',
                width: '120px'
              }}
            />
          </div>
        ))}
        <button
          onClick={addEntry}
          style={{
            padding: '8px 12px',
            backgroundColor: '#f5f5f5',
            border: '1px solid #aaa',
            borderRadius: '6px',
            fontSize: '0.95rem',
            cursor: 'pointer',
            color: '#333'
          }}
        >
          + Add Another Entry
        </button>
        <button
          onClick={calculateGrade}
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
          Calculate Final Grade
        </button>
      </div>

      {/* 📊 Result Display */}
      {finalGrade && (
        typeof finalGrade === 'string' ? (
          <div style={{
            textAlign: 'center',
            fontSize: '1.1rem',
            color: '#e53935',
            marginTop: '20px'
          }}>
            <strong>{finalGrade}</strong>
          </div>
        ) : (
          <div style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
            maxWidth: '500px',
            margin: '0 auto',
            textAlign: 'center',
            fontSize: '1.1rem',
            color: '#333'
          }}>
            <strong>{finalGrade}</strong>
          </div>
        )
      )}
    </CalculatorLayout>
  );
}