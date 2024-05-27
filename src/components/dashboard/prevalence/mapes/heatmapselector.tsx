import React from 'react';
import HeatMapANS from './heatANS';
import HeatMapDEP from './heatDEP';
import HeatMapESQZ from './heatESQZ';
import HeatMapTCA from './heatTCA';

const HeatMapSelector = ({ selectedPathology }) => {
  return (
    <div style={{ display: 'fixed', alignItems: 'center' }}>
      {selectedPathology === "ANSIETAT" && <HeatMapANS />}
      {selectedPathology === "DEPRESSIO" && <HeatMapDEP />}
      {selectedPathology === "ESQZ" && <HeatMapESQZ />}
      {selectedPathology === "TCA" && <HeatMapTCA />}
    </div>
  );
};

export default HeatMapSelector;
