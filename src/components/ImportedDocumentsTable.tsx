// src/components/ImportedDocumentsTable.tsx
import { Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const ImportedDocumentsTable = () => {
  const rows = [
    { patient: 'STONER, Bridget', user: 'WOOD, Sally', time: '12:39:00 22/04/2025' },
    { patient: 'PREDIA, Arthur', user: 'WOOD, Sally', time: '12:38:58 22/04/2025' },
    { patient: 'STONER, Bridget', user: 'WOOD, Sally', time: '12:39:00 22/04/2025' },
    { patient: 'PREDIA, Arthur', user: 'WOOD, Sally', time: '12:38:58 22/04/2025' },
    { patient: 'STONER, Bridget', user: 'WOOD, Sally', time: '12:39:00 22/04/2025' },
    { patient: 'PREDIA, Arthur', user: 'WOOD, Sally', time: '12:38:58 22/04/2025' },
    { patient: 'STONER, Bridget', user: 'WOOD, Sally', time: '12:39:00 22/04/2025' },
    { patient: 'PREDIA, Arthur', user: 'WOOD, Sally', time: '12:38:58 22/04/2025' }
  ];

  return (
    <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Imported Documents
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Patient</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow key={idx} hover>
              <TableCell>{row.patient}</TableCell>
              <TableCell>{row.user}</TableCell>
              <TableCell>{row.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ImportedDocumentsTable;