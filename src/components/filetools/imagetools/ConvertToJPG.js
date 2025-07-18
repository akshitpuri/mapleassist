import React, { useState } from 'react';
import FileToolsLayout from '../FileToolsLayout';
import DropZone from '../DropZone';
import Toast from '../../Toast';

export default function ConvertToJPG() {
  const [file, setFile] = useState(null);
  const [convertedURL, setConvertedURL] = useState('');
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'info') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleConvert = () => {
    if (!file) return showToast('Please upload an image file.', 'error');

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#fff'; // White background for JPG
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          setConvertedURL(url);
          showToast('Image converted to JPG!', 'success');
        }, 'image/jpeg');
      };
    };
    reader.readAsDataURL(file);
  };

  return (
    <FileToolsLayout title="🖼️ Convert to JPG">
      <DropZone accept="image/*" onDrop={(f) => setFile(f)} />

      {/* 📘 Guidance Block */}
      <div style={{ marginTop: '30px', fontSize: '0.95rem', lineHeight: '1.6', color: '#444' }}>
        <h2 style={{ fontSize: '1.2rem' }}>Convert Any Image Format to JPG Instantly</h2>
        <p>
          Turn PNG, GIF, WEBP, SVG and other formats into universal JPGs with one click.
          Perfect for blog posts, uploads, and size reduction — fully browser-based.
        </p>
        <ul style={{ paddingLeft: '20px' }}>
          <li>🔄 Convert transparent PNGs into solid-background JPGs</li>
          <li>📷 Ideal for email, documents, and websites</li>
          <li>🔒 Offline and private — no server uploads</li>
        </ul>
      </div>

      {file && (
        <button
          onClick={handleConvert}
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
          Convert to JPG
        </button>
      )}

      {convertedURL && (
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <img src={convertedURL} alt="Converted preview" style={{ maxWidth: '100%' }} />
          <a href={convertedURL} download="converted.jpg">
            <button
              style={{
                marginTop: '10px',
                padding: '10px 16px',
                backgroundColor: '#4caf50',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              ⬇ Download JPG Image
            </button>
          </a>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </FileToolsLayout>
  );
}