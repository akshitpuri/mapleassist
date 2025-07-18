import React, { useState } from 'react';
import { create, all } from 'mathjs';
import CalculatorLayout from '../CalculatorLayout';
import BackButton from '../../BackButton';
import { Helmet } from 'react-helmet';

const math = create(all);

export default function MathEquationSolver() {
  const [equation, setEquation] = useState('');
  const [result, setResult] = useState(null);

  const solveEquation = () => {
    try {
      const node = math.parse(equation);
      const variables = node.filter(n => n.isSymbolNode).map(n => n.name);
      const solutions = math.solve(equation, variables.length ? variables[0] : 'x');
      setResult(solutions.toString());
    } catch (err) {
      setResult('Invalid equation or unsupported format.');
    }
  };

  return (
    <CalculatorLayout title="🧮 Math Equation Solver">
      <Helmet>
        <title>Math Equation Solver – MapleAssist</title>
        <meta name="description" content="Solve algebraic equations using symbolic math. Supports linear, quadratic, and polynomial equations with clean output." />
        <meta name="keywords" content="math equation solver, algebra calculator, symbolic math, mapleassist math tool" />
      </Helmet>

      <BackButton />

      <p style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '24px',
        color: '#444'
      }}>
        Enter an algebraic equation to solve for its variable. This tool uses symbolic math to solve equations like:
        <br />
        <code>2x + 3 = 7</code>, <code>x^2 - 4 = 0</code>, <code>x + y = 5</code>
      </p>

      {/* 🔢 Input */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '500px',
        margin: '0 auto',
        marginBottom: '20px'
      }}>
        <input
          type="text"
          placeholder="Enter equation (e.g. 2x + 3 = 7)"
          value={equation}
          onChange={(e) => setEquation(e.target.value)}
          style={{
            padding: '12px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={solveEquation}
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
          Solve Equation
        </button>
      </div>

      {/* 📊 Result */}
      {result && (
        <div style={{
          backgroundColor: result.includes('Invalid') ? '#fff6f6' : '#fff',
          color: result.includes('Invalid') ? '#f44336' : '#333',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
          maxWidth: '500px',
          margin: '0 auto',
          fontSize: '1.1rem',
          textAlign: 'center'
        }}>
          <strong>Result:</strong> {result}
        </div>
      )}
    </CalculatorLayout>
  );
}