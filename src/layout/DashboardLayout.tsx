// src/layout/DashboardLayout.tsx
import Box from '@mui/material/Box';
import UploadButton from '../components/UploadButton';
import ImportQueueTable from '../components/ImportQueueTable';
import ImportedDocumentsTable from '../components/ImportedDocumentsTable';
import PdfViewer from '../components/PdfViewer';
import DocumentForm from '../components/DocumentForm';

const DashboardLayout = () => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      sx={{
        height: '100vh', // 页面全高
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* left */}
      <Box
        flex="2"
        display="flex"
        flexDirection="column"
        sx={{ height: '98vh', overflow: 'auto', padding: 2, gap: 2 }}
      >
        <UploadButton />
        <Box flex="1" display="flex" flexDirection="column" gap={2}>
          <ImportQueueTable />
          <ImportedDocumentsTable />
        </Box>
      </Box>

      {/* middle */}
      <Box
        flex="3"
        sx={{ height: '100%', overflow: 'auto', padding: 2 }}
      >
        <PdfViewer />
      </Box>

      {/* right */}
      <Box
        flex="2"
        sx={{ height: '98vh', overflow: 'auto', padding: 2 }}
      >
        <DocumentForm />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
