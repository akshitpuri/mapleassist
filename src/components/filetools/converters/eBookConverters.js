import React, { useState } from 'react';
import FileToolsLayout from '../FileToolsLayout';
import DropZone from '../DropZone';
import Toast from '../../Toast';

export default function EbookConverters() {
  const [ebooks, setEbooks] = useState([]);
  const [convertedFiles, setConvertedFiles] = useState([]);
  const [format, setFormat] = useState('txt');
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'info') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const convertFiles = async (incoming) => {
    setEbooks(incoming);
    setConvertedFiles([]);
    const converted = [];

    for (const file of incoming) {
      try {
        const ext = file.name.split('.').pop().toLowerCase();
        const baseName = file.name.replace(/\.[^/.]+$/, '');
        let content = '';

        if (ext === 'epub') {
          const epub = (await import('epubjs')).default;
          const book = epub(file);
          const container = document.createElement('div');
          book.renderTo(container, { width: 1, height: 1 });
          await book.ready;
          const spineItem = book.spine.get(0);
          content = await book.archive.createUrl(spineItem.href, true); // Basic preview text
        } else if (ext === 'txt') {
          content = await file.text();
        } else if (ext === 'mobi') {
          showToast(`.mobi not supported client-side (yet)`, 'warning');
          continue;
        }

        let blob, url;

        if (format === 'txt') {
          blob = new Blob([content], { type: 'text/plain' });
          url = URL.createObjectURL(blob);
          converted.push({ name: `${baseName}.txt`, url, blob });
        } else if (format === 'pdf') {
          const { PDFDocument, StandardFonts } = await import('pdf-lib');
          const pdfDoc = await PDFDocument.create();
          const page = pdfDoc.addPage();
          const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

          page.setFont(font);
          page.drawText(content.slice(0, 3000), {
            x: 50,
            y: page.getHeight() - 50,
            maxWidth: 500,
            lineHeight: 20
          });

          const pdfBytes = await pdfDoc.save();
          blob = new Blob([pdfBytes], { type: 'application/pdf' });
          url = URL.createObjectURL(blob);
          converted.push({ name: `${baseName}.pdf`, url, blob });
        }
      } catch {
        showToast(`Error converting ${file.name}`, 'error');
      }
    }

    setConvertedFiles(converted);
    showToast(`Converted ${converted.length} eBook(s)`, 'success');
  };

  const downloadZip = async () => {
    const JSZip = (await import('jszip')).default;
    const { saveAs } = await import('file-saver');
    const zip = new JSZip();

    convertedFiles.forEach(({ name, blob }) => zip.file(name, blob));
    const zipped = await zip.generateAsync({ type: 'blob' });
    saveAs(zipped, 'converted_ebooks.zip');
  };

  return (
    <FileToolsLayout title="📚 eBook Converter">
      <DropZone
        multiple
        accept=".epub,.mobi,.txt"
        onMultipleFiles={convertFiles}
      />

      {/* 📘 SEO Guidance Block */}
      <div style={{ marginTop: '30px', fontSize: '0.95rem', lineHeight: '1.6', color: '#444' }}>
        <h2 style={{ fontSize: '1.2rem' }}>Convert eBooks to PDF or Plain Text in Your Browser</h2>
        <p>
          Upload EPUB or TXT files and instantly convert them to shareable formats like PDF and TXT.
          MOBI support coming soon. No server upload — all processing happens securely in your browser.
        </p>
        <ul style={{ paddingLeft: '20px' }}>
          <li>📚 Supports EPUB and TXT input formats</li>
          <li>🔄 Output options include PDF or plain TXT</li>
          <li>📦 Batch conversion and ZIP packaging</li>
          <li>🔒 Offline and private — ideal for personal libraries</li>
        </ul>
      </div>

      <div style={{ marginTop: '20px', display: 'flex', gap: '14px', alignItems: 'center' }}>
        <label>Convert to:</label>
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          style={{ padding: '8px' }}
        >
          <option value="txt">Text (.txt)</option>
          <option value="pdf">PDF (.pdf)</option>
        </select>
      </div>

      {convertedFiles.length > 0 && (
        <>
          <div style={{ marginTop: '30px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {convertedFiles.map(({ name, url }, i) => (
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

          <button
            onClick={downloadZip}
            style={{
              marginTop: '30px',
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

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </FileToolsLayout>
  );
}