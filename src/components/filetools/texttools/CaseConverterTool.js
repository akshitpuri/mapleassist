import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import FileToolsLayout from '../FileToolsLayout';

export default function CaseConverterTool() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('uppercase');

  const transformText = () => {
    switch (mode) {
      case 'uppercase':
        return input.toUpperCase();
      case 'lowercase':
        return input.toLowerCase();
      case 'titlecase':
        return input.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
      default:
        return input;
    }
  };

  return (
    <FileToolsLayout title="🔠 Text Case Converter">
      <Helmet>
        <title>Text Case Converter | MapleAssist</title>
        <meta name="description" content="Convert text to uppercase, lowercase, or title case instantly — privacy-friendly and fully offline." />
        <meta name="keywords" content="text converter, uppercase, lowercase, titlecase, writing tools, react tool, mapleassist" />
      </Helmet>

      <h2 style={heading}>Convert Your Text</h2>

      <p style={description}>
        This tool helps you instantly change the format of your text—choose between UPPERCASE, lowercase, or Title Case.
        It’s perfect for reformatting headings, correcting sentence structure, or standardizing titles before publishing.
      </p>

      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter your text..."
        rows={8}
        style={textarea}
      />

      <label htmlFor="mode" style={label}>Select Format:</label>
      <select id="mode" value={mode} onChange={e => setMode(e.target.value)} style={dropdown}>
        <option value="uppercase">UPPERCASE</option>
        <option value="lowercase">lowercase</option>
        <option value="titlecase">Title Case</option>
      </select>

      <h3 style={heading}>Result</h3>
      <div style={output}>{transformText()}</div>
    </FileToolsLayout>
  );
}

// 🧩 Styling
const heading = {
  fontSize: '1.2rem',
  marginBottom: '14px',
  color: '#222'
};

const description = {
  fontSize: '0.95rem',
  lineHeight: '1.6',
  color: '#555',
  marginBottom: '20px'
};

const textarea = {
  width: '100%',
  padding: '12px',
  fontSize: '1rem',
  borderRadius: '6px',
  border: '1px solid #ccc',
  marginBottom: '20px'
};

const dropdown = {
  padding: '8px',
  fontSize: '1rem',
  marginBottom: '20px',
  borderRadius: '4px',
  border: '1px solid #ccc'
};

const label = {
  display: 'block',
  fontWeight: 500,
  marginBottom: '6px',
  color: '#444'
};

const output = {
  background: '#f9f9f9',
  padding: '16px',
  borderRadius: '6px',
  whiteSpace: 'pre-wrap',
  fontSize: '1rem',
  lineHeight: '1.6',
  color: '#333'
};