import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function AreaCalculator() {
  const [shape, setShape] = useState('rectangle');
  const [inputs, setInputs] = useState({});
  const [result, setResult] = useState(null);

  const handleInput = (key, value) => {
    setInputs({ ...inputs, [key]: value });
  };

  const calculateArea = () => {
    const vals = Object.fromEntries(
      Object.entries(inputs).map(([k, v]) => [k, parseFloat(v)])
    );

    for (const val of Object.values(vals)) {
      if (isNaN(val) || val <= 0) {
        setResult('Please enter valid positive numbers for all dimensions.');
        return;
      }
    }

    let area = 0;
    switch (shape) {
      case 'rectangle':
        area = vals.length * vals.width;
        break;
      case 'square':
        area = Math.pow(vals.side, 2);
        break;
      case 'triangle':
        area = 0.5 * vals.base * vals.height;
        break;
      case 'circle':
        area = Math.PI * Math.pow(vals.radius, 2);
        break;
      case 'trapezoid':
        area = ((vals.base1 + vals.base2) / 2) * vals.height;
        break;
      case 'ellipse':
        area = Math.PI * vals.a * vals.b;
        break;
      case 'parallelogram':
        area = vals.base * vals.height;
        break;
      default:
        area = 0;
    }

    setResult(area.toFixed(4));
  };

  const inputFields = {
    rectangle: ['length', 'width'],
    square: ['side'],
    triangle: ['base', 'height'],
    circle: ['radius'],
    trapezoid: ['base1', 'base2', 'height'],
    ellipse: ['a', 'b'],
    parallelogram: ['base', 'height']
  };

  return (
    <CalculatorLayout title="📐 Area Calculator">
      <Helmet>
        <title>Area Calculator – MapleAssist</title>
        <meta name="description" content="Calculate the area of common 2D shapes like rectangles, triangles, circles, trapezoids, and more using standard formulas." />
        <meta name="keywords" content="area calculator, shape area, geometry tool, mapleassist math calculator" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Select a shape and enter its dimensions to calculate area. This tool supports rectangles, triangles, circles, trapezoids, ellipses, squares, and parallelograms.
      </p>

      {/* 🔘 Shape Selection */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <select
          value={shape}
          onChange={(e) => {
            setShape(e.target.value);
            setInputs({});
            setResult(null);
          }}
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        >
          <option value="rectangle">Rectangle</option>
          <option value="square">Square</option>
          <option value="triangle">Triangle</option>
          <option value="circle">Circle</option>
          <option value="trapezoid">Trapezoid</option>
          <option value="ellipse">Ellipse</option>
          <option value="parallelogram">Parallelogram</option>
        </select>
      </div>

      {/* 🔢 Inputs */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '400px',
        margin: '0 auto',
        marginBottom: '20px'
      }}>
        {inputFields[shape].map((field) => (
          <input
            key={field}
            type="number"
            placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)}`}
            value={inputs[field] || ''}
            onChange={(e) => handleInput(field, e.target.value)}
            style={{
              padding: '10px',
              fontSize: '1rem',
              borderRadius: '8px',
              border: '1px solid #ccc'
            }}
          />
        ))}
        <button
          onClick={calculateArea}
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
          Calculate Area
        </button>
      </div>

      {/* 📊 Result */}
      {typeof result === 'string' && (
        <div style={{
          backgroundColor: result.includes('Please') ? '#fff6f6' : '#fff',
          color: result.includes('Please') ? '#f44336' : '#333',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
          maxWidth: '500px',
          margin: '0 auto',
          fontSize: '1.1rem',
          textAlign: 'center'
        }}>
          {result.includes('Please') ? result : `Area: ${result} square units`}
        </div>
      )}
    </CalculatorLayout>
  );
}