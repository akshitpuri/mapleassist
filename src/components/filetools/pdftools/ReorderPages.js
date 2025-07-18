import React, { useState } from 'react';
import FileToolsLayout from '../FileToolsLayout';
import DropZone from '../DropZone';

import Toast from '../../Toast';
import SortableList from 'react-sortablejs';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker.entry';

export default function ReorderPages() {
  const [files, setFiles] = useState([]);
  const [pages, setPages] = useState([]);
  const [orderedIds, setOrderedIds] = useState([]);
  const [result, setResult] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'info') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadPDF = async (incoming = []) => {
    if (!incoming.length) return showToast('No file received', 'error');
    const file = incoming[0];
    const bytes = await file.arrayBuffer();

    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
    const doc = await pdfjsLib.getDocument({ data: bytes }).promise;

    const pageMeta = [];
    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i);
      const viewport = page.getViewport({ scale: 0.3 });
      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
      const thumb = canvas.toDataURL();
      pageMeta.push({ id: `page-${i}`, label: `Page ${i}`, thumbnail: thumb });
    }

    setPages(pageMeta);
    setOrderedIds(pageMeta.map(p => p.id));
    setFiles([file]);
    setResult([]);
  };

  const reorderPDF = async () => {
    if (!files.length || !orderedIds.length) return showToast('Nothing to reorder', 'error');
    const { PDFDocument } = await import('pdf-lib');
    const file = files[0];
    const bytes = await file.arrayBuffer();
    const original = await PDFDocument.load(bytes);
    const newDoc = await PDFDocument.create();

    const indices = orderedIds.map(id => parseInt(id.split('-')[1]) - 1);
    const copied = await newDoc.copyPages(original, indices);
    copied.forEach(p => newDoc.addPage(p));

    const final = await newDoc.save();
    const blob = new Blob([final], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    setResult([{ name: `${file.name.replace('.pdf', '')}_reordered.pdf`, url, blob }]);
    showToast('PDF pages reordered!', 'success');
  };

  return (
    <FileToolsLayout title="🧾 Reorder PDF Pages" showBackButton>
      
      <DropZone multiple={false} accept=".pdf" onMultipleFiles={loadPDF} />

      {orderedIds.length > 0 && (
        <>
          <h3 style={{ marginTop: '30px', fontWeight: 500, color: '#333' }}>
            🧾 Drag pages below to reorder:
          </h3>

          <SortableList
            tag="div"
            options={{ animation: 150 }}
            onChange={(order) => setOrderedIds(order)}
          >
            {orderedIds.map((id) => {
              const page = pages.find(p => p.id === id);
              return (
                <div
                  key={id}
                  data-id={id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px',
                    marginBottom: '10px',
                    backgroundColor: '#fff',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                    cursor: 'grab',
                    userSelect: 'none'
                  }}
                >
                  <img src={page.thumbnail} alt={page.label} style={{ width: '80px', borderRadius: '4px' }} />
                  <span style={{ fontWeight: 500 }}>{page.label}</span>
                </div>
              );
            })}
          </SortableList>

          <button
            onClick={reorderPDF}
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
            Reorder & Export PDF
          </button>
        </>
      )}

      {/* 🔍 SEO guidance block */}
      <div style={{ marginTop: '30px', color: '#444', fontSize: '0.95rem', lineHeight: '1.6' }}>
        <h2 style={{ fontSize: '1.2rem' }}>Reorder PDF Pages Securely in Your Browser</h2>
        <p>
          Drag and rearrange PDF pages below — preview each as a thumbnail — and export a properly ordered version.
          Runs 100% offline using <strong>pdf-lib</strong> and <strong>pdfjs-dist</strong>, so your files never leave your device.
        </p>
        <ul style={{ paddingLeft: '20px' }}>
          <li>📄 Restructure mixed scans, templates, or forms</li>
          <li>🎯 Real-time drag feedback with page previews</li>
          <li>🔐 No uploads — fully private and secure</li>
        </ul>
      </div>

      {result.length > 0 && (
        <div style={{ marginTop: '30px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
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