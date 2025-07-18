import React, { useState } from 'react';
import FileToolsLayout from '../FileToolsLayout';
import DropZone from '../DropZone';
import Toast from '../../Toast';

export default function VideoConverters() {
  const [convertedFiles, setConvertedFiles] = useState([]);
  const [format, setFormat] = useState('webm');
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'info') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleConvert = async (incoming) => {
    setConvertedFiles([]);
    const converted = [];

    for (const file of incoming) {
      try {
        const blobURL = URL.createObjectURL(file);
        const videoEl = document.createElement('video');
        videoEl.src = blobURL;
        videoEl.muted = true;

        const canvas = document.createElement('canvas');
        canvas.width = 480;
        canvas.height = 270;
        const ctx = canvas.getContext('2d');

        const outputStream = canvas.captureStream();
        const mime = format === 'gif' ? 'video/webm' : `video/${format}`;
        const recorder = new MediaRecorder(outputStream, { mimeType: mime });
        const chunks = [];

        recorder.ondataavailable = (e) => chunks.push(e.data);
        recorder.onstop = () => {
          const outBlob = new Blob(chunks, { type: mime });
          const outUrl = URL.createObjectURL(outBlob);
          const name = `${file.name.split('.')[0]}.${format}`;
          converted.push({ name, url: outUrl, blob: outBlob });

          if (converted.length === incoming.length) {
            setConvertedFiles(converted);
            showToast(`Converted ${converted.length} video(s)`, 'success');
          }
        };

        videoEl.oncanplaythrough = () => {
          recorder.start();
          videoEl.play();

          const drawFrame = () => {
            ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
            if (!videoEl.paused && !videoEl.ended) requestAnimationFrame(drawFrame);
          };

          drawFrame();

          setTimeout(() => {
            recorder.stop();
            videoEl.pause();
          }, Math.min(videoEl.duration * 1000, 15000));
        };

        document.body.appendChild(videoEl);
        videoEl.load();
      } catch {
        showToast(`Error converting ${file.name}`, 'error');
      }
    }
  };

  const downloadZip = async () => {
    const JSZip = (await import('jszip')).default;
    const { saveAs } = await import('file-saver');
    const zip = new JSZip();

    convertedFiles.forEach(({ name, blob }) => zip.file(name, blob));
    const zipped = await zip.generateAsync({ type: 'blob' });
    saveAs(zipped, 'converted_videos.zip');
  };

  return (
    <FileToolsLayout title="🎞️ Video Converter">
      <DropZone
        multiple
        accept=".mp4,.webm,.ogg,.mov"
        onMultipleFiles={handleConvert}
      />

      {/* 📘 SEO Guidance Block */}
      <div style={{ marginTop: '30px', fontSize: '0.95rem', lineHeight: '1.6', color: '#444' }}>
        <h2 style={{ fontSize: '1.2rem' }}>Convert MP4, WebM, OGG, MOV Videos in Your Browser</h2>
        <p>
          Instantly convert video files to WebM, MP4, or GIF formats with no upload required.
          This offline tool captures your video content in the browser and exports it for download.
          Perfect for reels, memes, demos, or compressed shareable clips.
        </p>
        <ul style={{ paddingLeft: '20px' }}>
          <li>🎥 Accepts MP4, WebM, OGG, MOV formats</li>
          <li>🔁 Convert to WebM, MP4, or animated GIF</li>
          <li>📦 Bundle all converted videos into one ZIP</li>
          <li>🔒 100% private — never leaves your device</li>
        </ul>
      </div>

      <div style={{ marginTop: '20px', display: 'flex', gap: '12px', alignItems: 'center' }}>
        <label>Convert to:</label>
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          style={{ padding: '8px' }}
        >
          <option value="webm">WebM (.webm)</option>
          <option value="mp4">MP4 (.mp4)</option>
          <option value="gif">GIF (.gif)</option>
        </select>
      </div>

      {convertedFiles.length > 0 && (
        <>
          <div style={{ marginTop: '30px', display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {convertedFiles.map(({ name, url }, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.9rem' }}>{name}</p>
                <video src={url} controls style={{ width: '200px' }} />
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

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </FileToolsLayout>
  );
}