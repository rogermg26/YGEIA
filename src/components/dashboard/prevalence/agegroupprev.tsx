'use client';
import React, { useState, useEffect } from 'react';
import { fetchPrevalenceDataGroup } from '../../exportar_dades/get_functions';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';

const AgeGroupPrevalence = ({ selectedPathology, selectedMun }) => {
    const [prevalenceData, setPrevalenceData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Fetching medical data...');
                const promises = selectedMun.map(mun => fetchPrevalenceDataGroup(['municipality', 'patology', 'age_group','mun_name'], mun.id.toString(), selectedPathology));
                const allData = await Promise.all(promises);
                const mergedData = allData.flat();
                console.log('Medical data fetched successfully:', mergedData);
                setPrevalenceData(mergedData);
            } catch (error) {
                console.error('Error fetching medical data:', error);
            }
        };

        if (selectedMun.length > 0 && selectedPathology) {
            fetchData();
        }
    }, [selectedMun, selectedPathology]);

    const groupedData = prevalenceData ? prevalenceData.reduce((acc, entry) => {
        const existingIndex = acc.findIndex(item => item.municipality === entry.municipality && item.age_group === entry.age_group);
        if (existingIndex === -1) {
            acc.push({
                municipality: entry.municipality,
                mun_name: entry.mun_name,
                [entry.age_group]: entry.measure
            });
        } else {
            acc[existingIndex][entry.age_group] = entry.measure;
        }
        return acc;
    }, []) : [];

    const colors = {
        "<15": "#FF5733",
        "15-24": "#FFC300",
        "25-44": "#D5F374",
        "45-64": "#5EE2A2",
        "65-74": "#7EA5D8",
        "75+": "#C89AE4"
    };
    console.log("AGE", groupedData);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%' }}>
            {prevalenceData ? (
                <div style={{ width: '80%', height: '80%' }}>
                    {'Prevalença ' + (selectedPathology === 'ANSIETAT' ? 'd\'' + selectedPathology : 'de ' + selectedPathology) + ' per Grups d\'Edat sobre múltiples Municipis'}
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={groupedData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis 
                                dataKey="mun_name" 
                                tickFormatter={(value, index) => index % 6 === 0 ? value : ''}
                                tick={{ fontSize: 12}}
                            />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            {Object.entries(colors).map(([ageGroup, color]) => (
                                <Bar key={ageGroup} dataKey={ageGroup} fill={color} stackId="a" />
                            ))}
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default AgeGroupPrevalence;
