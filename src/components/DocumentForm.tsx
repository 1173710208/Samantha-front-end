// src/components/DocumentForm.tsx
import React from 'react';
import {
  Paper, Typography, TextField, MenuItem, Button, Box, Select, InputLabel, FormControl
} from '@mui/material';

const DocumentForm = () => {
  return (
    <Paper elevation={2} sx={{ p: 3, height: '94.5vh' }}>
      <Typography variant="h6" gutterBottom>
        Document Information
      </Typography>

      <TextField fullWidth label="Patient Name" select margin="dense">
        <MenuItem value="MISHA, Benny">MISHA, Benny</MenuItem>
      </TextField>

      <TextField fullWidth label="Date of Report" margin="dense" type="date" InputLabelProps={{ shrink: true }} />

      <TextField fullWidth label="Subject" margin="dense" defaultValue="Ultrasound Scrotum Examination Report" />

      <TextField fullWidth label="Contact of Source" margin="dense" defaultValue="I-MED Radiology" />

      <TextField fullWidth label="Store In" margin="dense" select>
          <MenuItem value="Correspondence">Correspondence</MenuItem>
          <MenuItem value="Investigations">Investigations</MenuItem>
      </TextField>

      <TextField fullWidth label="User / Doctor / GP" margin="dense" select>
        <MenuItem value="WOOD, Sally">WOOD, Sally</MenuItem>
        <MenuItem value="WOOD, Sally">WOOD, Sally</MenuItem>
        <MenuItem value="WOOD, Sally">WOOD, Sally</MenuItem>
      </TextField>
      
      <TextField fullWidth label="Category" margin="dense" select>
        <MenuItem value="Medical imaging report">Medical imaging report</MenuItem>
        <MenuItem value="Referral letter">Referral letter</MenuItem>
      </TextField>

      <Box display="flex" flexDirection="column" gap={1} mt={2}>
        <Button variant="contained" color="success" fullWidth>
          Import Document
        </Button>
        <Button variant="contained"  fullWidth>
          Reanalyze
        </Button>
        <Button variant="outlined" color="error" fullWidth>
          Reset
        </Button>
      </Box>
    </Paper>
  );
};

export default DocumentForm;