import React from 'react';
import { Link } from 'react-router-dom';
import FileToolsLayout from '../FileToolsLayout';

const pdfTools = [
  { name: 'Merge PDF', path: '/filetools/pdftools/merge', icon: '📎' },
  { name: 'Split PDF', path: '/filetools/pdftools/split', icon: '✂️' },
  { name: 'Compress PDF', path: '/filetools/pdftools/compress', icon: '📉' },
  { name: 'Extract Pages', path: '/filetools/pdftools/extract', icon: '📑' },
  { name: 'Remove Pages', path: '/filetools/pdftools/remove', icon: '🗑️' },
  { name: 'Rotate Pages', path: '/filetools/pdftools/rotate', icon: '🔄' },
  { name: 'Add Page Numbers', path: '/filetools/pdftools/page-numbers', icon: '🔢' },
  { name: 'Add Watermark', path: '/filetools/pdftools/watermark', icon: '💧' },
  { name: 'Crop PDF Pages', path: '/filetools/pdftools/crop', icon: '✂️📄' },
  { name: 'Reorder Pages', path: '/filetools/pdftools/reorder', icon: '🧾' },
  { name: 'Annotate PDF', path: '/filetools/pdftools/annotate', icon: '✏️' },
  { name: 'Draw Signature', path: '/filetools/pdftools/signature', icon: '🖋️' },
  { name: 'Add Image Stamp', path: '/filetools/pdftools/stamp', icon: '📍' },
  { name: 'Insert Blank Pages', path: '/filetools/pdftools/insert-blank', icon: '📆' },
  { name: 'Combine PDFs + Images', path: '/filetools/pdftools/combineassets', icon: '📚' },
  { name: 'Flatten PDF Layers', path: '/filetools/pdftools/flatten', icon: '🔏' },
  { name: 'Cut Page Ranges', path: '/filetools/pdftools/range-cut', icon: '✂️📘' },
  { name: 'Extract Images and Text', path: '/filetools/pdftools/imgandtextextract', icon: '🧠' },
];




export default function PDFToolsHome() {
  return (
    <FileToolsLayout title="📄 PDF Tools" showBackButton={true}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
        marginTop: '20px'
      }}>
        {pdfTools.map((tool, i) => (
          <Link
            key={i}
            to={tool.path}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fdfdfd',
              padding: '22px',
              borderRadius: '10px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
              textDecoration: 'none',
              color: '#333',
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{tool.icon}</div>
            <div style={{ fontWeight: 600, textAlign: 'center' }}>{tool.name}</div>
          </Link>
        ))}
      </div>
    </FileToolsLayout>
  );
}
