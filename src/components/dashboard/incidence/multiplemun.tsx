import React, { useState, useEffect } from 'react';
import { fetchMedicalDataGroup, fetchPrediction } from '../../exportar_dades/get_functions';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label} from 'recharts';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {createTheme, ThemeProvider } from '@mui/material';
import { orange } from '@mui/material/colors';

const MultipleMunicipality_Chart = ({ selectedPathology, selectedMun, normalizedData }) => {
    const [medicalData, setMedicalData] = useState(null);
    const [predictionData, setPredictionData] = useState([]);
    const [showNormalized, setShowNormalized] = useState(true); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const promises = selectedMun.map(mun => fetchMedicalDataGroup(['municipality', 'patology', 'year_'], mun.id.toString(), selectedPathology));
                const allData = await Promise.all(promises);
                const mergedData = allData.flat(); // Merging data from all municipalities into a single array
                setMedicalData(mergedData);
            } catch (error) {
                console.error('Error fetching medical data:', error);
            }
        };


        if (selectedMun.length > 0 && selectedPathology) {
            fetchData();
        }
    }, [selectedMun, selectedPathology]);


    useEffect(() => {
        const fetchDataNormalized = async () => {
            try {
                const predictionPromises = selectedMun.map(mun => fetchPrediction(false, mun.id.toString(), selectedPathology));
                const allPredictions = await Promise.all(predictionPromises);
                const mergedPredictions = allPredictions.flat();
                setPredictionData(mergedPredictions);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        if (selectedMun.length > 0 && selectedPathology) {
            fetchDataNormalized();
        }
    }, [selectedMun, selectedPathology]);


    // NO NORMALITZADA
    const groupedData = medicalData ? medicalData.reduce((acc, entry) => {
        const existingYearIndex = acc.findIndex(row => row.year === entry.year_);
        if (existingYearIndex === -1) {
            const newRow = { year: entry.year_ };
            // Use municipality name from selectedMun object instead of ID
            const municipalityName = selectedMun.find(mun => mun.id === entry.municipality)?.name || `municipality${entry.municipality}`;
            newRow[municipalityName] = entry.measure;
            acc.push(newRow);
        } else {
            // Check if the municipality's data already exists for this year
            const municipalityName = selectedMun.find(mun => mun.id === entry.municipality)?.name || `municipality${entry.municipality}`;
            if (!acc[existingYearIndex][municipalityName]) {
                acc[existingYearIndex][municipalityName] = entry.measure;
            }
        }
        return acc;
    }, []) : [];

    // NORMALITZADA
    const formattedData = [];

    const years = new Set();
    predictionData.forEach(item => years.add(item.year_));
    
    years.forEach(year => {
        const entry = { year };
        
        predictionData.forEach(item => {
            if (item.year_ === year) {
                const municipalityName = selectedMun.find(mun => mun.id === item.municipality)?.name || `municipality${item.municipality}`;
                entry[municipalityName] = item.measure_normalized;
            } 
        });

        formattedData.push(entry);
    });

    const dadesagrupades = groupedData.length > 0 ? Object.keys(groupedData[0]).filter(key => key !== 'year') : [];
    const colorPalette = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f0e', '#888888'];
    // Data formatting logic remains the same

    // const handleToggleNormalized = () => {
    //     setShowNormalized(prevState => !prevState); // Toggle the state between true and false
    // };

    const dataToDisplay = showNormalized ? formattedData : groupedData; // Decide which data to display based on the state

    const theme = createTheme({
        palette: {
          primary: {
            main: orange[100], // Blue color from MUI palette
          },
          secondary: {
            main: orange[300], // Green color from MUI palette
          },
        },
      });

      
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
             <div style={{ marginBottom: '10px' }}>
             <Box display="flex" gap={2} mb={2}>
             <ThemeProvider theme={theme}>
                {/* <Button variant="contained" color="primary" onClick={handleToggleNormalized}>
                    {showNormalized ? 'Dades Normalitzades' : 'Show Normalized Data'}
                </Button> */}
                <Button variant="contained" color={showNormalized === false ? 'secondary' : 'primary'}  onClick={() => setShowNormalized(false)}>
                    Dades No Normalitzades
                </Button>
                <Button variant="contained" color={showNormalized === true ? 'secondary' : 'primary'}  onClick={() => setShowNormalized(true)}>
                     Dades Normalitzades
                </Button>
            </ThemeProvider>
            </Box>
            </div>

            <h2 style={{fontFamily: 'Montserrat' }}>
                {'Incidència ' + (selectedPathology === 'ANSIETAT' ? 'd\'' + selectedPathology : 'de ' + selectedPathology) + ' sobre múltiples Municipis'}
            </h2>
           
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {medicalData ? (
                    <LineChart width={500} height={400} data={dataToDisplay}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year"/>
                        <YAxis tick={{ fontSize: '14px' }}>
                            <Label value="Nombre de casos" angle={-90} position="insideLeft" offset={0} style={{ textAnchor: 'middle' }} />
                        </YAxis>
                        <Tooltip />
                        <Legend />
                        {/* Render each municipality's data as separate lines */}
                        {Object.keys(dataToDisplay[0]).filter(key => key !== 'year').map((municipalityKey, index) => (
                            <Line
                                key={index}
                                type="monotone"
                                dataKey={municipalityKey} // Use the property key as dataKey
                                stroke={colorPalette[index % colorPalette.length]} // Random color
                            />
                        ))}
                    </LineChart>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default MultipleMunicipality_Chart;