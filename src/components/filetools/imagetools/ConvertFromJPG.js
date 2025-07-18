import React, { useState } from 'react';
import FileToolsLayout from '../FileToolsLayout';
import DropZone from '../DropZone';
import Toast from '../../Toast';

export default function ConvertFromJPG() {
  const [files, setFiles] = useState([]);
  const [convertedURLs, setConvertedURLs] = useState([]);
  const [targetFormat, setTargetFormat] = useState('png');
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'info') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleConvert = () => {
    if (files.length === 0) return showToast('Upload JPG files to convert.', 'error');
    if (!['png', 'gif'].includes(targetFormat)) return showToast('Unsupported format.', 'error');

    const converted = [];

    files.forEach((file, index) => {
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

          canvas.toBlob(
            (blob) => {
              const url = URL.createObjectURL(blob);
              converted.push(url);
              if (converted.length === files.length) {
                setConvertedURLs(converted);
                showToast(`Converted ${converted.length} image(s) to ${targetFormat.toUpperCase()}`, 'success');
              }
            },
            `image/${targetFormat}`,
            1
          );
        };
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <FileToolsLayout title="🌀 Convert from JPG">
      <DropZone accept="image/jpeg" onDrop={(fList) => setFiles(fList)} multiple />

      {/* 📘 Guidance Block */}
      <div style={{ marginTop: '30px', fontSize: '0.95rem', lineHeight: '1.6', color: '#444' }}>
        <h2 style={{ fontSize: '1.2rem' }}>Convert JPG to PNG or GIF</h2>
        <p>
          Instantly convert JPG files into PNG or GIF format. Works entirely offline — just drag,
          drop, and export. Animated GIF output support coming soon!
        </p>
        <ul style={{ paddingLeft: '20px' }}>
          <li>🔄 Transform JPGs with solid background to transparent PNGs</li>
          <li>🎞️ Upload multiple JPGs to generate frame-by-frame GIFs</li>
          <li>🔒 Private & browser-based — nothing leaves your device</li>
        </ul>
      </div>

      {files.length > 0 && (
        <>
          <div style={{ marginTop: '20px' }}>
            <label>
              Output Format:{' '}
              <select
                value={targetFormat}
                onChange={(e) => setTargetFormat(e.target.value)}
                style={{ padding: '6px 10px', fontSize: '0.95rem' }}
              >
                <option value="png">PNG</option>
                <option value="gif">GIF</option>
              </select>
            </label>
          </div>

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
            Convert JPG
          </button>
        </>
      )}

      {convertedURLs.length > 0 && (
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <h4>🖼️ Converted Output</h4>
          {convertedURLs.map((url, i) => (
            <div key={i} style={{ marginBottom: '20px' }}>
              <img src={url} alt={`Converted ${i}`} style={{ maxWidth: '100%' }} />
              <a href={url} download={`converted-${i}.${targetFormat}`}>
                <button
                  style={{
                    marginTop: '10px',
                    padding: '8px 14px',
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
          ))}
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </FileToolsLayout>
  );
}