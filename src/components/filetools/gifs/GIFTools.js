import React from 'react';
import { Link } from 'react-router-dom';
import FileToolsLayout from '../FileToolsLayout';

const gifTools = [
  {
    name: '🖼️ Create GIF from Images',
    description: 'Upload multiple images and generate an animated GIF instantly.',
    icon: '🖼️',
    path: '/filetools/gifs/create'
  },
  {
    name: '📐 Resize GIF',
    description: 'Adjust dimensions of any GIF file without loss of animation.',
    icon: '📐',
    path: '/filetools/gifs/resize'
  },
  {
    name: '📉 Compress GIF',
    description: 'Reduce file size of GIFs for faster load times and sharing.',
    icon: '📉',
    path: '/filetools/gifs/compress'
  },
  {
    name: '🎬 Extract GIF Frames',
    description: 'Break animated GIFs into individual frames for editing or download.',
    icon: '🎬',
    path: '/filetools/gifs/extract'
  }
];

export default function GIFTools() {
  return (
    <FileToolsLayout title="🎞️ GIF Tools" showBackButton={true}>
     
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          marginTop: '20px'
        }}
      >
        {gifTools.map(({ name, path, icon }, i) => (
          <Link
            key={i}
            to={path}
            style={{
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
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{icon}</div>
            <div style={{ fontWeight: 600, textAlign: 'center' }}>{name}</div>
          </Link>
        ))}
      </div>
    </FileToolsLayout>
  );
}
