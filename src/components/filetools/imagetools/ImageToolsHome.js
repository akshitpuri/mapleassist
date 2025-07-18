import React from 'react';
import { Link } from 'react-router-dom';
import FileToolsLayout from '../FileToolsLayout';

const imageTools = [
  {
    name: 'Compress Image',
    path: '/filetools/imagetools/compress',
    description: 'Compress JPG, PNG, SVG, and GIFs while preserving quality.',
    icon: '🗜️'
  },
  {
    name: 'Resize Image',
    path: '/filetools/imagetools/resize',
    description: 'Resize images by pixel or percent with live preview.',
    icon: '📏'
  },
  {
    name: 'Crop Image',
    path: '/filetools/imagetools/crop',
    description: 'Crop images manually or by coordinates using canvas.',
    icon: '✂️'
  },
  {
    name: 'Convert to JPG',
    path: '/filetools/imagetools/convert-to-jpg',
    description: 'Convert formats like PNG, GIF, WEBP and more to JPG.',
    icon: '🖼️'
  },
  {
    name: 'Convert from JPG',
    path: '/filetools/imagetools/convert-from-jpg',
    description: 'Turn JPG into PNG or animated GIFs.',
    icon: '🌀'
  },
  {
    name: 'Photo Editor',
    path: '/filetools/imagetools/editor',
    description: 'Apply filters, add text, frames, stickers and more.',
    icon: '🎨'
  },
  {
    name: 'Upscale Image',
    path: '/filetools/imagetools/upscale',
    description: 'Enlarge images while preserving clarity — no backend required.',
    icon: '🔍'
  },
  {
    name: 'Remove Background',
    path: '/filetools/imagetools/remove-background',
    description: 'Remove image backgrounds via segmentation or color threshold.',
    icon: '🧹'
  },
  {
    name: 'Watermark Image',
    path: '/filetools/imagetools/watermark',
    description: 'Overlay text or image watermarks with custom settings.',
    icon: '🚰'
  },
  {
    name: 'Meme Generator',
    path: '/filetools/imagetools/meme',
    description: 'Create and caption memes using custom or template images.',
    icon: '😆'
  },
  {
    name: 'Rotate Image',
    path: '/filetools/imagetools/rotate',
    description: 'Batch rotate JPG, PNG, GIFs with preview.',
    icon: '🔄'
  },
  {
    name: 'HTML to Image',
    path: '/filetools/imagetools/html-to-image',
    description: 'Convert HTML/webpages to JPG or SVG screenshots.',
    icon: '🌐'
  },
  {
    name: 'Blur Face',
    path: '/filetools/imagetools/blur-face',
    description: 'Detect and blur faces for privacy using canvas and face-api.js.',
    icon: '🙈'
  }
];


export default function ImageToolsHome() {
  return (
    <FileToolsLayout title="🖼️ Image Tools" showBackButton={true}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
        marginTop: '20px'
      }}>
        {imageTools.map((tool, i) => (
          <Link
            key={i}
            to={tool.path}
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
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{tool.icon}</div>
            <div style={{ fontWeight: 600, textAlign: 'center' }}>{tool.name}</div>
          </Link>
        ))}
      </div>
    </FileToolsLayout>
  );
}
