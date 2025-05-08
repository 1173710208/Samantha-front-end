// src/components/ImportQueueTable.tsx
import React from 'react';
import { Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ImportQueueTable = () => {
  const rows = [
    { patient: 'MISHA, Benny', user: 'WOOD, Sally', status: 'Ready' },
    { patient: 'BACON, Wendy', user: 'WOOD, Sally', status: 'Ready' },
    { patient: 'STONER, Bridget', user: 'WOOD, Sally', status: 'Ready' },
    { patient: 'MISHA, Benny', user: 'WOOD, Sally', status: 'Ready' },
    { patient: 'BACON, Wendy', user: 'WOOD, Sally', status: 'Ready' },
    { patient: 'STONER, Bridget', user: 'WOOD, Sally', status: 'Ready' }
  ];

  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Import Queue
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Patient</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow key={idx} hover>
              <TableCell>{row.patient}</TableCell>
              <TableCell>{row.user}</TableCell>
              <TableCell>
                <IconButton color="success">
                  <CheckCircleIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ImportQueueTable;