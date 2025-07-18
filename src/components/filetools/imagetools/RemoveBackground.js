import React, { useState } from 'react';
import FileToolsLayout from '../FileToolsLayout';
import DropZone from '../DropZone';
import Toast from '../../Toast';

export default function RemoveBackground() {
  const [file, setFile] = useState(null);
  const [outputURL, setOutputURL] = useState('');
  const [threshold, setThreshold] = useState(250); // brightness threshold
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'info') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const removeBg = () => {
    if (!file) return showToast('Upload an image first.', 'error');

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const { data } = imageData;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const brightness = (r + g + b) / 3;
          if (brightness > threshold) {
            data[i + 3] = 0; // make pixel transparent
          }
        }

        ctx.putImageData(imageData, 0, 0);
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          setOutputURL(url);
          showToast('Background removed (approximate)', 'success');
        }, 'image/png');
      };
    };

    reader.readAsDataURL(file);
  };

  return (
    <FileToolsLayout title="🧹 Remove Background">
      <DropZone accept="image/*" onDrop={(f) => setFile(f)} />

      {/* 📘 Guidance Block */}
      <div style={{ marginTop: '30px', fontSize: '0.95rem', lineHeight: '1.6', color: '#444' }}>
        <h2 style={{ fontSize: '1.2rem' }}>Remove Simple Backgrounds</h2>
        <p>
          This browser-based tool uses brightness thresholding to eliminate light-colored
          backgrounds. Ideal for simple shapes, logos, and quick cutouts. For advanced AI removal,
          backend models are needed.
        </p>
        <ul style={{ paddingLeft: '20px' }}>
          <li>⚡ No upload required — runs offline</li>
          <li>🎯 Works best on light, solid backgrounds</li>
          <li>🧠 Adjust brightness threshold manually</li>
        </ul>
      </div>

      {file && (
        <>
          <div style={{ marginTop: '20px' }}>
            <label>
              Brightness Threshold ({threshold}):{' '}
              <input
                type="range"
                min="0"
                max="255"
                value={threshold}
                onChange={(e) => setThreshold(parseInt(e.target.value))}
                style={{ width: '100%' }}
              />
            </label>
          </div>

          <button
            onClick={removeBg}
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
            Remove Background
          </button>
        </>
      )}

      {outputURL && (
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <img src={outputURL} alt="Background removed" style={{ maxWidth: '100%' }} />
          <a href={outputURL} download="removed-bg.png">
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
              ⬇ Download Image
            </button>
          </a>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </FileToolsLayout>
  );
}