import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackButton from '../../BackButton';


const mathTools = [
  {
    name: 'Basic Calculator',
    path: '/calculators/math/basic',
    description: 'Perform basic arithmetic operations like addition, subtraction, multiplication and division.',
    icon: '🧮'
  },
  {
    name: 'Fraction Calculator',
    path: '/calculators/math/fraction',
    description: 'Add, subtract, multiply and divide fractions with clear results.',
    icon: '🔢'
  },
  {
    name: 'Percentage Calculator',
    path: '/calculators/math/percentage',
    description: 'Find percentage values, percentage changes, and reverse percentages.',
    icon: '📊'
  },
  {
    name: 'Random Number Generator',
    path: '/calculators/math/random',
    description: 'Generate one or multiple random numbers between any custom range.',
    icon: '🎲'
  },
  {
    name: 'Square Footage Calculator',
    path: '/calculators/math/sq-ft',
    description: 'Calculate total square footage based on length and width of spaces.',
    icon: '📐'
  },
  {
    name: 'Quadratic Formula Calculator',
    path: '/calculators/math/quadratic-formula',
    description: 'Solve quadratic equations using the standard formula with step-by-step explanation.',
    icon: '📄'
  },
  {
    name: 'Number Generator',
    path: '/calculators/math/number-generator',
    description: 'Generate random or sequential numbers based on your parameters.',
    icon: '🔀'
  },
  {
    name: 'Rounding Calculator',
    path: '/calculators/math/rounding',
    description: 'Round numbers to any decimal place or significant figure.',
    icon: '📏'
  },
  {
    name: 'Scientific Calculator',
    path: '/calculators/math/scientific',
    description: 'Perform advanced calculations including trig, logs, and powers.',
    icon: '🧪'
  },
  {
    name: 'Mixed Number Calculator',
    path: '/calculators/math/mixed-number',
    description: 'Convert between mixed and improper fractions or perform operations.',
    icon: '🍰'
  },
  {
    name: 'Decimal to Fraction Calculator',
    path: '/calculators/math/decimal-to-fraction',
    description: 'Convert decimal numbers to fractional equivalents.',
    icon: '🔢'
  },
  {
    name: 'Simplifying Fractions Calculator',
    path: '/calculators/math/simplifying-fractions',
    description: 'Reduce fractions to simplest form quickly.',
    icon: '📉'
  },
  {
    name: 'Slope Calculator',
    path: '/calculators/math/slope',
    description: 'Find the slope between two points on a graph.',
    icon: '📈'
  },
  {
    name: 'LCM Calculator',
    path: '/calculators/math/lcm',
    description: 'Calculate the Least Common Multiple of two or more numbers.',
    icon: '🔗'
  },
  {
    name: 'Ratio Calculator',
    path: '/calculators/math/ratio',
    description: 'Simplify ratios or convert them to fractions and percentages.',
    icon: '⚖️'
  },
  {
    name: 'Percentage Increase Calculator',
    path: '/calculators/math/percentage-increase',
    description: 'Calculate percentage increase from one value to another.',
    icon: '📶'
  },
  {
    name: 'Long Division Calculator',
    path: '/calculators/math/long-division',
    description: 'Break down long division step-by-step with remainders.',
    icon: '➗'
  },
  {
    name: 'Triangle Calculator',
    path: '/calculators/math/triangle',
    description: 'Calculate side lengths, area, angles or perimeter of triangles.',
    icon: '▲'
  },
  {
    name: 'Percentage Change Calculator',
    path: '/calculators/math/percentage-change',
    description: 'Find percentage change between two values (increase or decrease).',
    icon: '📊'
  },
  {
    name: 'Volume Calculator',
    path: '/calculators/math/volume',
    description: 'Find the volume of basic and complex shapes.',
    icon: '📦'
  },
  {
    name: 'Scientific Notation Converter',
    path: '/calculators/math/scientific-notation-converter',
    description: 'Convert numbers to and from scientific notation format.',
    icon: '🔬'
  },
  {
    name: 'Speed Calculator',
    path: '/calculators/math/speed',
    description: 'Calculate speed from distance and time inputs.',
    icon: '🏎️'
  },
  {
    name: 'GCF Calculator',
    path: '/calculators/math/gcf',
    description: 'Find the Greatest Common Factor of two or more numbers.',
    icon: '🧩'
  },
  {
    name: 'Fraction to Decimal Calculator',
    path: '/calculators/math/fraction-to-decimal',
    description: 'Convert fractions into decimal form.',
    icon: '🔣'
  },
  {
    name: 'Binary Calculator',
    path: '/calculators/math/binary',
    description: 'Perform binary addition, subtraction, or conversion.',
    icon: '💾'
  },
  {
    name: 'Area Calculator',
    path: '/calculators/math/area',
    description: 'Calculate the area of various geometric shapes.',
    icon: '🧭'
  },
  {
    name: 'Factoring Calculator',
    path: '/calculators/math/factoring',
    description: 'Factor algebraic expressions or numbers easily.',
    icon: '🛠️'
  },
  {
    name: 'Sig Fig Calculator',
    path: '/calculators/math/sig-fig',
    description: 'Count significant figures in numeric input.',
    icon: '🔍'
  },
  {
    name: 'Percentage Difference Calculator',
    path: '/calculators/math/percentage-difference',
    description: 'Measure difference between two values as a percentage.',
    icon: '📈'
  },
  {
    name: 'Right Triangle Calculator',
    path: '/calculators/math/right-triangle',
    description: 'Solve side lengths and angles for right triangles.',
    icon: '📐'
  },
  {
    name: 'Mixed Fraction Calculator',
    path: '/calculators/math/mixed-fraction',
    description: 'Convert and compute with mixed fractions.',
    icon: '🧮'
  },
  {
    name: 'Fraction to Percent Calculator',
    path: '/calculators/math/fraction-to-percent',
    description: 'Convert a fraction into a percentage.',
    icon: '🔁'
  },
  {
    name: 'Least Common Denominator Calculator',
    path: '/calculators/math/lcd',
    description: 'Find the LCD of two or more fractions.',
    icon: '🧾'
  },
  {
    name: 'Modulo Calculator',
    path: '/calculators/math/modulo',
    description: 'Find the remainder from division (modulo operation).',
    icon: '➗'
  },
  {
    name: 'Density Calculator',
    path: '/calculators/math/density',
    description: 'Calculate density using mass and volume inputs.',
    icon: '⚖️'
  },
  {
    name: 'Equivalent Fractions Calculator',
    path: '/calculators/math/equivalent-fractions',
    description: 'Find or verify equivalent fractions.',
    icon: '🧮'
  },
  {
    name: 'Scientific Notation Calculator',
    path: '/calculators/math/scientific-notation',
    description: 'Convert numbers to scientific notation and vice versa.',
    icon: '🔢'
  },
  {
    name: 'Adding Fractions Calculator',
    path: '/calculators/math/adding-fractions',
    description: 'Add two or more fractions with steps.',
    icon: '➕'
  },
  {
    name: 'Decimal to Percent Calculator',
    path: '/calculators/math/decimal-to-percent',
    description: 'Convert decimal numbers into percentages.',
    icon: '🔁'
  },
  {
    name: 'Hex Calculator',
    path: '/calculators/math/hex',
    description: 'Convert and calculate hexadecimal values.',
    icon: '🧮'
  },
  {
    name: 'Tank Volume Calculator',
    path: '/calculators/math/tank-volume',
    description: 'Calculate the volume of cylindrical or rectangular tanks.',
    icon: '🛢️'
  },
  {
    name: 'Standard Form Calculator',
    path: '/calculators/math/standard-form',
    description: 'Convert values into standard mathematical notation.',
    icon: '📏'
  },
  {
    name: 'Math Equation Solver',
    path: '/calculators/math/equation-solver',
    description: 'Solve algebraic equations instantly.',
    icon: '📐'
  },
  {
    name: 'Kinetic Energy Calculator',
    path: '/calculators/math/kinetic-energy',
    description: 'Calculate kinetic energy using mass and velocity.',
    icon: '⚡'
  },
  {
    name: 'Cube Root Calculator',
    path: '/calculators/math/cube-root',
    description: 'Find the cube root of a number.',
    icon: '🧊'
  },
{
    name: 'Arithmetic and Geometric Sequence Calculator',
    path: '/calculators/math/sequences',
    description: 'Calculate terms and sums in arithmetic or geometric sequences.',
    icon: '🔁'
  },
  {
    name: 'Square Root Calculator',
    path: '/calculators/math/square-root',
    description: 'Find the square root of any positive number.',
    icon: '🧮'
  },
  {
    name: 'Distance Formula Calculator',
    path: '/calculators/math/distance-formula',
    description: 'Calculate distance between two coordinate points.',
    icon: '📍'
  },
  {
    name: 'Prime Factorization Calculator',
    path: '/calculators/math/prime-factorization',
    description: 'Find the prime factors of a number.',
    icon: '🧠'
  },
  {
    name: 'Integer Calculator',
    path: '/calculators/math/integers',
    description: 'Perform integer-based calculations with precision.',
    icon: '🔢'
  },
  {
    name: 'Significant Figures Calculator',
    path: '/calculators/math/significant-figures',
    description: 'Identify significant digits in measurements or calculations.',
    icon: '🔬'
  },
  {
    name: 'Velocity Calculator',
    path: '/calculators/math/velocity',
    description: 'Calculate velocity from distance and time values.',
    icon: '🚀'
  },
  {
    name: 'Force Calculator',
    path: '/calculators/math/force',
    description: 'Find force using mass and acceleration.',
    icon: '💪'
  },
  {
    name: 'Distance Calculator',
    path: '/calculators/math/distance',
    description: 'Compute distance using speed and time.',
    icon: '🛣️'
  },
  {
    name: 'Percent to Fraction Calculator',
    path: '/calculators/math/percent-to-fraction',
    description: 'Convert percent values into reduced fractions.',
    icon: '📐'
  },
  {
    name: 'Pythagorean Theorem Calculator',
    path: '/calculators/math/pythagorean-theorem',
    description: 'Use a² + b² = c² to solve for triangle sides.',
    icon: '🧊'
  },
  {
    name: 'Percentage Decrease Calculator',
    path: '/calculators/math/percentage-decrease',
    description: 'Calculate the percentage decrease between two values.',
    icon: '📉'
  },
  {
    name: 'Proportion Calculator',
    path: '/calculators/math/proportion',
    description: 'Solve proportions or set up ratios quickly.',
    icon: '⚖️'
  },
  {
    name: 'Quadratic Equation Calculator',
    path: '/calculators/math/quadratic-equation',
    description: 'Solve any quadratic equation — with real or complex solutions.',
    icon: '📄'
  },
  {
    name: 'Flip a Coin',
    path: '/calculators/math/coin-flip',
    description: 'Flip a virtual coin for decisions or probability practice.',
    icon: '🪙'
  }
];


