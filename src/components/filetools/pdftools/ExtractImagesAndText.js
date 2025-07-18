import React, { useState } from 'react';
import FileToolsLayout from '../FileToolsLayout';
import DropZone from '../DropZone';
import Toast from '../../Toast';
import BackButton from '../../BackButton';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker.entry';

export default function ExtractImagesAndText() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [images, setImages] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'info') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const extractContent = async () => {
    if (!file) return showToast('Upload a PDF first', 'error');
    const bytes = await file.arrayBuffer();

    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
    const doc = await pdfjsLib.getDocument({ data: bytes }).promise;

    let fullText = '';
    const imageList = [];

    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += `Page ${i}:\n${pageText}\n\n`;

      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
      imageList.push(canvas.toDataURL());
    }

    setText(fullText);
    setImages(imageList);
    showToast('Text and images extracted!', 'success');
  };

  return (
    <FileToolsLayout title="🔍 Extract Text & Images from PDF" showBackButton>
      
      <DropZone multiple={false} accept=".pdf" onMultipleFiles={(files) => setFile(files[0])} />

      <button
        onClick={extractContent}
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
        Extract Content
      </button>

      {/* 🔍 SEO-enhanced guidance block */}
      <div style={{ marginTop: '30px', fontSize: '0.95rem', lineHeight: '1.6', color: '#444' }}>
        <h2 style={{ fontSize: '1.2rem' }}>Extract Text and Images from PDF Instantly</h2>
        <p>
          This tool allows you to extract readable text and high-resolution page snapshots from any PDF file. Perfect for summarizing, archiving, or analyzing document content.
          Your files are processed entirely inside your browser using <strong>pdfjs-dist</strong> — no uploads, no delays.
        </p>
        <ul style={{ paddingLeft: '20px' }}>
          <li>🧾 Extracts typed text from PDF content</li>
          <li>🖼️ Renders snapshots for visual analysis or download</li>
          <li>🔐 Fully secure — processed offline using open-source tools</li>
        </ul>
      </div>

      {text && (
        <div style={{ marginTop: '30px' }}>
          <h3>🧾 Extracted Text</h3>
          <textarea
            value={text}
            readOnly
            rows={12}
            style={{ width: '100%', maxWidth: '600px', padding: '10px' }}
          />
        </div>
      )}

      {images.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h3>🖼️ Page Snapshots</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {images.map((src, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <img src={src} alt={`Page ${i + 1}`} style={{ width: '200px', borderRadius: '4px' }} />
                <a href={src} download={`page_${i + 1}.png`}>
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
        </div>
      )}

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </FileToolsLayout>
  );
}