
{/* FETCH DE DADES DE LA API PER A VISIÓ GLOBAL (PREVALENCE) I VISIÓ LOCAL (INCIDENCE) */}

// Tractament dels Municipis
interface Municipality {
    id: number;
    name: string;
}

// CRIDES A LES DADES
  export async function fetchMunicipalities(): Promise<Municipality[]> {
    const endpoint = 'api/get_municipalities';
    const username = 'user';
    const url = 'http://147.83.46.71:6000/' + endpoint+'/'+'?orientation=records';
    const password = 'gced012024';
    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa(username + ':' + password));
  
    const response = await fetch(url, {
      method: 'GET',
      headers: headers
    });
  
    if (!response.ok) {
      console.log(response);
      throw new Error('Network response was not ok');
    }
    const data: MunicipalityData = await response.json();
    return data;
  }

  
  export async function fetchMunData(muncipality: string) {
    const endpoint = 'api/get_municipaldata';
    const username = 'user';
    const url = 'http://147.83.46.71:6000/' + endpoint+'/'+'?municipality='+muncipality+'&orientation=records';//+'&year_=2018';
    const password = 'gced012024';
    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa(username + ':' + password));
  
    const response = await fetch(url, {
      method: 'GET',
      headers: headers
    });
  
    if (!response.ok) {
      console.log(response);
      throw new Error('Network response was not ok');
    }
  
    const data = await response.json();
    return data;
  }
  

// ESTADÍSTICS - FACTORS
  export async function fetchStatistics() {
    const endpoint = 'api/get_statistics';
    const username = 'user';
    const password = 'gced012024';
    const url = 'http://147.83.46.71:6000/' + endpoint + '?orientation=records';
    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa(username + ':' + password));
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: headers
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      
      // Format the data into options suitable for Autocomplete
      const options = data.map(item => ({
        label: item.variable, // Displayed text in the Autocomplete dropdown
        value: item.variable   // Value of the selected option
      }));
      
      return options;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
}


