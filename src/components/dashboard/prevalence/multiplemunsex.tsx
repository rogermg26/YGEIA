'use client'
import React, { useState, useEffect } from 'react';
import { fetchPrevalenceDataGroup } from '../../exportar_dades/get_functions';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MultipleSexPat = ({ selectedPathology, selectedMun }) => {
    const [prevalenceData, setPrevalenceData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Fetching medical data...');
                const promises = selectedMun.map(mun => fetchPrevalenceDataGroup(['municipality', 'patology', 'sex', 'mun_name'], mun.id.toString(), selectedPathology));
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
        const existingIndex = acc.findIndex(item => item.municipality === entry.municipality);
        if (existingIndex === -1) {
            acc.push({
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%' }}>
            {prevalenceData ? (
                <div style={{ width: '80%', height: '80%' }}>
                     {'Prevalença ' + (selectedPathology === 'ANSIETAT' ? 'd\'' + selectedPathology : 'de ' + selectedPathology) + ' per Sexe sobre múltiples Municipis'}
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart width={500} height={400} data={groupedData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="mun_name" tick={{ fontSize: 12}} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="H" fill="#8884d8" />
                            <Bar dataKey="D" fill="#82ca9d" />
                        </BarChart>
                        </ResponsiveContainer>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default MultipleSexPat;
