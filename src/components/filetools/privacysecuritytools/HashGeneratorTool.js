import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import FileToolsLayout from '../FileToolsLayout';

export default function HashGeneratorTool() {
  const [input, setInput] = useState('');
  const [algo, setAlgo] = useState('SHA-256');
  const [hash, setHash] = useState('');

  useEffect(() => {
    if (!input) return setHash('');
    generateHash(input, algo);
  }, [input, algo]);

  const generateHash = async (text, algorithm) => {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      const digest = await crypto.subtle.digest(algorithm, data);
      const hex = Array.from(new Uint8Array(digest))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
      setHash(hex);
    } catch {
      setHash('Algorithm not supported.');
    }
  };

  return (
    <FileToolsLayout title="🧬 Hash Generator">
      <Helmet>
        <title>Hash Generator | MapleAssist</title>
        <meta name="description" content="Generate cryptographic hashes (SHA-256, SHA-1) using browser-based WebCrypto." />
        <meta name="keywords" content="hash generator, sha1, sha256, hashing tool, security, mapleassist" />
      </Helmet>

      <h2 style={heading}>Generate Cryptographic Hashes</h2>
      <p style={description}>
        Convert text into secure hash values using SHA-1 or SHA-256. Great for digital signatures, file integrity verification, and password protection workflows.
      </p>

      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter text or string..."
        rows={4}
        style={textarea}
      />

      <label htmlFor="algo" style={label}>Choose Algorithm:</label>
      <select
        id="algo"
        value={algo}
        onChange={(e) => setAlgo(e.target.value)}
        style={dropdown}
      >
        <option value="SHA-256">SHA-256</option>
        <option value="SHA-1">SHA-1</option>
      </select>

      {hash && (
        <div style={output}>
          <strong>{algo}:</strong> {hash}
        </div>
      )}
    </FileToolsLayout>
  );
}

const heading = { fontSize: '1.2rem', marginBottom: '12px' };
const description = { fontSize: '0.95rem', lineHeight: '1.6', color: '#555', marginBottom: '20px' };
const textarea = { width: '100%', padding: '10px', fontSize: '1rem', borderRadius: '6px', border: '1px solid #ccc', marginBottom: '14px' };
const label = { display: 'block', fontWeight: 500, marginBottom: '6px', color: '#444' };
const dropdown = { padding: '8px', fontSize: '1rem', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ccc' };
const output = { background: '#f5f5f5', padding: '16px', fontSize: '1rem', borderRadius: '6px', color: '#333', whiteSpace: 'pre-wrap' };