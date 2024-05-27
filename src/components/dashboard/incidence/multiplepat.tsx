'use client'
import React, { useState, useEffect } from 'react';
import { MunicipalSearch } from '../../exportar_dades/search';
import { fMedical } from '../../exportar_dades/get_functions';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';


const MultiplePatologies_Chart = () => {
    const [medicalData, setMedicalData] = useState(null);
    const [selectedPathology, setSelectedPathology] = useState(["TCA", "ESQZ"]);
    const [selectedMun, setSelectedMun] = useState({id: 82009, name: "SANT BOI DE LLOBREGAT"});
    const [munData, setMunData] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fMedical(['municipality', 'patology', 'year_'], selectedMun.id.toString(), selectedPathology);
                setMedicalData(data);
            } catch (error) {
                console.error('Error fetching medical data:', error);
            }
        };


        if (selectedMun && selectedPathology.length > 0) {
            fetchData();
        }
    }, [selectedMun, selectedPathology]);


    const uniqueMatrix = medicalData ? medicalData.reduce((acc, entry) => {
        const { year_, patology, measure } = entry;
    
        // Find the index of the year in the accumulator array
        const yearIndex = acc.findIndex(item => item.year === year_);
    
        if (yearIndex === -1) {
            // If the year does not exist in the accumulator array, create a new entry
            const newRow = { year: year_ };
            newRow[patology] = measure; // Create a new property for the patology
            acc.push(newRow);
        } else {
            // If the year exists, update the existing entry with the patology and measure
            acc[yearIndex][patology] = measure;
        }
    
        return acc;
    }, []) : [];
    
    const dadesmatrix = uniqueMatrix.length > 0 ? Object.keys(uniqueMatrix[0]).filter(key => key !== 'year') : [];
    
    const colors = {
        "ANSIETAT": "#FF5733",
        "DEPRESSIO": "#33FF57",
        "ESQZ": "#5733FF",
        "TCA": "#FFC300",
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginBottom: '20px' }}>
                <MunicipalSearch selectedMun={selectedMun} setSelectedMun={setSelectedMun} />
                <div style={{ marginTop: '10px' }}>
                <Autocomplete
                  id='select_variable'
                  options={["ANSIETAT", "DEPRESSIO", "TCA", "ESQZ"]}
                  getOptionLabel={(option) => option || ''}
                  style={{ width: 510 }}
                  renderInput={(params) => <TextField {...params} label="Patologia" />}
                  multiple
                  onChange={(event, newValue) => {
                      setSelectedPathology(newValue || '');
                      }}
                  />
                 </div>
            </div>
            {medicalData ? (
                <div>
                    <h2 style={{fontFamily: 'Montserrat' }}>Comparativa de Múltiples Patologies sobre un Municipi</h2>
                    <LineChart width={500} height={300} data={uniqueMatrix}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Legend></Legend>
                        {dadesmatrix.map((patologyKey, index) => (
                                <Line
                                    key={index}
                                    type="monotone"
                                    dataKey={patologyKey} // Use the property key as dataKey
                                    stroke={colors[patologyKey]} // Assign the predefined color for the patology
                                />
                            ))}
                    </LineChart>
                </div>
            ) : (
                <p>Escull un Municipi i una o més patologies</p>
            )}
        </div>
    );
};

export default MultiplePatologies_Chart;