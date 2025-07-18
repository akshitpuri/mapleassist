import React, { useState } from 'react';
import FileToolsLayout from '../FileToolsLayout';
import DropZone from '../DropZone';
import Toast from '../../Toast';

export default function RemovePages() {
  const [files, setFiles] = useState([]);
  const [pagesToRemove, setPagesToRemove] = useState('');
  const [result, setResult] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'info') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleRemove = async () => {
    if (files.length === 0) return showToast('Upload a PDF first', 'error');
    const { PDFDocument } = await import('pdf-lib');

    const output = [];

    for (const file of files) {
      try {
        const bytes = await file.arrayBuffer();
        const original = await PDFDocument.load(bytes);
        const newDoc = await PDFDocument.create();

        const toRemove = pagesToRemove
          .split(',')
          .map(n => parseInt(n.trim(), 10) - 1)
          .filter(n => !isNaN(n));

        const pageIndices = original.getPageIndices().filter(i => !toRemove.includes(i));
        const pages = await newDoc.copyPages(original, pageIndices);
        pages.forEach(p => newDoc.addPage(p));

        const finalBytes = await newDoc.save();
        const blob = new Blob([finalBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        output.push({ name: `${file.name.replace('.pdf', '')}_removed.pdf`, url, blob });
      } catch {
        showToast(`Error processing ${file.name}`, 'error');
      }
    }

    setResult(output);
    showToast(`Removed pages from ${output.length} file(s)`, 'success');
  };

  return (
    <FileToolsLayout title="🗑️ Remove Pages from PDF" showBackButton>
      <DropZone
        multiple
        accept=".pdf"
        onMultipleFiles={setFiles}
      />

      <div style={{ marginTop: '20px', display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
        <label>Pages to remove (e.g. 1,3,5):</label>
        <input
          type="text"
          value={pagesToRemove}
          onChange={(e) => setPagesToRemove(e.target.value)}
          style={{ padding: '8px', width: '140px' }}
        />
        <button
          onClick={handleRemove}
          style={{
            padding: '10px 16px',
            backgroundColor: '#e53935',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Remove Pages
        </button>
      </div>

      {/* SEO block for visibility */}
      <div style={{ marginTop: '30px', fontSize: '0.95rem', lineHeight: '1.6', color: '#444' }}>
        <h2 style={{ fontSize: '1.2rem' }}>Remove Unwanted Pages from PDF Instantly</h2>
        <p>
          Choose any pages you want to remove — simply enter their page numbers and get a cleaner, smaller PDF.
          No need for sign-up or server uploads. This tool preserves privacy and performs directly in your browser.
        </p>
        <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
          <li>🧹 Remove blank or irrelevant pages easily</li>
          <li>📄 Supports multi-file batch cleanup</li>
          <li>🔐 Secure — processed locally via <strong>pdf-lib</strong></li>
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