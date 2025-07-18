import React, { useRef, useState } from 'react';
import './DropZone.css';

function DropZone({ onDrop, onMultipleFiles, accept = '*', multiple = false }) {
  const inputRef = useRef();
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length === 0) return;

    setSelectedFiles(files);

    if (multiple && onMultipleFiles) {
      onMultipleFiles(files);
    } else if (onDrop) {
      onDrop(files[0]);
    }
  };

  const handleClick = () => inputRef.current.click();

  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setSelectedFiles(files);

    if (multiple && onMultipleFiles) {
      onMultipleFiles(files);
    } else if (onDrop) {
      onDrop(files[0]);
    }
  };

  return (
    <div
      className="dropzone"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={handleClick}
    >
      <p>Drag & drop file{multiple ? 's' : ''}, or click to browse</p>
      <input
        type="file"
        ref={inputRef}
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        style={{ display: 'none' }}
      />
      {selectedFiles.length > 0 && (
        <ul style={{ marginTop: '10px', paddingLeft: '16px' }}>
          {selectedFiles.map((file, i) => (
            <li key={i} style={{ fontSize: '0.9rem', color: '#555' }}>
              {file.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DropZone;
