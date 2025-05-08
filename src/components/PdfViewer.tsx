// src/components/PdfViewer.tsx
import { Paper, Typography, Box } from '@mui/material';
import { useCallback, useState } from 'react';

interface PdfViewerProps {
  fileUrl?: string;
  onFileDrop?: (files: FileList) => void;
}

const PdfViewer = ({ fileUrl, onFileDrop }: PdfViewerProps) => {
  const [dragging, setDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      if (onFileDrop && e.dataTransfer.files.length > 0) {
        onFileDrop(e.dataTransfer.files);
      }
    },
    [onFileDrop]
  );

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        height: '94.5vh',
        border: dragging ? '2px dashed #1976d2' : '2px dashed #ccc',
        transition: 'border 0.2s',
        backgroundColor: dragging ? '#f0f8ff' : 'white',
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Typography variant="h6" gutterBottom>
        PDF Viewer
      </Typography>

      {fileUrl ? (
        <iframe
          src={fileUrl}
          width="100%"
          height="95%"
          style={{ border: 'none' }}
          title="PDF Viewer"
        />
      ) : (
        <Box
          height="95%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="#aaa"
          fontSize="1.2rem"
        >
          Drag & drop PDF to upload
        </Box>
      )}
    </Paper>
  );
};

export default PdfViewer;
