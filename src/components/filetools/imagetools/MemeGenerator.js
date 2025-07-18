import React, { useState } from 'react';
import FileToolsLayout from '../FileToolsLayout';
import DropZone from '../DropZone';
import Toast from '../../Toast';

export default function MemeGenerator() {
  const [file, setFile] = useState(null);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [memeURL, setMemeURL] = useState('');
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'info') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const generateMeme = () => {
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
        ctx.font = `${Math.floor(canvas.width / 12)}px Impact`;
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.textAlign = 'center';

        if (topText) {
          ctx.fillText(topText.toUpperCase(), canvas.width / 2, Math.floor(canvas.height * 0.1));
          ctx.strokeText(topText.toUpperCase(), canvas.width / 2, Math.floor(canvas.height * 0.1));
        }

        if (bottomText) {
          ctx.fillText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 20);
          ctx.strokeText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 20);
        }

        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          setMemeURL(url);
          showToast('Meme generated successfully!', 'success');
        }, 'image/png');
      };
    };

    reader.readAsDataURL(file);
  };

  return (
    <FileToolsLayout title="😆 Meme Generator">
      <DropZone accept="image/*" onDrop={(f) => setFile(f)} />

      {/* 📘 Guidance Block */}
      <div style={{ marginTop: '30px', fontSize: '0.95rem', lineHeight: '1.6', color: '#444' }}>
        <h2 style={{ fontSize: '1.2rem' }}>Create Your Own Memes Instantly</h2>
        <p>
          Add bold top and bottom captions to any image and export as a PNG meme. Everything is
          handled offline — browser-based and snappy.
        </p>
        <ul style={{ paddingLeft: '20px' }}>
          <li>🔠 Bold white text with black outline</li>
          <li>📸 Preview and download meme instantly</li>
          <li>🔒 Private meme creation — no uploads involved</li>
        </ul>
      </div>

      {file && (
        <>
          <div style={{ marginTop: '20px' }}>
            <label>
              Top Text:{' '}
              <input
                type="text"
                value={topText}
                onChange={(e) => setTopText(e.target.value)}
                placeholder="e.g. When code compiles"
                style={{ width: '100%', padding: '8px', marginTop: '4px' }}
              />
            </label>
          </div>

          <div style={{ marginTop: '10px' }}>
            <label>
              Bottom Text:{' '}
              <input
                type="text"
                value={bottomText}
                onChange={(e) => setBottomText(e.target.value)}
                placeholder="...but fails tests"
                style={{ width: '100%', padding: '8px', marginTop: '4px' }}
              />
            </label>
          </div>

          <button
            onClick={generateMeme}
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
            Generate Meme
          </button>
        </>
      )}

      {memeURL && (
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <img src={memeURL} alt="Meme preview" style={{ maxWidth: '100%' }} />
          <a href={memeURL} download="meme.png">
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
              ⬇ Download Meme
            </button>
          </a>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </FileToolsLayout>
  );
}