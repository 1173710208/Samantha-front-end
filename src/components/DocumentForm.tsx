import {
    Paper,
    Typography,
    TextField,
    MenuItem,
    Button,
    Box,
    Autocomplete,
    Snackbar,
    Alert,
  } from '@mui/material';
  import { useState, useEffect } from 'react';
  import axios from 'axios';
  
  interface DocumentFormProps {
    data?: any;
    onImported?: () => void;
  }
  
  const categories = [
    'Admissions summary',
    'Advance care planning',
    'Allied health letter',
    'Certificate',
    'Clinical notes',
    'Clinical photograph',
    'Consent form',
    'DAS21',
    'Discharge summary',
    'ECG',
    'Email',
    'Form',
    'Immunisation',
    'Indigenous PIP',
    'Letter',
    'Medical imaging report',
    'MyHealth registration',
    'New PT registration form',
    'Pathology results',
    'Patient consent',
    'Record request',
    'Referral letter',
    'Workcover',
    'Workcover consent',
  ];
  
  const normalize = (str: string) => str.toLowerCase().replace(/[^a-z]/g, '');
  
  const DocumentForm = ({ data, onImported }: DocumentFormProps) => {
    const [patients, setPatients] = useState<any[]>([]);
    const [doctors, setDoctors] = useState<any[]>([]);
  
    const [patientName, setPatientName] = useState('');
    const [reportDate, setReportDate] = useState('');
    const [subject, setSubject] = useState('');
    const [contactSource, setContactSource] = useState('');
    const [storeIn, setStoreIn] = useState('');
    const [doctorName, setDoctorName] = useState('');
    const [category, setCategory] = useState('');
  
    const [snackbar, setSnackbar] = useState<{
      open: boolean;
      success: boolean;
      message: string;
    }>({ open: false, success: true, message: '' });
  
    useEffect(() => {
      const fetchOptions = async () => {
        try {
          const [patientRes, doctorRes] = await Promise.all([
            axios.get('http://localhost:3000/patients'),
            axios.get('http://localhost:3000/doctors'),
          ]);
          setPatients(patientRes.data);
          setDoctors(doctorRes.data);
        } catch (err) {
          console.error('Failed to fetch dropdown options:', err);
        }
      };
      fetchOptions();
    }, []);
  
    const getPatientIdByName = (name: string): number | undefined => {
      const found = patients.find(p => `${p.firstName} ${p.secondName}` === name);
      return found?.id;
    };
  
    const getDoctorIdByName = (name: string): number | undefined => {
      const found = doctors.find(d => `${d.firstName} ${d.secondName}` === name);
      return found?.id;
    };
  
    const resetFormFromData = (doc: any) => {
      const patientFullName = `${doc?.patient?.firstName || ''} ${doc?.patient?.secondName || ''}`.trim();
      setPatientName(patientFullName);
  
      const doctorFullName = `${doc?.doctor?.firstName || ''} ${doc?.doctor?.secondName || ''}`.trim();
      setDoctorName(doctorFullName);
  
      const dateOnly = doc?.reportDate ? doc.reportDate.split('T')[0] : '';
      setReportDate(dateOnly);
  
      setSubject(doc?.subject || '');
      setContactSource(doc?.contactSource || '');
      setStoreIn(doc?.storeIn || '');
  
      const normalizedCat = normalize(doc?.category || '');
      const matched = categories.find((c) => normalize(c) === normalizedCat);
      setCategory(matched || '');
    };
  
    useEffect(() => {
      resetFormFromData(data);
    }, [data]);
  
    const handleImport = async () => {
      if (!data?.id) return;
      try {
        const patientId = getPatientIdByName(patientName);
        const doctorId = getDoctorIdByName(doctorName);
  
        await axios.put(`http://localhost:3000/documents/${data.id}`, {
          patientId,
          doctorId,
          reportDate,
          subject,
          contactSource,
          storeIn,
          category,
        });
  
        setSnackbar({ open: true, success: true, message: 'Document imported successfully!' });
        if (typeof onImported === 'function') onImported();
      } catch (err) {
        console.error('Import failed:', err);
        setSnackbar({ open: true, success: false, message: 'Import failed. Please try again.' });
      }
    };
  
    const isImported = data?.status === 'IMPORTED';
  
    return (
      <Paper elevation={2} sx={{ p: 3, height: '94.5vh', overflow: 'auto' }}>
        <Typography variant="h6" gutterBottom>
          Document Information
        </Typography>
  
        <Autocomplete
          options={patients.map(p => `${p.firstName} ${p.secondName}`)}
          value={patientName}
          onChange={(e, value) => setPatientName(value || '')}
          renderInput={(params) => (
            <TextField {...params} label="Patient Name" margin="dense" />
          )}
        />
  
        <TextField
          fullWidth
          label="Date of Report"
          margin="dense"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={reportDate}
          onChange={(e) => setReportDate(e.target.value)}
        />
  
        <TextField
          fullWidth
          label="Subject"
          margin="dense"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
  
        <TextField
          fullWidth
          label="Contact of Source"
          margin="dense"
          value={contactSource}
          onChange={(e) => setContactSource(e.target.value)}
        />
  
        <TextField
          fullWidth
          select
          label="Store In"
          margin="dense"
          value={storeIn}
          onChange={(e) => setStoreIn(e.target.value)}
        >
          <MenuItem value="Correspondence">Correspondence</MenuItem>
          <MenuItem value="Investigations">Investigations</MenuItem>
        </TextField>
  
        <Autocomplete
          options={doctors.map(d => `${d.firstName} ${d.secondName}`)}
          value={doctorName}
          onChange={(e, value) => setDoctorName(value || '')}
          renderInput={(params) => (
            <TextField {...params} label="User / Doctor / GP" margin="dense" />
          )}
        />
  
        <TextField
          fullWidth
          select
          label="Category"
          margin="dense"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>
  
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Button
            variant="contained"
            color="success"
            fullWidth
            onClick={handleImport}
            disabled={isImported}
          >
            Import Document
          </Button>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={() => resetFormFromData(data)}
            disabled={isImported}
          >
            Reset
          </Button>
        </Box>
  
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.success ? 'success' : 'error'}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Paper>
    );
  };
  
  export default DocumentForm;
  