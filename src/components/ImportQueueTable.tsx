// src/components/ImportQueueTable.tsx
import React from 'react';
import { Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ImportQueueTable = ({ rows, onSelect }: { rows: any[], onSelect: (row: any) => void }) => {
    return (
      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h6">Import Queue</Typography>
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
              <TableRow key={idx} hover onClick={() => onSelect(row)} sx={{ cursor: 'pointer' }}>
                <TableCell>{row.patientName}</TableCell>
                <TableCell>{row.doctorName}</TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  };
  
export default ImportQueueTable;