// DADES D'INCIDÈNCIA
export async function fetchMedicalData(municipality?: number, patology?: string) {
  const endpoint = 'api/get_medicaldata';
  const username = 'user';
  const password = 'gced012024';

  let url = `http://147.83.46.71:6000/${endpoint}/?orientation=records`;

  if (municipality) {
      url += `&municipality=${municipality}`;
  }
  if (patology) {
      url += `&patology=${patology}`;
  }

  const headers = new Headers();
  headers.set('Authorization', 'Basic ' + btoa(username + ':' + password));

  try {
      const response = await fetch(url, {
          method: 'GET',
          headers: headers
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching medical data:', error);
      throw error;
  }
}


// DADES D'INCIDÈNCIA PER A MÚLTIPLES MUNICIPIS
export async function fetchMedicalDataGroup(groups?: string[], municipality?: string, patology?: string, year_?: number, agegroup?: string, sex?: string, mun_name?: string) {
  const endpoint = 'api/get_medicaldata';
  const username = 'user';
  const password = 'gced012024';

  let url = `http://147.83.46.71:6000/${endpoint}/?orientation=records`;

  if (groups) {
    groups.forEach(group => {
      url += `&groups=${group}`;
    });
  }
  if (municipality) {
    url += `&municipality=${municipality}`;
  }
  if (patology) {
    url += `&patology=${patology}`;
  }
  if (year_) {
    url += `&year_=${year_}`;
  }
  if (agegroup) {
    url += `&agegroup=${agegroup}`;
  }
  if (sex) {
    url += `&sex=${sex}`;
  }
  if (mun_name) {
    url += `&mun_name=${mun_name}`;
  }

  const headers = new Headers();
  headers.set('Authorization', 'Basic ' + btoa(username + ':' + password));

  try {
      const response = await fetch(url, {
          method: 'GET',
          headers: headers
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching medical data:', error);
      throw error;
  }
}


// DADES D'INCIDÈNCIA PER A MÚLTIPES PATOLOGIES
export async function fMedical(groups?: string[], municipality?: string, patology?: string[], year_?: number, agegroup?: string, sex?: string, mun_name?: string) {
  const endpoint = 'api/get_medicaldata';
  const username = 'user';
  const password = 'gced012024';

  let url = `http://147.83.46.71:6000/${endpoint}/?orientation=records`;

  if (groups) {
    groups.forEach(group => {
      url += `&groups=${group}`;
    });
  }
  if (municipality) {
    url += `&municipality=${municipality}`;
  }
  if (patology) {
    patology.forEach(patology => {
      url += `&patology=${patology}`;
    });
  }
  if (year_) {
    url += `&year_=${year_}`;
  }
  if (agegroup) {
    url += `&agegroup=${agegroup}`;
  }
  if (sex) {
    url += `&sex=${sex}`;
  }
  if (mun_name) {
    url += `&mun_name=${mun_name}`;
  }

  const headers = new Headers();
  headers.set('Authorization', 'Basic ' + btoa(username + ':' + password));

  try {
      const response = await fetch(url, {
          method: 'GET',
          headers: headers
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching medical data:', error);
      throw error;
  }
}


// DADES DE PREVALENÇA
export async function fetchPrevalenceDataGroup(groups?: string[], municipality?: string, patology?: string, sex?: string, mun_name?: string) {
  const endpoint = 'api/get_prevalencedata';
  const username = 'user';
  const password = 'gced012024';

  let url = `http://147.83.46.71:6000/${endpoint}/?orientation=records`;

  if (groups) {
    groups.forEach(group => {
      url += `&groups=${group}`;
    });
  }
  if (municipality) {
    url += `&municipality=${municipality}`;
  }
  if (patology) {
    url += `&patology=${patology}`;
  }
  if (sex) {
    url += `&sex=${sex}`;
  }
  if (mun_name) {
    url += `&mun_name=${mun_name}`;
  }

  const headers = new Headers();
  headers.set('Authorization', 'Basic ' + btoa(username + ':' + password));

  try {
      const response = await fetch(url, {
          method: 'GET',
          headers: headers
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching medical data:', error);
      throw error;
  }
}


// ESTADÍSTICS - FACTORS 2
export async function fetchStat(id?: string, variable?: string, group_?: number, category?: string, groups?: string[]) {
  const endpoint = 'api/get_statistics';
  const username = 'user';
  const password = 'gced012024';

  let url = `http://147.83.46.71:6000/${endpoint}/?orientation=records`;

  
  if (id) {
    url += `&id=${id}`;
  }
  if (variable) {
    url += `&variable=${variable}`;
  }
  if (group_) {
    url += `&group_=${group_}`;
  }
  if (category) {
    url += `&category=${category}`;
  }
  if (groups) {
    groups.forEach(group => {
      url += `&groups=${group}`;
    });
  }

  const headers = new Headers();
  headers.set('Authorization', 'Basic ' + btoa(username + ':' + password));

  try {
      const response = await fetch(url, {
          method: 'GET',
          headers: headers
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching medical data:', error);
      throw error;
  }
}


// ESTASÍSTICS TEMPORALS
export async function fetchStatTemporal(municipality?: string, year_?: number, statistic?: string, agegroup?: string, mun_name?: string) {
  const endpoint = 'api/get_municipaldata';
  const username = 'user';
  const password = 'gced012024';

  let url = `http://147.83.46.71:6000/${endpoint}/?orientation=records`;

  
  if (municipality) {
    url += `&municipality=${municipality}`;
  }
  if (year_) {
    url += `&year_=${year_}`;
  }
  if (statistic) {
    url += `&statistic=${statistic}`;
  }
  if (agegroup) {
    url += `&agegroup=${agegroup}`;
  }
  if (mun_name) {
    url += `&mun_name=${mun_name}`;
  }

  const headers = new Headers();
  headers.set('Authorization', 'Basic ' + btoa(username + ':' + password));

  try {
      const response = await fetch(url, {
          method: 'GET',
          headers: headers
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching medical data:', error);
      throw error;
  }
}


// ESTASÍSTICS PER SEXE
export async function fetchStatSex(municipality?: string, year_?: number, statistic?: string, sex?: string, mun_name?: string) {
  const endpoint = 'api/get_statisticdata_s';
  const username = 'user';
  const password = 'gced012024';

  let url = `http://147.83.46.71:6000/${endpoint}/?orientation=records`;

  
  if (municipality) {
    url += `&municipality=${municipality}`;
  }
  if (year_) {
    url += `&year_=${year_}`;
  }
  if (statistic) {
    url += `&statistic=${statistic}`;
  }
  if (sex) {
    url += `&sex=${sex}`;
  }
  if (mun_name) {
    url += `&mun_name=${mun_name}`;
  }

  const headers = new Headers();
  headers.set('Authorization', 'Basic ' + btoa(username + ':' + password));

  try {
      const response = await fetch(url, {
          method: 'GET',
          headers: headers
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching medical data:', error);
      throw error;
  }
}


// ESTASÍSTICS PER GRUPS D'EDAT
export async function fetchStatAgeGroup(municipality?: string, year_?: number, statistic?: string, age_group?: string, sex?: string, mun_name?: string) {
  const endpoint = 'api/get_statisticdata_sa';
  const username = 'user';
  const password = 'gced012024';

  let url = `http://147.83.46.71:6000/${endpoint}/?orientation=records`;

  
  if (municipality) {
    url += `&municipality=${municipality}`;
  }
  if (year_) {
    url += `&year_=${year_}`;
  }
  if (statistic) {
    url += `&statistic=${statistic}`;
  }
  if (age_group) {
    url += `&age_group=${age_group}`;
  }
  if (sex) {
    url += `&sex=${sex}`;
  }
  if (mun_name) {
    url += `&mun_name=${mun_name}`;
  }

  const headers = new Headers();
  headers.set('Authorization', 'Basic ' + btoa(username + ':' + password));

  try {
      const response = await fetch(url, {
          method: 'GET',
          headers: headers
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching medical data:', error);
      throw error;
  }
}


// DADES D'ORDRE DE PREVALENÇA
export async function fetchOrderPrevalence(patology: string) {
  const endpoint = 'api/get_prevalence_top';
  const username = 'user';
  const password = 'gced012024';

  let url = `http://147.83.46.71:6000/${endpoint}/?orientation=records`;

  
  if (patology) {
    url += `&patology=${patology}`;
  }

  const headers = new Headers();
  headers.set('Authorization', 'Basic ' + btoa(username + ':' + password));

  try {
      const response = await fetch(url, {
          method: 'GET',
          headers: headers
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching medical data:', error);
      throw error;
  }
}

export async function fetchPrediction(predict?: boolean, municipality?: string, patology?: string) {
  const endpoint = 'api/get_incidence_prediction';
  const username = 'user';
  const password = 'gced012024';

  let url = `http://147.83.46.71:6000/${endpoint}?orientation=records`;

  if (predict !== undefined) {
    url += `&predict=${predict}`;
  }
  if (municipality) {
    url += `&municipality=${municipality}`;
  }
  if (patology) {
    url += `&patology=${patology}`;
  }

  const headers = new Headers();
  headers.set('Authorization', 'Basic ' + btoa(username + ':' + password));

  try {
      const response = await fetch(url, {
          method: 'GET',
          headers: headers
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching medical data:', error);
      throw error;
  }
}
