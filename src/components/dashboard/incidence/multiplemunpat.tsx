'use client'
import React, { useState, useEffect } from 'react';
import { fetchMedicalDataGroup } from '../../exportar_dades/get_functions';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const MultipleMunPat_Chart = ({ selectedMun, selectedYear }) => {
    const [medicalData, setMedicalData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Fetching medical data...');
                const promises = selectedMun.map(mun => fetchMedicalDataGroup(['municipality', 'year_', 'patology', 'mun_name'], mun.id.toString(), null, selectedYear));
                const allData = await Promise.all(promises);
                const mergedData = allData.flat(); // Merging data from all municipalities into a single array
                console.log('Medical data fetched successfully:', mergedData);
                setMedicalData(mergedData);
            } catch (error) {
                console.error('Error fetching medical data:', error);
            }
        };

        if (selectedMun.length > 0 && selectedYear) {
            fetchData();
        }
    }, [selectedMun, selectedYear]);

    // Group medical data by year and municipality
    const groupedData = medicalData ? medicalData.reduce((acc, entry) => {
        console.log('Processing entry:', entry);
        const municipality = entry.mun_name;
        const year = entry.year_;
        const patology = entry.patology;
        const measure = entry.measure;

        const existingMunicipalityIndex = acc.findIndex(row => row.municipality === municipality);

        if (existingMunicipalityIndex === -1) {
            console.log('Municipality not found, adding new entry for municipality:', municipality);
            const newRow = { municipality, year_: year };
            newRow[patology] = measure;
            acc.push(newRow);
        } else {
            console.log('Municipality found, checking if year data exists for municipality:', municipality);
            // Check if the year's data already exists for this municipality
            const existingYearData = acc[existingMunicipalityIndex];
            if (!existingYearData[patology]) {
                console.log('Year data not found for municipality, adding:', measure);
                existingYearData[patology] = measure;
            }
        }

        return acc;
    }, []) : [];

    console.log('Grouped Data:', groupedData);

    const dadesagrupades = groupedData.length > 0 ? Object.keys(groupedData[0]).filter(key => key !== 'municipality').filter(key => key !== 'year_') : [];

    console.log('Dades:', dadesagrupades);

    const colors = ["#FF5733", "#33FF57", "#5733FF", "#FFC300"]; 

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
             <h2 style={{ marginBottom: '30px' }}> Incidència de de Totes les Patologies l'any {selectedYear}</h2>
            <BarChart width={500} height={300} data={groupedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="municipality" style={{ fontSize: 15 }} />
                <YAxis label={{ value: 'Number of Cases', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                {dadesagrupades.map((patologyKey, index) => (
                    <Bar key={index} dataKey={patologyKey} fill={colors[index % colors.length]} />
                ))}
            </BarChart>
        </div>
    );
};

export default MultipleMunPat_Chart;