export default function MathHome() {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filteredTools = mathTools.filter(tool =>
    tool.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main style={container}>
      <div style={wrapper}>
        {/* ➗ Title + Back */}
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
            Math Calculators
          </h1>
          <div style={{
            display: 'flex',
            justifyContent: isMobile ? 'center' : 'flex-end',
            width: isMobile ? '100%' : 'auto'
          }}>
            <BackButton />
          </div>
        </div>

        {/* 🧠 Introduction */}
        <section style={{
          marginBottom: '36px',
          color: '#4a4a4a',
          fontSize: '1rem',
          lineHeight: '1.6'
        }}>
          <p style={{ marginBottom: '16px' }}>
            MapleAssist’s math calculators simplify everyday numeric tasks—from basic arithmetic to logical expressions. These tools are built for clarity, precision, and portability—fully offline, distraction-free, and mobile-ready.
          </p>
          <ul style={{
            paddingLeft: '20px',
            marginBottom: '16px',
            fontSize: '0.95rem',
            color: '#555',
            lineHeight: '1.6'
          }}>
            <li>➕ Fractions, percentages, and arithmetic solvers</li>
            <li>📐 Geometry and area calculators</li>
            <li>🎲 Random number generators and math quizzes</li>
            <li>🔒 100% private — no tracking or cloud processing</li>
          </ul>
        </section>

        {/* 🔍 Search */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search math tools..."
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

        {/* 🧮 Cards */}
        <section style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '28px',
          marginBottom: '60px'
        }}>
          {filteredTools.map(({ name, icon, description, path }, i) => (
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

// 🎨 Layout Container Styles
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
