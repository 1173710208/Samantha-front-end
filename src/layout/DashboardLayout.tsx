// src/layout/DashboardLayout.tsx
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import UploadButton from '../components/UploadButton';
import BulkImportButton from '../components/BulkImportButton';
import ImportQueueTable from '../components/ImportQueueTable';
import ImportedDocumentsTable from '../components/ImportedDocumentsTable';
import PdfViewer from '../components/PdfViewer';
import DocumentForm from '../components/DocumentForm';
import axios from 'axios';
import Split from 'react-split';
import '../styles/split.css'; // add custom gutter style
import Face3Icon from '@mui/icons-material/Face3';

const DashboardLayout = () => {
  const [pendingDocs, setPendingDocs] = useState<any[]>([]);
  const [importedDocs, setImportedDocs] = useState<any[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const [pendingRes, importedRes] = await Promise.all([
        axios.get('http://localhost:3000/documents/pending'),
        axios.get('http://localhost:3000/documents/imported'),
      ]);
      setPendingDocs(pendingRes.data);
      setImportedDocs(importedRes.data);
      setSelectedDoc(pendingRes.data[0] || null);
    } catch (err) {
      console.error('Failed to fetch documents', err);
      setErrorMessage('Failed to fetch documents');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleUploadFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append('files', file));
    try {
      setLoading(true);
      await axios.post('http://localhost:3000/documents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      fetchDocuments();
    } catch (err) {
      console.error('Upload failed:', err);
      setErrorMessage('Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  
  
  return (
    <>
      <Split
        className="split-row"
                minSize={0}
        gutterSize={8}
        direction="horizontal"
                style={{ height: '100vh' }}
      >
        {/* Left Column */}
        <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column', gap: 2, overflow: 'auto' }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Box display="flex" alignItems="center" gap={3}>
            <Face3Icon sx={{ fontSize: 48, color: 'primary.main'}} />

              <Typography variant="h5" fontWeight={600} color="primary.main">
                Samantha — Your Smart Medical Document Processing AI Agent
              </Typography>
            </Box>
          </Box>
          <UploadButton onUpload={handleUploadFiles} />
          <BulkImportButton onComplete={fetchDocuments} />
          <Box flex="1" display="flex" flexDirection="column" gap={2}>
            <Box sx={{ maxHeight: '35vh', overflowY: 'auto' }}>
              <ImportQueueTable
                rows={pendingDocs.map((doc) => ({
                  id: doc.id,
                  patient: `${doc.patient?.firstName || ''} ${doc.patient?.secondName || ''}`.trim(),
                  doctor: `${doc.doctor?.firstName || ''} ${doc.doctor?.secondName || ''}`.trim(),
                  status: doc.status,
                  fileUrl: doc.fileUrl,
                  full: doc,
                }))}
                onSelect={(row) => setSelectedDoc(row)}
              />
            </Box>
            <Box sx={{ maxHeight: '35vh', overflowY: 'auto' }}>
              <ImportedDocumentsTable
                rows={importedDocs.map((doc) => ({
                  id: doc.id,
                  patient: `${doc.patient?.firstName || ''} ${doc.patient?.secondName || ''}`.trim(),
                  doctor: `${doc.doctor?.firstName || ''} ${doc.doctor?.secondName || ''}`.trim(),
                  time: new Date(doc.importedAt).toLocaleString(),
                  full: doc,
                }))}
                onSelect={(row) => setSelectedDoc(row)}
              />
            </Box>
          </Box>
        </Box>

        {/* Middle Column */}
        <Box sx={{ padding: 2 }}>
          <PdfViewer fileUrl={selectedDoc?.fileUrl} onFileDrop={handleUploadFiles} />
        </Box>

        {/* Right Column */}
        <Box sx={{ padding: 2 }}>
        <DocumentForm data={selectedDoc} onImported={fetchDocuments} />

        </Box>
      </Split>

      <Backdrop sx={{ color: '#fff', zIndex: 9999 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

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
