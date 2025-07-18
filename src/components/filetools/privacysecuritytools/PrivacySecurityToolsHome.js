import React from 'react';
import { Link } from 'react-router-dom';
import FileToolsLayout from '../FileToolsLayout';

const privacyTools = [
  { name: 'Password Generator', path: '/privacy-security-tools/password-generator', icon: '🔑' },
  { name: 'Strength Checker', path: '/privacy-security-tools/strength-checker', icon: '💪' },
  { name: 'URL Encoder/Decoder', path: '/privacy-security-tools/url-encoder', icon: '🔗' },
  { name: 'Hash Generator', path: '/privacy-security-tools/hash-generator', icon: '🧬' },
  { name: 'QR Code Generator', path: '/privacy-security-tools/qr-generator', icon: '📷' }
];

export default function PrivacySecurityToolsHome() {
  return (
    <FileToolsLayout title="🔐 Privacy & Security Tools" showBackButton={true}>
      <div style={grid}>
        {privacyTools.map((tool, i) => (
          <Link key={i} to={tool.path} style={card}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={icon}>{tool.icon}</div>
            <div style={label}>{tool.name}</div>
          </Link>
        ))}
      </div>
    </FileToolsLayout>
  );
}

const grid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '20px',
  marginTop: '20px'
};

const card = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#fdfdfd',
  padding: '22px',
  borderRadius: '10px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  textDecoration: 'none',
  color: '#333',
  transition: 'transform 0.2s ease'
};

const icon = { fontSize: '2rem', marginBottom: '10px' };
const label = { fontWeight: 600, textAlign: 'center' };