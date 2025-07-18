import React, { useState } from 'react';
import FileToolsLayout from '../FileToolsLayout';
import DropZone from '../DropZone';
import Toast from '../../Toast';

export default function ExtractGIFFrames() {
  const [gifFile, setGifFile] = useState(null);
  const [frames, setFrames] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'info') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const extractFrames = async () => {
    if (!gifFile) return showToast('Please upload a GIF file.', 'error');

    try {
      const { default: gifFrames } = await import('gif-frames');
      const buffer = await gifFile.arrayBuffer();
      const result = await gifFrames({ url: buffer, type: 'png', frames: 'all' });

      const extracted = await Promise.all(
        result.map(async (f, i) => {
          const blob = await new Promise(res => f.getImage().pipe(blobStream => {
            const chunks = [];
            blobStream.on('data', chunk => chunks.push(chunk));
            blobStream.on('end', () => res(new Blob(chunks, { type: 'image/png' })));
          }));
          const url = URL.createObjectURL(blob);
          return { name: `frame_${i + 1}.png`, blob, url };
        })
      );

      setFrames(extracted);
      showToast(`Extracted ${extracted.length} frame(s)`, 'success');
    } catch {
      showToast('Failed to extract frames', 'error');
    }
  };

  const downloadZip = async () => {
    const JSZip = (await import('jszip')).default;
    const { saveAs } = await import('file-saver');
    const zip = new JSZip();

    frames.forEach(({ name, blob }) => zip.file(name, blob));
    const zipped = await zip.generateAsync({ type: 'blob' });
    saveAs(zipped, 'gif_frames.zip');
  };

  return (
    <FileToolsLayout title="🎬 Extract GIF Frames">
      <DropZone
        accept=".gif"
        multiple={false}
        onSingleFile={(f) => {
          setGifFile(f);
          setFrames([]);
        }}
      />

      {/* 📘 SEO Guidance Block */}
      <div style={{ marginTop: 30, fontSize: '0.95rem', lineHeight: '1.6', color: '#444' }}>
        <h2 style={{ fontSize: '1.2rem' }}>Break Down GIFs into Individual Frames</h2>
        <p>
          Extract all frames from animated GIFs directly in your browser. Perfect for editing,
          remixing, thumbnail generation, or creating memes from any moment.
        </p>
        <ul style={{ paddingLeft: 20 }}>
          <li>🎬 View and download each frame as a PNG</li>
          <li>📦 Save all frames into a ZIP archive</li>
          <li>⚡ Powered by <strong>gif-frames</strong> for precision slicing</li>
          <li>🔒 No server upload — fully browser-based</li>
        </ul>
      </div>

      {gifFile && (
        <button
          onClick={extractFrames}
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
          Extract Frames
        </button>
      )}

      {frames.length > 0 && (
        <>
          <div style={{ marginTop: '30px', display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {frames.map(({ name, url }, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.9rem' }}>{name}</p>
                <img src={url} alt={`Frame ${i + 1}`} style={{ width: '150px' }} />
                <a href={url} download={name}>
                  <button style={{
                    marginTop: '8px',
                    padding: '6px 12px',
                    backgroundColor: '#4caf50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}>
                    Download
                  </button>
                </a>
              </div>
            ))}
          </div>

          <button
            onClick={downloadZip}
            style={{
              marginTop: '30px',
              padding: '10px 16px',
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            ⬇ Download All as ZIP
          </button>
        </>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </FileToolsLayout>
  );
}