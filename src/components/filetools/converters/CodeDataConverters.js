import React, { useState } from 'react';
import FileToolsLayout from '../FileToolsLayout';
import DropZone from '../DropZone';
import Toast from '../../Toast';

export default function CodeDataConverters() {
  const [codeFiles, setCodeFiles] = useState([]);
  const [format, setFormat] = useState('pdf');
  const [convertedFiles, setConvertedFiles] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'info') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const generatePDF = async (text) => {
    const { PDFDocument, StandardFonts } = await import('pdf-lib');
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const font = await pdfDoc.embedFont(StandardFonts.Courier); // Use monospace for code

    page.setFont(font);
    page.drawText(text.slice(0, 4000), {
      x: 50,
      y: page.getHeight() - 50,
      maxWidth: 500,
      lineHeight: 20
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    return URL.createObjectURL(blob);
  };

  const convertFiles = async () => {
    if (codeFiles.length === 0) return showToast('Please upload files', 'error');

    const converted = [];

    for (const file of codeFiles) {
      const name = file.name.split('.')[0];
      const ext = file.name.split('.').pop().toLowerCase();

      if (!['js', 'py', 'html', 'json', 'csv'].includes(ext)) {
        showToast(`Unsupported file: ${file.name}`, 'warning');
        continue;
      }

      try {
        const text = await file.text();

        if (format === 'txt') {
          const blob = new Blob([text], { type: 'text/plain' });
          converted.push({ name: `${name}.txt`, url: URL.createObjectURL(blob), blob });
        } else if (format === 'pdf') {
          const pdfUrl = await generatePDF(text);
          const blob = await fetch(pdfUrl).then(res => res.blob());
          converted.push({ name: `${name}.pdf`, url: pdfUrl, blob });
        }
      } catch {
        showToast(`Error converting ${file.name}`, 'error');
      }
    }

    setConvertedFiles(converted);
    showToast(`Converted ${converted.length} file(s)!`, 'success');
  };

  const downloadZip = async () => {
    const JSZip = (await import('jszip')).default;
    const { saveAs } = await import('file-saver');
    const zip = new JSZip();

    convertedFiles.forEach(({ name, blob }) => zip.file(name, blob));
    const zipped = await zip.generateAsync({ type: 'blob' });
    saveAs(zipped, 'converted_code_data.zip');
  };

  return (
    <FileToolsLayout title="📊 Code & Data Converter">
      <DropZone
        multiple
        accept=".js,.py,.html,.json,.csv"
        onMultipleFiles={(files) => {
          setCodeFiles(files);
          setConvertedFiles([]);
        }}
      />

      {/* 📘 SEO Guidance Block */}
      <div style={{ marginTop: '30px', fontSize: '0.95rem', lineHeight: '1.6', color: '#444' }}>
        <h2 style={{ fontSize: '1.2rem' }}>Convert Code or Data Files into TXT or PDF</h2>
        <p>
          Convert programming files like <code>.js</code>, <code>.py</code>, <code>.html</code>, and <code>.json</code> into human-readable
          documents — either plain text or PDF format. Perfect for sharing, archiving, or documentation.
          Runs entirely in your browser with no uploads.
        </p>
        <ul style={{ paddingLeft: '20px' }}>
          <li>💻 Supports code and data formats: JS, HTML, JSON, Python, CSV</li>
          <li>📝 Choose TXT for raw export or PDF for formatted sharing</li>
          <li>📦 Download all converted files as a single ZIP archive</li>
          <li>🔒 No server required — 100% offline and private</li>
        </ul>
      </div>

      <div style={{ marginTop: '20px', display: 'flex', gap: '14px', alignItems: 'center' }}>
        <label>Convert to:</label>
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          style={{ padding: '8px' }}
        >
          <option value="pdf">PDF</option>
          <option value="txt">Text (.txt)</option>
        </select>
        <button
          onClick={convertFiles}
          style={{
            padding: '10px 16px',
            backgroundColor: '#3f51b5',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Convert Files
        </button>
      </div>

      {convertedFiles.length > 0 && (
        <>
          <div style={{ marginTop: '30px', display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {convertedFiles.map(({ name, url }, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.9rem' }}>{name}</p>
                <a href={url} download={name}>
                  <button
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#4caf50',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
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
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </FileToolsLayout>
  );
}