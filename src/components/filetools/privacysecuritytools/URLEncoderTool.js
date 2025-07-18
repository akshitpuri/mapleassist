import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import FileToolsLayout from '../FileToolsLayout';

export default function URLEncoderTool() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const encodeURL = () => setResult(encodeURIComponent(input));
  const decodeURL = () => setResult(decodeURIComponent(input));

  return (
    <FileToolsLayout title="🔗 URL Encoder / Decoder">
      <Helmet>
        <title>URL Encoder / Decoder | MapleAssist</title>
        <meta name="description" content="Encode or decode URLs for use in websites, emails, and HTTP requests." />
        <meta name="keywords" content="url encoder, url decoder, http links, web tools, mapleassist" />
      </Helmet>

      <h2 style={heading}>Encode or Decode URLs</h2>
      <p style={description}>
        Paste any string or link to convert into a URL-safe format or decode it back. Useful for web development, query strings, and APIs.
      </p>

      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter URL or string..."
        rows={4}
        style={textarea}
      />

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button onClick={encodeURL} style={button}>Encode</button>
        <button onClick={decodeURL} style={button}>Decode</button>
      </div>

      {result && (
        <div style={output}>{result}</div>
      )}
    </FileToolsLayout>
  );
}

const heading = { fontSize: '1.2rem', marginBottom: '12px' };
const description = { fontSize: '0.95rem', lineHeight: '1.6', color: '#555', marginBottom: '20px' };
const textarea = { width: '100%', padding: '10px', fontSize: '1rem', borderRadius: '6px', border: '1px solid #ccc', marginBottom: '12px' };
const button = { padding: '10px 16px', fontSize: '1rem', borderRadius: '6px', background: '#444', color: '#fff', border: 'none', cursor: 'pointer' };
const output = { background: '#f9f9f9', padding: '16px', borderRadius: '6px', fontSize: '1rem', color: '#333' };