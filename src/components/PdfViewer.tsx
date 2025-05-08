// src/components/PdfViewer.tsx
import { Paper, Typography } from '@mui/material';

const PdfViewer = ({ fileUrl }: { fileUrl?: string }) => (
    <Paper elevation={2} sx={{ p: 2, height: '94.5vh' }}>
      <Typography variant="h6" gutterBottom>PDF Viewer</Typography>
      {fileUrl ? (
        <iframe src={fileUrl} width="100%" height="95%" style={{ border: 'none' }} title="PDF Viewer" />
      ) : (
        <Typography>No PDF selected</Typography>
      )}
    </Paper>
  );
  

export default PdfViewer;
