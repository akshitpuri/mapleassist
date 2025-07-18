import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import FileToolsLayout from '../FileToolsLayout';

export default function KeywordDensityChecker() {
  const [text, setText] = useState('');
  const [keyword, setKeyword] = useState('');

  const keywordCount = (text.toLowerCase().match(new RegExp(keyword.toLowerCase(), 'g')) || []).length;
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const density = wordCount ? ((keywordCount / wordCount) * 100).toFixed(2) : 0;

  return (
    <FileToolsLayout title="📊 Keyword Density Checker">
      <Helmet>
        <title>Keyword Density Checker | MapleAssist</title>
        <meta name="description" content="Analyze your keyword usage in any content. Perfect for SEO writing and blog optimization." />
        <meta name="keywords" content="keyword density, seo checker, content optimization, mapleassist" />
      </Helmet>

      <h2 style={heading}>Analyze Keyword Usage</h2>

      <p style={descriptionText}>
        Enter your content and a target keyword to see how often it appears. Use this tool to ensure proper balance for SEO optimization—avoid keyword stuffing while maintaining visibility.
      </p>

      <textarea
        placeholder="Paste your content..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        style={textarea}
      />

      <input
        type="text"
        placeholder="Keyword to check..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        style={input}
      />

      <div style={stats}>
        <p><strong>📝 Word Count:</strong> {wordCount}</p>
        <p><strong>🔍 Keyword Appearances:</strong> {keywordCount}</p>
        <p><strong>📈 Density:</strong> {density}%</p>
      </div>
    </FileToolsLayout>
  );
}

// Styling
const heading = { fontSize: '1.2rem', marginBottom: '12px' };
const descriptionText = { fontSize: '0.95rem', lineHeight: '1.6', color: '#555', marginBottom: '20px' };
const textarea = { width: '100%', padding: '10px', fontSize: '1rem', borderRadius: '6px', border: '1px solid #ccc', marginBottom: '10px' };
const input = { width: '100%', padding: '8px', fontSize: '1rem', borderRadius: '6px', border: '1px solid #ccc', marginBottom: '20px' };
const stats = { fontSize: '1rem', lineHeight: '1.6', background: '#f9f9f9', padding: '16px', borderRadius: '6px', color: '#333' };