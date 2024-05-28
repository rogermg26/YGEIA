import React from 'react';
import Prediction2024 from '@/components/dashboard/incidence/prediction';

const PanelPrediccio = () => {
  return (
    <section>
      <div className="w-full max-w-full p-4 rounded" style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)', backgroundColor: '#0C4160FF', color: 'white', paddingLeft: '13px', fontFamily: 'Montserrat' }}>
        Predicció
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <iframe
          src="http://147.83.46.71:6001/determinants"
          title="External Website"
          width="100%"
          height="1000px"
          frameBorder="0"
          scrolling="no"
        />
      </div>
      <section className="flex flex-col lg:flex-row my-4 gap-3">
        <div className="flex flex-col items-center w-full lg:w-1/2 h-[800px] rounded" style={{ backgroundColor: '#f8f8f8', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)' }}>
          <div className="w-full max-w-full p-4 rounded mb-2" style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)', backgroundColor: '#0C4160FF', color: 'white', paddingLeft: '13px', fontFamily: 'Montserrat' }}>
            Evolució Temporal
          </div>
          <Prediction2024/>
        </div>
        <div className="flex flex-col items-center w-full lg:w-1/2 h-[800px] rounded" style={{ backgroundColor: '#f8f8f8', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)' }}>
          <img src="/YgeiaFinal.png" alt="YGEIA"/>
        </div>
      </section>
    </section>
  );
};

export default PanelPrediccio;
