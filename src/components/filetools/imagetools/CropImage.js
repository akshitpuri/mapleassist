import React, { useState, useRef } from 'react';
import FileToolsLayout from '../FileToolsLayout';
import DropZone from '../DropZone';
import Toast from '../../Toast';

export default function CropImage() {
  const [file, setFile] = useState(null);
  const [sourceURL, setSourceURL] = useState('');
  const [croppedURL, setCroppedURL] = useState('');
  const [toast, setToast] = useState(null);
  const imgRef = useRef(null);

  const [crop, setCrop] = useState({ x: 0, y: 0, width: 200, height: 200 });

  const showToast = (msg, type = 'info') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCrop = () => {
    if (!imgRef.current) return showToast('Image not loaded yet.', 'error');

    const canvas = document.createElement('canvas');
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      imgRef.current,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      0,
      0,
      crop.width,
      crop.height
    );

    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      setCroppedURL(url);
      showToast('Image cropped successfully!', 'success');
    }, 'image/png');
  };

  const handleDrop = (f) => {
    setFile(f);
    setCroppedURL('');
    const reader = new FileReader();
    reader.onload = () => setSourceURL(reader.result);
    reader.readAsDataURL(f);
  };

  return (
    <FileToolsLayout title="✂️ Crop Image">
      <DropZone accept="image/*" onDrop={handleDrop} />

      {/* 📘 Guidance Block */}
      <div style={{ marginTop: '30px', fontSize: '0.95rem', lineHeight: '1.6', color: '#444' }}>
        <h2 style={{ fontSize: '1.2rem' }}>Crop JPG, PNG or GIF Images</h2>
        <p>
          Define your crop area using pixel coordinates or visual preview. This lightweight tool
          uses the canvas API for instant browser-side cropping.
        </p>
        <ul style={{ paddingLeft: '20px' }}>
          <li>📐 Input pixel values for x, y, width, and height</li>
          <li>🔎 Real-time crop preview available</li>
          <li>🔒 Private — no uploads or server processing</li>
        </ul>
      </div>

      {sourceURL && (
        <>
          <div style={{ marginTop: '30px', textAlign: 'center' }}>
            <img
              ref={imgRef}
              src={sourceURL}
              alt="Original"
              style={{
                maxWidth: '100%',
                border: '1px solid #ccc',
                padding: '10px',
                background: '#fafafa'
              }}
            />
          </div>

          <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <label>
              X:{' '}
              <input
                type="number"
                value={crop.x}
                onChange={(e) => setCrop({ ...crop, x: parseInt(e.target.value) })}
              />
            </label>
            <label>
              Y:{' '}
              <input
                type="number"
                value={crop.y}
                onChange={(e) => setCrop({ ...crop, y: parseInt(e.target.value) })}
              />
            </label>
            <label>
              Width:{' '}
              <input
                type="number"
                value={crop.width}
                onChange={(e) => setCrop({ ...crop, width: parseInt(e.target.value) })}
              />
            </label>
            <label>
              Height:{' '}
              <input
                type="number"
                value={crop.height}
                onChange={(e) => setCrop({ ...crop, height: parseInt(e.target.value) })}
              />
            </label>
          </div>

          <button
            onClick={handleCrop}
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
            Crop Image
          </button>
        </>
      )}

      {croppedURL && (
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <img src={croppedURL} alt="Cropped preview" style={{ maxWidth: '100%' }} />
          <a href={croppedURL} download="cropped.png">
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
              ⬇ Download Cropped Image
            </button>
          </a>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </FileToolsLayout>
  );
}