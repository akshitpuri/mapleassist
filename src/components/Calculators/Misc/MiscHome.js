import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackButton from '../../BackButton';


const miscTools = [
  {
    name: 'Dice Roller',
    path: '/calculators/misc/dice',
    description: 'Roll digital dice of any size — great for board games or probability practice.',
    icon: '🎲'
  },
  {
    name: 'Sleep Cycle Calculator',
    path: '/calculators/misc/sleep',
    description: 'Find optimal bedtimes or wake-up times based on 90-minute sleep cycles — feel refreshed and rested.',
    icon: '😴'
  },
{
  name: 'Gematria Calculator',
  path: '/calculators/misc/gematria',
  description: 'Reveal numeric meaning of words using English or Hebrew gematria. Compare values, uncover symbolism, and explore hidden connections.',
  icon: '🔮'
},
 {
    name: 'Love Calculator',
    path: '/calculators/misc/love-calculator',
    description: 'Enter two names and discover your playful love compatibility score — no science, just 💘 fun!',
    icon: '❤️'
  },
  {
    name: 'GPA Calculator',
    path: '/calculators/misc/gpa',
    description: 'Calculate your GPA across multiple courses and grade formats.',
    icon: '📚'
  },
  {
  name: 'Snow Day Calculator',
  path: '/calculators/misc/snowday',
  description: 'Estimate chances of school closures based on temperature, snow, wind, and storm alerts — built for curious Canadian minds.',
  icon: '❄️'
},
  {
    name: 'Grade Calculator',
    path: '/calculators/misc/grade',
    description: 'Estimate final grades based on scores, weights, and performance.',
    icon: '📝'
  },
  {
    name: 'Number to Words',
    path: '/calculators/misc/numbertowords',
    description: 'Convert numeric digits into readable English text (e.g. “123” → “one hundred twenty-three”).',
    icon: '🔢'
  },
  {
    name: 'Subnet Calculator',
    path: '/calculators/misc/subnet',
    description: 'Compute IP subnet ranges, masks, and hosts — ideal for network design.',
    icon: '🌐'
  },
   {
    name: 'Height Calculator',
    path: '/calculators/misc/height',
    description: 'Predict adult height based on childhood measurements.',
    icon: '📏'
  },
  {
    name: 'Unit Converter',
    path: '/calculators/misc/unit',
    description: 'Convert length, temperature, volume, time, and more.',
    icon: '🔁'
  },
  {
    name: 'Concrete Calculator',
    path: '/calculators/misc/concrete',
    description: 'Estimate concrete volume needed for home projects.',
    icon: '🧱'
  },
  {
    name: 'Roman Numeral Converter',
    path: '/calculators/misc/roman-numeral',
    description: 'Convert between Roman and Arabic numerals.',
    icon: '📜'
  },
  {
    name: 'Roman Numeral Date Converter',
    path: '/calculators/misc/roman-date',
    description: 'Convert calendar dates to Roman numeral format.',
    icon: '📆'
  },
  {
    name: 'Feet and Inches Calculator',
    path: '/calculators/misc/feet-inches',
    description: 'Add, subtract, or multiply measurements in feet and inches.',
    icon: '📐'
  },
  {
    name: 'Height Converter',
    path: '/calculators/misc/height-converter',
    description: 'Convert height between inches, feet, centimeters, and meters.',
    icon: '📏'
  },
  {
    name: 'Meters to Feet Converter',
    path: '/calculators/misc/meters-to-feet',
    description: 'Convert meters to feet & inches with rounding options.',
    icon: '📏'
  },
  {
    name: 'Circle Calculator',
    path: '/calculators/misc/circle',
    description: 'Calculate circle radius, circumference, and area.',
    icon: '⭕'
  },
  {
    name: 'Cylinder Volume Calculator',
    path: '/calculators/misc/cylinder-volume',
    description: 'Find volume and surface area of cylinders.',
    icon: '🧪'
  },
  {
    name: 'Cubic Yards Calculator',
    path: '/calculators/misc/cubic-yards',
    description: 'Estimate cubic yards for landscaping and materials.',
    icon: '🌾'
  },
  {
    name: 'Roofing Calculator',
    path: '/calculators/misc/roofing',
    description: 'Calculate roofing material and surface coverage.',
    icon: '🏠'
  },
  {
    name: 'Work Hours Calculator',
    path: '/calculators/misc/work-hours',
    description: 'Track and total weekly work hours with breaks and rounding.',
    icon: '⏰'
  },
  {
    name: 'Gas Cost Calculator',
    path: '/calculators/misc/gas-cost',
    description: 'Estimate trip fuel cost based on distance and MPG.',
    icon: '⛽'
  }
];

export default function MiscHome() {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filteredTools = miscTools.filter(tool =>
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
        {/* 🎯 Title + Back Button */}
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
            Miscellaneous Calculators
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
            This flexible toolbox includes calculators and utilities that fall outside traditional categories—ideal for students, gamers, developers, and everyday users. Each tool is built to be fast, offline-ready, and distraction-free, helping you save time on small tasks with big impact.
          </p>
          <ul style={{
            paddingLeft: '20px',
            marginBottom: '16px',
            fontSize: '0.95rem',
            color: '#555',
            lineHeight: '1.6'
          }}>
            <li>🎲 Dice rollers, randomizers and number utilities</li>
            <li>📚 GPA, grade and academic performance calculators</li>
            <li>🔢 Numeric converters — word, Roman, ordinal</li>
            <li>🌐 Subnet and IP analyzers for networking basics</li>
            <li>🔒 Built to run locally — no logins, no tracking</li>
          </ul>
        </section>

        {/* 🔍 Search Box */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search miscellaneous tools..."
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

        {/* 🧮 Grid of Tool Cards */}
        <section style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '28px',
          marginBottom: '60px'
        }}>
          {filteredTools.map(({ name, path, icon, description }, i) => (
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
