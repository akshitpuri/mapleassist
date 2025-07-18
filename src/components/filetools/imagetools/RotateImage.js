import React, { useState } from 'react';
import FileToolsLayout from '../FileToolsLayout';
import DropZone from '../DropZone';
import Toast from '../../Toast';

export default function RotateImage() {
  const [file, setFile] = useState(null);
  const [rotation, setRotation] = useState(90);
  const [outputURL, setOutputURL] = useState('');
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'info') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleRotate = () => {
    if (!file) return showToast('Upload an image first.', 'error');

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const degrees = rotation % 360;
        const radians = (degrees * Math.PI) / 180;

        if (degrees === 90 || degrees === 270) {
          canvas.width = img.height;
          canvas.height = img.width;
        } else {
          canvas.width = img.width;
          canvas.height = img.height;
        }

        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(radians);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);

        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          setOutputURL(url);
          showToast(`Image rotated ${degrees}°`, 'success');
        }, 'image/png');
      };
    };

    reader.readAsDataURL(file);
  };

  return (
    <FileToolsLayout title="🔄 Rotate Image">
      <DropZone accept="image/*" onDrop={(f) => setFile(f)} />

      {/* 📘 Guidance Block */}
      <div style={{ marginTop: '30px', fontSize: '0.95rem', lineHeight: '1.6', color: '#444' }}>
        <h2 style={{ fontSize: '1.2rem' }}>Rotate JPG, PNG, or GIF Files Instantly</h2>
        <p>
          Select rotation angle to rotate your image. Works best for landscape ↔ portrait switching
          or correcting sideways uploads. All done offline in your browser.
        </p>
        <ul style={{ paddingLeft: '20px' }}>
          <li>↩️ Rotate image clockwise by 90°, 180°, or 270°</li>
          <li>🖼️ Preview and download rotated file immediately</li>
          <li>🔒 Private image processing — zero uploads</li>
        </ul>
      </div>

      {file && (
        <>
          <div style={{ marginTop: '20px' }}>
            <label>
              Rotation Angle:{' '}
              <select
                value={rotation}
                onChange={(e) => setRotation(parseInt(e.target.value))}
                style={{ padding: '6px 10px', fontSize: '0.95rem' }}
              >
                <option value={90}>90°</option>
                <option value={180}>180°</option>
                <option value={270}>270°</option>
              </select>
            </label>
          </div>

          <button
            onClick={handleRotate}
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
            Rotate Image
          </button>
        </>
      )}

      {outputURL && (
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <img src={outputURL} alt="Rotated preview" style={{ maxWidth: '100%' }} />
          <a href={outputURL} download="rotated.png">
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
              ⬇ Download Rotated Image
            </button>
          </a>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </FileToolsLayout>
  );
}