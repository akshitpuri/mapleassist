import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import FileToolsLayout from '../FileToolsLayout';

export default function ResponsivePreviewer() {
  const [url, setUrl] = useState('');

  return (
    <FileToolsLayout title="📱 Responsive Design Tester">
      <Helmet>
        <title>Responsive Design Tester | MapleAssist</title>
        <meta name="description" content="Preview how your website looks on mobile, tablet, and desktop directly in-browser." />
        <meta name="keywords" content="responsive tester, mobile preview, SEO design, frontend tools, mapleassist" />
      </Helmet>

      <h2 style={heading}>Preview Your Site Responsively</h2>

      <p style={descriptionText}>
        Enter a live website URL to view it in multiple device widths — useful for developers, designers, and marketers checking mobile friendliness and layout responsiveness.
      </p>

      <input
        type="text"
        placeholder="Enter site URL (https://...)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={input}
      />

      {url && (
        <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
          <iframe src={url} style={{ width: '375px', height: '500px', border: '1px solid #ddd' }} title="Mobile Preview" />
          <iframe src={url} style={{ width: '768px', height: '500px', border: '1px solid #ddd' }} title="Tablet Preview" />
          <iframe src={url} style={{ width: '1024px', height: '500px', border: '1px solid #ddd' }} title="Desktop Preview" />
        </div>
      )}
    </FileToolsLayout>
  );
}

// Styling
const heading = { fontSize: '1.2rem', marginBottom: '14px', color: '#222' };
const descriptionText = { fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px', color: '#555' };
const input = { width: '100%', padding: '10px', fontSize: '1rem', borderRadius: '6px', border: '1px solid #ccc' };