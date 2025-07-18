import React, { useState } from 'react';
import FileToolsLayout from '../FileToolsLayout';
import DropZone from '../DropZone';
import Toast from '../../Toast';

export default function CompressImage() {
  const [file, setFile] = useState(null);
  const [compressedURL, setCompressedURL] = useState('');
  const [quality, setQuality] = useState(0.7); // JPEG compression (0 to 1)
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'info') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCompress = () => {
    if (!file) return showToast('Upload an image to compress.', 'error');

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          setCompressedURL(url);
          showToast('Image compressed successfully!', 'success');
        }, 'image/jpeg', quality);
      };
    };

    reader.readAsDataURL(file);
  };

  return (
    <FileToolsLayout title="📉 Compress Image">
      <DropZone accept="image/*" onDrop={(f) => setFile(f)} />

      {/* 📘 Guidance Block */}
      <div style={{ marginTop: '30px', fontSize: '0.95rem', lineHeight: '1.6', color: '#444' }}>
        <h2 style={{ fontSize: '1.2rem' }}>Compress JPG, PNG, SVG, GIF Easily</h2>
        <p>
          Reduce image file sizes with browser-based compression. Adjust JPEG quality manually and save space without sacrificing visuals — ideal for uploads, web optimization, and faster sharing.
        </p>
        <ul style={{ paddingLeft: '20px' }}>
          <li>🖼️ Compress images directly in your browser</li>
          <li>📦 Ideal for web apps, portfolios, and uploads</li>
          <li>🔒 Offline and private — uses HTML5 canvas API</li>
        </ul>
      </div>

      {/* 🔧 Quality Control & Action */}
      {file && (
        <>
          <div style={{ marginTop: '20px' }}>
            <label>
              JPEG Quality: {quality}
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                style={{ width: '100%' }}
              />
            </label>
          </div>

          <button
            onClick={handleCompress}
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
            Compress Image
          </button>
        </>
      )}

      {compressedURL && (
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <img src={compressedURL} alt="Compressed Preview" style={{ maxWidth: '100%' }} />
          <a href={compressedURL} download="compressed.jpg">
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
              ⬇ Download Compressed Image
            </button>
          </a>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </FileToolsLayout>
  );
}