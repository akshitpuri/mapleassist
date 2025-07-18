import React, { useState } from 'react';
import FileToolsLayout from '../FileToolsLayout';
import DropZone from '../DropZone';
import Toast from '../../Toast';

export default function AddPageNumbers() {
  const [files, setFiles] = useState([]);
  const [result, setResult] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'info') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const addNumbers = async () => {
    if (files.length === 0) return showToast('Upload a PDF first', 'error');
    const { PDFDocument, StandardFonts, rgb } = await import('pdf-lib');

    const output = [];

    for (const file of files) {
      try {
        const bytes = await file.arrayBuffer();
        const doc = await PDFDocument.load(bytes);
        const font = await doc.embedFont(StandardFonts.Helvetica);
        const pages = doc.getPages();

        pages.forEach((page, i) => {
          page.drawText(`${i + 1}`, {
            x: page.getWidth() / 2 - 10,
            y: 20,
            size: 12,
            font,
            color: rgb(0, 0, 0)
          });
        });

        const finalBytes = await doc.save();
        const blob = new Blob([finalBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        output.push({ name: `${file.name.replace('.pdf', '')}_numbered.pdf`, url, blob });
      } catch {
        showToast(`Failed to number ${file.name}`, 'error');
      }
    }

    setResult(output);
    showToast(`Added page numbers to ${output.length} file(s)`, 'success');
  };

  return (
    <FileToolsLayout title="🔢 Add Page Numbers to PDF" showBackButton>
      <DropZone
        multiple
        accept=".pdf"
        onMultipleFiles={setFiles}
      />

      <button
        onClick={addNumbers}
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
        Add Page Numbers
      </button>

      {/* SEO-enhanced guidance block */}
      <div style={{ marginTop: '30px', fontSize: '0.95rem', lineHeight: '1.6', color: '#444' }}>
        <h2 style={{ fontSize: '1.2rem' }}>Add Page Numbers to PDF Files Instantly</h2>
        <p>
          This tool overlays page numbers at the bottom of each page in your PDF — perfect for reports, contracts, and academic papers.
          It runs entirely in your browser using <strong>pdf-lib</strong>, keeping your files private and secure.
        </p>
        <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
          <li>🔢 Numbers added in Helvetica font, centered at bottom</li>
          <li>📄 Supports multi-file batch processing</li>
          <li>🔐 No upload — 100% client-side</li>
        </ul>
      </div>

      {result.length > 0 && (
        <div style={{ marginTop: '30px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
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