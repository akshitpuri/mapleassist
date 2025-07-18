import React, { useState } from 'react';
import FileToolsLayout from '../FileToolsLayout';
import DropZone from '../DropZone';
import Toast from '../../Toast';

export default function OCRTools() {
  const [images, setImages] = useState([]);
  const [results, setResults] = useState([]);
  const [format, setFormat] = useState('txt');
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'info') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const convertImages = async (incoming) => {
    setImages(incoming);
    setResults([]);
    const Tesseract = (await import('tesseract.js')).default;
    const output = [];

    for (const img of incoming) {
      try {
        const { data } = await Tesseract.recognize(img, 'eng', { logger: m => console.log(m) });
        const text = data.text.trim();
        const base = img.name.split('.')[0];

        let blob, url;
        if (format === 'txt') {
          blob = new Blob([text], { type: 'text/plain' });
          url = URL.createObjectURL(blob);
        } else if (format === 'pdf') {
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
          blob = new Blob([pdfBytes], { type: 'application/pdf' });
          url = URL.createObjectURL(blob);
        }

        output.push({ name: `${base}.${format}`, url, blob, preview: URL.createObjectURL(img) });
      } catch {
        showToast(`Failed to scan ${img.name}`, 'error');
      }
    }

    setResults(output);
    showToast(`Extracted text from ${output.length} image(s)`, 'success');
  };

  const downloadZip = async () => {
    const JSZip = (await import('jszip')).default;
    const { saveAs } = await import('file-saver');

    const zip = new JSZip();
    results.forEach(({ name, blob }) => zip.file(name, blob));
    const zipped = await zip.generateAsync({ type: 'blob' });
    saveAs(zipped, 'ocr_results.zip');
  };

  return (
    <FileToolsLayout title="🔍 OCR Tool">
   
      <DropZone multiple accept="image/*" onMultipleFiles={convertImages} />

      <div style={{ marginTop: '20px', display: 'flex', gap: '14px', alignItems: 'center' }}>
        <label>Export as:</label>
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          style={{ padding: '8px' }}
        >
          <option value="txt">Text (.txt)</option>
          <option value="pdf">PDF (.pdf)</option>
        </select>
      </div>

      {/* SEO-enhanced block */}
      <div style={{ marginTop: '30px', color: '#444', fontSize: '0.95rem', lineHeight: '1.6' }}>
        <h2 style={{ fontSize: '1.2rem' }}>Extract Text from Images with OCR</h2>
        <p>
          Upload scanned documents or screenshots and convert them into editable text or PDF using Optical Character Recognition.
          All processing happens securely in-browser via <strong>tesseract.js</strong>.
        </p>
        <ul style={{ paddingLeft: '20px' }}>
          <li>🧠 Detect printed or handwritten English text</li>
          <li>📄 Export extracted content to text or PDF</li>
          <li>🔐 100% client-side — no upload, full privacy</li>
        </ul>
      </div>

      {results.length > 0 && (
        <>
          <div style={{ marginTop: '30px', display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {results.map(({ name, url, preview }, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                {preview && <img src={preview} alt={name} style={{ width: '140px', borderRadius: '6px', marginBottom: '10px' }} />}
                <p style={{ fontSize: '0.9rem' }}>{name}</p>
                <a href={url} download={name}>
                  <button style={{
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

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </FileToolsLayout>
  );
}