'use client'
import React, { useEffect, useState } from 'react';
import { VegaLite } from 'react-vega';

const HeatMapDEP: React.FC = () => {
  const [heatmapSpecDEPRESSIO, setHeatMapSpecDEPRESSIO] = useState<any>(null);

  useEffect(() => {
    // Carga los datos del archivo JSON
    const heatmapSpecDEPRESSIO = require('../../../../../public/heatmap_DEPRESSIO.json');

    // Guarda la especificación del mapa en el estado
    setHeatMapSpecDEPRESSIO(heatmapSpecDEPRESSIO);
  }, []);

  if (!heatmapSpecDEPRESSIO) {
    return <div style={{ width: '717px', height: '500px'}}></div>;
  }
  // Renderiza el mapa utilizando VegaLite
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '600px', height: '500px', backgroundColor: '#f8f8f8', marginRight: '10px'}}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '600px', height: '100px', marginBottom: '20px', fontFamily: 'Montserrat'}}>
        <b>PREVALENÇA NORMALITZADA PER EDAT I SEXE DE DEPRESSIÓ</b>
        <span style={{ fontSize: '0.8em' }}>(per 1000 habitants)</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '600px', height: '500px', marginBottom: '20px', marginLeft:'50px'}}>
        <VegaLite spec={heatmapSpecDEPRESSIO} />
      </div>
</div>
  );
};

export default HeatMapDEP;
