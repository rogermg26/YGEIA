import React from 'react';

const Panel = () => {
  return (
    <section>
    <div className="w-full max-w-full p-4 rounded" style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)', backgroundColor: '#0C4160FF', color: 'white', paddingLeft:'13px', fontFamily:'Montserrat'}}>
      Rellevància de Factors sobre cada Patologia
    </div>
    <div style={{ display: 'flex',justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
      <iframe
        src="http://147.83.46.71:6001/variable_analyzer"
        title="External Website"
        width="100%"
        height="1000px"
        frameBorder="0"
        scrolling="no"
      />
    </div>
    </section>
  );
};

export default Panel;