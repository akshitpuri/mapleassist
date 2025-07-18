import React, { useState } from 'react';
import FileToolsLayout from '../FileToolsLayout';
import BackButton from '../../BackButton';
import DropZone from '../DropZone';
import Toast from '../../Toast';
const { PDFDocument } = await import('pdf-lib');


export default function MergePDF() {
  const [files, setFiles] = useState([]);
  const [merging, setMerging] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'info') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const mergePDFs = async () => {
    if (files.length < 2) {
      showToast('Please select at least 2 PDFs to merge.', 'error');
      return;
    }

    setMerging(true);

    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const pdf = await PDFDocument.load(bytes);
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedBytes = await mergedPdf.save();
      const blob = new Blob([mergedBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'merged.pdf';
      link.click();
      URL.revokeObjectURL(url);
      showToast('Merged PDF downloaded!', 'success');
    } catch (err) {
      showToast('Merge failed. Try again.', 'error');
    }

    setMerging(false);
  };

  return (
    <FileToolsLayout title="📎 Merge PDF Files">
      
      <DropZone
        multiple
        accept="application/pdf"
        onMultipleFiles={(selected) => {
          setFiles(selected);
          showToast(`${selected.length} PDF(s) selected`, 'info');
        }}
      />

      <div style={{ marginTop: '30px', fontSize: '0.95rem', lineHeight: '1.6', color: '#444' }}>
        <h2 style={{ fontSize: '1.2rem' }}>Merge PDF Files Easily & Privately</h2>
        <p>
          Combine multiple <strong>.pdf</strong> documents into one — quickly and securely, right inside your browser. Our online PDF merger is 100% client-side, meaning your files stay on your device. Perfect for merging invoices, contracts, reports, or ebooks without uploading anything to a server.
        </p>
        <p>
          Simply drag and drop two or more PDF files below, and click “Download Merged PDF” to instantly generate a single unified document.
        </p>
        <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
          <li>📄 Combine PDF files online without sign-up</li>
          <li>⚡ Fast, lightweight, and private</li>
          <li>🔒 No server upload — 100% browser-based</li>
          <li>🧩 Compatible with mobile and desktop browsers</li>
        </ul>
      </div>

      {files.length > 0 && (
        <ul style={{ marginTop: '16px', paddingLeft: '18px' }}>
          {files.map((file, i) => (
            <li key={i} style={{ fontSize: '0.9rem', color: '#555' }}>
              {file.name}
            </li>
          ))}
        </ul>
      )}

      <button
        disabled={files.length < 2 || merging}
        onClick={mergePDFs}
        style={{
          marginTop: '24px',
          padding: '10px 16px',
          backgroundColor: '#3f51b5',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: files.length >= 2 ? 'pointer' : 'not-allowed'
        }}
      >
        {merging ? 'Merging...' : 'Download Merged PDF'}
      </button>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </FileToolsLayout>
  );
}
