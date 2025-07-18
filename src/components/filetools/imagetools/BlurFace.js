import React, { useState, useEffect } from 'react';
import FileToolsLayout from '../FileToolsLayout';
import DropZone from '../DropZone';
import Toast from '../../Toast';
import * as faceapi from 'face-api.js';

export default function BlurFace() {
  const [file, setFile] = useState(null);
  const [outputURL, setOutputURL] = useState('');
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'info') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    // Load models once
    const loadModels = async () => {
      const MODEL_URL = '/models'; // Place models in public/models
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    };
    loadModels();
  }, []);

  const blurFaces = async () => {
    if (!file) return showToast('Upload an image to blur faces.', 'error');

    const reader = new FileReader();
    reader.onload = async () => {
      const img = new Image();
      img.src = reader.result;
      await img.decode();

      const detections = await faceapi.detectAllFaces(img, new faceapi.TinyFaceDetectorOptions());

      if (!detections.length) {
        showToast('No faces detected.', 'warning');
        return;
      }

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      ctx.filter = 'blur(12px)';
      detections.forEach(({ box }) => {
        const { x, y, width, height } = box;
        ctx.drawImage(canvas, x, y, width, height, x, y, width, height);
      });

      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        setOutputURL(url);
        showToast(`Blurred ${detections.length} face(s)`, 'success');
      }, 'image/png');
    };

    reader.readAsDataURL(file);
  };

  return (
    <FileToolsLayout title="🙈 Blur Face">
      <DropZone accept="image/*" onDrop={(f) => setFile(f)} />

      {/* 📘 Guidance Block */}
      <div style={{ marginTop: '30px', fontSize: '0.95rem', lineHeight: '1.6', color: '#444' }}>
        <h2 style={{ fontSize: '1.2rem' }}>Blur Detected Faces for Privacy</h2>
        <p>
          This tool uses <strong>face-api.js</strong> to detect faces and automatically blur them
          using a canvas overlay. Ideal for screenshots, shared images, and anonymized content.
        </p>
        <ul style={{ paddingLeft: '20px' }}>
          <li>🔍 Detect faces with TinyFaceDetector</li>
          <li>🧠 Blur using image sampling — no uploads or servers</li>
          <li>🔒 Keeps people private and compliant</li>
        </ul>
      </div>

      {file && (
        <button
          onClick={blurFaces}
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
          Blur Faces
        </button>
      )}

      {outputURL && (
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <img src={outputURL} alt="Blurred preview" style={{ maxWidth: '100%' }} />
          <a href={outputURL} download="blurred.png">
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
              ⬇ Download Blurred Image
            </button>
          </a>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </FileToolsLayout>
  );
}