'use client'
import { useState, useEffect } from 'react';
import React from 'react';
import MultipleMunicipality_Chart from '@/components/dashboard/incidence/multiplemun';
import MultiplePatologies_Chart from "@/components/dashboard/incidence/multiplepat"
import MultipleSexPat from '@/components/dashboard/incidence/multiplesex';
import MultipleMunPat_Chart from '@/components/dashboard/incidence/multiplemunpat';
import AgeGroupIncidence from '@/components/dashboard/incidence/agegroupsincidence';
import ProvesFactors from "./factdash";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { MunicipalSearchMultipleMapa } from '@/components/exportar_dades/search';


const IncidenceInfo = () => {

  const [selectedPathology, setSelectedPathology] = useState('ANSIETAT');
  const [selectedYear, setSelectedYear] = useState(2022);
  const [selectedMun, setSelectedMun] = useState([{id: 82009, name: "SANT BOI DE LLOBREGAT"}, {id: 81691, name: "EL PRAT DE LLOBREGAT"}]);

  const handlePatologySelection = (event, value) => {
    setSelectedPathology(value);
  };

  return (
    <>
    <section className="w-full max-w-full p-4 rounded" style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)', backgroundColor: '#0C4160FF', color: 'white'}}>
      Comparativa de Factors
    </section>
    <section className="flex flex-col lg:flex-row gap-3 my-2">
      <div className="flex justify-center items-center w-full lg:w-1/2 h-[900px] rounded" style={{ backgroundColor: '#f8f8f8', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)' }}>
        <div className="flex justify-center rounded" style={{ width: '90%', height:"90%"}}>
        <ProvesFactors></ProvesFactors>
        </div>
      </div>
      <div className="flex justify-center items-center w-full lg:w-1/2 h-[900px] rounded" style={{ backgroundColor: '#f8f8f8', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)' }}>
        <div className="flex justify-center rounded" style={{ width: '90%', height:"90%"}}>
        <ProvesFactors></ProvesFactors>
        </div>
      </div>
    </section>
    <section className="w-full max-w-full p-4 rounded" style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)', backgroundColor: '#0C4160FF', color: 'white', marginTop: '20px'}}>
      Incidència per Anys
    </section>
    <section>
    <div className="w-full max-w-full bg-orange-100 p-4 rounded my-3" style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)'}}>
        <MunicipalSearchMultipleMapa selectedMun={selectedMun} setSelectedMun={setSelectedMun} />
    </div>
    <div className="w-full max-w-full bg-orange-100 p-4 rounded my-3" style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)'}}>
          <Autocomplete
          options={['ANSIETAT', 'DEPRESSIO', 'TCA', 'ESQZ']}
          onChange={handlePatologySelection}
          style={{ width: '100%' }}
          renderInput={(params) => <TextField {...params} label="Patologia" variant="outlined" />}
        />
        </div>
        <div className="w-full max-w-full bg-orange-100 p-4 rounded my-3" style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)'}}>
                <Autocomplete
                    options={["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"]} 
                    getOptionLabel={(option) => option || ''}
                    style={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} label="Any" />}
                    onChange={(event, newValue) => {
                        setSelectedYear(newValue || '');
                    }}
                />
            </div>
    </section>
      <section className="flex flex-col lg:flex-row my-4 gap-3">
      <div className="flex justify-center items-center w-full lg:w-1/2 h-[500px] rounded" style={{ backgroundColor: '#f8f8f8', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)'}}>
        <MultipleSexPat selectedMun={selectedMun} selectedPathology={selectedPathology} selectedYear={selectedYear} />
      </div>
      <div className="flex justify-center items-center w-full lg:w-1/2 h-[500px] rounded" style={{ backgroundColor: '#f8f8f8', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)'}}>
        <AgeGroupIncidence selectedMun={selectedMun} selectedPathology={selectedPathology} selectedYear={selectedYear} />
      </div>
      </section>
      <section className="flex flex-col lg:flex-row my-4 gap-3">
      <div className="flex justify-center items-center w-full lg:w-1/2 h-[500px] rounded" style={{ backgroundColor: '#f8f8f8', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)'}}>
        <MultipleMunPat_Chart selectedMun={selectedMun} selectedYear={selectedYear} />
      </div>
      <div className="flex justify-center items-center w-full lg:w-1/2 h-[500px] rounded" style={{ backgroundColor: '#f8f8f8', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)'}}>
        <MultiplePatologies_Chart/>
        </div>
      </section>
    </>
  );
};

export default IncidenceInfo;