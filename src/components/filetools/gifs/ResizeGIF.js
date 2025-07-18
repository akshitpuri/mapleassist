import React, { useState } from 'react';
import FileToolsLayout from '../FileToolsLayout';
import DropZone from '../DropZone';
import Toast from '../../Toast';

export default function ResizeGIF() {
  const [gifFile, setGifFile] = useState(null);
  const [resizedURL, setResizedURL] = useState('');
  const [scale, setScale] = useState(0.7);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'info') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleResize = async () => {
    if (!gifFile) return showToast('Please upload a GIF file.', 'error');

    const { default: GIF } = await import('gif.js.optimized');
    const arrayBuffer = await gifFile.arrayBuffer();
    const blobURL = URL.createObjectURL(new Blob([arrayBuffer]));

    const img = new Image();
    img.src = blobURL;
    await new Promise(res => (img.onload = res));

    const canvas = document.createElement('canvas');
    canvas.width = img.width * scale;
    canvas.height = img.height * scale;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const gif = new GIF({
      workers: 2,
      quality: 10,
      workerScript: '/gif.worker.js',
    });

    gif.addFrame(canvas, { delay: 500 });

    gif.on('finished', (blob) => {
      const url = URL.createObjectURL(blob);
      setResizedURL(url);
      showToast('GIF resized successfully!', 'success');
    });

    gif.render();
  };

  return (
    <FileToolsLayout title="📐 Resize GIF">
      <DropZone
        accept=".gif"
        multiple={false}
        onSingleFile={(f) => {
          setGifFile(f);
          setResizedURL('');
        }}
      />

      {/* 📘 SEO Guidance */}
      <div style={{ marginTop: 30, fontSize: '0.95rem', lineHeight: '1.6', color: '#444' }}>
        <h2 style={{ fontSize: '1.2rem' }}>Resize Animated GIFs Instantly</h2>
        <p>
          Shrink or scale animated GIFs directly in your browser — great for thumbnails, memes, and performance
          tuning. Powered by <strong>gif.js</strong>, this tool resizes offline with no upload required.
        </p>
        <ul style={{ paddingLeft: 20 }}>
          <li>📐 Scale down GIFs for blog posts and previews</li>
          <li>⚙️ Adjustable resize factor from 10% to 100%</li>
          <li>⬇ Output GIF is downloadable with reduced resolution</li>
          <li>🔒 Fully private — everything runs client-side</li>
        </ul>
      </div>

      {gifFile && (
        <div style={{ marginTop: 20 }}>
          <label>
            Scale (%):
            <input
              type="number"
              value={Math.round(scale * 100)}
              onChange={(e) => setScale(Number(e.target.value) / 100)}
              style={{ marginLeft: '10px', padding: '6px' }}
              min={10}
              max={100}
            />
          </label>
          <button
            onClick={handleResize}
            style={{
              marginTop: 20,
              padding: '10px 16px',
              backgroundColor: '#3f51b5',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Resize GIF
          </button>
        </div>
      )}

      {resizedURL && (
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <img src={resizedURL} alt="Resized GIF preview" style={{ maxWidth: '100%' }} />
          <a href={resizedURL} download="resized.gif">
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
              ⬇ Download Resized GIF
            </button>
          </a>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </FileToolsLayout>
  );
}