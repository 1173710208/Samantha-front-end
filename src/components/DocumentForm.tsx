import {
    Paper,
    Typography,
    TextField,
    MenuItem,
    Button,
    Box,
    Autocomplete,
  } from '@mui/material';
  import { useState, useEffect } from 'react';
  
  interface DocumentFormProps {
    data?: any;
  }
  
  const patients = ['MISHA, Benny', 'JANET, Roden', 'Susan Smith'];
  const doctors = ['WOOD, Sally', 'Andrew McLean', 'Alex Brown'];
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
  
  const DocumentForm = ({ data }: DocumentFormProps) => {
    const [patientName, setPatientName] = useState('');
    const [reportDate, setReportDate] = useState('');
    const [subject, setSubject] = useState('');
    const [contactSource, setContactSource] = useState('');
    const [storeIn, setStoreIn] = useState('');
    const [doctorName, setDoctorName] = useState('');
    const [category, setCategory] = useState('');
  
    const resetFormFromData = (doc: any) => {
      setPatientName(doc?.patientName || '');
      setReportDate(doc?.reportDate || '');
      setSubject(doc?.subject || '');
      setContactSource(doc?.contactSource || '');
      setStoreIn(doc?.storeIn || '');
      setDoctorName(doc?.doctorName || '');
  
      const normalizedCat = normalize(doc?.category || '');
      const matched = categories.find((c) => normalize(c) === normalizedCat);
      setCategory(matched || '');
    };
  
    useEffect(() => {
      resetFormFromData(data);
    }, [data]);
  
    return (
      <Paper elevation={2} sx={{ p: 3, height: '94.5vh', overflow: 'auto' }}>
        <Typography variant="h6" gutterBottom>
          Document Information
        </Typography>
  
        {/* Patient Name (dropdown with search) */}
        <Autocomplete
          options={patients}
          value={patientName}
          onChange={(e, value) => setPatientName(value || '')}
          renderInput={(params) => (
            <TextField {...params} label="Patient Name" margin="dense" />
          )}
        />
  
        {/* Date of Report */}
        <TextField
          fullWidth
          label="Date of Report"
          margin="dense"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={reportDate}
          onChange={(e) => setReportDate(e.target.value)}
        />
  
        {/* Subject */}
        <TextField
          fullWidth
          label="Subject"
          margin="dense"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
  
        {/* Contact of Source */}
        <TextField
          fullWidth
          label="Contact of Source"
          margin="dense"
          value={contactSource}
          onChange={(e) => setContactSource(e.target.value)}
        />
  
        {/* Store In */}
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
  
        {/* User / Doctor / GP */}
        <Autocomplete
          options={doctors}
          value={doctorName}
          onChange={(e, value) => setDoctorName(value || '')}
          renderInput={(params) => (
            <TextField {...params} label="User / Doctor / GP" margin="dense" />
          )}
        />
  
        {/* Category (strict options only) */}
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
  
        {/* Buttons */}
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Button variant="contained" color="success" fullWidth>
            Import Document
          </Button>
          <Button variant="contained" fullWidth>
            Reanalyze
          </Button>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={() => resetFormFromData(data)}
          >
            Reset
          </Button>
        </Box>
      </Paper>
    );
  };
  
  export default DocumentForm;
  