// src/components/PdfViewer.tsx
import React from 'react';
import { Paper, Typography } from '@mui/material';

const PdfViewer = () => {
  return (
    <Paper elevation={2} sx={{ p: 2, height: '94.5vh' }}>
      <Typography variant="h6" gutterBottom>
        PDF Viewer
      </Typography>
      <iframe
        src="https://wiipwmfmhekupdeupcuo.supabase.co/storage/v1/object/public/documents/8acf34d2-ffba-4045-9807-e457fde3e52c.pdf"
        width="100%"
        height="95%"
        style={{ border: 'none' }}
        title="PDF Viewer"
      />
    </Paper>
  );
};

export default PdfViewer;
