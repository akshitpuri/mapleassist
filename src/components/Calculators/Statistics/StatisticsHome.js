import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackButton from '../../BackButton';


const statisticsTools = [
  {
    name: 'Combinations Calculator',
    path: '/calculators/statistics/combinations',
    description: 'Find the number of possible combinations for selections and arrangements.',
    icon: '🧠'
  },
  {
    name: 'Mean Median Mode',
    path: '/calculators/statistics/mmm',
    description: 'Calculate average, middle value, and most frequent number in a dataset.',
    icon: '📊'
  },
  {
    name: 'Standard Deviation',
    path: '/calculators/statistics/std-dev',
    description: 'Measure the spread or variation of data points from the mean.',
    icon: '📈'
  },
  {
    name: 'Variance Calculator',
    path: '/calculators/statistics/variance',
    description: 'Determine how far values in a dataset diverge from the average.',
    icon: '📉'
  },
  {
    name: 'Average Calculator',
    path: '/calculators/statistics/average',
    description: 'Find the arithmetic mean of a dataset and view calculation steps.',
    icon: '➗'
  },
  {
    name: 'Z-Score Calculator',
    path: '/calculators/statistics/z-score',
    description: 'Calculate z-scores and probability from a normal distribution curve.',
    icon: '🔍'
  },
  {
    name: 'Permutation Calculator',
    path: '/calculators/statistics/permutation',
    description: 'Determine the number of ordered subsets of a given dataset.',
    icon: '🔢'
  },
  {
    name: 'Probability Calculator',
    path: '/calculators/statistics/probability',
    description: 'Evaluate simple or compound event probability, including normal distribution.',
    icon: '🎯'
  },
  {
    name: 'Quartile Calculator',
    path: '/calculators/statistics/quartile',
    description: 'Find Q1, Q2, Q3, IQR, min, max, and range from your dataset.',
    icon: '📐'
  },
  {
    name: 'Sample Size Calculator',
    path: '/calculators/statistics/sample-size',
    description: 'Calculate minimum sample size and margin of error for surveys.',
    icon: '🧪'
  },
  {
    name: 'Mean Calculator',
    path: '/calculators/statistics/mean',
    description: 'Get the mean of a dataset — simply and accurately.',
    icon: '🟰'
  },
  {
    name: 'Odds Calculator',
    path: '/calculators/statistics/odds',
    description: 'Convert between odds and probability, win/loss formats supported.',
    icon: '🎲'
  },
  {
    name: 'Percentile Calculator',
    path: '/calculators/statistics/percentile',
    description: 'Find percentile rank and identify values across a distribution.',
    icon: '📶'
  },
  {
    name: 'Mean Median Mode Range',
    path: '/calculators/statistics/mmmr',
    description: 'Analyze central tendency and distribution of values including range.',
    icon: '🧮'
  }
];
export default function StatisticsHome() {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filteredTools = statisticsTools.filter(tool =>
    tool.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main style={{
      backgroundColor: '#f7f9fb',
      minHeight: '100vh',
      padding: '40px 20px',
      display: 'flex',
      justifyContent: 'center'
    }}>
      <div style={{ width: '100%', maxWidth: '1100px' }}>
        {/* 📊 Title + Back Button */}
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
            Statistics Calculators
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
            MapleAssist’s statistics calculators help users explore and analyze quantitative data with clarity. Whether you're preparing for exams or reviewing datasets, these tools simplify complex metrics with offline access and no distractions.
          </p>
          <ul style={{
            paddingLeft: '20px',
            marginBottom: '16px',
            fontSize: '0.95rem',
            color: '#555',
            lineHeight: '1.6'
          }}>
            <li>📊 Mean, median, mode, and range calculators</li>
            <li>📈 Variance, standard deviation, and z-score estimators</li>
            <li>🔢 Probability, distribution and sample size tools</li>
            <li>🔒 100% private — no login, cloud sync or tracking</li>
          </ul>
        </section>

        {/* 🔍 Search Box */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search statistics tools..."
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

        {/* 🧮 Tool Grid */}
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
              <p style={{ fontSize: '0.95rem', color: '#555', lineHeight: '1.5' }}>{description}</p>
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
