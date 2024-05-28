import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const PrevalenceTable = ({ data }) => {
  return (
    <TableContainer component={Paper} style={{ width: '100%', maxWidth: '630px' }}>
      <Table>
        <TableHead>
          <TableRow style={{ height: '50px', backgroundColor: '#0c4160ff' }}>
            <TableCell style={{ width: '56%', color: 'white', fontFamily: 'Montserrat, sans-serif' }}>Municipi</TableCell>
            <TableCell style={{ width: '22%', color: 'white', fontFamily: 'Montserrat, sans-serif' }}>Prevalença Normalitzada</TableCell>
            <TableCell style={{ width: '22%', color: 'white', fontFamily: 'Montserrat, sans-serif' }}>Prevalença</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id} style={{ backgroundColor: '#f8f8f8' }}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.prevalence_normalized.toFixed(2)}</TableCell>
              <TableCell>{row.prevalence}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PrevalenceTable;
