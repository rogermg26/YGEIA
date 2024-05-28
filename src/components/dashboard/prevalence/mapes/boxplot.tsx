'use client'
import React, { useEffect, useState } from 'react';
import { VegaLite } from 'react-vega';

const BoxPlot: React.FC = () => {
  const [Boxplot, setBoxplot] = useState<any>(null);

  useEffect(() => {
    // Carga los datos del archivo JSON
    const Boxplot = require('../../../../../public/boxplot.json');

    // Guarda la especificación del mapa en el estado
    setBoxplot(Boxplot);
  }, []);

  if (!Boxplot) {
    return <div style={{ width: '600px', height: '500px'}}></div>;
  }
  // Renderiza el mapa utilizando VegaLite
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '600px', height: '500px', backgroundColor: '#f8f8f8', marginRight: '10px'}}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '600px', height: '100px', fontFamily: 'Montserrat', marginTop:'55px' }}>
        <b>DISTRIBUCIÓ ESTADÍSTICA DE LA PREVALENÇA D'UN MUNICIPI</b>
        <span style={{ fontSize: '0.8em' }}>(per 1000 habitants)</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '600px', height: '500px', marginBottom: '10px', marginLeft:'50px'}}>
        <VegaLite spec={Boxplot} />
      </div>
      <span style={{ fontSize: '0.8em', marginLeft:'15px' }}>El punt vermell representa el municipi seleccionat; el recangle blau abraça del 25 al 75 % de distribució i la línia blanca és la mitjana</span>
</div>
  );
};

export default BoxPlot;
