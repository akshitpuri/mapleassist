import React, { useState } from 'react';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

export default function VolumeCalculator() {
  const [shape, setShape] = useState('cube');
  const [inputs, setInputs] = useState({});
  const [result, setResult] = useState(null);

  const handleInput = (key, value) => {
    setInputs({ ...inputs, [key]: value });
  };

  const calculateVolume = () => {
    const vals = Object.fromEntries(
      Object.entries(inputs).map(([k, v]) => [k, parseFloat(v)])
    );

    for (const val of Object.values(vals)) {
      if (isNaN(val) || val <= 0) {
        setResult('Please enter valid positive numbers for all dimensions.');
        return;
      }
    }

    let volume = 0;
    switch (shape) {
      case 'cube':
        volume = Math.pow(vals.side, 3);
        break;
      case 'rectangular':
        volume = vals.length * vals.width * vals.height;
        break;
      case 'cylinder':
        volume = Math.PI * Math.pow(vals.radius, 2) * vals.height;
        break;
      case 'cone':
        volume = (1 / 3) * Math.PI * Math.pow(vals.radius, 2) * vals.height;
        break;
      case 'sphere':
        volume = (4 / 3) * Math.PI * Math.pow(vals.radius, 3);
        break;
      default:
        volume = 0;
    }

    setResult(volume.toFixed(4));
  };

  const inputFields = {
    cube: ['side'],
    rectangular: ['length', 'width', 'height'],
    cylinder: ['radius', 'height'],
    cone: ['radius', 'height'],
    sphere: ['radius']
  };

  return (
    <CalculatorLayout title="📦 Volume Calculator">
      <Helmet>
        <title>Volume Calculator – MapleAssist</title>
        <meta name="description" content="Calculate the volume of common 3D shapes like cubes, spheres, cylinders, cones, and rectangular prisms using standard formulas." />
        <meta name="keywords" content="volume calculator, cube volume, sphere volume, cylinder cone rectangular prism, mapleassist math tool" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Select a shape and enter its dimensions to calculate volume. This tool supports cubes, spheres, cylinders, cones, and rectangular prisms.
      </p>

      {/* 🔘 Shape Selection */}
      <div style={{
        textAlign: 'center',
        marginBottom: '20px'
      }}>
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
          <option value="cube">Cube</option>
          <option value="rectangular">Rectangular Prism</option>
          <option value="cylinder">Cylinder</option>
          <option value="cone">Cone</option>
          <option value="sphere">Sphere</option>
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
            placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)} (${shape === 'sphere' ? 'r' : field})`}
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
          onClick={calculateVolume}
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
          Calculate Volume
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
          {result.includes('Please') ? result : `Volume: ${result} cubic units`}
        </div>
      )}
    </CalculatorLayout>
  );
}