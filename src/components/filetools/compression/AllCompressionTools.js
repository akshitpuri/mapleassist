import React, { useState } from 'react';
import FileToolsLayout from '../FileToolsLayout';
import DropZone from '../DropZone';
import Toast from '../../Toast';

export default function AllCompressionTools() {
  const [compressedFiles, setCompressedFiles] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'info') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const compressFiles = async (incoming) => {
    setCompressedFiles([]);
    const output = [];

    for (const file of incoming) {
      const ext = file.name.split('.').pop().toLowerCase();
      const base = file.name.replace(/\.[^/.]+$/, '');

      try {
        if (ext === 'pdf') {
          const { PDFDocument } = await import('pdf-lib');
          const bytes = await file.arrayBuffer();
          const original = await PDFDocument.load(bytes);
          const compressed = await PDFDocument.create();
          const pages = await compressed.copyPages(original, original.getPageIndices());
          pages.forEach(p => compressed.addPage(p));
          const finalBytes = await compressed.save();
          const blob = new Blob([finalBytes], { type: 'application/pdf' });
          output.push({ name: `${base}_compressed.pdf`, blob });
        }

        else if (['png', 'jpg', 'jpeg'].includes(ext)) {
          const img = new Image();
          img.src = URL.createObjectURL(file);
          await new Promise(res => (img.onload = res));

          const canvas = document.createElement('canvas');
          canvas.width = img.width * 0.7;
          canvas.height = img.height * 0.7;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          const mime = ext === 'png' ? 'image/png' : 'image/jpeg';
          const blob = await new Promise(res => canvas.toBlob(res, mime, 0.6));
          output.push({ name: `${base}_compressed.${ext}`, blob });
        }

        else if (['txt', 'epub'].includes(ext)) {
          const text = await file.text();
          const trimmed = text.replace(/\s+/g, ' ').slice(0, 30000);
          const blob = new Blob([trimmed], { type: 'text/plain' });
          output.push({ name: `${base}_compressed.txt`, blob });
        }

        else {
          showToast(`Unsupported format: ${file.name}`, 'warning');
        }
      } catch {
        showToast(`Failed to compress ${file.name}`, 'error');
      }
    }

    setCompressedFiles(output);
    showToast(`Compressed ${output.length} file(s)`, 'success');
  };

  const downloadZip = async () => {
    const JSZip = (await import('jszip')).default;
    const { saveAs } = await import('file-saver');
    const zip = new JSZip();

    compressedFiles.forEach(({ name, blob }) => zip.file(name, blob));
    const zipped = await zip.generateAsync({ type: 'blob' });
    saveAs(zipped, 'compressed_files.zip');
  };

  return (
    <FileToolsLayout title="🗜️ Compress Files">
      <DropZone
        multiple
        accept=".pdf,.png,.jpg,.jpeg,.txt,.epub"
        onMultipleFiles={compressFiles}
      />

      {/* 📘 SEO Guidance Block */}
      <div style={{ marginTop: '30px', fontSize: '0.95rem', lineHeight: '1.6', color: '#444' }}>
        <h2 style={{ fontSize: '1.2rem' }}>Compress PDFs, Images, and Text Files Instantly</h2>
        <p>
          Optimize your documents, images, and plain text files for faster sharing and smaller storage.
          This browser-based tool safely reduces file size without server uploads.
        </p>
        <ul style={{ paddingLeft: '20px' }}>
          <li>🗜️ PDF optimization using <strong>pdf-lib</strong></li>
          <li>🖼️ Resize and compress PNG/JPG images with Canvas API</li>
          <li>📄 Trim and flatten text or EPUB files</li>
          <li>📦 Export compressed batch as a single ZIP</li>
          <li>🔒 All processing is 100% local and private</li>
        </ul>
      </div>

      {compressedFiles.length > 0 && (
        <>
          <div style={{ marginTop: '30px', display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {compressedFiles.map(({ name, blob }, i) => {
              const url = URL.createObjectURL(blob);
              return (
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
              );
            })}
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