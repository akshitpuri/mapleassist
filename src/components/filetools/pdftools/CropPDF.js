import React, { useState } from 'react';
import FileToolsLayout from '../FileToolsLayout';
import DropZone from '../DropZone';
import Toast from '../../Toast';

export default function CropPDF() {
  const [files, setFiles] = useState([]);
  const [cropBox, setCropBox] = useState({ x: 50, y: 50, width: 500, height: 700 });
  const [result, setResult] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'info') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const cropPDFs = async () => {
    if (files.length === 0) return showToast('Upload a PDF first', 'error');
    const { PDFDocument } = await import('pdf-lib');

    const output = [];

    for (const file of files) {
      try {
        const bytes = await file.arrayBuffer();
        const doc = await PDFDocument.load(bytes);
        const pages = doc.getPages();

        pages.forEach((page) => {
          page.setCropBox(
            cropBox.x,
            cropBox.y,
            cropBox.width,
            cropBox.height
          );
        });

        const finalBytes = await doc.save();
        const blob = new Blob([finalBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        output.push({ name: `${file.name.replace('.pdf', '')}_cropped.pdf`, url, blob });
      } catch {
        showToast(`Failed to crop ${file.name}`, 'error');
      }
    }

    setResult(output);
    showToast(`Cropped ${output.length} file(s)`, 'success');
  };

  return (
    <FileToolsLayout title="✂️ Crop PDF Pages" showBackButton>
      <DropZone
        multiple
        accept=".pdf"
        onMultipleFiles={setFiles}
      />

      <div style={{ marginTop: '20px', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
        <label>X:</label>
        <input
          type="number"
          value={cropBox.x}
          onChange={(e) => setCropBox({ ...cropBox, x: parseInt(e.target.value) })}
          style={{ padding: '8px', width: '80px' }}
        />
        <label>Y:</label>
        <input
          type="number"
          value={cropBox.y}
          onChange={(e) => setCropBox({ ...cropBox, y: parseInt(e.target.value) })}
          style={{ padding: '8px', width: '80px' }}
        />
        <label>Width:</label>
        <input
          type="number"
          value={cropBox.width}
          onChange={(e) => setCropBox({ ...cropBox, width: parseInt(e.target.value) })}
          style={{ padding: '8px', width: '80px' }}
        />
        <label>Height:</label>
        <input
          type="number"
          value={cropBox.height}
          onChange={(e) => setCropBox({ ...cropBox, height: parseInt(e.target.value) })}
          style={{ padding: '8px', width: '80px' }}
        />
        <button
          onClick={cropPDFs}
          style={{
            padding: '10px 16px',
            backgroundColor: '#3f51b5',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Crop Pages
        </button>
      </div>

      {/* SEO-enhanced guidance block */}
      <div style={{ marginTop: '30px', fontSize: '0.95rem', lineHeight: '1.6', color: '#444' }}>
        <h2 style={{ fontSize: '1.2rem' }}>Crop PDF Pages in Browser</h2>
        <p>
          Trim margins or isolate content zones from your PDF pages by setting a custom crop box. This tool uses <strong>pdf-lib</strong> to modify page boundaries directly in your browser — no upload required.
        </p>
        <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
          <li>✂️ Remove white space or headers/footers</li>
          <li>📄 Works with multi-page PDFs</li>
          <li>🔐 100% private — processed locally</li>
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