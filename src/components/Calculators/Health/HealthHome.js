import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackButton from '../../BackButton';

const healthTools = [
  {
    name: 'BMI Calculator',
    path: '/calculators/health/bmi',
    description: 'Estimate your body mass index using height and weight.',
    icon: '⚖️'
  },
  {
    name: 'BMR Calculator',
    path: '/calculators/health/bmr',
    description: 'Calculate your Basal Metabolic Rate to manage calorie intake.',
    icon: '🔥'
  },
  {
    name: 'Body Fat Percentage Calculator',
    path: '/calculators/health/body-fat',
    description: 'Find your body fat % using BMI and Navy method.',
    icon: '🩻'
  },
  {
    name: 'Ideal Weight Calculator',
    path: '/calculators/health/ideal-weight',
    description: 'Determine optimal weight ranges for height and age.',
    icon: '📏'
  },
  {
    name: 'Calorie Calculator',
    path: '/calculators/health/calorie',
    description: 'Estimate daily calorie needs for weight goals.',
    icon: '🍽️'
  },
  {
    name: 'Calories Burned Calculator',
    path: '/calculators/health/calories-burned',
    description: 'Track calories burned by activity and duration.',
    icon: '🏃‍♀️'
  },
  {
    name: 'TDEE Calculator',
    path: '/calculators/health/tdee',
    description: 'Calculate Total Daily Energy Expenditure (TDEE).',
    icon: '⚡'
  },
  {
    name: 'Protein Calculator',
    path: '/calculators/health/protein',
    description: 'Calculate daily protein intake based on goals.',
    icon: '🥩'
  },
  {
    name: 'Macro Calculator',
    path: '/calculators/health/macro',
    description: 'Estimate carb, fat, and protein goals.',
    icon: '📊'
  },
  {
    name: 'Body Type Calculator',
    path: '/calculators/health/body-type',
    description: 'Find your body shape and proportion type.',
    icon: '🧍‍♀️'
  },
  {
    name: 'Army Body Fat Calculator',
    path: '/calculators/health/army-body-fat',
    description: 'Calculate body fat per U.S. Army standards.',
    icon: '🎖️'
  },
  {
    name: 'Pregnancy Calculator',
    path: '/calculators/health/pregnancy',
    description: 'Estimate pregnancy timeline from key dates.',
    icon: '🤰'
  },
  {
    name: 'Due Date Calculator',
    path: '/calculators/health/due-date',
    description: 'Calculate estimated due date of your pregnancy.',
    icon: '📅'
  },
  {
    name: 'Conception Date Calculator',
    path: '/calculators/health/conception-date',
    description: 'Estimate when conception likely occurred.',
    icon: '🧬'
  },
  {
    name: 'Pregnancy Weight Gain Calculator',
    path: '/calculators/health/pregnancy-weight-gain',
    description: 'Track weekly weight gain during pregnancy.',
    icon: '⚖️'
  },
  {
    name: 'Period Calculator',
    path: '/calculators/health/period',
    description: 'Predict your next menstrual cycle start date.',
    icon: '🩸'
  },
  {
    name: 'Ovulation Calculator',
    path: '/calculators/health/ovulation',
    description: 'Estimate your most fertile days for conception.',
    icon: '🌸'
  },
  {
    name: 'Bra Size Calculator',
    path: '/calculators/health/bra-size',
    description: 'Determine correct bra size by measurements.',
    icon: '👙'
  },
  {
    name: 'BAC Calculator',
    path: '/calculators/health/bac',
    description: 'Estimate current blood alcohol concentration.',
    icon: '🍷'
  },
  {
    name: 'Pace Calculator',
    path: '/calculators/health/pace',
    description: 'Calculate running pace, time, or distance.',
    icon: '⏱️'
  }
];

export default function HealthHome() {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filteredTools = healthTools.filter(tool =>
    tool.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main style={container}>
      <div style={wrapper}>
        {/* 🩺 Title + Back */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: isMobile ? 'center' : 'space-between',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '32px',
          textAlign: isMobile ? 'center' : 'left',
          flexWrap: 'wrap'
        }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 700,
            color: '#2c2c2c',
            margin: 0,
            textAlign: isMobile ? 'center' : 'left'
          }}>
            Health Calculators
          </h1>
          <div style={{
            display: 'flex',
            justifyContent: isMobile ? 'center' : 'flex-end',
            width: isMobile ? '100%' : 'auto'
          }}>
            <BackButton />
          </div>
        </div>

        {/* 🧭 Introduction */}
        <section style={{
          marginBottom: '36px',
          color: '#4a4a4a',
          fontSize: '1rem',
          lineHeight: '1.6'
        }}>
          <p style={{ marginBottom: '16px' }}>
            MapleAssist’s health calculators empower users to monitor and refine their wellness routines with precision. Designed for ease and accuracy, these tools cover a wide range of metrics from nutrition and fitness to physiological tracking — all delivered through a secure, offline-friendly experience.
          </p>
          <ul style={{
            paddingLeft: '20px',
            marginBottom: '16px',
            fontSize: '0.95rem',
            color: '#555',
            lineHeight: '1.6'
          }}>
            <li>⚖️ BMI, calorie intake, and weight goal estimators</li>
            <li>❤️ Heart rate zones, metabolism and training analyzers</li>
            <li>🩸 Pregnancy, ovulation, and hydration tracking</li>
            <li>🔒 100% offline — no logins, tracking, or data sharing</li>
          </ul>
        </section>

        {/* 🔍 Search */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search health tools..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              padding: '10px 14px',
              fontSize: '1rem',
              borderRadius: '8px',
              border: '1px solid #ccc',
              width: '100%',
              maxWidth: '400px'
            }}
          />
        </div>

        {/* 🧮 Tool Cards */}
        <section style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '28px',
          marginBottom: '60px'
        }}>
          {filteredTools.map(({ path, icon, name, description }, i) => (
            <Link key={i} to={path} style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '12px',
              boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
              textDecoration: 'none',
              color: '#2c2c2c',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              transition: 'transform 0.2s ease-in-out'
            }}>
              <div style={{ fontSize: '1.8rem' }}>{icon}</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 600 }}>{name}</h3>
              <p style={{ fontSize: '0.95rem', color: '#555', lineHeight: '1.5' }}>
                {description}
              </p>
            </Link>
          ))}

          {filteredTools.length === 0 && (
            <p style={{
              textAlign: 'center',
              fontSize: '1rem',
              color: '#888',
              gridColumn: '1 / -1'
            }}>
              No matching calculators found.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}

// 🌿 Layout container styles
const container = {
  backgroundColor: '#f7f9fb',
  minHeight: '100vh',
  padding: '40px 20px',
  display: 'flex',
  justifyContent: 'center'
};

const wrapper = {
  width: '100%',
  maxWidth: '1100px'
};
