import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function GPACalculator() {
  const [entries, setEntries] = useState([{ grade: '', credits: '' }]);
  const [gpa, setGpa] = useState(null);

  const handleChange = (index, field, value) => {
    const newEntries = [...entries];
    newEntries[index][field] = value;
    setEntries(newEntries);
  };

  const addEntry = () => {
    setEntries([...entries, { grade: '', credits: '' }]);
  };

  const calculateGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    for (let { grade, credits } of entries) {
      const g = parseFloat(grade);
      const c = parseFloat(credits);

      if (!isNaN(g) && !isNaN(c)) {
        totalPoints += g * c;
        totalCredits += c;
      }
    }

    if (totalCredits === 0) {
      setGpa('Please enter valid grades and credits.');
    } else {
      const result = totalPoints / totalCredits;
      setGpa(`Your GPA is ${result.toFixed(2)}`);
    }
  };

  return (
    <CalculatorLayout title="🎓 GPA Calculator">
      <BackButton />
      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Calculate your Grade Point Average (GPA) based on course grades and credit hours. Input each subject’s grade and credits, then compute your weighted GPA score.
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
              placeholder="Grade (e.g. 4.0)"
              value={entry.grade}
              onChange={(e) => handleChange(idx, 'grade', e.target.value)}
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
              placeholder="Credits"
              value={entry.credits}
              onChange={(e) => handleChange(idx, 'credits', e.target.value)}
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
          + Add Another Subject
        </button>
        <button
          onClick={calculateGPA}
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
          Calculate GPA
        </button>
      </div>

      {/* 📊 Result */}
      {gpa && (
        typeof gpa === 'string' ? (
          <div style={{
            textAlign: 'center',
            fontSize: '1.1rem',
            color: '#e53935',
            marginTop: '20px'
          }}>
            <strong>{gpa}</strong>
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
            <strong>{gpa}</strong>
          </div>
        )
      )}
    </CalculatorLayout>
  );
}