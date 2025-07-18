import React, { useState, useEffect } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function SnowDayCalculator() {
  const [temp, setTemp] = useState('');
  const [snow, setSnow] = useState('');
  const [wind, setWind] = useState('');
  const [alert, setAlert] = useState(false);
  const [region, setRegion] = useState('ontario');
  const [chance, setChance] = useState(null);

  const schoolHistory = [
    { year: '2021–22', closures: 7 },
    { year: '2022–23', closures: 9 },
    { year: '2023–24', closures: 11 },
  ];

  useEffect(() => {
    // Inject snow animation if not already present
    const sheet = document.styleSheets[0];
    const snowAnim = `
      @keyframes snowFloat {
        0% { transform: translateY(0); opacity: 1; }
        50% { transform: translateY(12px); opacity: 0.6; }
        100% { transform: translateY(0); opacity: 1; }
      }`;
    const exists = Array.from(sheet.cssRules).some(rule => rule.name === 'snowFloat');
    if (!exists) sheet.insertRule(snowAnim, sheet.cssRules.length);
  }, []);

  const calculateChance = () => {
    const t = parseFloat(temp);
    const s = parseFloat(snow);
    const w = parseFloat(wind);

    if (isNaN(t) || isNaN(s) || isNaN(w)) {
      setChance('Please enter valid numeric values.');
      return;
    }

    let score = 0;

    // Regional weighting
    if (region === 'ontario') score += 1;
    if (region === 'alberta') score -= 1;
    if (region === 'quebec') score += 1;

    // Temperature
    if (t < -10) score += 2;
    else if (t < -5) score += 1;

    // Snowfall
    if (s > 10) score += 2;
    else if (s > 5) score += 1;

    // Wind
    if (w > 40) score += 2;
    else if (w > 25) score += 1;

    // Storm alerts
    if (alert) score += 2;

    const level =
      score >= 6 ? '❄️ High chance! Break out the sleds!' :
      score >= 4 ? '🌨️ Moderate chance. Cross your mittens!' :
      score >= 2 ? '🌬️ Low chance. Might still get lucky!' :
                   '☀️ Unlikely today — layer up and head out.';

    setChance(level);
  };

  return (
    <CalculatorLayout title="❄️ Snow Day Calculator">
      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '20px',
        color: '#444'
      }}>
        Predict your region’s snow day chances based on weather inputs. Includes regional bias and fun stats from recent school closures.
      </p>

      {/* Inputs */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '420px',
        margin: '0 auto',
        marginBottom: '24px'
      }}>
        <select value={region} onChange={(e) => setRegion(e.target.value)} style={inputStyle}>
          <option value="ontario">Ontario</option>
          <option value="alberta">Alberta</option>
          <option value="quebec">Québec</option>
          <option value="bc">British Columbia</option>
          <option value="other">Other</option>
        </select>

        <input type="number" value={temp} onChange={(e) => setTemp(e.target.value)}
          placeholder="Temperature (°C)" style={inputStyle} />

        <input type="number" value={snow} onChange={(e) => setSnow(e.target.value)}
          placeholder="Snowfall (cm)" style={inputStyle} />

        <input type="number" value={wind} onChange={(e) => setWind(e.target.value)}
          placeholder="Wind speed (km/h)" style={inputStyle} />

        <label style={{ fontSize: '0.95rem', color: '#333' }}>
          <input type="checkbox" checked={alert} onChange={(e) => setAlert(e.target.checked)}
            style={{ marginRight: '8px' }} />
          Active storm or weather warning
        </label>

        <button onClick={calculateChance} style={{
          padding: '10px',
          backgroundColor: '#3178c6',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '1rem',
          cursor: 'pointer'
        }}>
          Check Snow Day Chance
        </button>
      </div>

      {/* Output */}
      {chance && (
        <div style={{
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
          maxWidth: '500px',
          margin: '0 auto',
          textAlign: 'center',
          fontSize: '1.1rem',
          color: '#333',
          position: 'relative'
        }}>
          <strong>{chance}</strong>

          <div style={{
            fontSize: '2rem',
            marginTop: '14px',
            animation: 'snowFloat 3s infinite ease-in-out'
          }}>
            ❄️✨
          </div>

          {/* School closure history */}
          <div style={{ marginTop: '20px' }}>
            <h4 style={{ fontSize: '1rem', marginBottom: '8px' }}>📅 Historical Snow Day Data</h4>
            <ul style={{ listStyle: 'none', paddingLeft: 0, color: '#555' }}>
              {schoolHistory.map(({ year, closures }, i) => (
                <li key={i} style={{ padding: '4px 0' }}>
                  🏫 {year}: {closures} closures
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}

// ✨ Shared input style
const inputStyle = {
  padding: '10px',
  fontSize: '1rem',
  borderRadius: '8px',
  border: '1px solid #ccc'
};