import React, { useState, useRef } from 'react';
import FileToolsLayout from '../FileToolsLayout';
import DropZone from '../DropZone';
import Toast from '../../Toast';

export default function PhotoEditor() {
  const [file, setFile] = useState(null);
  const [editedURL, setEditedURL] = useState('');
  const [toast, setToast] = useState(null);
  const [textOverlay, setTextOverlay] = useState('');
  const [filter, setFilter] = useState('none');
  const imgRef = useRef(null);

  const showToast = (msg, type = 'info') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleEdit = () => {
    if (!imgRef.current) return showToast('Image not loaded yet.', 'error');

    const img = imgRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');

    ctx.filter = filter;
    ctx.drawImage(img, 0, 0);

    if (textOverlay) {
      ctx.font = '40px sans-serif';
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      ctx.textAlign = 'center';
      ctx.fillText(textOverlay, canvas.width / 2, canvas.height - 40);
      ctx.strokeText(textOverlay, canvas.width / 2, canvas.height - 40);
    }

    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      setEditedURL(url);
      showToast('Image edited successfully!', 'success');
    }, 'image/png');
  };

  const handleDrop = (f) => {
    setEditedURL('');
    setFile(f);
  };

  return (
    <FileToolsLayout title="🎨 Photo Editor">
      <DropZone accept="image/*" onDrop={handleDrop} />

      {/* 📘 Guidance Block */}
      <div style={{ marginTop: '30px', fontSize: '0.95rem', lineHeight: '1.6', color: '#444' }}>
        <h2 style={{ fontSize: '1.2rem' }}>Edit Images Visually — Filters, Text & Effects</h2>
        <p>
          Apply simple effects to your images using built-in filters and text overlays. Perfect for quick social media touches, memes, and downloads — browser-based only.
        </p>
        <ul style={{ paddingLeft: '20px' }}>
          <li>🌈 Choose a visual filter: grayscale, sepia, blur, or brightness</li>
          <li>📝 Add custom captions with styled text overlays</li>
          <li>🔒 Instant preview and export — no data leaves your device</li>
        </ul>
      </div>

      {file && (
        <>
          <div style={{ marginTop: '30px', textAlign: 'center' }}>
            <img
              src={URL.createObjectURL(file)}
              alt="Editable preview"
              ref={imgRef}
              style={{
                maxWidth: '100%',
                filter,
                border: '1px solid #ccc',
                padding: '10px',
                background: '#fafafa'
              }}
              crossOrigin="anonymous"
            />
          </div>

          <div style={{ marginTop: '20px' }}>
            <label>
              Filter:{' '}
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                style={{ padding: '6px 10px' }}
              >
                <option value="none">None</option>
                <option value="grayscale(100%)">Grayscale</option>
                <option value="sepia(100%)">Sepia</option>
                <option value="blur(3px)">Blur</option>
                <option value="brightness(1.5)">Brightness</option>
                <option value="contrast(1.5)">Contrast</option>
              </select>
            </label>
          </div>

          <div style={{ marginTop: '10px' }}>
            <label>
              Caption Text:{' '}
              <input
                type="text"
                value={textOverlay}
                onChange={(e) => setTextOverlay(e.target.value)}
                placeholder="Add a caption"
                style={{ width: '100%', padding: '8px', marginTop: '4px' }}
              />
            </label>
          </div>

          <button
            onClick={handleEdit}
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
            Apply Edits
          </button>
        </>
      )}

      {editedURL && (
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <img src={editedURL} alt="Edited preview" style={{ maxWidth: '100%' }} />
          <a href={editedURL} download="edited.png">
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
              ⬇ Download Edited Image
            </button>
          </a>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </FileToolsLayout>
  );
}