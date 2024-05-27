'use client'
import React, { useState, useEffect } from 'react';
import { MunicipalSearchPrim } from '../../exportar_dades/search'; // Cambiado a MunicipalSearchPrim
import { fetchPrevalenceDataGroup } from '../../exportar_dades/get_functions';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';

const MultiplePatPrevalence = () => {
    const [prevalenceData, setPrevalenceData] = useState([]); // Cambiado a un array
    const [selectedMun, setSelectedMun] = useState(null); // Cambiado a un solo municipio
    const [selectedPatologies, setSelectedPatologies] = useState([]); // Cambiado a un array para múltiples patologías

    useEffect(() => {
        const fetchData = async () => {
            try {
                const promises = selectedPatologies.map(patology => fetchPrevalenceDataGroup(['municipality', 'patology', 'mun_name'], selectedMun.id.toString(), patology));
                const allData = await Promise.all(promises);
                const mergedData = allData.flat(); // Merging data from all municipalities into a single array
                setPrevalenceData(mergedData); // Reemplazar los datos anteriores con los nuevos datos
            } catch (error) {
                console.error('Error fetching medical data:', error);
            }
        };

        if (selectedMun !== null && selectedPatologies.length > 0) { // Cambiado a un solo municipio
            fetchData();
        }
    }, [selectedMun, selectedPatologies]);

    const groupedData = prevalenceData.reduce((acc, curr) => {
        acc[curr.mun_name] = acc[curr.mun_name] || {};
        acc[curr.mun_name][curr.patology] = acc[curr.mun_name][curr.patology] || 0;
        acc[curr.mun_name][curr.patology] += curr.measure;
        return acc;
    }, {});

    const chartData = selectedMun ? Object.entries(groupedData).map(([municipality, patologies]) => ({
        municipality,
        ...patologies,
    })) : []; // Solo mostrar datos si hay un municipio seleccionado

    const patologies = Object.keys(prevalenceData.reduce((acc, curr) => {
        acc[curr.patology] = true;
        return acc;
    }, {}));
    const colors = ["#FF5733", "#33FF57", "#5733FF", "#FFFF33"];
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <h2>Bar Chart</h2>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <MunicipalSearchPrim selectedMun={selectedMun} setSelectedMun={setSelectedMun} /> {/* Cambiado a MunicipalSearchPrim */}
                <Autocomplete
                    multiple // Permite seleccionar múltiples patologías
                    id="patology-select"
                    options={["ANSIETAT", "DEPRESSIO", "TCA", "ESQZ"]} // Opciones basadas en las patologías disponibles
                    value={selectedPatologies}
                    onChange={(event, newValue) => {
                        setSelectedPatologies(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} label="Select Patologies" style={{ width: 200 }}/>} // Cambiado el label
                />
            </div>
            <BarChart width={600} height={400} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="municipality" />
                <YAxis />
                <Tooltip />
                <Legend />
                {selectedPatologies.map((patology, index) => (
                    <Bar key={index} dataKey={patology} fill={colors[index % colors.length]} />
                ))}
            </BarChart>
        </div>
    );
};

export default MultiplePatPrevalence;
