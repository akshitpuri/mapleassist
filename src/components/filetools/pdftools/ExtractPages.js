import React, { useState } from 'react';
import FileToolsLayout from '../FileToolsLayout';
import DropZone from '../DropZone';
import Toast from '../../Toast';

export default function ExtractPages() {
  const [files, setFiles] = useState([]);
  const [range, setRange] = useState('1-2');
  const [output, setOutput] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'info') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const extractPages = async () => {
    if (files.length === 0) return showToast('Upload a PDF first', 'error');
    const { PDFDocument } = await import('pdf-lib');

    const results = [];

    for (const file of files) {
      try {
        const bytes = await file.arrayBuffer();
        const doc = await PDFDocument.load(bytes);
        const newDoc = await PDFDocument.create();

        const [start, end] = range.split('-').map(n => parseInt(n.trim(), 10));
        const pages = await newDoc.copyPages(doc, doc.getPageIndices().slice(start - 1, end));
        pages.forEach(p => newDoc.addPage(p));

        const extracted = await newDoc.save();
        const blob = new Blob([extracted], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        results.push({ name: `${file.name.replace('.pdf', '')}_p${start}-${end}.pdf`, url, blob });
      } catch {
        showToast(`Failed to extract from ${file.name}`, 'error');
      }
    }

    setOutput(results);
    showToast(`Extracted pages from ${results.length} file(s)!`, 'success');
  };

  return (
    <FileToolsLayout title="📑 Extract Pages from PDF" showBackButton>

      <DropZone
        multiple
        accept=".pdf"
        onMultipleFiles={setFiles}
      />

      <div style={{ marginTop: '20px', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
        <label>Page Range (e.g. 2–5):</label>
        <input
          type="text"
          value={range}
          onChange={(e) => setRange(e.target.value)}
          style={{ padding: '8px', width: '120px' }}
        />
        <button
          onClick={extractPages}
          style={{
            padding: '10px 16px',
            backgroundColor: '#3f51b5',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Extract Pages
        </button>
      </div>

      {/* 📈 SEO-enhanced description block */}
      <div style={{ marginTop: '30px', fontSize: '0.95rem', lineHeight: '1.6', color: '#444' }}>
        <h2 style={{ fontSize: '1.2rem' }}>Extract Specific Pages from PDFs in Browser</h2>
        <p>
          Select a page range to instantly extract those pages from one or more PDF files — right here in your browser.
          This tool runs entirely offline, using client-side processing powered by <strong>pdf-lib</strong>, ensuring your documents remain private.
        </p>
        <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
          <li>🧠 Ideal for pulling chapters or sections from larger PDFs</li>
          <li>📄 Works with invoices, contracts, academic papers & more</li>
          <li>🔐 No upload required — files processed on your device</li>
        </ul>
      </div>

      {output.length > 0 && (
        <div style={{ marginTop: '30px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {output.map(({ name, url }, i) => (
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

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </FileToolsLayout>
  );
}