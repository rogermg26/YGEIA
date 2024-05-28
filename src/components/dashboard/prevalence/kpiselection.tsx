{/* INFORMACIÓ KPI's*/}

import React from 'react';

const KPISection = () => {
  const kpis = [
    { title: 'ANSIETAT', value: '280,9', color: 'text-red-300', evolution: 'Incidència ▲ 15,37%' },
    { title: 'DEPRESSIÓ', value: '107,6', color: 'text-red-300', evolution: 'Incidència ▲ 24,42%' },
    { title: 'TCA', value: '6,4', color: 'text-green-300', evolution: 'Incidència ▼ 12,85%' },
    { title: 'ESQUIZOFRÈNIA', value: '10,2', color: 'text-green-300', evolution: 'Incidència ▼ 3,51%' },
  ];

  return (
    <section>
      <div className="flex gap-2" style={{ marginBottom: '10px' }}>
        {kpis.map((kpi) => (
          <div
            key={kpi.title}
            className="flex-1 px-2 py-2 justify-center w-16 shadow rounded"
            style={{
              backgroundColor: '#0c4160ff',
              color: 'white',
              height: '130px',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
            }}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <p className="font-bold mb-1" style={{ fontFamily: 'Montserrat, sans-serif', marginBottom: '2px' }}>
                {kpi.title}
              </p>
              <div className="font-bold text-center" style={{ fontFamily: 'Montserrat, sans-serif', marginBottom: '2px' }}>
                Diagnòstics Actius Anuals: 
               
                <br />
                <span style={{ fontSize: '0.8em' }}> <span style={{ color: '#ffab40', fontWeight: 'bold',  fontSize: '1.5em' }}> {kpi.value}</span> (per 1000 habitants)</span>
              </div>
              <p className={`${kpi.color}`} style={{ marginTop: '2px', fontFamily: 'Montserrat' }}>{kpi.evolution}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default KPISection;
