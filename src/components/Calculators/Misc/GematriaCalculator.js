import React, { useState, useEffect } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';

export default function GematriaCalculator() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [breakdown, setBreakdown] = useState(true);
  const [language, setLanguage] = useState('english');
  const [saved, setSaved] = useState([]);
  const [showCard, setShowCard] = useState(false);

  const hebrewMap = {
    'א': 1, 'ב': 2, 'ג': 3, 'ד': 4, 'ה': 5, 'ו': 6, 'ז': 7, 'ח': 8, 'ט': 9,
    'י': 10, 'כ': 20, 'ך': 20, 'ל': 30, 'מ': 40, 'ם': 40, 'נ': 50, 'ן': 50,
    'ס': 60, 'ע': 70, 'פ': 80, 'ף': 80, 'צ': 90, 'ץ': 90, 'ק': 100,
    'ר': 200, 'ש': 300, 'ת': 400
  };

  const famousValues = {
    13: 'Love (אהבה)',
    18: 'Chai – Life ✡️',
    26: 'YHWH (יהוה)',
    72: '72 Names of God',
    358: 'Messiah (משיח)',
    613: 'Mitzvot – 613 Commandments'
  };

  const knownWords = {
    english: {
      'god': 26, 'life': 32, 'love': 54, 'peace': 53, 'light': 56
    },
    hebrew: {
      'חיים': 68, 'אהבה': 13, 'משיח': 358, 'אור': 207, 'שלום': 376
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem('gematriaBookmarks');
    if (stored) setSaved(JSON.parse(stored));
    const sheet = document.styleSheets[0];
    const anim = `
      @keyframes glowCard {
        0% { transform: scale(1); box-shadow: none; }
        50% { transform: scale(1.04); box-shadow: 0 0 12px rgba(123,67,151,0.3); }
        100% { transform: scale(1); box-shadow: none; }
      }`;
    const exists = Array.from(sheet.cssRules).some(r => r.name === 'glowCard');
    if (!exists) sheet.insertRule(anim, sheet.cssRules.length);
  }, []);

  const calculate = () => {
    if (!text.trim()) {
      setResult('Please enter a phrase.');
      return;
    }

    let clean = text.replace(/\s/g, '');
    let chars = [];
    let values = [];

    if (language === 'english') {
      clean = clean.toUpperCase().replace(/[^A-Z]/g, '');
      chars = clean.split('');
      values = chars.map(c => c.charCodeAt(0) - 64);
    } else {
      clean = clean.replace(/[^\u0590-\u05FF]/g, '');
      chars = clean.split('');
      values = chars.map(c => hebrewMap[c] || 0);
    }

    const total = values.reduce((a, b) => a + b, 0);
    const matches = Object.entries(knownWords[language]).filter(
      ([word, val]) => val === total
    );

    setResult({ total, chars, values, matches });
  };

  const savePhrase = () => {
    const entry = { text, value: result.total, lang: language };
    const updated = [entry, ...saved.filter(p => p.text !== text)].slice(0, 5);
    localStorage.setItem('gematriaBookmarks', JSON.stringify(updated));
    setSaved(updated);
  };

  return (
    <CalculatorLayout title="🔮 Gematria Calculator">
      <BackButton />
      <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '20px', color: '#444' }}>
        Discover hidden meanings and numeric values in English or Hebrew words. Compare to famous symbols, visualize letter power, and save your mystic favorites.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '420px', margin: '0 auto', marginBottom: '24px' }}>
        <select value={language} onChange={(e) => setLanguage(e.target.value)} style={inputStyle}>
          <option value="english">English (A=1…Z=26)</option>
          <option value="hebrew">Hebrew (א=1…ת=400)</option>
        </select>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)}
          placeholder={language === 'english' ? 'Enter phrase (e.g. peace)' : 'הקלד ביטוי בעברית'}
          style={inputStyle} />

        <button onClick={calculate} style={buttonStyle}>Calculate</button>

        <label style={{ fontSize: '0.95rem', color: '#333' }}>
          <input type="checkbox" checked={breakdown} onChange={(e) => setBreakdown(e.target.checked)} style={{ marginRight: '8px' }} />
          Show breakdown & chart
        </label>

        <label style={{ fontSize: '0.95rem', color: '#333' }}>
          <input type="checkbox" checked={showCard} onChange={(e) => setShowCard(e.target.checked)} style={{ marginRight: '8px' }} />
          Enable mystic glow card
        </label>
      </div>

      {typeof result === 'string' ? (
        <p style={{ textAlign: 'center', color: '#b22222' }}>{result}</p>
      ) : result && (
        <div style={{
          ...resultBox,
          animation: showCard ? 'glowCard 4s infinite ease-in-out' : 'none'
        }}>
          <h3 style={{ marginBottom: '12px' }}>🔢 Total Value: {result.total}</h3>

          {famousValues[result.total] && (
            <p style={{ fontStyle: 'italic', color: '#3178c6' }}>
              ✡️ Meaning: {famousValues[result.total]}
            </p>
          )}

          {result.matches.length > 0 && (
            <p style={{ marginTop: '10px', color: '#444' }}>
              🔍 Matches known word:
              {result.matches.map(([word]) => (
                <span key={word} style={{ marginLeft: '6px', fontWeight: 'bold' }}>{word}</span>
              ))}
            </p>
          )}

          {breakdown && (
            <>
              <p style={{ marginTop: '14px', color: '#555' }}>
                {result.chars.map((c, i) => (
                  <span key={i} style={{ marginRight: '10px' }}>{c}: {result.values[i]}</span>
                ))}
              </p>
              <div style={{ display: 'flex', gap: '4px', marginTop: '12px', justifyContent: 'center' }}>
                {result.values.map((val, i) => (
                  <div key={i} style={{
                    height: `${val * 2}px`,
                    width: '10px',
                    backgroundColor: '#7b4397',
                    borderRadius: '4px',
                    opacity: 0.85
                  }} title={`${result.chars[i]} = ${val}`} />
                ))}
              </div>
            </>
          )}

          <button onClick={savePhrase} style={{
            marginTop: '18px',
            backgroundColor: '#444',
            color: '#fff',
            padding: '8px 12px',
            fontSize: '0.95rem',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer'
          }}>
            🔖 Bookmark Phrase
          </button>
          <p style={{ fontSize: '0.9rem', marginTop: '18px', color: '#444' }}>
            🌐 More resources:
            <a href="https://www.gematrix.org" target="_blank" rel="noopener noreferrer" style={{ marginLeft: '6px', color: '#3178c6' }}>Gematrix.org</a>
            <span style={{ margin: '0 6px' }}>|</span>
            <a href="https://www.sefaria.org/texts/Kabbalah" target="_blank" rel="noopener noreferrer" style={{ color: '#3178c6' }}>Sefaria</a>
          </p>
        </div>
      )}

      {/* Bookmarked phrases list */}
      {saved.length > 0 && (
        <div style={{
          marginTop: '30px',
          maxWidth: '480px',
          marginLeft: 'auto',
          marginRight: 'auto',
          backgroundColor: '#f9f9ff',
          padding: '16px',
          borderRadius: '8px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          fontSize: '0.95rem',
          color: '#444'
        }}>
          <h4 style={{ marginBottom: '12px' }}>🔖 Bookmarked Phrases</h4>
          <ul style={{ paddingLeft: '0', listStyle: 'none' }}>
            {saved.map((p, i) => (
              <li key={i} style={{ padding: '6px 0' }}>
                <strong>{p.text}</strong> → {p.value} ({p.lang})
              </li>
            ))}
          </ul>
        </div>
      )}
    </CalculatorLayout>
  );
}

// ✨ Inline styles
const inputStyle = {
  padding: '10px',
  fontSize: '1rem',
  borderRadius: '8px',
  border: '1px solid #ccc'
};

const buttonStyle = {
  padding: '10px',
  backgroundColor: '#7b4397',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  fontSize: '1rem',
  cursor: 'pointer'
};

const resultBox = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
  maxWidth: '500px',
  margin: '0 auto',
  textAlign: 'center',
  fontSize: '1.1rem',
  color: '#333'
};