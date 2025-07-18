import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import FileToolsLayout from '../FileToolsLayout';

export default function WordCounterTool() {
  const [text, setText] = useState('');

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const charCount = text.length;

  return (
    <FileToolsLayout title="🔢 Word & Character Counter">
      <Helmet>
        <title>Word & Character Counter | MapleAssist</title>
        <meta name="description" content="Count words and characters instantly. Great for writing, SEO optimization, or checking social post limits." />
        <meta name="keywords" content="word counter, character counter, text analyzer, SEO tools, writing tools, mapleassist" />
      </Helmet>

      <h2 style={heading}>Text Analysis</h2>

      <p style={description}>
        Use this tool to count how many words and characters are in your content. Great for writing essays, staying within limits for tweets, meta descriptions, or blog posts. It’s also helpful when prepping for SEO or checking readability.
      </p>

      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Type or paste your content..."
        rows={8}
        style={textarea}
      />

      <div style={stats}>
        <p><strong>📝 Words:</strong> {wordCount}</p>
        <p><strong>🔤 Characters:</strong> {charCount}</p>
      </div>
    </FileToolsLayout>
  );
}

// 🧩 Styling
const heading = { fontSize: '1.2rem', marginBottom: '14px', color: '#222' };
const description = { fontSize: '0.95rem', lineHeight: '1.6', color: '#555', marginBottom: '20px' };
const textarea = { width: '100%', padding: '12px', fontSize: '1rem', borderRadius: '6px', border: '1px solid #ccc', marginBottom: '20px' };
const stats = { fontSize: '1rem', lineHeight: '1.8', background: '#fafafa', padding: '14px', borderRadius: '6px', color: '#333' };