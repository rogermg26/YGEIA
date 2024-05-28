'use client';
import React, { useState, useEffect } from 'react';
import { fetchStat } from '../../exportar_dades/get_functions';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { MunicipalSearch } from '@/components/exportar_dades/search';
import { fetchStatTemporal, fetchStatSex, fetchStatAgeGroup} from '../../exportar_dades/get_functions';
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend ,ResponsiveContainer, Label} from 'recharts';


export default function ProvesFactors() {
  const [groupOptions, setGroupOptions] = useState<string[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string | null>("Població");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingVariable, setLoadingVariable] = useState(false);
  const [errorVariable, setErrorVariable] = useState<string | null>(null);
  const [variableOptions, setVariableOptions] = useState<{ variable: string; category: string; id: string, sex: boolean; agegroup: boolean; temporality: boolean}[]>([]);
  const [uniqueVariables, setUniqueVariables] = useState<string[]>([]);
  const [selectedVariable, setSelectedVariable] = useState<string | null>("Matrimonis");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isSelectionComplete, setIsSelectionComplete] = useState<boolean>(false);
  const [selectedSex, setSelectedSex] = useState<boolean | null>(null);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<boolean | null>(null);
  const [selectedTemporality, setSelectedTemporality] = useState<boolean | null>(null);
  const [selectedMun, setSelectedMun] = useState({
    "id": 80018,
    "name": "ABRERA",
    "size_": "big"
  });
  const [TemporalData, setTemporalData] = useState([]);
  const [SexData, setSexData] = useState([]);
  const [AgeGroupData, setAgeGroupData] = useState([]);
  const [selectedYear, setSelectedYear] = useState([]);

  useEffect(() => {
    const getDataGroup = async () => {
      try {
        const result = await fetchStat(null, null, null, null, ["group_"]);
        const groups = result.map((item: any) => item.group_);
        setGroupOptions(groups);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getDataGroup();
  }, []);

  useEffect(() => {
    const getDataVariables = async () => {
      if (!selectedGroup) return;

      try {
        const result = await fetchStat(null, null, selectedGroup, null, ["group_"]);

        const structuredData: { variable: string; category: string; id: string; sex: boolean; age_group: boolean; temporality: boolean }[] = [];

        result.forEach((item: any) => {
          if (Array.isArray(item.variable)) {
            item.variable.forEach((variable: string, index: number) => {
              structuredData.push({
                variable,
                category: item.category[index],
                id: item.id[index],
                sex: item.sex[index],
                agegroup: item.age_group[index],
                temporality: item.temporality[index],
              });
            });
          } else if (typeof item.variable === 'string') {
            structuredData.push({
              variable: item.variable,
              category: item.category,
              id: item.id,
              sex: item.sex,
              agegroup: item.age_group,
              temporality: item.temporality,
            });
          }
        });

        setVariableOptions(structuredData);
      } catch (error) {
        setError(error.message);
      }
    };

    getDataVariables();
  }, [selectedGroup]);

  useEffect(() => {
    const uniqueVariablesSet = new Set<string>();
    variableOptions.forEach((data: any) => {
      uniqueVariablesSet.add(data.variable);
    });
    setUniqueVariables(Array.from(uniqueVariablesSet));
  }, [variableOptions]);

  useEffect(() => {
    if (selectedVariable) {
      const categories: string[] = [];
      variableOptions.forEach((data) => {
        if (data.variable === selectedVariable && data.category !== "NA") {
          categories.push(data.category);
        }
      });
      setCategoryOptions(categories);
      setIsSelectionComplete(categories.length === 0); // Si no hay categorías, la selección está completa
    }
  }, [selectedVariable, variableOptions]);

  useEffect(() => {
    if (isSelectionComplete) {
      const selectedData = variableOptions.find(option => 
        option.variable === selectedVariable && 
        (option.category === selectedCategory || !selectedCategory)
      );
      if (selectedData) {
        setSelectedId(selectedData.id); 
        setSelectedSex(selectedData.sex);
        setSelectedAgeGroup(selectedData.agegroup);
        setSelectedTemporality(selectedData.temporality);
      }
    }
  }, [isSelectionComplete, selectedVariable, selectedCategory, variableOptions]);

  const handleGroupSelection = async (event: any, value: string | null) => {
    setSelectedGroup(value);
    setSelectedVariable(null);
    setSelectedCategory(null);
    setSelectedId(null);
    setSelectedSex(null);
    setSelectedAgeGroup(null);
    setSelectedTemporality(null);
    setIsSelectionComplete(false);
    setSelectedYear(null);
  };

  const handleVariableSelection = async (event: any, value: string | null) => {
    setSelectedVariable(value);
    setSelectedCategory(null);
    setIsSelectionComplete(false);
    setSelectedYear(null);
  };

  const handleCategorySelection = async (event: any, value: string | null) => {
    setSelectedCategory(value);
    setIsSelectionComplete(true); // La selección está completa cuando se selecciona una categoría
  };

// TEMPORALITAT
  const fetchTemporalData = async () => {
    try {
      const resultTemporal = await fetchStatTemporal(selectedMun?.id, null, selectedId, null, null);
      setTemporalData(resultTemporal);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (isSelectionComplete && selectedMun && selectedId && selectedTemporality && !selectedSex && !selectedAgeGroup) {
      fetchTemporalData();
    }
  }, [selectedMun, selectedId, selectedTemporality, selectedSex, selectedAgeGroup]);


 // SEXE
  const fetchSexData = async () => {
    try {
      const resultSex = await fetchStatSex(selectedMun?.id, null, selectedId, null, null);
      setSexData(resultSex);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (isSelectionComplete && selectedMun && selectedId && selectedTemporality && selectedSex && !selectedAgeGroup) {
      fetchSexData();
    }
  }, [selectedMun, selectedId, selectedTemporality, selectedSex, selectedAgeGroup]);

  const groupedDataSex = SexData ? SexData.reduce((acc, entry) => {
    const existingIndex = acc.findIndex(item => item.year === entry.year_ && item.municipality === entry.municipality);
    if (existingIndex === -1) {
        acc.push({
            year: entry.year_,
            municipality: entry.municipality,
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

//  SEXE I EDAT
 const fetchAgeGroupData = async () => {
  try {
    const resultAgeGroup = await fetchStatAgeGroup(selectedMun?.id, selectedYear, selectedId, null, null, null);
    setAgeGroupData(resultAgeGroup);
  } catch (error) {
    setError(error.message);
  }
};

useEffect(() => {
  if (isSelectionComplete && selectedMun && selectedId && selectedTemporality && selectedSex && selectedAgeGroup && selectedYear) {
    fetchAgeGroupData();
  }
}, [selectedMun, selectedId, selectedTemporality, selectedSex, selectedAgeGroup, selectedYear]);

// He filtrat pel 2023, faltaria fer el grafic i posarho en format groupedDataAgeGroup.

const groupedDataAgeGroup = AgeGroupData ? AgeGroupData.reduce((acc, entry) => {
  // Buscar el índice del objeto en acc que coincide con el mismo age_group y municipality
  const existingIndex = acc.findIndex(item => item.age_group === entry.age_group && item.municipality === entry.municipality);
  
  if (existingIndex === -1) {
      // Si no existe, crear una nueva entrada
      acc.push({
          age_group: entry.age_group,
          municipality: entry.municipality,
          H: entry.sex === 'H' ? entry.measure : 0,
          D: entry.sex === 'D' ? entry.measure : 0,
      });
  } else {
      // Si ya existe, asignar el valor correspondiente de H o D
      if (entry.sex === 'H') {
          acc[existingIndex].H = entry.measure;
      } else {
          acc[existingIndex].D = entry.measure;
      }
  }
  return acc;
}, []) : [];

//   ALTRES
  if (loading) return <div>Carregant...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div className="w-full max-w-full">
      <div className="w-full max-w-full bg-orange-100 p-4 rounded" style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)'}}>
      <MunicipalSearch selectedMun={selectedMun} setSelectedMun={setSelectedMun} />
      </div>
       <div className="w-full max-w-full bg-orange-100 p-4 rounded my-4" style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)'}}>
        <Autocomplete
          options={groupOptions}
          onChange={handleGroupSelection}
          renderInput={(params) => <TextField {...params} label="Grup" variant="outlined" />}
        />
      </div>
      {selectedGroup && (
         <div className="justify-center items-center w-full lg:w-full" style={{ width: '100%', height:"100%"}}>
           <div className="w-full max-w-full bg-orange-100 p-4 rounded my-4" style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)'}}>
              <Autocomplete
                options={uniqueVariables}
                onChange={handleVariableSelection}
                renderInput={(params) => <TextField {...params} label="Variable" variant="outlined" />}
              />
            </div>
          {loadingVariable && <div>Loading data for selected group...</div>}
          {errorVariable && <div>Error: {errorVariable}</div>}
          <div>
            {selectedVariable && categoryOptions.length > 0 && (
               <div className="w-full max-w-full bg-orange-100 p-4 rounded my-4" style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)'}}>
              <Autocomplete
                options={categoryOptions}
                onChange={handleCategorySelection}
                // es podria afegir un multiple!
                renderInput={(params) => <TextField {...params} label="Categoría" variant="outlined" />}
              />
              </div>
            )}
          </div>
          
          <div className="justify-center items-center w-full lg:w-full">
            {loading && <div>Carregant...</div>}
            {error && <div>Error: {error}</div>}
            {TemporalData.length > 0 && selectedTemporality && !selectedSex && !selectedAgeGroup && (
                <div style={{ width: '100%', height: '400px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={TemporalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year_" />
                    <YAxis tick={{ fontSize: '13px' }}>
                            <Label value="Nombre de casos" angle={-90} position="insideLeft" offset={0} style={{ textAnchor: 'middle' }} />
                        </YAxis>
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="measure" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                      <p style={{ textAlign: 'center' }}>{selectedVariable}</p>
                      <p style={{ textAlign: 'center' }}>{selectedCategory ? selectedCategory : " "}</p>
                </div>
                </div>
            )}
            {SexData ? SexData.length > 0 && selectedTemporality && selectedSex && !selectedAgeGroup &&  (
                <div style={{marginTop: '180px'}}>
                    <BarChart width={500} height={300} data={groupedDataSex}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis tick={{ fontSize: '13px' }}>
                            <Label value="Nombre de casos" angle={-90} position="insideLeft" offset={0} style={{ textAnchor: 'middle' }} />
                        </YAxis>
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="H" fill="#8884d8" />
                        <Bar dataKey="D" fill="#82ca9d" />
                    </BarChart>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                      <p style={{ textAlign: 'center' }}>{selectedVariable}</p>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            {selectedTemporality && selectedSex && selectedAgeGroup &&  (
                 <div className="w-full max-w-full bg-orange-100 p-4 rounded my-4" style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)'}}>
                <Autocomplete
                id='select_year'
                options={Array.from({ length: 9 }, (_, i) => (2015 + i).toString())} // Years from 2015 to 2023
                getOptionLabel={(option) => option || ''}
                style={{ width: '100%' }}
                renderInput={(params) => <TextField {...params} label="Any" />}
                onChange={(event, newValue) => {
                    setSelectedYear(newValue || '');
                }}
            />
            </div>
            )}
            {AgeGroupData ? AgeGroupData.length > 0 && selectedTemporality && selectedSex && selectedAgeGroup && selectedYear && (
                <div style={{marginTop: '70px', marginBottom:'20px'}}>
                    <BarChart width={500} height={300} data={groupedDataAgeGroup}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="age_group">
                        </XAxis>
                        <YAxis tick={{ fontSize: '13px' }}>
                            <Label value={"Nombre de casos"} angle={-90} position="insideLeft" offset={0} style={{ textAnchor: 'middle' }} />
                        </YAxis>
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="H" fill="#8884d8" />
                        <Bar dataKey="D" fill="#82ca9d" />
                    </BarChart>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                      <p style={{ textAlign: 'center' }}>{selectedVariable} de l'any {selectedYear}</p>
                    </div>
                </div>
            ) : (
                <p>Carregant...</p>
            )}
            
          </div>
        </div>
      )}
    </div>
  );
}
