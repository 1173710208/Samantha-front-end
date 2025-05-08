// src/components/ImportedDocumentsTable.tsx
import React from 'react';
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';

interface RowData {
  id: number;
  patient: string;
  doctor: string;
  time: string;
  full: any;
}

const ImportedDocumentsTable = ({
  rows,
  onSelect,
}: {
  rows: RowData[];
  onSelect: (row: any) => void;
}) => {
  return (
    <Paper elevation={2} sx={{ p: 2, height: '35vh', overflowY: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Imported Documents
      </Typography>
      <Table size="small" >
        <TableHead>
          <TableRow>
            <TableCell>Patient</TableCell>
            <TableCell>Doctor</TableCell>
            <TableCell>Imported At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              hover
              sx={{ cursor: 'pointer' }}
              onClick={() => onSelect(row.full)}
            >
              <TableCell>{row.patient}</TableCell>
              <TableCell>{row.doctor}</TableCell>
              <TableCell>{row.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ImportedDocumentsTable;
