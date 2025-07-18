import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import FileToolsLayout from '../FileToolsLayout';

export default function MetaTagGenerator() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const generateTags = () => (
    `<meta name="title" content="${title}" />\n<meta name="description" content="${description}" />`
  );

  return (
    <FileToolsLayout title="📝 Meta Tag Generator">
      <Helmet>
        <title>Meta Tag Generator | MapleAssist</title>
        <meta name="description" content="Create clean and effective HTML meta tags for SEO and social previews." />
        <meta name="keywords" content="meta tag generator, SEO, html tags, webpage optimization, mapleassist" />
      </Helmet>

      <h2 style={heading}>Generate SEO Meta Tags</h2>

      <p style={descriptionText}>
        Use this tool to create meta title and description tags for your website. These are essential for search engine visibility, click-through rate, and social sharing previews.
      </p>

      <input
        type="text"
        placeholder="Enter title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={input}
      />
      <textarea
        placeholder="Enter description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        style={textarea}
      />

      <h3 style={heading}>Generated Tags</h3>
      <pre style={output}>{generateTags()}</pre>
    </FileToolsLayout>
  );
}

// Styling
const heading = { fontSize: '1.2rem', marginBottom: '12px', color: '#222' };
const descriptionText = { fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px', color: '#555' };
const input = { width: '100%', padding: '8px', fontSize: '1rem', marginBottom: '10px', borderRadius: '6px', border: '1px solid #ccc' };
const textarea = { width: '100%', padding: '10px', fontSize: '1rem', marginBottom: '20px', borderRadius: '6px', border: '1px solid #ccc' };
const output = { background: '#f5f5f5', padding: '14px', borderRadius: '6px', whiteSpace: 'pre-wrap', color: '#333' };