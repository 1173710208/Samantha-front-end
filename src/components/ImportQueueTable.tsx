// src/components/ImportQueueTable.tsx
import React from 'react';
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

interface RowData {
  id: number;
  patient: string;
  doctor: string;
  full: any;
}

const ImportQueueTable = ({
  rows,
  onSelect,
}: {
  rows: RowData[];
  onSelect: (row: any) => void;
}) => {
  const hasMissingFields = (doc: any) => {
    const requiredFields = [
      'patient',
      'reportDate',
      'subject',
      'contactSource',
      'storeIn',
      'doctor',
      'category',
    ];
    return requiredFields.some((field) => !doc[field]);
  };

  return (
    <Paper elevation={2} sx={{ p: 2,height: '35vh', overflowY: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Import Queue
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Patient</TableCell>
            <TableCell>Doctor</TableCell>
            <TableCell>Status</TableCell>
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
              <TableCell>
                {hasMissingFields(row.full) ? (
                  <Tooltip title="Some fields are missing">
                    <WarningAmberIcon sx={{ color: 'orange' }} />
                  </Tooltip>
                ) : (
                  <Tooltip title="Ready to import">
                    <CheckCircleIcon sx={{ color: 'green' }} />
                  </Tooltip>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ImportQueueTable;