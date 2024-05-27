'use client'
import React, { useState, useEffect } from 'react';
import { fetchMedicalDataGroup } from '../../exportar_dades/get_functions';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const AgeGroupIncidence = ({ selectedMun, selectedPathology, selectedYear }) => {
    const [medicalData, setMedicalData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const promises = selectedMun.map(mun => fetchMedicalDataGroup(['municipality', 'patology', 'year_', 'age_group', 'mun_name'], mun.id.toString(), selectedPathology, selectedYear));
                const allData = await Promise.all(promises);
                const mergedData = allData.flat(); // Merging data from all municipalities into a single array
                setMedicalData(mergedData);
            } catch (error) {
            }
        };

        if (selectedMun.length > 0 && selectedPathology && selectedYear) {
            fetchData();
        }
    }, [selectedMun, selectedPathology, selectedYear]);

    // Group data by municipality and age group
    const processMedical = () => {
            const orderedAgeGroups = ["<15", "15-24", "25-44", "45-64", "65-74", "75+"];
            const groupedData = medicalData.reduce((acc, entry) => {
            const existingIndex = acc.findIndex(item => item.municipality === entry.municipality);
            if (existingIndex === -1) {
                acc.push({
                municipality: entry.municipality,
                ...orderedAgeGroups.reduce((ageAcc, ageGroup) => ({ ...ageAcc, [ageGroup]: entry.age_group === ageGroup ? entry.measure : 0 }), {}),
                mun_name: entry.mun_name,
                });
            } else {
                acc[existingIndex][entry.age_group] += entry.measure;
            }
            return acc;
            }, []);
            return groupedData;
    };

    const groupedData = medicalData ? processMedical() : [];

    // Define colors for each age group
    const colors = {
        "<15": "#FF5733",
        "15-24": "#FFC300",
        "25-44": "#D5F374",
        "45-64": "#5EE2A2",
        "65-74": "#7EA5D8",
        "75+": "#C89AE4"
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {medicalData ? (
               <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h2 style={{ marginBottom: '30px' , fontFamily: 'Montserrat' }}> Incidència per Grups d'Edat sobre {selectedPathology} l'any {selectedYear}</h2>
                    <BarChart width={500} height={300} data={groupedData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                            dataKey="mun_name" 
                            tick={{ dy: 10, textAnchor: 'middle' }} 
                        />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {Object.entries(colors).map(([ageGroup, color]) => (
                            <Bar key={ageGroup} dataKey={ageGroup} fill={color} stackId="a" />
                        ))}
                    </BarChart>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default AgeGroupIncidence;
