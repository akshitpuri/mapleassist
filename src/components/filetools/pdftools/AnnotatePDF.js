import React, { useState, useRef, useEffect } from 'react';
import FileToolsLayout from '../FileToolsLayout';
import DropZone from '../DropZone';

import Toast from '../../Toast';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker.entry';

export default function AnnotatePDF() {
  const [file, setFile] = useState(null);
  const [toast, setToast] = useState(null);
  const [result, setResult] = useState([]);
  const canvasRef = useRef(null);
  const pdfCanvasRef = useRef(null);
  const drawing = useRef(false);
  const paths = useRef([]);

  const showToast = (msg, type = 'info') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    if (!file) return;
    renderPDF(file);
  }, [file]);

  const renderPDF = async (pdfFile) => {
    const bytes = await pdfFile.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 1.5 });

    const pdfCanvas = pdfCanvasRef.current;
    const ctx = pdfCanvas.getContext('2d');
    pdfCanvas.width = viewport.width;
    pdfCanvas.height = viewport.height;
    await page.render({ canvasContext: ctx, viewport }).promise;

    const overlay = canvasRef.current;
    overlay.width = viewport.width;
    overlay.height = viewport.height;
  };

  const handleMouseDown = (e) => {
    drawing.current = true;
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    paths.current.push([{ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }]);
  };

  const handleMouseMove = (e) => {
    if (!drawing.current) return;
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.strokeStyle = '#ff0000';
    ctx.lineWidth = 2;
    ctx.stroke();
    paths.current[paths.current.length - 1].push({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  };

  const handleMouseUp = () => {
    drawing.current = false;
  };

  const exportAnnotatedPDF = async () => {
    if (!file) return showToast('Upload a PDF first', 'error');
    const { PDFDocument } = await import('pdf-lib');
    const bytes = await file.arrayBuffer();
    const doc = await PDFDocument.load(bytes);
    const page = doc.getPages()[0];

    const canvas = canvasRef.current;
    const png = canvas.toDataURL('image/png');
    const pngImage = await doc.embedPng(png);
    const { width, height } = page.getSize();
    page.drawImage(pngImage, {
      x: 0,
      y: 0,
      width,
      height
    });

    const finalBytes = await doc.save();
    const blob = new Blob([finalBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    setResult([{ name: `${file.name.replace('.pdf', '')}_annotated.pdf`, url, blob }]);
    showToast('Annotation saved!', 'success');
  };

  return (
    <FileToolsLayout title="✏️ Annotate PDF" showBackButton>
   
      <DropZone multiple={false} accept=".pdf" onMultipleFiles={(files) => setFile(files[0])} />

      <div style={{ marginTop: '20px', position: 'relative' }}>
        <canvas ref={pdfCanvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }} />
        <canvas
          ref={canvasRef}
          style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />
      </div>

      <button
        onClick={exportAnnotatedPDF}
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
        Export Annotated PDF
      </button>

      {/* 🔍 SEO-enhanced guidance block */}
      <div style={{ marginTop: '30px', fontSize: '0.95rem', lineHeight: '1.6', color: '#444' }}>
        <h2 style={{ fontSize: '1.2rem' }}>Draw Annotations on PDF in Browser</h2>
        <p>
          Use your mouse or stylus to draw directly on top of your PDF — perfect for signing, sketching, or marking up documents.
          This tool runs entirely offline using <strong>pdf-lib</strong> and <strong>pdfjs-dist</strong>, keeping your files private.
        </p>
        <ul style={{ paddingLeft: '20px' }}>
          <li>✏️ Freehand pen tool for quick markup</li>
          <li>📄 Works with scanned forms, contracts, and notes</li>
          <li>🔐 No upload — 100% client-side</li>
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