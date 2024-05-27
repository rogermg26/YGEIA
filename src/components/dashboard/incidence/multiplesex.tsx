'use client'
import React, { useState, useEffect } from 'react';
import { fetchMedicalDataGroup } from '../../exportar_dades/get_functions';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const MultipleSexPat = ({ selectedMun, selectedPathology, selectedYear }) => {
    const [medicalData, setMedicalData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const promises = selectedMun.map(mun => fetchMedicalDataGroup(['municipality', 'patology', 'year_', 'sex', "mun_name"], mun.id.toString(), selectedPathology, selectedYear));
                const allData = await Promise.all(promises);
                const mergedData = allData.flat(); // Merging data from all municipalities into a single array
                setMedicalData(mergedData);
            } catch (error) {
                console.error('Error fetching medical data:', error);
            }
        };

        if (selectedMun.length > 0 && selectedPathology && selectedYear) {
            fetchData();
        }
    }, [selectedMun, selectedPathology, selectedYear]);

    // Group medical data by municipality, year, and sex
    const groupedData = medicalData ? medicalData.reduce((acc, entry) => {
        const existingIndex = acc.findIndex(item => item.year === entry.year_ && item.municipality === entry.municipality && item.mun_name === entry.mun_name);
        if (existingIndex === -1) {
            acc.push({
                year: entry.year_,
                municipality: entry.municipality,
                mun_name: entry.mun_name,
                H: entry.sex === 'H' ? entry.measure : 0,
                D: entry.sex === 'D' ? entry.measure : 0,
            });
        } else {
            if (entry.sex === 'H') {
                acc[existingIndex].H += entry.measure;
            } else {
                acc[existingIndex].D += entry.measure;
            }
        }
        return acc;
    }, []) : [];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {medicalData ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h2 style={{ marginBottom: '30px', fontFamily: 'Montserrat'  }}>Incidència per Sexes sobre {selectedPathology} l'any {selectedYear}.</h2>
                    <BarChart width={500} height={300} data={groupedData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="mun_name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="H" fill="#8884d8" />
                        <Bar dataKey="D" fill="#82ca9d" />
                    </BarChart>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default MultipleSexPat;
