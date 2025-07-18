import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import FileToolsLayout from '../FileToolsLayout';

export default function PasswordGenerator() {
  const [length, setLength] = useState(12);
  const [password, setPassword] = useState('');

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    const newPass = Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    setPassword(newPass);
  };

  return (
    <FileToolsLayout title="🔑 Password Generator">
      <Helmet>
        <title>Secure Password Generator | MapleAssist</title>
        <meta name="description" content="Create strong, secure passwords instantly for personal accounts or encrypted files." />
        <meta name="keywords" content="password generator, secure password, privacy, security tools, mapleassist" />
      </Helmet>

      <h2 style={heading}>Generate Strong Passwords</h2>
      <p style={description}>
        Quickly create secure passwords with customizable length. Perfect for user accounts, databases, and encryption keys.
      </p>

      <label htmlFor="length" style={label}>Password Length:</label>
      <input
        type="number"
        min={6}
        max={64}
        value={length}
        onChange={(e) => setLength(Number(e.target.value))}
        style={input}
      />
      <button onClick={generatePassword} style={button}>Generate Password</button>

      {password && (
        <div style={output}>{password}</div>
      )}
    </FileToolsLayout>
  );
}

const heading = { fontSize: '1.2rem', marginBottom: '14px' };
const description = { fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px', color: '#555' };
const label = { display: 'block', fontWeight: 500, marginBottom: '6px', color: '#444' };
const input = { padding: '8px', fontSize: '1rem', borderRadius: '6px', border: '1px solid #ccc', marginBottom: '12px' };
const button = { padding: '10px 16px', fontSize: '1rem', borderRadius: '6px', background: '#2b6cb0', color: '#fff', border: 'none', cursor: 'pointer', marginBottom: '20px' };
const output = { background: '#f5f5f5', padding: '16px', fontSize: '1rem', borderRadius: '6px', color: '#333' };