import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import FileToolsLayout from '../FileToolsLayout';

export default function LoremIpsumGenerator() {
  const [paragraphs, setParagraphs] = useState(2);

  const generateText = () =>
    Array.from({ length: paragraphs }, () =>
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    ).join('\n\n');

  return (
    <FileToolsLayout title="📄 Lorem Ipsum Generator">
      <Helmet>
        <title>Lorem Ipsum Generator | MapleAssist</title>
        <meta name="description" content="Generate placeholder Lorem Ipsum text for design previews, wireframes, and client demos." />
        <meta name="keywords" content="lorem ipsum, placeholder text, mockup filler, design generator, mapleassist, frontend tools" />
      </Helmet>

      <h2 style={heading}>Generate Placeholder Text</h2>

      <p style={description}>
        Instantly create filler paragraphs using the classic Lorem Ipsum text. This is perfect for design previews, layout testing, website demos, or presentations — anywhere you need realistic-looking content without worrying about meaning.
      </p>

      <label htmlFor="para" style={label}>Paragraphs:</label>
      <input
        id="para"
        type="number"
        min={1}
        max={20}
        value={paragraphs}
        onChange={(e) => setParagraphs(Number(e.target.value))}
        style={input}
      />

      <div style={output}>{generateText()}</div>
    </FileToolsLayout>
  );
}

// 🧩 Styling
const heading = { fontSize: '1.2rem', marginBottom: '16px', color: '#222' };
const description = { fontSize: '0.95rem', lineHeight: '1.6', color: '#555', marginBottom: '20px' };
const label = { display: 'block', marginBottom: '6px', fontWeight: 500, color: '#444' };
const input = { padding: '8px', fontSize: '1rem', borderRadius: '6px', border: '1px solid #ccc', marginBottom: '20px' };
const output = { whiteSpace: 'pre-wrap', background: '#f5f5f5', padding: '16px', borderRadius: '6px', lineHeight: '1.6', color: '#333' };