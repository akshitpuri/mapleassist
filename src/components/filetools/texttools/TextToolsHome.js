import React from 'react';
import { Link } from 'react-router-dom';
import FileToolsLayout from '../FileToolsLayout';

const textTools = [
  { name: 'Text Case Converter', path: '/text-tools/case-converter', icon: '🔠' },
  { name: 'Word & Character Counter', path: '/text-tools/counter', icon: '🔢' },
  { name: 'Lorem Ipsum Generator', path: '/text-tools/lorem-ipsum', icon: '📄' }
];

export default function TextToolsHome() {
  return (
    <FileToolsLayout title="🧠 Text & Writing Tools" showBackButton={true}>
      <div style={grid}>
        {textTools.map((tool, i) => (
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