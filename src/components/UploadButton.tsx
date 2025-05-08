// src/components/UploadButton.tsx
import React, { useRef } from 'react';
import { Button } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

interface UploadButtonProps {
  onUpload: (files: FileList | null) => void;
}

const UploadButton: React.FC<UploadButtonProps> = ({ onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onUpload(event.target.files);
    event.target.value = ''; // 允许重复选择同一文件
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept="application/pdf"
        multiple
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
