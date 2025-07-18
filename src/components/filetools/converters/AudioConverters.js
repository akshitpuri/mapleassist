import React, { useState } from 'react';
import FileToolsLayout from '../FileToolsLayout';
import DropZone from '../DropZone';
import Toast from '../../Toast';

export default function AudioConverters() {
  const [convertedFiles, setConvertedFiles] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'info') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleFiles = async (incoming) => {
    setConvertedFiles([]);
    const converted = [];

    for (const file of incoming) {
      try {
        const url = URL.createObjectURL(file);
        const mediaEl = document.createElement(file.type.startsWith('video/') ? 'video' : 'audio');
        mediaEl.src = url;
        mediaEl.crossOrigin = 'anonymous';
        mediaEl.muted = true;

        const context = new AudioContext();
        const source = context.createMediaElementSource(mediaEl);
        const dest = context.createMediaStreamDestination();
        source.connect(context.destination);
        source.connect(dest);

        const recorder = new MediaRecorder(dest.stream);
        const chunks = [];

        recorder.ondataavailable = (e) => chunks.push(e.data);
        recorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'audio/wav' });
          const outputURL = URL.createObjectURL(blob);
          const name = `${file.name.split('.')[0]}.wav`;
          converted.push({ name, url: outputURL, blob });

          if (converted.length === incoming.length) {
            setConvertedFiles(converted);
            showToast(`Converted ${converted.length} file(s) to .wav`, 'success');
          }
        };

        mediaEl.oncanplaythrough = () => {
          recorder.start();
          mediaEl.play();
          setTimeout(() => {
            recorder.stop();
            mediaEl.pause();
            context.close();
          }, Math.min(mediaEl.duration * 1000, 15000));
        };

        document.body.appendChild(mediaEl);
        mediaEl.load();
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
    saveAs(zipped, 'converted_audio.zip');
  };

  return (
    <FileToolsLayout title="🎧 Audio Converter">
      <DropZone
        multiple
        accept=".mp3,.wav,.ogg,.mp4"
        onMultipleFiles={handleFiles}
      />

      {/* 📘 SEO Guidance Block */}
      <div style={{ marginTop: '30px', fontSize: '0.95rem', lineHeight: '1.6', color: '#444' }}>
        <h2 style={{ fontSize: '1.2rem' }}>Convert MP3, OGG, MP4 to WAV in Your Browser</h2>
        <p>
          Instantly convert common audio and video formats into WAV files using a secure,
          browser-based tool. Perfect for music trimming, podcast prep, or audio extraction —
          no upload required.
        </p>
        <ul style={{ paddingLeft: '20px' }}>
          <li>🔄 Converts MP3, WAV, OGG, MP4 to WAV format</li>
          <li>🎙️ Works with both audio and video inputs</li>
          <li>📦 Repackage converted audio into ZIP for download</li>
          <li>🔒 100% private — processes offline using Web APIs</li>
        </ul>
      </div>

      {convertedFiles.length > 0 && (
        <>
          <div style={{ marginTop: '30px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {convertedFiles.map(({ name, url }, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.9rem' }}>{name}</p>
                <audio controls src={url} style={{ width: '180px' }} />
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