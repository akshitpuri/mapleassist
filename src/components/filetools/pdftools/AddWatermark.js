import React, { useState } from 'react';
import FileToolsLayout from '../FileToolsLayout';
import DropZone from '../DropZone';
import Toast from '../../Toast';

export default function AddWatermark() {
  const [files, setFiles] = useState([]);
  const [text, setText] = useState('CONFIDENTIAL');
  const [result, setResult] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'info') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const applyWatermark = async () => {
    if (files.length === 0) return showToast('Upload a PDF first', 'error');
    const { PDFDocument, StandardFonts, rgb, degrees } = await import('pdf-lib');

    const output = [];

    for (const file of files) {
      try {
        const bytes = await file.arrayBuffer();
        const doc = await PDFDocument.load(bytes);
        const font = await doc.embedFont(StandardFonts.HelveticaBold);
        const pages = doc.getPages();

        pages.forEach((page) => {
          const { width, height } = page.getSize();
          page.drawText(text, {
            x: width / 2 - 200,
            y: height / 2 + 100,
            size: 60,
            font,
            color: rgb(0.6, 0.6, 0.6),
            rotate: degrees(-30),
            opacity: 0.3
          });
        });

        const finalBytes = await doc.save();
        const blob = new Blob([finalBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        output.push({ name: `${file.name.replace('.pdf', '')}_watermarked.pdf`, url, blob });
      } catch {
        showToast(`Failed to watermark ${file.name}`, 'error');
      }
    }

    setResult(output);
    showToast(`Watermarked ${output.length} file(s)`, 'success');
  };

  return (
    <FileToolsLayout title="💧 Add Watermark to PDF" showBackButton>
      
      <DropZone
        multiple
        accept=".pdf"
        onMultipleFiles={setFiles}
      />

      <div style={{ marginTop: '20px', display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
        <label>Watermark Text:</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ padding: '8px', width: '200px' }}
        />
        <button
          onClick={applyWatermark}
          style={{
            padding: '10px 16px',
            backgroundColor: '#3f51b5',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Add Watermark
        </button>
      </div>

      {/* SEO-enhanced guidance block */}
      <div style={{ marginTop: '30px', fontSize: '0.95rem', lineHeight: '1.6', color: '#444' }}>
        <h2 style={{ fontSize: '1.2rem' }}>Add Custom Watermarks to PDF Files</h2>
        <p>
          Overlay watermark text like “CONFIDENTIAL” or “DRAFT” across your PDF pages — all in-browser, with no upload required.
          This tool uses <strong>pdf-lib</strong> to render semi-transparent text diagonally across each page.
        </p>
        <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
          <li>💧 Customize watermark text and style</li>
          <li>📄 Works with multi-page PDFs</li>
          <li>🔐 100% private — processed on your device</li>
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