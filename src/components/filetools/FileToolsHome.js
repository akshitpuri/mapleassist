import React from 'react';
import { Link } from 'react-router-dom';
import FileToolsLayout from './FileToolsLayout';

const categories = [
  { name: 'PDF Tools', path: '/filetools/pdftools', icon: '📄', description: 'Split, merge, compress and manage PDFs.' },
  { name: 'Image Tools', path: '/filetools/imagetools', icon: '🖼️', description: 'Resize, compress, convert and inspect images.' },
  { name: 'Document Converters', path: '/filetools/converters/document', icon: '📑', description: 'Convert between DOCX, TXT, HTML and more.' },
  { name: 'Audio Converters', path: '/filetools/converters/audio', icon: '🎧', description: 'Convert between MP3, WAV, FLAC and other formats.' },
  { name: 'Video Converters', path: '/filetools/converters/video', icon: '🎬', description: 'Change formats, compress or extract video files.' },
  { name: 'eBook Converters', path: '/filetools/converters/ebook', icon: '📚', description: 'Convert EPUB, MOBI, PDF and other reader formats.' },
  { name: 'Archive Converters', path: '/filetools/converters/archive', icon: '🗜️', description: 'Handle ZIP, RAR, 7Z and tarballs without external apps.' },
  { name: 'Code/Data Converters', path: '/filetools/converters/code-data', icon: '💻', description: 'Convert between JSON, XML, CSV, Base64 and more.' },
  { name: 'OCR Tools', path: '/filetools/ocr', icon: '🔍', description: 'Extract text from scanned images and photos.' },
  { name: 'Compression Tools', path: '/filetools/compression', icon: '📦', description: 'Compress or decompress files and folders quickly.' },
  { name: 'GIF Tools', path: '/filetools/gifs', icon: '🌀', description: 'Edit, optimize and generate GIFs in-browser.' },
  { name: 'Text & Writing Tools', path: '/text-tools', icon: '✍️', description: 'Case converters, counters, and typographic utilities.' },
  { name: 'Web & SEO Tools', path: '/web-seo-tools', icon: '🌐', description: 'Meta generators, previews, and search utilities.' },
  { name: 'Privacy & Security Tools', path: '/privacy-security-tools', icon: '🔐', description: 'Password generators, hash tools, and QR utilities.' }
];

export default function FileToolsHome() {
  return (
    <div style={outerWrap}>
      <FileToolsLayout showBackButton={false}>
        {/* 🧭 Hero Section */}
        <section style={hero}>
          <div style={headerRow}>
            <h1 style={heroTitle}>MapleForge</h1>
          </div>
          <p style={heroSubtitle}>
            A focused suite of file utilities for professionals, creators, and developers. Work offline, stay private, and get more done—fast.
          </p>
        </section>

        {/* 📂 Tool Grid Section */}
        <section style={gridWrap}>
          <h2 style={sectionHeading}>Explore Tools</h2>
          <div style={grid}>
            {categories.map(({ name, path, icon, description }, i) => (
              <Link key={i} to={path} style={card}>
                <div style={iconStyle}>{icon}</div>
                <h3 style={cardTitle}>{name}</h3>
                <p style={cardDesc}>{description}</p>
              </Link>
            ))}
          </div>
        </section>
      </FileToolsLayout>
    </div>
  );
}

const outerWrap = {
  backgroundImage: 'url("/maple-pattern.png")',
  backgroundRepeat: 'repeat',
  backgroundSize: 'auto',
  backgroundPosition: 'top left',
  backgroundColor: '#f7f9fb',
  minHeight: '100vh',
  width: '100%',
  padding: '0 0 60px'
};

const hero = {
  textAlign: 'center',
  padding: '48px 32px', // ✅ tightened to match Home.jsx
  marginBottom: '0',
  color: '#2b2b2b'
};

const headerRow = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '16px',
  flexWrap: 'wrap',
  gap: '12px'
};

const heroTitle = {
  fontSize: '2.6rem',
  fontWeight: 700,
  marginBottom: '16px',
  color: '#2c2c2c'
};

const heroSubtitle = {
  fontSize: '1.15rem',
  maxWidth: '680px',
  margin: '0 auto 32px',
  color: '#555',
  lineHeight: '1.6'
};

const gridWrap = {
  backgroundColor: '#fff',
  padding: '48px 32px',
  borderRadius: '12px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
  marginTop: '40px'
};

const sectionHeading = {
  fontSize: '1.6rem',
  fontWeight: 600,
  marginBottom: '28px',
  textAlign: 'center'
};

const grid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  gap: '28px',
  marginBottom: '60px'
};

const card = {
  backgroundColor: '#fafafa',
  borderRadius: '12px',
  border: '1px solid #ddd',
  padding: '20px',
  textAlign: 'center',
  textDecoration: 'none',
  color: '#2c2c2c',
  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  transition: 'box-shadow 0.3s ease-in-out'
};

const iconStyle = {
  fontSize: '2.2rem',
  marginBottom: '12px'
};

const cardTitle = {
  fontSize: '1.2rem',
  fontWeight: 600,
  marginBottom: '8px'
};

const cardDesc = {
  fontSize: '0.95rem',
  color: '#555',
  lineHeight: '1.5'
};