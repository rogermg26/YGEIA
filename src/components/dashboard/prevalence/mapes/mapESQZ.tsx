'use client'
import React, { useEffect, useState } from 'react';
import { VegaLite } from 'react-vega';

const MapESQZ: React.FC = () => {
  const [mapSpecESQZ, setMapSpecESQZ] = useState<any>(null);

  useEffect(() => {
    // Carga los datos del archivo JSON
    const mapDataESQZ = require('../../../../../public/map_ESQZ.json');

    // Guarda la especificación del mapa en el estado
    setMapSpecESQZ(mapDataESQZ);
  }, []);

  if (!mapSpecESQZ) {
    return <div style={{ width: '717px', height: '500px'}}></div>;
  }
  // Renderiza el mapa utilizando VegaLite
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '717px', height: '610px', backgroundColor: '#f8f8f8', marginRight: '10px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '717px', height: '110px', marginBottom: '20px', fontFamily: 'Montserrat' }}>
        <b>PREVALENÇA NORMALITZADA PER POBLACIÓ D'ESQUIZOFRÈNIA</b>
        <span style={{ fontSize: '0.8em' }}>(per 1000 habitants)</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '717px', height: '500px', marginBottom: '20px', marginLeft:'50px'}}>
        <VegaLite spec={mapSpecESQZ} />
      </div>
  </div>
  );
};

export default MapESQZ;
