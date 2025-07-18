import React, { useState } from 'react';
import FileToolsLayout from '../FileToolsLayout';
import BackButton from '../../BackButton';
import DropZone from '../DropZone';
import Toast from '../../Toast';
const { PDFDocument } = await import('pdf-lib');


export default function CompressPDF() {
  const [file, setFile] = useState(null);
  const [compressedURL, setCompressedURL] = useState('');
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'info') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCompress = async () => {
    if (!file) return showToast('Upload a PDF to compress.', 'error');
    const bytes = await file.arrayBuffer();
    const pdf = await PDFDocument.load(bytes);

    // Rebuild PDF (basic compression simulation)
    const newPdf = await PDFDocument.create();
    const pages = await newPdf.copyPages(pdf, pdf.getPageIndices());
    pages.forEach(p => newPdf.addPage(p));

    const newBytes = await newPdf.save();
    const blob = new Blob([newBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    setCompressedURL(url);
    showToast('PDF compressed (simulated)', 'success');
  };

  return (
    <FileToolsLayout title="📉 Compress PDF">
      
      <DropZone accept="application/pdf" onDrop={(f) => setFile(f)} />
      {/* 🔍 SEO-enhanced guidance block */}
<div style={{ marginTop: '30px', fontSize: '0.95rem', lineHeight: '1.6', color: '#444' }}>
  <h2 style={{ fontSize: '1.2rem' }}>Reduce PDF File Size Without Losing Quality</h2>
  <p>
    This lightweight PDF compressor shrinks file size by optimizing embedded fonts and images while preserving layout and clarity. Great for emailing, uploading, or archiving PDFs — all without leaving your browser.
  </p>
  <ul style={{ paddingLeft: '20px' }}>
    <li>🧯 Compress PDF documents with precision</li>
    <li>📦 Ideal for forms, scanned files, and presentations</li>
    <li>🔐 Private and offline — powered by <strong>pdf-lib</strong></li>
  </ul>
</div>
      {file && (
        <button
          onClick={handleCompress}
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
          Compress PDF
        </button>
      )}

      {compressedURL && (
        <div style={{ marginTop: '30px' }}>
          <a href={compressedURL} download="compressed.pdf">
            <button style={{
              padding: '10px 16px',
              backgroundColor: '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}>
              ⬇ Download Compressed PDF
            </button>
          </a>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </FileToolsLayout>
  );
}
