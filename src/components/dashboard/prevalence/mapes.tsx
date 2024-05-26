'use client';
import React, { useState, useEffect } from 'react';
import { fetchOrderPrevalence } from '../../exportar_dades/get_functions';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import MultipleSexPat from './multiplemunsex';
import MultiplePatPrevalence from './multiplepatprev'
import MultipleMunPrevalence from './multiplemunprev'
import AgeGroupPrevalence from './agegroupprev'
import { MunicipalSearchMultipleMapa } from '@/components/exportar_dades/search';
import KPISection from './kpiselection';
import MapSelector from './mapes/mapselector';
import PrevalenceTable from './prevalencetable';
import CombinedPrevalence from './combined';
import MultipleMunicipality_Chart from '../incidence/multiplemun';

const PrevalenceInfo = () => {
  const [prevalenceData, setPrevalenceData] = useState([]);
  const [selectedPathology, setSelectedPathology] = useState('ANSIETAT');
  const [selectedMun, setSelectedMun] = useState([{id: 82009, name: "SANT BOI DE LLOBREGAT"}, {id: 81691, name: "EL PRAT DE LLOBREGAT"}]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getOrderOfPrevalence = async () => {
      if (!selectedPathology) return;
      setLoading(true);
      try {
        console.log(selectedPathology);
        const result = await fetchOrderPrevalence(selectedPathology);
        setPrevalenceData(result);
        console.log(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getOrderOfPrevalence();
  }, [selectedPathology]);

  const handlePatologySelection = (event, value) => {
    setSelectedPathology(value);
  };
  console.log(selectedMun);
  console.log(selectedPathology);
  
  return (
    <>
      <KPISection />
      <div className="flex flex-col items-center gap-4">
         <div className="w-full max-w-full bg-orange-100 p-4 rounded" style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)'}}>
          <Autocomplete
          options={['ANSIETAT', 'DEPRESSIO', 'TCA', 'ESQZ']}
          onChange={handlePatologySelection}
          style={{ width: '100%' }}
          renderInput={(params) => <TextField {...params} label="Patologia" variant="outlined" />}
        />
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-2">
          <MapSelector selectedPathology={selectedPathology} />
        <div className="flex items-center justify-center  w-full lg:w-auto">
          {prevalenceData.length > 0 && <PrevalenceTable data={prevalenceData} />}
        </div>
      </div>
    </div>
    <div className="w-full max-w-full bg-orange-100 p-4 rounded" style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)', marginTop: '20px'}}>
        <MunicipalSearchMultipleMapa selectedMun={selectedMun} setSelectedMun={setSelectedMun} />
    </div>
    <section className="flex flex-col lg:flex-row my-4 gap-3">
      <div className="flex justify-center items-center w-full lg:w-1/2 h-[600px] rounded" style={{ backgroundColor: '#f8f8f8', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)'}}>
        <CombinedPrevalence selectedPathology={selectedPathology} selectedMun={selectedMun} setSelectedPathology={setSelectedPathology} setSelectedMun={setSelectedMun} />
      </div>
      <div className="flex justify-center items-center w-full lg:w-1/2 h-[600px] rounded" style={{ backgroundColor: '#f8f8f8', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)' }}>
        <MultipleMunicipality_Chart selectedPathology={selectedPathology} selectedMun={selectedMun} setSelectedPathology={setSelectedPathology} setSelectedMun={setSelectedMun} />
      </div>
      </section>
      <section className="flex flex-col lg:flex-row my-4 gap-3">
        <div className="flex justify-center items-center w-full lg:w-1/3 h-[300px] rounded" style={{ backgroundColor: '#f8f8f8', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)'}}>
          <MultipleMunPrevalence selectedPathology={selectedPathology} selectedMun={selectedMun} />
        </div>
        <div className="flex justify-center items-center w-full lg:w-1/3 h-[300px] rounded" style={{ backgroundColor: '#f8f8f8', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)' }}>
          <MultipleSexPat selectedPathology={selectedPathology} selectedMun={selectedMun} />
        </div>
        <div className="flex justify-center items-center w-full lg:w-1/3 h-[300px] rounded" style={{ backgroundColor: '#f8f8f8', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)' }}>
          <AgeGroupPrevalence selectedPathology={selectedPathology} selectedMun={selectedMun} setSelectedPathology={setSelectedPathology} setSelectedMun={setSelectedMun} />
        </div>
      </section>

    </>
  );
};

export default PrevalenceInfo;