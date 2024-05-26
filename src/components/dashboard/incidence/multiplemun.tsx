import React, { useState, useEffect } from 'react';
import { fetchMedicalDataGroup } from '../../exportar_dades/get_functions';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const MultipleMunicipality_Chart = ({ selectedPathology, selectedMun }) => {
    const [medicalData, setMedicalData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Fetching medical data...');
                const promises = selectedMun.map(mun => fetchMedicalDataGroup(['municipality', 'patology', 'year_'], mun.id.toString(), selectedPathology));
                const allData = await Promise.all(promises);
                const mergedData = allData.flat(); // Merging data from all municipalities into a single array
                console.log('Medical data fetched successfully:', mergedData);
                setMedicalData(mergedData);
            } catch (error) {
                console.error('Error fetching medical data:', error);
            }
        };


        if (selectedMun.length > 0 && selectedPathology) {
            fetchData();
        }
    }, [selectedMun, selectedPathology]);


    // Group medical data by year
    const groupedData = medicalData ? medicalData.reduce((acc, entry) => {
        console.log('Processing entry:', entry);
        const existingYearIndex = acc.findIndex(row => row.year === entry.year_);
        if (existingYearIndex === -1) {
            console.log('Year not found, adding new entry for year:', entry.year_);
            const newRow = { year: entry.year_ };
            // Use municipality name from selectedMun object instead of ID
            const municipalityName = selectedMun.find(mun => mun.id === entry.municipality)?.name || `municipality${entry.municipality}`;
            newRow[municipalityName] = entry.measure;
            acc.push(newRow);
        } else {
            console.log('Year found, checking if municipality data exists for year:', entry.year_);
            // Check if the municipality's data already exists for this year
            const municipalityName = selectedMun.find(mun => mun.id === entry.municipality)?.name || `municipality${entry.municipality}`;
            if (!acc[existingYearIndex][municipalityName]) {
                console.log('Municipality data not found for year, adding:', entry.measure);
                acc[existingYearIndex][municipalityName] = entry.measure;
            }
        }
        return acc;
    }, []) : [];


    console.log('Grouped Data:', groupedData);


    const dadesagrupades = groupedData.length > 0 ? Object.keys(groupedData[0]).filter(key => key !== 'year') : [];
    const colorPalette = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f0e', '#888888'];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
             <h2>
                {'Incidència ' + (selectedPathology === 'ANSIETAT' ? 'd\'' + selectedPathology : 'de ' + selectedPathology) + ' sobre múltiples Municipis'}
            </h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {medicalData ? (
                    <LineChart width={500} height={400} data={groupedData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year"/>
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {/* Render each municipality's data as separate lines */}
                        {dadesagrupades.map((municipalityKey, index) => (
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
