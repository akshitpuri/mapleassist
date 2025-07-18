import React, { useState } from 'react';
import FileToolsLayout from '../FileToolsLayout';
import Toast from '../../Toast';
import html2canvas from 'html2canvas';

export default function HTMLtoImage() {
  const [htmlContent, setHtmlContent] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'info') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const captureHTML = async () => {
    if (!htmlContent.trim()) return showToast('Enter some HTML to capture.', 'error');

    const container = document.createElement('div');
    container.innerHTML = htmlContent;
    container.style.position = 'fixed';
    container.style.left = '-9999px';
    container.style.width = '600px';
    container.style.padding = '20px';
    document.body.appendChild(container);

    try {
      const canvas = await html2canvas(container);
      const url = canvas.toDataURL('image/png');
      setImageURL(url);
      showToast('HTML captured successfully!', 'success');
    } catch (err) {
      showToast('Failed to capture HTML.', 'error');
    } finally {
      document.body.removeChild(container);
    }
  };

  return (
    <FileToolsLayout title="🌐 HTML to Image">
      {/* 📘 Guidance Block */}
      <div style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#444', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.2rem' }}>Convert HTML Snippets to Images Instantly</h2>
        <p>
          Paste your HTML, styles, or UI code snippet and generate a PNG image preview — useful for
          screenshots, UI sharing, or thumbnails.
        </p>
        <ul style={{ paddingLeft: '20px' }}>
          <li>📦 Works with basic HTML and inline CSS</li>
          <li>🔒 Private and offline — powered by <strong>html2canvas</strong></li>
        </ul>
      </div>

      <label>
        HTML Content:
        <textarea
          value={htmlContent}
          onChange={(e) => setHtmlContent(e.target.value)}
          placeholder="<div style='color:red'>Hello world</div>"
          rows={6}
          style={{
            width: '100%',
            marginTop: '10px',
            padding: '12px',
            fontFamily: 'monospace',
            fontSize: '0.95rem',
            border: '1px solid #ccc',
            borderRadius: '6px'
          }}
        />
      </label>

      <button
        onClick={captureHTML}
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
        Convert HTML to Image
      </button>

      {imageURL && (
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <img src={imageURL} alt="HTML to Image preview" style={{ maxWidth: '100%' }} />
          <a href={imageURL} download="html-image.png">
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
              ⬇ Download Image
            </button>
          </a>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </FileToolsLayout>
  );
}