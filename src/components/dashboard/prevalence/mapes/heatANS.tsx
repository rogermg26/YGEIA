'use client'
import React, { useEffect, useState } from 'react';
import { VegaLite } from 'react-vega';

const HeatMapANS: React.FC = () => {
  const [heatmapSpecANSIETAT, setHeatMapSpecANSIETAT] = useState<any>(null);

  useEffect(() => {
    // Carga los datos del archivo JSON
    const heatmapSpecANSIETAT = require('../../../../../public/heatmap_ANSIETAT.json');

    // Guarda la especificación del mapa en el estado
    setHeatMapSpecANSIETAT(heatmapSpecANSIETAT);
  }, []);

  if (!heatmapSpecANSIETAT) {
    return <div style={{ width: '600px', height: '500px'}}></div>;
  }
  // Renderiza el mapa utilizando VegaLite
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '600px', height: '500px', backgroundColor: '#f8f8f8', marginRight: '10px'}}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '600px', height: '100px', marginBottom: '40px', fontFamily: 'Montserrat', marginTop:'40px' }}>
        <b>PREVALENÇA NORMALITZADA PER EDAT I SEXE D'ANSIETAT</b>
        <span style={{ fontSize: '0.8em' }}>(per 1000 habitants)</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '600px', height: '500px', marginBottom: '10px', marginLeft:'50px'}}>
        <VegaLite spec={heatmapSpecANSIETAT} />
      </div>
      <span style={{ fontSize: '0.8em', marginLeft:'15px' }}>Mapa de calor que mostra la relació entre els grups d'edat i el sexe envers la prevalença per 1000 habitants </span>
</div>
  );
};

export default HeatMapANS;
