'use client'
import React, { useState, useEffect } from 'react';
import { fetchPrevalenceDataGroup } from '../../exportar_dades/get_functions';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MunicipalSearchMultiple } from '../../exportar_dades/search';

const MultipleMunPrevalence = ({ selectedPathology, selectedMun }) => {
    const [prevalenceData, setPrevalenceData] = useState(null);
    const [groupedData, setGroupedData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Fetching medical data...');
                const promises = selectedMun.map(mun => fetchPrevalenceDataGroup(['municipality', 'patology', 'mun_name'], mun.id.toString(), selectedPathology));
                const allData = await Promise.all(promises);
                const mergedData = allData.flat(); // Merging data from all municipalities into a single array
                console.log('Prevalence data fetched successfully:', mergedData);
                setPrevalenceData(mergedData);

                // Group data by municipality for bar chart
                const grouped = mergedData.reduce((acc, curr) => {
                    acc[curr.mun_name] = acc[curr.mun_name] || 0;
                    acc[curr.mun_name] += curr.measure;
                    return acc;
                }, {});
                const groupedArray = Object.keys(grouped).map(key => ({ municipality: key, cases: grouped[key] }));
                setGroupedData(groupedArray);
            } catch (error) {
                console.error('Error fetching medical data:', error);
            }
        };

        if (selectedMun.length > 0 && selectedPathology !== '') {
            fetchData();
        }
    }, [selectedMun, selectedPathology]);

    const globalcolors = [
        '#355C7D',
        '#6C5B7B',
        '#C06C84',
        '#F67280',
        '#F8B195',
      ];
      
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%' }}>
        {prevalenceData ? (
            <div style={{ width: '80%', height: '80%' }}>
                 {'Prevalença ' + (selectedPathology === 'ANSIETAT' ? 'd\'' + selectedPathology : 'de ' + selectedPathology) + ' Total sobre múltiples Municipis'}
                <ResponsiveContainer width="100%" height="100%">
            <BarChart width={600} height={400} data={groupedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="municipality" tick={{ fontSize: 12}}/>
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="cases" fill={globalcolors[groupedData.length - 1 % globalcolors.length]} />
            </BarChart>
            </ResponsiveContainer>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};
export default MultipleMunPrevalence;
