import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import FileToolsLayout from '../FileToolsLayout';

export default function StrengthCheckerTool() {
  const [password, setPassword] = useState('');

  const checkStrength = (pwd) => {
    let score = 0;
    if (!pwd) return 'Enter a password';
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    switch (score) {
      case 5: return '🟢 Strong';
      case 3:
      case 4: return '🟡 Moderate';
      case 1:
      case 2: return '🔴 Weak';
      default: return '❌ Very Weak';
    }
  };

  return (
    <FileToolsLayout title="💪 Password Strength Checker">
      <Helmet>
        <title>Password Strength Checker | MapleAssist</title>
        <meta name="description" content="Evaluate how strong your password is using quick rules and visual scoring." />
        <meta name="keywords" content="password strength, checker, security analysis, mapleassist, privacy" />
      </Helmet>

      <h2 style={heading}>How Secure Is Your Password?</h2>
      <p style={description}>
        Test your password’s strength against basic security rules: length, mixed case, digits, and symbols. Instant visual feedback helps you choose safer credentials.
      </p>

      <input
        type="text"
        placeholder="Enter your password..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={input}
      />

      <div style={result}>{checkStrength(password)}</div>
    </FileToolsLayout>
  );
}

const heading = { fontSize: '1.2rem', marginBottom: '12px' };
const description = { fontSize: '0.95rem', lineHeight: '1.6', color: '#555', marginBottom: '20px' };
const input = { width: '100%', padding: '10px', fontSize: '1rem', borderRadius: '6px', border: '1px solid #ccc' };
const result = { fontSize: '1.1rem', marginTop: '20px', padding: '12px', background: '#f8f8f8', borderRadius: '6px', textAlign: 'center', color: '#222' };