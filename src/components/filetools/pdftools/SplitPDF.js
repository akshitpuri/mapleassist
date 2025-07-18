import React, { useState } from 'react';
import FileToolsLayout from '../FileToolsLayout';
import DropZone from '../DropZone';
import Toast from '../../Toast';

export default function SplitPDF() {
  const [file, setFile] = useState(null);
  const [splitPages, setSplitPages] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'info') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSplit = async () => {
    if (!file) return showToast('Upload a PDF first.', 'error');

    const { PDFDocument } = await import('pdf-lib');

    const bytes = await file.arrayBuffer();
    const pdf = await PDFDocument.load(bytes);
    const pageCount = pdf.getPageCount();
    const results = [];

    for (let i = 0; i < pageCount; i++) {
      const newPdf = await PDFDocument.create();
      const [page] = await newPdf.copyPages(pdf, [i]);
      newPdf.addPage(page);
      const output = await newPdf.save();
      const blob = new Blob([output], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      results.push({ page: i + 1, url, blob });
    }

    setSplitPages(results);
    showToast(`Split into ${results.length} pages`, 'success');
  };

  const downloadZip = async () => {
    const JSZip = (await import('jszip')).default;
    const { saveAs } = await import('file-saver');
    const zip = new JSZip();

    splitPages.forEach(({ page, blob }) => {
      zip.file(`page_${page}.pdf`, blob);
    });

    const zipped = await zip.generateAsync({ type: 'blob' });
    saveAs(zipped, 'split_pages.zip');
  };

  return (
    <FileToolsLayout title="✂️ Split PDF" showBackButton={true}>
      <DropZone
        accept="application/pdf"
        onDrop={(f) => {
          setFile(f);
          setSplitPages([]);
        }}
      />
      {/* 🔍 SEO-enhanced guidance block */}
<div style={{ marginTop: '30px', fontSize: '0.95rem', lineHeight: '1.6', color: '#444' }}>
  <h2 style={{ fontSize: '1.2rem' }}>Split Large PDFs into Individual Pages or Sections</h2>
  <p>
    Easily divide your PDF into specific page ranges or separate files using this offline PDF splitter tool. It’s perfect for distributing chapters, invoices, or sections from lengthy documents — 100% browser-based using <strong>pdf-lib</strong>.
  </p>
  <ul style={{ paddingLeft: '20px' }}>
    <li>✂️ Select page ranges or extract each page separately</li>
    <li>📁 Useful for academic, legal, and admin documents</li>
    <li>🔐 Files processed locally — no server upload</li>
  </ul>
</div>


      {file && (
        <button
          onClick={handleSplit}
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
          Split PDF into Pages
        </button>
      )}

      {splitPages.length > 0 && (
        <>
          <div style={{ marginTop: '30px', display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            {splitPages.map(({ page, url }) => (
              <div key={page} style={{ textAlign: 'center' }}>
                <p>Page {page}</p>
                <a href={url} download={`page_${page}.pdf`}>
                  <button style={{
                    padding: '6px 12px',
                    fontSize: '0.85rem',
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
          <button
            onClick={downloadZip}
            style={{
              marginTop: '20px',
              padding: '10px 16px',
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            ⬇ Download All as ZIP
          </button>
        </>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </FileToolsLayout>
  );
}
