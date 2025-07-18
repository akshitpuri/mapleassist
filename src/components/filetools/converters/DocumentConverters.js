import React, { useState } from 'react';
import FileToolsLayout from '../FileToolsLayout';
import DropZone from '../DropZone';
import Toast from '../../Toast';

export default function DocumentConverters() {
  const [docs, setDocs] = useState([]);
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
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    page.setFont(font);
    page.drawText(text.slice(0, 3000), {
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
    if (docs.length === 0) return showToast('Please upload documents', 'error');

    const mammoth = await import('mammoth');
    const XLSX = await import('xlsx');
    const converted = [];

    for (const doc of docs) {
      const name = doc.name.split('.')[0];
      const ext = doc.name.split('.').pop().toLowerCase();
      let outputText = '';

      try {
        if (ext === 'docx' || ext === 'pptx') {
          const buffer = await doc.arrayBuffer();
          const result = await mammoth.convertToHtml({ arrayBuffer: buffer });
          outputText = result.value.replace(/<[^>]+>/g, '');
        } else if (ext === 'xlsx') {
          const buffer = await doc.arrayBuffer();
          const workbook = XLSX.read(buffer, { type: 'array' });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          outputText = XLSX.utils.sheet_to_csv(sheet);
        } else {
          showToast(`Unsupported file: ${doc.name}`, 'warning');
          continue;
        }

        if (format === 'txt') {
          const blob = new Blob([outputText], { type: 'text/plain' });
          converted.push({ name: `${name}.txt`, url: URL.createObjectURL(blob), blob });
        } else if (format === 'pdf') {
          const pdfUrl = await generatePDF(outputText);
          const blob = await fetch(pdfUrl).then(res => res.blob());
          converted.push({ name: `${name}.pdf`, url: pdfUrl, blob });
        }
      } catch {
        showToast(`Error converting ${doc.name}`, 'error');
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
    saveAs(zipped, 'converted_documents.zip');
  };

  return (
    <FileToolsLayout title="📄 Document Converter">
      <DropZone
        multiple
        accept=".docx,.pptx,.xlsx"
        onMultipleFiles={(files) => {
          setDocs(files);
          setConvertedFiles([]);
        }}
      />

      {/* 📘 SEO Guidance Block */}
      <div style={{ marginTop: '30px', fontSize: '0.95rem', lineHeight: '1.6', color: '#444' }}>
        <h2 style={{ fontSize: '1.2rem' }}>Convert DOCX, XLSX, PPTX Files to PDF or Text</h2>
        <p>
          Instantly convert documents into readable formats — great for sharing, printing, or extracting content.
          This browser-based tool uses client-side libraries like <strong>mammoth.js</strong>, <strong>xlsx</strong>, and <strong>pdf-lib</strong> to ensure speed and privacy.
        </p>
        <ul style={{ paddingLeft: '20px' }}>
          <li>📄 Accepts DOCX, PPTX, and XLSX documents</li>
          <li>🔄 Converts to plain text (.txt) or printable PDF (.pdf)</li>
          <li>📦 Batch ZIP download for converted files</li>
          <li>🔒 Fully local processing — no uploads, secure and fast</li>
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