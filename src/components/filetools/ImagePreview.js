import React from 'react';

function ImagePreview({ src, alt = 'Preview', maxWidth = 300 }) {
  return (
    <div style={{ margin: '20px 0' }}>
      <img
        src={src}
        alt={alt}
        style={{
          maxWidth: `${maxWidth}px`,
          maxHeight: '300px',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      />
    </div>
  );
}

export default ImagePreview;
