import React, { useState } from 'react';
import FileToolsLayout from '../FileToolsLayout';
import DropZone from '../DropZone';
import Toast from '../../Toast';


export default function RotatePages() {
  const [files, setFiles] = useState([]);
  const [rotation, setRotation] = useState('90');
  const [result, setResult] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'info') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const rotatePDFs = async () => {
    if (files.length === 0) return showToast('Upload a PDF first', 'error');
    const { PDFDocument, degrees } = await import('pdf-lib');

    const output = [];

    for (const file of files) {
      try {
        const bytes = await file.arrayBuffer();
        const doc = await PDFDocument.load(bytes);
        const pages = doc.getPages();

        const angle = parseInt(rotation, 10);
        pages.forEach((page) => {
          const current = page.getRotation().angle;
          page.setRotation(degrees((current + angle) % 360));
        });

        const finalBytes = await doc.save();
        const blob = new Blob([finalBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        output.push({ name: `${file.name.replace('.pdf', '')}_rotated.pdf`, url, blob });
      } catch {
        showToast(`Failed to rotate ${file.name}`, 'error');
      }
    }

    setResult(output);
    showToast(`Rotated ${output.length} file(s)`, 'success');
  };

  return (
    <FileToolsLayout title="🔄 Rotate PDF Pages" showBackButton>
      <DropZone
        multiple
        accept=".pdf"
        onMultipleFiles={setFiles}
      />

      <div style={{ marginTop: '20px', display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
        <label>Rotate by:</label>
        <select
          value={rotation}
          onChange={(e) => setRotation(e.target.value)}
          style={{ padding: '8px' }}
        >
          <option value="90">90° Clockwise</option>
          <option value="180">180°</option>
          <option value="270">90° Counterclockwise</option>
        </select>
        <button
          onClick={rotatePDFs}
          style={{
            padding: '10px 16px',
            backgroundColor: '#3f51b5',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Rotate Pages
        </button>
      </div>

      {/* SEO-enhanced description block */}
      <div style={{ marginTop: '30px', fontSize: '0.95rem', lineHeight: '1.6', color: '#444' }}>
        <h2 style={{ fontSize: '1.2rem' }}>Rotate PDF Pages in Browser</h2>
        <p>
          Rotate one or more pages of your PDF file by 90°, 180°, or 270° — instantly and securely in your browser.
          This tool uses <strong>pdf-lib</strong> to modify page orientation without uploading your files.
        </p>
        <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
          <li>🔄 Fix upside-down scans or landscape pages</li>
          <li>📄 Rotate entire documents or selected pages</li>
          <li>🔐 100% client-side — no server involved</li>
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