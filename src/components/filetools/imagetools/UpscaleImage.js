import React, { useState } from 'react';
import FileToolsLayout from '../FileToolsLayout';
import DropZone from '../DropZone';
import Toast from '../../Toast';

export default function UpscaleImage() {
  const [file, setFile] = useState(null);
  const [scaleFactor, setScaleFactor] = useState(2); // Default 2x
  const [upscaledURL, setUpscaledURL] = useState('');
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'info') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleUpscale = () => {
    if (!file) return showToast('Upload an image to upscale.', 'error');

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;

      img.onload = () => {
        const newWidth = img.width * scaleFactor;
        const newHeight = img.height * scaleFactor;

        const canvas = document.createElement('canvas');
        canvas.width = newWidth;
        canvas.height = newHeight;

        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          setUpscaledURL(url);
          showToast(`Image upscaled to ${scaleFactor}× resolution!`, 'success');
        }, 'image/png');
      };
    };

    reader.readAsDataURL(file);
  };

  return (
    <FileToolsLayout title="🔍 Upscale Image">
      <DropZone accept="image/*" onDrop={(f) => setFile(f)} />

      {/* 📘 Guidance Block */}
      <div style={{ marginTop: '30px', fontSize: '0.95rem', lineHeight: '1.6', color: '#444' }}>
        <h2 style={{ fontSize: '1.2rem' }}>Increase Image Resolution in One Click</h2>
        <p>
          Enlarge JPG and PNG files right in your browser — ideal for thumbnails, banners, or pixel-perfect exports.
        </p>
        <ul style={{ paddingLeft: '20px' }}>
          <li>📏 Resize up to 4× original dimensions</li>
          <li>🧠 Uses smart canvas smoothing to reduce pixelation</li>
          <li>🔒 Local and private — no server involved</li>
        </ul>
      </div>

      {file && (
        <>
          <div style={{ marginTop: '20px' }}>
            <label>
              Scale Factor:{' '}
              <select
                value={scaleFactor}
                onChange={(e) => setScaleFactor(parseInt(e.target.value))}
                style={{ padding: '6px 10px' }}
              >
                <option value={2}>2×</option>
                <option value={3}>3×</option>
                <option value={4}>4×</option>
              </select>
            </label>
          </div>

          <button
            onClick={handleUpscale}
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
            Upscale Image
          </button>
        </>
      )}

      {upscaledURL && (
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <img src={upscaledURL} alt="Upscaled preview" style={{ maxWidth: '100%' }} />
          <a href={upscaledURL} download="upscaled.png">
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
              ⬇ Download Upscaled Image
            </button>
          </a>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </FileToolsLayout>
  );
}