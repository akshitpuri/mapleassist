import React, { useState } from 'react';
import FileToolsLayout from '../FileToolsLayout';
import DropZone from '../DropZone';

import Toast from '../../Toast';

export default function FlattenPDF() {
  const [files, setFiles] = useState([]);
  const [result, setResult] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'info') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const flatten = async () => {
    if (!files.length) return showToast('Upload a PDF to flatten', 'error');
    const { PDFDocument } = await import('pdf-lib');

    const output = [];
    for (const file of files) {
      try {
        const bytes = await file.arrayBuffer();
        const original = await PDFDocument.load(bytes);
        const flat = await PDFDocument.create();

        const pages = await flat.copyPages(original, original.getPageIndices());
        pages.forEach((page) => flat.addPage(page));

        const final = await flat.save();
        const blob = new Blob([final], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        output.push({
          name: `${file.name.replace('.pdf', '')}_flattened.pdf`,
          url,
          blob
        });
      } catch {
        showToast(`Failed to flatten ${file.name}`, 'error');
      }
    }

    setResult(output);
    showToast('PDFs flattened successfully!', 'success');
  };

  return (
    <FileToolsLayout title="🧾 Flatten PDF Layers" showBackButton>
      
      <DropZone multiple accept=".pdf" onMultipleFiles={setFiles} />

      <button onClick={flatten} style={{
        marginTop: '20px',
        padding: '10px 16px',
        backgroundColor: '#3f51b5',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer'
      }}>
        Flatten PDF Layers
      </button>

      {/* 🔍 SEO guidance block */}
      <div style={{ marginTop: '30px', fontSize: '0.95rem', lineHeight: '1.6', color: '#444' }}>
        <h2 style={{ fontSize: '1.2rem' }}>Convert Interactive PDFs into Static Layers</h2>
        <p>
          Flatten your PDF files to remove editable layers like forms or annotations, producing a clean visual-only version ideal for printing, archiving, and sharing. This tool runs 100% offline using <strong>pdf-lib</strong>.
        </p>
        <ul style={{ paddingLeft: '20px' }}>
          <li>🧾 Locks layout while discarding form fields</li>
          <li>🧹 Converts interactive content to visual-only pages</li>
          <li>🔐 Private and secure — runs entirely in browser</li>
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