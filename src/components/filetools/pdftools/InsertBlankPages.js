import React, { useState } from 'react';
import FileToolsLayout from '../FileToolsLayout';
import DropZone from '../DropZone';
import Toast from '../../Toast';


export default function InsertBlankPages() {
  const [files, setFiles] = useState([]);
  const [position, setPosition] = useState('2');
  const [result, setResult] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'info') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const insertBlank = async () => {
    if (files.length === 0) return showToast('Upload a PDF first', 'error');
    const { PDFDocument } = await import('pdf-lib');

    const output = [];

    for (const file of files) {
      try {
        const bytes = await file.arrayBuffer();
        const doc = await PDFDocument.load(bytes);
        const blank = doc.addPage(); // create blank page
        doc.removePage(doc.getPageCount() - 1); // remove from end

        const insertAt = Math.max(0, Math.min(parseInt(position) - 1, doc.getPageCount()));
        doc.insertPage(insertAt, blank);

        const finalBytes = await doc.save();
        const blob = new Blob([finalBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        output.push({ name: `${file.name.replace('.pdf', '')}_blanked.pdf`, url, blob });
      } catch {
        showToast(`Failed to insert into ${file.name}`, 'error');
      }
    }

    setResult(output);
    showToast(`Inserted blank page(s) into ${output.length} file(s)`, 'success');
  };

  return (
    <FileToolsLayout title="📆 Insert Blank Pages into PDF" showBackButton>
   
      <DropZone multiple accept=".pdf" onMultipleFiles={setFiles} />

      <div style={{ marginTop: '20px', display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
        <label>Insert at page number:</label>
        <input
          type="number"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          style={{ padding: '8px', width: '100px' }}
        />
        <button
          onClick={insertBlank}
          style={{
            padding: '10px 16px',
            backgroundColor: '#3f51b5',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Insert Blank Page
        </button>
      </div>

      {/* SEO-enhanced guidance block */}
      <div style={{ marginTop: '30px', fontSize: '0.95rem', lineHeight: '1.6', color: '#444' }}>
        <h2 style={{ fontSize: '1.2rem' }}>Insert Blank Pages into PDF Documents</h2>
        <p>
          Add blank pages between existing ones or at the end of your PDF — perfect for notes, separators, or placeholders.
          This tool uses <strong>pdf-lib</strong> to modify your file entirely in-browser, with no upload required.
        </p>
        <ul style={{ paddingLeft: '20px' }}>
          <li>📆 Insert at any position — before, between, or after</li>
          <li>📄 Useful for forms, drafts, or print-ready layouts</li>
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