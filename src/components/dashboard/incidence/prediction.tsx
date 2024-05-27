'use client';
import React, { useState, useEffect } from 'react';
import { MunicipalSearchMultiple } from '../../exportar_dades/search';
import { fetchPrediction } from '../../exportar_dades/get_functions';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';

const Prediction2024 = ({ selectedPathology, selectedMun }) => {
    const [medicalData, setMedicalData] = useState([]);
    const [predictionData, setPredictionData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const promises = selectedMun.map(mun => fetchPrediction(false, mun.id.toString(), selectedPathology));
                const allData = await Promise.all(promises);
                const mergedData = allData.flat();
                setMedicalData(mergedData);

                const predictionPromises = selectedMun.map(mun => fetchPrediction(true, mun.id.toString(), selectedPathology));
                const allPredictions = await Promise.all(predictionPromises);
                const mergedPredictions = allPredictions.flat();
                setPredictionData(mergedPredictions);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (selectedMun.length > 0 && selectedPathology) {
            fetchData();
        }
    }, [selectedMun, selectedPathology]);

    // Combine and format data
    const formattedData = [];

    const years = new Set();
    medicalData.forEach(item => years.add(item.year_));
    predictionData.forEach(item => years.add(item.year_));

    years.forEach(year => {
        const entry = { year };

        medicalData.forEach(item => {
            if (item.year_ === year) {
                entry[`${item.municipality}_historical`] = item.measure_normalized;
            }
        });

        predictionData.forEach(item => {
            if (item.year_ === year && item.year_ == 2024) {
                entry[`${item.municipality}_prediction`] = item.measure_normalized;
            } 
            if (item.year_ === year && item.year_ == 2023) {
                entry[`${item.municipality}_prediction`] = item.measure_normalized;
            } 
        });

        formattedData.push(entry);
    });
    
    const colorPalette = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f0e'];
    const colorPrediction =['#888888'];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            {formattedData.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop:'30px'}}>
                    <b  style={{marginBottom:'20px', fontFamily:'Montserrat'}}>
                    {'PREDICCIÓ D\'INCIDÈNCIA (NORMALITZADA) ' + (selectedPathology === 'ANSIETAT' ? 'D\'' + selectedPathology : 'DE ' + selectedPathology)}
                    </b>
                    <ResponsiveContainer width={500} height={400}>
                        <LineChart data={formattedData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            {selectedMun.map((mun, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <Line
                                            type="monotone"
                                            dataKey={`${mun.id}_historical`}
                                            stroke={colorPalette[index % colorPalette.length]} // Random color
                                            dot={false}
                                            isAnimationActive={false}
                                            name={`${mun.name} (Incidència)`}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey={`${mun.id}_prediction`}
                                            stroke={colorPrediction[index % colorPrediction.length]} // Random color
                                            dot={false}
                                            strokeDasharray="5 5"
                                            isAnimationActive={false}
                                            name={`${mun.name} (Predicció)`}
                                        />
                                    </React.Fragment>
                                );
                            })}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Prediction2024;
