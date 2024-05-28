import React from 'react';
import MapANS from './mapANS';
import MapDEP from './mapDEP';
import MapESQZ from './mapESQZ';
import MapTCA from './mapTCA';

const MapSelector = ({ selectedPathology }) => {
  return (
    <div style={{ display: 'fixed', alignItems: 'center' }}>
      {selectedPathology === "ANSIETAT" && <MapANS />}
      {selectedPathology === "DEPRESSIO" && <MapDEP />}
      {selectedPathology === "ESQZ" && <MapESQZ />}
      {selectedPathology === "TCA" && <MapTCA />}
    </div>
  );
};

export default MapSelector;
