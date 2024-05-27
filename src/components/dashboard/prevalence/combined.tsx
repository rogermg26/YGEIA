'use client';
import React, { useState, useEffect } from 'react';
import { fetchPrevalenceDataGroup } from '../../exportar_dades/get_functions';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {createTheme, ThemeProvider } from '@mui/material';
import { orange } from '@mui/material/colors';

const CombinedTotalSexAge = ({ selectedPathology, selectedMun, normalizedData }) => {
  const [prevalenceData, setPrevalenceData] = useState(null);
  const [selectedOption, setSelectedOption] = useState('total');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = selectedMun.map(mun =>
          fetchPrevalenceDataGroup(['municipality', 'patology', 'sex', 'mun_name', 'age_group', 'measure_normalized'], mun.id.toString(), selectedPathology) // Utilizar 'measure_normalized' o 'measure' según el estado actual
        );
        const allData = await Promise.all(promises);
        const mergedData = allData.flat();
        setPrevalenceData(mergedData);
      } catch (error) {
        console.error('Error fetching medical data:', error);
      }
    };

    if (selectedMun.length > 0 && selectedPathology) {
      fetchData();
    }
  }, [selectedMun, selectedPathology, normalizedData]);

  const processData = () => {
    if (selectedOption === 'sex') {
      // Group data by municipality and sex
      const groupedData = prevalenceData.reduce((acc, entry) => {
        const existingIndex = acc.findIndex(item => item.municipality === entry.municipality);
        if(!normalizedData) {
          if (existingIndex === -1) {
            acc.push({
              municipality: entry.municipality,
              H: entry.sex === 'H' ? entry.measure : 0,
              D: entry.sex === 'D' ? entry.measure : 0,
              mun_name: entry.mun_name,
            });
          } else {
            if (entry.sex === 'H') {
              acc[existingIndex].H += entry.measure;
            } else {
              acc[existingIndex].D += entry.measure;
            }
          }
      } else {
        if (existingIndex === -1) {
          acc.push({
            municipality: entry.municipality,
            H: entry.sex === 'H' ? entry.measure_normalized : 0,
            D: entry.sex === 'D' ? entry.measure_normalized : 0,
            mun_name: entry.mun_name,
          });
        } else {
          if (entry.sex === 'H') {
            acc[existingIndex].H += entry.measure_normalized;
          } else {
            acc[existingIndex].D += entry.measure_normalized;
          }
        }
      } 
        return acc;
      }, []);
      return groupedData;
    } else if (selectedOption === 'age') {
      // Group data by municipality and age group
      const orderedAgeGroups = ["<15", "15-24", "25-44", "45-64", "65-74", "75+"];
      const groupedData = prevalenceData.reduce((acc, entry) => {
        const existingIndex = acc.findIndex(item => item.municipality === entry.municipality);
        if(!normalizedData) {
          if (existingIndex === -1) {
            acc.push({
              municipality: entry.municipality,
              ...orderedAgeGroups.reduce((ageAcc, ageGroup) => ({ ...ageAcc, [ageGroup]: entry.age_group === ageGroup ? entry.measure : 0 }), {}),
              mun_name: entry.mun_name,
            });
          } else {
            acc[existingIndex][entry.age_group] += entry.measure;
          }
        } else {
          if (existingIndex === -1) {
            acc.push({
              municipality: entry.municipality,
              ...orderedAgeGroups.reduce((ageAcc, ageGroup) => ({ ...ageAcc, [ageGroup]: entry.age_group === ageGroup ? entry.measure_normalized : 0 }), {}),
              mun_name: entry.mun_name,
            });
          } else {
            acc[existingIndex][entry.age_group] += entry.measure_normalized;
          }
        }
        return acc;
      }, []);
      return groupedData;
    } else {
      // Show total
      const groupedData = prevalenceData.reduce((acc, entry) => {
        const existingIndex = acc.findIndex(item => item.municipality === entry.municipality);
        if(!normalizedData) {
          if (existingIndex === -1) {
            acc.push({
              municipality: entry.municipality,
              total: entry.measure,
              mun_name: entry.mun_name,
            });
          } else {
            acc[existingIndex].total += entry.measure;
          }
        } else {
          if (existingIndex === -1) {
            acc.push({
              municipality: entry.municipality,
              total: entry.measure,
              mun_name: entry.mun_name,
            });
          } else {
            acc[existingIndex].total += entry.measure_normalized;
          }
        }
        return acc;
      }, []);
      return groupedData;
    }
  };

  const groupedData = prevalenceData ? processData() : [];
  const colors = {
    "<15": "#FF5733",
    "15-24": "#FFC300",
    "25-44": "#D5F374",
    "45-64": "#5EE2A2",
    "65-74": "#7EA5D8",
    "75+": "#C89AE4"
};

const globalcolors = [
  '#355C7D',
  '#6C5B7B',
  '#C06C84',
  '#F67280',
  '#F8B195',
];

const theme = createTheme({
  palette: {
    primary: {
      main: orange[100], // Blue color from MUI palette
    },
    secondary: {
      main: orange[500], // Green color from MUI palette
    },
  },
});


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Box display="flex" gap={2} mb={2}>
      <ThemeProvider theme={theme}>
        <Button variant="contained" color="primary" onClick={() => setSelectedOption('sex')} disabled={selectedOption === 'sex'}>
          Filtra per Sexe
        </Button>
        <Button variant="contained" color="primary" onClick={() => setSelectedOption('age')} disabled={selectedOption === 'age'}>
          Filtra per Grups d'Edat
        </Button>
        <Button variant="contained" color="primary" onClick={() => setSelectedOption('total')} disabled={selectedOption === 'total'}>
          Mostra el Total
        </Button>
        
      </ThemeProvider>
    </Box>
    {prevalenceData ? (
      <div style={{ marginTop: '20px' }}>
        <h2 style={{fontFamily: 'Montserrat', marginBottom:'5px'}}>
        {`Prevalença ${selectedOption === 'sex' ? 'per Sexe' : selectedOption === 'age' ? 'per Grups d\'Edat' : 'Total'} ${selectedPathology === 'ANSIETAT' ? 'd\'' + selectedPathology : 'de ' + selectedPathology} sobre múltiples Municipis`}
        </h2>
        <BarChart width={500} height={400} data={groupedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mun_name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {selectedOption === 'sex' ? (
            <>
              <Bar dataKey="H" fill="#8884d8" />
              <Bar dataKey="D" fill="#82ca9d" />
            </>
          ) : selectedOption === 'age' ? (
            Object.entries(colors).map(([ageGroup, color]) => (
              <Bar key={ageGroup} dataKey={ageGroup} fill={color} stackId="a" />
            ))
          ) : (
            <Bar dataKey="total" fill={globalcolors[groupedData.length - 1 % globalcolors.length]} />
          )}
        </BarChart>
      </div>
    ) : (
      <p>Loading...</p>
    )}
  </div>
);
};
export default CombinedTotalSexAge;
