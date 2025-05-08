// src/layout/DashboardLayout.tsx
import { useState } from 'react';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import UploadButton from '../components/UploadButton';
import ImportQueueTable from '../components/ImportQueueTable';
import ImportedDocumentsTable from '../components/ImportedDocumentsTable';
import PdfViewer from '../components/PdfViewer';
import DocumentForm from '../components/DocumentForm';
import axios from 'axios';

const DashboardLayout = () => {
  const [documents, setDocuments] = useState<any[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<any | null>(null);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleUploadFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const formData = new FormData();
    Array.from(files).forEach(file => formData.append('files', file));

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3000/documents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const newDocs = response.data;
      const updatedDocs = [...documents, ...newDocs];
      setDocuments(updatedDocs);
      setSelectedDoc(newDocs[newDocs.length - 1]);
    } catch (err) {
      console.error('Upload failed:', err);
      setErrorMessage('Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box display="flex" flexDirection="row" sx={{ height: '100vh', overflow: 'hidden' }}>
        {/* Left */}
        <Box flex="2" display="flex" flexDirection="column" sx={{ padding: 2, gap: 2 }}>
          <UploadButton onUpload={handleUploadFiles} />
          <Box flex="1" display="flex" flexDirection="column" gap={2}>
            <ImportQueueTable rows={documents} onSelect={setSelectedDoc} />
            <ImportedDocumentsTable />
          </Box>
        </Box>

        {/* Middle */}
        <Box flex="3" sx={{ padding: 2 }}>
          <PdfViewer fileUrl={selectedDoc?.fileUrl} />
        </Box>

        {/* Right */}
        <Box flex="2" sx={{ padding: 2 }}>
          <DocumentForm data={selectedDoc} />
        </Box>
      </Box>

      {/* Fullscreen Loading */}
      <Backdrop sx={{ color: '#fff', zIndex: 9999 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Error Snackbar */}
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={4000}
        onClose={() => setErrorMessage('')}
        message={errorMessage}
      />
    </>
  );
};

export default DashboardLayout;
