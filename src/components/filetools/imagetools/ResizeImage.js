import React, { useState } from 'react';
import FileToolsLayout from '../FileToolsLayout';
import DropZone from '../DropZone';
import Toast from '../../Toast';

export default function ResizeImage() {
  const [file, setFile] = useState(null);
  const [resizedURL, setResizedURL] = useState('');
  const [toast, setToast] = useState(null);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [scale, setScale] = useState('');

  const showToast = (msg, type = 'info') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleResize = () => {
    if (!file) return showToast('Upload an image to resize.', 'error');

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;

      img.onload = () => {
        let newWidth = img.width;
        let newHeight = img.height;

        if (scale) {
          const factor = parseFloat(scale) / 100;
          newWidth = img.width * factor;
          newHeight = img.height * factor;
        } else if (width || height) {
          newWidth = width ? parseInt(width) : img.width;
          newHeight = height ? parseInt(height) : img.height;
        }

        const canvas = document.createElement('canvas');
        canvas.width = newWidth;
        canvas.height = newHeight;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          setResizedURL(url);
          showToast('Image resized successfully!', 'success');
        }, 'image/png');
      };
    };

    reader.readAsDataURL(file);
  };

  return (
    <FileToolsLayout title="📏 Resize Image">
      <DropZone accept="image/*" onDrop={(f) => setFile(f)} />

      {/* 📘 Guidance Block */}
      <div style={{ marginTop: '30px', fontSize: '0.95rem', lineHeight: '1.6', color: '#444' }}>
        <h2 style={{ fontSize: '1.2rem' }}>Resize JPG, PNG, SVG, GIF Images</h2>
        <p>
          Instantly resize your images by pixel dimensions or percentage scaling — perfect for optimizing resolution, layout, or performance. No backend required.
        </p>
        <ul style={{ paddingLeft: '20px' }}>
          <li>📐 Define exact width and height manually</li>
          <li>🔁 Scale proportionally using percent</li>
          <li>🔒 Secure and private — browser-based resizing only</li>
        </ul>
      </div>

      {file && (
        <>
          <div style={{ marginTop: '20px' }}>
            <label>
              Width (px):{' '}
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                style={{ marginRight: '10px' }}
              />
            </label>
            <label>
              Height (px):{' '}
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                style={{ marginRight: '10px' }}
              />
            </label>
          </div>

          <div style={{ marginTop: '10px' }}>
            <label>
              Or resize by % scale:{' '}
              <input
                type="number"
                value={scale}
                onChange={(e) => setScale(e.target.value)}
                placeholder="e.g. 50 for 50%"
              />
            </label>
          </div>

          <button
            onClick={handleResize}
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
            Resize Image
          </button>
        </>
      )}

      {resizedURL && (
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <img src={resizedURL} alt="Resized preview" style={{ maxWidth: '100%' }} />
          <a href={resizedURL} download="resized.png">
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
              ⬇ Download Resized Image
            </button>
          </a>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </FileToolsLayout>
  );
}