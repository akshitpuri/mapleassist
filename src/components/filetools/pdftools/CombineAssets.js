import React, { useState } from 'react';
import FileToolsLayout from '../FileToolsLayout';
import DropZone from '../DropZone';
import Toast from '../../Toast';


export default function CombineAssets() {
  const [files, setFiles] = useState([]);
  const [result, setResult] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'info') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const mergeAll = async () => {
    if (!files.length) return showToast('Upload files to combine', 'error');
    const { PDFDocument } = await import('pdf-lib');
    const merged = await PDFDocument.create();

    for (const file of files) {
      const type = file.type;

      if (type === 'application/pdf') {
        const bytes = await file.arrayBuffer();
        const src = await PDFDocument.load(bytes);
        const copied = await merged.copyPages(src, src.getPageIndices());
        copied.forEach((p) => merged.addPage(p));
      } else if (type.startsWith('image/')) {
        const imgBytes = await file.arrayBuffer();
        let img;
        if (type === 'image/png') {
          img = await merged.embedPng(imgBytes);
        } else {
          img = await merged.embedJpg(imgBytes);
        }
        const page = merged.addPage([img.width, img.height]);
        page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
      }
    }

    const final = await merged.save();
    const blob = new Blob([final], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    setResult([{ name: `merged_combined.pdf`, url, blob }]);
    showToast('Assets combined!', 'success');
  };

  return (
    <FileToolsLayout title="📚 Combine PDFs and Images" showBackButton>
      
      <DropZone multiple accept=".pdf,image/png,image/jpeg" onMultipleFiles={setFiles} />

      <button onClick={mergeAll} style={{
        marginTop: '20px',
        padding: '10px 16px',
        backgroundColor: '#3f51b5',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer'
      }}>
        Combine Files
      </button>

      {/* 🔍 SEO guidance */}
      <div style={{ marginTop: '30px', fontSize: '0.95rem', color: '#444', lineHeight: '1.6' }}>
        <h2 style={{ fontSize: '1.2rem' }}>Merge PDFs with Images for Seamless Output</h2>
        <p>
          Select PDFs and images together to create a single merged file. This is great for combining scanned forms, digital reports, handwritten notes, and typed docs.
          Everything runs 100% offline with <strong>pdf-lib</strong>.
        </p>
        <ul style={{ paddingLeft: '20px' }}>
          <li>📚 No upload required — browser only</li>
          <li>🖼️ JPG and PNG images turned into PDF pages</li>
          <li>🔐 Private, secure, and fast</li>
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