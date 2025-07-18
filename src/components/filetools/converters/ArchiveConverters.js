import React, { useState } from 'react';
import FileToolsLayout from '../FileToolsLayout';
import DropZone from '../DropZone';
import Toast from '../../Toast';

export default function ArchiveConverters() {
  const [archives, setArchives] = useState([]);
  const [extractedFiles, setExtractedFiles] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const extractZip = async (file) => {
    try {
      const JSZip = (await import('jszip')).default;
      const buffer = await file.arrayBuffer();
      const zip = await JSZip.loadAsync(buffer);
      const baseName = file.name.replace(/\.[^/.]+$/, '');
      const output = [];

      for (const [filename, entry] of Object.entries(zip.files)) {
        if (!entry.dir) {
          const blob = await entry.async('blob');
          const url = URL.createObjectURL(blob);
          output.push({ name: `${baseName}_${filename}`, url, blob });
        }
      }

      return output;
    } catch {
      showToast(`Failed to extract ${file.name}`, 'error');
      return [];
    }
  };

  const handleArchives = async (files) => {
    setArchives(files);
    setExtractedFiles([]);

    const allExtracted = [];

    for (const file of files) {
      const ext = file.name.split('.').pop().toLowerCase();
      if (ext !== 'zip') {
        showToast(`.${ext} extraction not supported frontend-only`, 'warning');
        continue;
      }

      const extracted = await extractZip(file);
      allExtracted.push(...extracted);
    }

    setExtractedFiles(allExtracted);
    showToast(`Extracted ${allExtracted.length} file(s)`, 'success');
  };

  const downloadZip = async () => {
    const JSZip = (await import('jszip')).default;
    const { saveAs } = await import('file-saver');
    const zip = new JSZip();

    extractedFiles.forEach(({ name, blob }) => zip.file(name, blob));
    const zipped = await zip.generateAsync({ type: 'blob' });
    saveAs(zipped, 'extracted_contents.zip');
  };

  return (
    <FileToolsLayout title="🗄️ Archive Converter">
      <DropZone multiple accept=".zip" onMultipleFiles={handleArchives} />

      {/* 📘 SEO Guidance Block */}
      <div style={{ marginTop: '30px', fontSize: '0.95rem', lineHeight: '1.6', color: '#444' }}>
        <h2 style={{ fontSize: '1.2rem' }}>Extract ZIP Archives in Your Browser</h2>
        <p>
          Upload ZIP files and extract their contents instantly using a secure, frontend-only tool.
          No server uploads required — ideal for quick file previews, downloads, and packaging.
        </p>
        <ul style={{ paddingLeft: '20px' }}>
          <li>📦 Supports ZIP archive extraction directly in the browser</li>
          <li>📄 Preview and download individual files</li>
          <li>🧃 Repackage contents into a single ZIP for download</li>
          <li>🔒 Fully private — no data leaves your device</li>
        </ul>
      </div>

      {extractedFiles.length > 0 && (
        <>
          <div style={{ marginTop: 30, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {extractedFiles.map(({ name, url }, i) => (
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
              marginTop: 30,
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