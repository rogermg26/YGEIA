'use client';
import React, { useState, useEffect } from 'react';
import { fetchPrevalenceDataGroup } from '../../exportar_dades/get_functions';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label} from 'recharts';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';

const AgeGroupPrevalence = ({ selectedPathology, selectedMun, normalizedData }) => {
    const [prevalenceData, setPrevalenceData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const promises = selectedMun.map(mun => fetchPrevalenceDataGroup(['municipality', 'patology', 'age_group','mun_name','measure_normalized'], mun.id.toString(), selectedPathology));
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
    }, [selectedMun, selectedPathology]);

     const orderedAgeGroups = ["<15", "15-24", "25-44", "45-64", "65-74", "75+"];
      const groupedData = prevalenceData ? prevalenceData.reduce((acc, entry) => {
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
    }, []) : [];

    const colors = {
        "<15": "#FF5733",
        "15-24": "#FFC300",
        "25-44": "#D5F374",
        "45-64": "#5EE2A2",
        "65-74": "#7EA5D8",
        "75+": "#C89AE4"
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%' }}>
            {prevalenceData ? (
                <div style={{ width: '80%', height: '80%', fontFamily: 'Montserrat'}}>
                    <h2 style={{fontSize:'14px', marginBottom:'7px', marginTop:'5px'}}>
                    {'Prevalença ' + (selectedPathology === 'ANSIETAT' ? 'd\'' + selectedPathology : 'de ' + selectedPathology) + ' per Grups d\'Edat sobre múltiples Municipis'}
                    </h2>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={groupedData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis 
                                dataKey="mun_name" 
                                tickFormatter={(value, index) => index % 6 === 0 ? value : ''}
                                tick={{ fontSize: 10}}
                            />
                            <YAxis tick={{ fontSize: '12px' }}>
                                <Label value="Nombre de casos" angle={-90} position="insideLeft" offset={0} style={{ textAnchor: 'middle' }} />
                            </YAxis>
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
