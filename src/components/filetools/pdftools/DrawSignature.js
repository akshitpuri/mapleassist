// components/filetools/pdftools/DrawSignature.js
import React, { useState, useRef } from 'react';
import FileToolsLayout from '../FileToolsLayout';
import DropZone from '../DropZone';
import Toast from '../../Toast';
import BackButton from '../../BackButton';

export default function DrawSignature() {
  const [pdfFile, setPdfFile] = useState(null);
  const [result, setResult] = useState([]);
  const [toast, setToast] = useState(null);
  const canvasRef = useRef(null);
  const drawing = useRef(false);

  const showToast = (msg, type = 'info') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const startDraw = (e) => {
    drawing.current = true;
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const draw = (e) => {
    if (!drawing.current) return;
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const endDraw = () => {
    drawing.current = false;
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const applySignature = async () => {
    if (!pdfFile) return showToast('Upload a PDF first', 'error');
    const { PDFDocument } = await import('pdf-lib');
    const pdfBytes = await pdfFile.arrayBuffer();
    const doc = await PDFDocument.load(pdfBytes);
    const page = doc.getPages()[0];
    const { width } = page.getSize();

    const png = canvasRef.current.toDataURL('image/png');
    const signatureImage = await doc.embedPng(png);

    page.drawImage(signatureImage, {
      x: width - 180,
      y: 50,
      width: 150,
      height: 60
    });

    const final = await doc.save();
    const blob = new Blob([final], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    setResult([{ name: `${pdfFile.name.replace('.pdf', '')}_signed.pdf`, url, blob }]);
    showToast('Signature applied!', 'success');
  };

  return (
    <FileToolsLayout title="🖋️ Draw Signature on PDF" showBackButton>
     
      <DropZone multiple={false} accept=".pdf" onMultipleFiles={(files) => setPdfFile(files[0])} />

      <h3 style={{ marginTop: '30px' }}>✏️ Draw your signature below:</h3>
      <canvas
        ref={canvasRef}
        width={300}
        height={100}
        style={{
          border: '1px solid #ccc',
          borderRadius: '6px',
          marginTop: '10px',
          cursor: 'crosshair'
        }}
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={endDraw}
        onMouseLeave={endDraw}
      />

      <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
        <button onClick={clearSignature} style={{
          padding: '8px 14px',
          backgroundColor: '#e53935',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
          Clear Signature
        </button>
        <button onClick={applySignature} style={{
          padding: '8px 14px',
          backgroundColor: '#3f51b5',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
          Apply to PDF
        </button>
      </div>

      {/* 🔍 SEO guidance block */}
      <div style={{ marginTop: '30px', color: '#444', fontSize: '0.95rem', lineHeight: '1.6' }}>
        <h2 style={{ fontSize: '1.2rem' }}>Draw and Embed Signatures on PDF</h2>
        <p>
          Use your mouse or stylus to sketch a signature and embed it into the first page of your PDF. This runs entirely in your browser using <strong>pdf-lib</strong>.
        </p>
        <ul style={{ paddingLeft: '20px' }}>
          <li>🖋️ Simple sketch pad for handwritten signature</li>
          <li>📄 Automatically placed at bottom-right of page</li>
          <li>🔐 Secure & offline — no file ever leaves your device</li>
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