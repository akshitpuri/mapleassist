import React, { useState } from 'react';
import FileToolsLayout from '../FileToolsLayout';
import DropZone from '../DropZone';
import Toast from '../../Toast';


export default function AddImageStamp() {
  const [pdfFile, setPdfFile] = useState(null);
  const [stampFile, setStampFile] = useState(null);
  const [result, setResult] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const applyStamp = async () => {
    if (!pdfFile || !stampFile) return showToast('Upload both PDF and image stamp', 'error');
    const { PDFDocument } = await import('pdf-lib');

    try {
      const pdfBytes = await pdfFile.arrayBuffer();
      const imageBytes = await stampFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBytes);

      let image;
      if (stampFile.type === 'image/png') {
        image = await pdfDoc.embedPng(imageBytes);
      } else {
        image = await pdfDoc.embedJpg(imageBytes);
      }

      const pages = pdfDoc.getPages();
      pages.forEach((page) => {
        const { width, height } = page.getSize();
        page.drawImage(image, {
          x: width - 120,
          y: height - 120,
          width: 100,
          height: 100
        });
      });

      const final = await pdfDoc.save();
      const blob = new Blob([final], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const fileName = `${pdfFile.name.replace('.pdf', '')}_stamped.pdf`;
      setResult([{ name: fileName, url, blob }]);
      showToast('Stamp applied to all pages!', 'success');
    } catch {
      showToast('Failed to stamp your PDF', 'error');
    }
  };

  return (
    <FileToolsLayout title="📍 Add Image Stamp to PDF" showBackButton>
    
      <DropZone multiple={false} accept=".pdf" onMultipleFiles={(files) => setPdfFile(files[0])} />
      <DropZone multiple={false} accept="image/png,image/jpeg" onMultipleFiles={(files) => setStampFile(files[0])} />

      <button
        onClick={applyStamp}
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
        Apply Stamp to PDF
      </button>

      {/* 🔍 SEO-enhanced guidance block */}
      <div style={{ marginTop: '30px', fontSize: '0.95rem', color: '#444', lineHeight: '1.6' }}>
        <h2 style={{ fontSize: '1.2rem' }}>Stamp Your PDF with a Logo or Seal</h2>
        <p>
          Upload your brand mark, seal, or approval stamp and embed it on every page of your PDF using <strong>pdf-lib</strong>. All processing is done privately in-browser.
        </p>
        <ul style={{ paddingLeft: '20px' }}>
          <li>📍 Perfect for invoices, certificates, and official documents</li>
          <li>🖼️ Supports PNG and JPG formats</li>
          <li>🔐 Secure and client-side — no upload required</li>
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