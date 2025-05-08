// src/components/UploadButton.tsx
import React, { useRef } from 'react';
import { Button } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import axios from 'axios';

const UploadButton = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
        
      console.log('Upload start:');
      const response = await axios.post('http://localhost:3000/documents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload successful:', response.data);
      // Optionally trigger a re-fetch of the queue list
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept="application/pdf"
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        startIcon={<UploadFileIcon />}
        onClick={handleUploadClick}
        sx={{ mb: 2 }}
      >
        Upload Documents
      </Button>
    </>
  );
};

export default UploadButton;