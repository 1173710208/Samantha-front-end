import { Button, LinearProgress, Snackbar, Alert } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

const BulkImportButton = ({ onComplete }: { onComplete: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', success: true });

  const handleBulkImport = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/documents/bulk-import');
      setSnackbar({ open: true, message: `${res.data.count} documents imported.`, success: true });
      onComplete(); // Refresh list
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: 'Bulk import failed.', success: false });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleBulkImport} disabled={loading} fullWidth>
        Bulk Import Ready Documents
      </Button>
      {loading && <LinearProgress sx={{ mt: 1 }} />}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snackbar.success ? 'success' : 'error'} sx={{ width: '100%', fontSize: '1.2rem', padding: '16px 24px', minWidth: '300px', maxWidth: '600px', }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default BulkImportButton;