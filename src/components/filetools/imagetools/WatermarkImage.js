import React, { useState } from 'react';
import FileToolsLayout from '../FileToolsLayout';
import DropZone from '../DropZone';
import Toast from '../../Toast';

export default function WatermarkImage() {
  const [file, setFile] = useState(null);
  const [outputURL, setOutputURL] = useState('');
  const [text, setText] = useState('Watermark');
  const [opacity, setOpacity] = useState(0.5);
  const [position, setPosition] = useState('bottom-right');
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'info') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const applyWatermark = () => {
    if (!file) return showToast('Upload an image first.', 'error');

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

        ctx.globalAlpha = opacity;
        ctx.font = '24px sans-serif';
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;

        const padding = 20;
        let x = padding, y = canvas.height - padding;

        if (position === 'top-left') {
          x = padding;
          y = 30;
        } else if (position === 'top-right') {
          x = canvas.width - padding * 6;
          y = 30;
        } else if (position === 'bottom-right') {
          x = canvas.width - padding * 6;
          y = canvas.height - padding;
        }

        ctx.fillText(text, x, y);
        ctx.strokeText(text, x, y);

        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          setOutputURL(url);
          showToast('Watermark applied successfully!', 'success');
        }, 'image/png');
      };
    };

    reader.readAsDataURL(file);
  };

  return (
    <FileToolsLayout title="🚰 Watermark Image">
      <DropZone accept="image/*" onDrop={(f) => setFile(f)} />

      {/* 📘 Guidance Block */}
      <div style={{ marginTop: '30px', fontSize: '0.95rem', lineHeight: '1.6', color: '#444' }}>
        <h2 style={{ fontSize: '1.2rem' }}>Stamp Images with Custom Watermark</h2>
        <p>
          Add branded or copyright text to any image using flexible watermark settings. Control
          opacity, position, and style — works fully in-browser.
        </p>
        <ul style={{ paddingLeft: '20px' }}>
          <li>💬 Customize watermark text</li>
          <li>🔘 Position watermark in any corner</li>
          <li>🔒 No upload — private and secure</li>
        </ul>
      </div>

      {file && (
        <>
          <div style={{ marginTop: '20px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <label>
              Text:{' '}
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Watermark text"
              />
            </label>

            <label>
              Opacity ({opacity}):{' '}
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={opacity}
                onChange={(e) => setOpacity(parseFloat(e.target.value))}
              />
            </label>

            <label>
              Position:{' '}
              <select value={position} onChange={(e) => setPosition(e.target.value)}>
                <option value="bottom-right">Bottom Right</option>
                <option value="bottom-left">Bottom Left</option>
                <option value="top-left">Top Left</option>
                <option value="top-right">Top Right</option>
              </select>
            </label>
          </div>

          <button
            onClick={applyWatermark}
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
            Apply Watermark
          </button>
        </>
      )}

      {outputURL && (
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <img src={outputURL} alt="Watermarked preview" style={{ maxWidth: '100%' }} />
          <a href={outputURL} download="watermarked.png">
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
              ⬇ Download Watermarked Image
            </button>
          </a>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </FileToolsLayout>
  );
}