import React, { useState } from 'react';
import FileToolsLayout from '../FileToolsLayout';
import DropZone from '../DropZone';

import Toast from '../../Toast';

export default function CutPageRanges() {
  const [file, setFile] = useState(null);
  const [rangeInput, setRangeInput] = useState('');
  const [result, setResult] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'info') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const parseRanges = (text, totalPages) => {
    try {
      const ranges = text.split(',').flatMap(part => {
        if (part.includes('-')) {
          const [start, end] = part.split('-').map(n => parseInt(n, 10));
          if (isNaN(start) || isNaN(end)) throw new Error();
          return Array.from({ length: end - start + 1 }, (_, i) => start + i);
        }
        const num = parseInt(part, 10);
        if (isNaN(num)) throw new Error();
        return [num];
      });

      const validPages = ranges
        .map(n => n - 1)
        .filter(i => i >= 0 && i < totalPages);

      return [...new Set(validPages)];
    } catch {
      return null;
    }
  };

  const cutPages = async () => {
    if (!file) return showToast('Upload a PDF first', 'error');
    const { PDFDocument } = await import('pdf-lib');
    const bytes = await file.arrayBuffer();
    const src = await PDFDocument.load(bytes);
    const totalPages = src.getPageCount();

    const selectedIndices = parseRanges(rangeInput, totalPages);
    if (!selectedIndices || selectedIndices.length === 0) {
      return showToast('Invalid or empty page range', 'error');
    }

    const newDoc = await PDFDocument.create();
    const pages = await newDoc.copyPages(src, selectedIndices);
    pages.forEach(p => newDoc.addPage(p));

    const final = await newDoc.save();
    const blob = new Blob([final], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const name = `${file.name.replace('.pdf', '')}_cut.pdf`;
    setResult([{ name, url, blob }]);
    showToast(`PDF cut to ${selectedIndices.length} page(s)`, 'success');
  };

  return (
    <FileToolsLayout title="✂️ Cut Pages from PDF" showBackButton>
      
      <DropZone multiple={false} accept=".pdf" onMultipleFiles={(files) => setFile(files[0])} />

      <div style={{ marginTop: '20px' }}>
        <label>Enter page numbers or ranges (e.g. <code>1-3,5,7</code>):</label>
        <input
          type="text"
          value={rangeInput}
          onChange={(e) => setRangeInput(e.target.value)}
          style={{
            padding: '8px',
            marginTop: '8px',
            width: '100%',
            maxWidth: '300px'
          }}
        />
      </div>

      <button
        onClick={cutPages}
        style={{
          marginTop: '20px',
          padding: '10px 16px',
          backgroundColor: '#3f51b5',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        Cut Selected Pages
      </button>

      {/* 🔍 SEO guidance block */}
      <div style={{ marginTop: '30px', fontSize: '0.95rem', lineHeight: '1.6', color: '#444' }}>
        <h2 style={{ fontSize: '1.2rem' }}>Cut Specific Pages from PDF</h2>
        <p>
          Trim any PDF by selecting specific page ranges — perfect for exporting highlights, splitting documents, or removing extra sheets.
          All processing is 100% offline using <strong>pdf-lib</strong>.
        </p>
        <ul style={{ paddingLeft: '20px' }}>
          <li>✂️ Page selector supports ranges like <code>1-3,6</code></li>
          <li>📄 Output preserves layout and fidelity</li>
          <li>🔐 Files never uploaded — in-browser only</li>
        </ul>
      </div>

      {result.length > 0 && (
        <div style={{ marginTop: '30px', display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {result.map(({ name, url }, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '0.9rem' }}>{name}</p>
              <a href={url} download={name}>
                <button style={{
                  marginTop: '8px',
                  padding: '6px 12px',
                  backgroundColor: '#4caf50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}>
                  Download
                </button>
              </a>
            </div>
          ))}
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </FileToolsLayout>
  );
}