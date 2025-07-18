import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { QRCodeSVG } from 'qrcode.react'; // ✅ Correct named export
import FileToolsLayout from '../FileToolsLayout';

export default function QRCodeGenerator() {
  const [text, setText] = useState('');

  return (
    <FileToolsLayout title="📷 QR Code Generator">
      <Helmet>
        <title>QR Code Generator | MapleAssist</title>
        <meta name="description" content="Generate QR codes instantly for URLs, text, phone numbers, or any data." />
        <meta name="keywords" content="qr generator, qr code, url qr, contact qr, mapleassist, scan tools" />
      </Helmet>

      <h2 style={heading}>Create a QR Code</h2>
      <p style={description}>
        Generate custom QR codes for website links, contact info, event details or plain text. Ideal for printed materials, digital posters, or quick sharing.
      </p>

      <input
        type="text"
        placeholder="Enter text or link to encode..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={input}
      />

      {text && (
        <div style={qrWrapper}>
          <QRCodeSVG value={text} size={160} />
        </div>
      )}
    </FileToolsLayout>
  );
}

const heading = { fontSize: '1.2rem', marginBottom: '12px' };
const description = { fontSize: '0.95rem', lineHeight: '1.6', color: '#555', marginBottom: '20px' };
const input = {
  width: '100%',
  padding: '10px',
  fontSize: '1rem',
  borderRadius: '6px',
  border: '1px solid #ccc',
  marginBottom: '20px'
};
const qrWrapper = { textAlign: 'center', marginTop: '10px' };