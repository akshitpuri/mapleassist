import React, { useState } from 'react';
import FileToolsLayout from '../FileToolsLayout';
import DropZone from '../DropZone';
import Toast from '../../Toast';

export default function CompressGIF() {
  const [gifFile, setGifFile] = useState(null);
  const [compressedURL, setCompressedURL] = useState('');
  const [quality, setQuality] = useState(10);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'info') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCompress = async () => {
    if (!gifFile) return showToast('Please upload a GIF file.', 'error');

    const { default: GIF } = await import('gif.js.optimized');
    const arrayBuffer = await gifFile.arrayBuffer();
    const blobURL = URL.createObjectURL(new Blob([arrayBuffer]));

    const img = new Image();
    img.src = blobURL;
    await new Promise(res => (img.onload = res));

    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const gif = new GIF({
      workers: 2,
      quality,
      workerScript: '/gif.worker.js'
    });

    gif.addFrame(canvas, { delay: 500 });

    gif.on('finished', (blob) => {
      const url = URL.createObjectURL(blob);
      setCompressedURL(url);
      showToast('GIF compressed successfully!', 'success');
    });

    gif.render();
  };

  return (
    <FileToolsLayout title="📉 Compress GIF">
      <DropZone
        accept=".gif"
        multiple={false}
        onSingleFile={(f) => {
          setGifFile(f);
          setCompressedURL('');
        }}
      />

      {/* 📘 SEO Guidance Block */}
      <div style={{ marginTop: 30, fontSize: '0.95rem', lineHeight: '1.6', color: '#444' }}>
        <h2 style={{ fontSize: '1.2rem' }}>Compress Animated GIFs in Your Browser</h2>
        <p>
          Shrink the file size of your animated GIFs for faster loading and easier sharing. Ideal for social media,
          blogs, and performance-sensitive use cases. Powered by <strong>gif.js.optimized</strong>.
        </p>
        <ul style={{ paddingLeft: 20 }}>
          <li>📉 Reduce GIF size using compression quality slider</li>
          <li>⏱️ Preserve animation — output stays animated</li>
          <li>⬇ Download compressed GIF directly</li>
          <li>🔒 All processing happens locally in your browser</li>
        </ul>
      </div>

      {gifFile && (
        <div style={{ marginTop: 20 }}>
          <label>
            Compression Quality (1–30):{' '}
            <input
              type="number"
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              min={1}
              max={30}
              style={{ marginLeft: '10px', padding: '6px' }}
            />
          </label>
          <button
            onClick={handleCompress}
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
            Compress GIF
          </button>
        </div>
      )}

      {compressedURL && (
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <img src={compressedURL} alt="Compressed GIF preview" style={{ maxWidth: '100%' }} />
          <a href={compressedURL} download="compressed.gif">
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
              ⬇ Download Compressed GIF
            </button>
          </a>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </FileToolsLayout>
  );
}