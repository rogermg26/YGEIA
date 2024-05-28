
{/* DESPLEGABLES DE MUNICIPIS */}

import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { fetchMunicipalities, fetchStatistics } from './get_functions';

interface Municipality {
  id: number;
  name: string;
}

interface Statistic {
  variable: string;
  var_type: string;
  unit: string;
}

interface MunicipalSearchProps {
  selectedMun: Municipality | null;
  setSelectedMun: React.Dispatch<React.SetStateAction<Municipality | null>>;
}


// 1 MUNICIPI
export const MunicipalSearch: React.FC<MunicipalSearchProps> = ({ selectedMun, setSelectedMun }) => {
  const [municipalities, setMunicipalities] = useState<Municipality[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchMunicipalities();
        setMunicipalities(data);
      } catch (error) {
        console.error('Error fetching municipalities:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <Autocomplete
      id='select_mun'
      options={municipalities}
      getOptionLabel={(option) => option.name}
      style={{ width: '100%' }}
      renderInput={(params) => <TextField {...params} label="Municipi" />}
      value={selectedMun}
      onChange={(event, newValue) => {
        setSelectedMun(newValue);
      }}
    />
  );
};



// MÚLTIPES MUNICIPIS
export const MunicipalSearchMultiple: React.FC<MunicipalSearchProps> = ({ selectedMun, setSelectedMun }) => {
  const [municipalities, setMunicipalities] = useState<Municipality[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchMunicipalities();
        setMunicipalities(data);
      } catch (error) {
        console.error('Error fetching municipalities:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <Autocomplete
      id='select_mun'
      options={municipalities}
      getOptionLabel={(option) => option.name}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Municipi" />}
      value={selectedMun}
      multiple // Habilitar selección múltiple
      onChange={(event, newValue) => {
        setSelectedMun(newValue);
      }}
    />
  );
};

// MÚLTIPLES MUNICIPIS, MIDA VARIABLE
export const MunicipalSearchMultipleAmple: React.FC<MunicipalSearchProps> = ({ selectedMun, setSelectedMun }) => {
  const [municipalities, setMunicipalities] = useState<Municipality[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchMunicipalities();
        setMunicipalities(data);
      } catch (error) {
        console.error('Error fetching municipalities:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <Autocomplete
      id='select_mun'
      options={municipalities}
      getOptionLabel={(option) => option.name}
      style={{ width: 500 }}
      renderInput={(params) => <TextField {...params} label="Municipi" />}
      value={selectedMun}
      multiple // Habilitar selección múltiple
      onChange={(event, newValue) => {
        setSelectedMun(newValue);
      }}
    />
  );
};


// MÚTLIPLES MUNICIPIS ADAPTAT PELS MAPES
export const MunicipalSearchMultipleMapa: React.FC<MunicipalSearchProps> = ({ selectedMun, setSelectedMun }) => {
  const [municipalities, setMunicipalities] = useState<Municipality[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchMunicipalities();
        setMunicipalities(data);
      } catch (error) {
        console.error('Error fetching municipalities:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <Autocomplete
      id='select_mun'
      options={municipalities}
      getOptionLabel={(option) => option.name}
      style={{ width: '100%' }}
      renderInput={(params) => <TextField {...params} label="Municipi" />}
      value={selectedMun}
      multiple // Habilitar selección múltiple
      onChange={(event, newValue) => {
        setSelectedMun(newValue);
      }}
    />
  );
};


// 1 MUNICIPI ADAPTAT PER PRIM
export const MunicipalSearchPrim: React.FC<MunicipalSearchProps> = ({ selectedMun, setSelectedMun }) => {
  const [municipalities, setMunicipalities] = useState<Municipality[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchMunicipalities();
        setMunicipalities(data);
      } catch (error) {
        console.error('Error fetching municipalities:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <Autocomplete
      id='select_mun'
      options={municipalities}
      getOptionLabel={(option) => option.name}
      style={{ width: 200 }}
      renderInput={(params) => <TextField {...params} label="Municipi" />}
      value={selectedMun}
      onChange={(event, newValue) => {
        setSelectedMun(newValue);
      }}
    />
  );
};




interface StatisticSearchProps {
  selectedStatistic: Statistic | null;
  setSelectedStatistic: React.Dispatch<React.SetStateAction<Municipality | null>>;
}

// ESTADÍSTICS
export const StatisticSearch: React.FC<StatisticSearchProps> = ({ selectedStatistic, setSelectedStatistic }) => {
  const [statistics, setStatistics] = useState<Municipality[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchStatistics();
        setStatistics(data);
      } catch (error) {
        console.error('Error fetching municipalities:', error);
      }
    }

    fetchData();
  }, []);
  return (
    <Autocomplete
      id='select_stat'
      options={statistics}
      getOptionLabel={(option) => option.variable}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Statistic" />}
      value={selectedStatistic}
      onChange={(event, newValue) => {
        setSelectedStatistic(newValue);
      }}
    />
  );
};

// export default statisticSearch;//, MunicipalSearch;