'use client'
import React, { useEffect, useState } from 'react';
import { VegaLite } from 'react-vega';

const MapDEP: React.FC = () => {
  const [mapSpecDEPRESSIO, setMapSpecDEPRESSIO] = useState<any>(null);

  useEffect(() => {
    // Carga los datos del archivo JSON
    const mapDataDEPRESSIO = require('../../../../../public/map_DEPRESSIO.json');

    // Guarda la especificación del mapa en el estado
    setMapSpecDEPRESSIO(mapDataDEPRESSIO);
  }, []);

  if (!mapSpecDEPRESSIO) {
    return <div style={{ width: '717px', height: '500px'}}></div>;
  }
  // Renderiza el mapa utilizando VegaLite
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '717px', height: '610px', backgroundColor: '#f8f8f8', marginRight: '10px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '717px', height: '110px', marginBottom: '20px', fontFamily: 'Montserrat' }}>
        <b>PREVALENÇA NORMALITZADA PER POBLACIÓ DE DEPRESSIÓ</b>
        <span style={{ fontSize: '0.8em' }}>(per 1000 habitants)</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '717px', height: '500px', marginBottom: '20px', marginLeft:'50px'}}>
        <VegaLite spec={mapSpecDEPRESSIO} />
      </div>
  </div>
  );
};

export default MapDEP;
