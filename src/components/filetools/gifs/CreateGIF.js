import React, { useState } from 'react';
import FileToolsLayout from '../FileToolsLayout';
import DropZone from '../DropZone';
import Toast from '../../Toast';

export default function CreateGIF() {
  const [images, setImages] = useState([]);
  const [gifURL, setGifURL] = useState('');
  const [duration, setDuration] = useState(500);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'info') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const createGIF = async () => {
    if (images.length === 0) return showToast('Upload images first.', 'error');

    const { GIF } = await import('gif.js.optimized');

    const gif = new GIF({
      workers: 2,
      quality: 10,
      workerScript: '/gif.worker.js',
    });

    for (const file of images) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      await new Promise((res) => (img.onload = res));
      gif.addFrame(img, { delay: duration });
    }

    gif.on('finished', (blob) => {
      const url = URL.createObjectURL(blob);
      setGifURL(url);
      showToast('GIF created successfully!', 'success');
    });

    gif.render();
  };

  return (
    <FileToolsLayout title="🖼️ Create GIF from Images">
      <DropZone multiple accept="image/*" onMultipleFiles={setImages} />

      {/* 📘 SEO Guidance */}
      <div style={{ marginTop: 30, fontSize: '0.95rem', lineHeight: '1.6', color: '#444' }}>
        <h2 style={{ fontSize: '1.2rem' }}>Create Animated GIFs in Your Browser</h2>
        <p>
          Upload multiple images to generate a GIF instantly — great for memes, previews, tutorials,
          and stories. This tool uses <strong>gif.js</strong> to handle image sequencing offline.
        </p>
        <ul style={{ paddingLeft: 20 }}>
          <li>🖼️ Supports JPG, PNG, and WebP inputs</li>
          <li>⏱️ Adjustable frame delay for animation speed</li>
          <li>📦 Export GIF directly and download</li>
          <li>🔒 Runs completely offline — private and secure</li>
        </ul>
      </div>

      {images.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <label>
            Frame Duration (ms):{' '}
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              style={{ padding: '6px', marginLeft: '8px' }}
            />
          </label>
          <button
            onClick={createGIF}
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
            Create GIF
          </button>
        </div>
      )}

      {gifURL && (
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <img src={gifURL} alt="GIF preview" style={{ maxWidth: '100%' }} />
          <a href={gifURL} download="animated.gif">
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
              ⬇ Download GIF
            </button>
          </a>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </FileToolsLayout>
  );
}