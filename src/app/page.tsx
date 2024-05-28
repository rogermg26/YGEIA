'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Button from '@mui/material/Button';
import LoginPage from '@/components/inici/login';
import {createTheme, ThemeProvider } from '@mui/material';
import { orange } from '@mui/material/colors';

const separation = 40; // Separació entre imatges

const HoverImage = () => {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  const handleMouseEnter = (image: string) => {
    setHoveredImage(image);
  };

  const handleMouseLeave = () => {
    setHoveredImage(null);
  };

  /* Scroll*/
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <div style={{ fontFamily: 'Montserrat, sans-serif', color: 'white', fontSize: '30px', width: '100%', backgroundColor: '#0c4160ff', padding: '40px 0', textAlign: 'center' }}>
        <h1>YGEIA DATA ANALYTICS</h1>
      </div>

      {/* ÍNDEX D'IMATGES */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px', marginBottom: '20px'}}>
        <HoveredImage src="/ProjecteY.svg" alt="First Image" buttonLabel="Projecte" isHovered={hoveredImage === "first"} onMouseEnter={() => handleMouseEnter("first")} onMouseLeave={handleMouseLeave} onClick={() => scrollToSection("projecte")} />
        <div style={{ marginLeft: separation }} /> 
        <HoveredImage src="/DashY.svg" alt="Second Image" buttonLabel="Dashboard" isHovered={hoveredImage === "second"} onMouseEnter={() => handleMouseEnter("second")} onMouseLeave={handleMouseLeave} onClick={() => scrollToSection("login")} />
        <div style={{ marginRight: separation }} />
        <HoveredImage src="/AUs.svg" alt="Third Image" buttonLabel="About Us" isHovered={hoveredImage === "third"} onMouseEnter={() => handleMouseEnter("third")} onMouseLeave={handleMouseLeave} onClick={() => scrollToSection("aboutus")} />
      </div>

      {/* PROJECTE */}
      <div id="projecte" style={{ height: '100px', textAlign: 'center' , fontSize: '30px', padding: '40px 0', color: '#ffab40ff', fontFamily: 'Montserrat, sans-serif'}}>
          <h3>PROJECTE</h3>
        </div>
      <div style={{ fontFamily: 'Montserrat, sans-serif', marginBottom: '60px', textAlign: 'center', maxWidth: '980px', margin: '0 auto', textAlign: "justify" }}>
        <p style={{ marginBottom: '20px' }}>
          El present projecte té com a objectiu principal abordar els reptes crítics que el sistema de salut pública de Catalunya enfronta en relació amb la salut mental. En un context marcat per la ràpida evolució tecnològica i els profunds impactes de la pandèmia de la COVID-19 en l’àmbit sanitari, s’ha identificat la necessitat imperiosa de prioritzar la salut mental i situar-la a l’avantguarda de les estratègies de gestió de recursos sanitaris. Aquesta urgència es basa en la comprensió dels determinants socials i de salut que influeixen en les patologies mentals, així com en la importància de proporcionar intervencions preventives i curatives eficaces. 
        </p>
        <p style={{ marginBottom: '20px' }}>
          Una part fonamental d’aquest projecte és la integració de dades sanitàries i públiques. A través de la recopilació i anàlisi d’aquestes dades, es pretén obtenir una visió global i detallada de la salut mental a Catalunya. Aquesta integració de dades servirà com a fonament per al desenvolupament de models predictius i d’anàlisi que permetin identificar tendències, factors de risc i oportunitats d’intervenció. Així doncs, la implementació d’un quadre de control interactiu jugarà un paper clau en la presentació i visualització d’aquests resultats, facilitant la presa de decisions informades per part dels responsables de la salut pública i altres interessats. 
        </p>
        <p style={{ marginBottom: '20px' }}>
          En aquest cas, doncs, s'ha creat un Dashboard que permet la visualització de la Prevalença i la Incidència entre municipis, facilitant també la comparativa entre ciutats i/o pobles similars en base aquests paràmetres. Tanmateix, el quadre de control permet interactuar amb els factors sociodemogràfics i socioeconòmics que poden inferir directament en les patologies de salut mental. Una de les pestanyes, està dedicada a copsar el pes de cada factor envers les patologies, per a intentar identificar els determinants que suposen augments o decrements de la Incidència.
        </p>
        <p>
          Aquest projecte, doncs, representa un pas significatiu cap a una gestió més eficient i holística de la salut mental a Catalunya. Amb una combinació d’innovació tecnològica, anàlisi de dades i col·laboració interdisciplinària, s’està treballant per millorar el benestar mental de la població i construir un sistema de salut més resistent.
        </p>
      </div>
      <div style={{ height: '100px' }}></div>
      
      {/* LOGIN */}
      <div id="login" style={{ height: '100px', backgroundColor: '#0c4160ff', textAlign: 'center' , fontSize: '30px', padding: '40px 0', color: '#ffab40ff', fontFamily: 'Montserrat, sans-serif'}}>
        <h3>DASHBOARD</h3>
      </div>
      <div  style={{ backgroundColor: '#0c4160ff'}}>
        <div style={{ fontFamily: 'Montserrat, sans-serif', marginTop: '400px', textAlign: 'center', margin: '0 auto', textAlign: "justify"  }}>
         <LoginPage></LoginPage>
      </div>
      <div style={{ height: '100px', backgroundColor: '#0c4160ff' }}></div>
      </div>

      {/* ABOUT US */}
      <div id="aboutus" style={{ fontFamily: 'Montserrat, sans-serif', marginBottom: '60px', textAlign: 'center', maxWidth: '980px', margin: '0 auto', textAlign: "justify", padding: '20px 0'  }}>
        <div style={{ height: '100px', textAlign: 'center' , fontSize: '30px', padding: '40px 0', color: '#ffab40ff'}}>
          <h3>ABOUT US</h3>
        </div>
        <p> 10 estudiants del Grau en Ciència i Enginyeria de Dades de la Universitat Politècnica de Catalunya han sigut els desenvolupadors de l'eina web: 
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' , textAlign:'center', marginBottom:'30px'}}>
          <div style={{ flex: 1, paddingRight: '10px', textAlign: 'left' }}>
              <p>Laia Álvarez Capell <span style={{ fontSize: '12px', color: '#666' }}>laia.alvarez.capell@estudiantat.upc.edu</span></p>
              <p>Pau Amargant Álvarez <span style={{ fontSize: '12px', color: '#666' }}>pau.amargant@estudiantat.upc.edu</span></p>
              <p>Carlos Arbonés Sotomayor <span style={{ fontSize: '12px', color: '#666' }}>carlos.arbones@estudiantat.upc.edu</span></p>          
              <p>Mireia Fernández Valls <span style={{ fontSize: '12px', color: '#666' }}>mireia.fernandez.valls@estudiantat.upc.edu</span></p>
              <p>Alba García Ochoa <span style={{ fontSize: '12px', color: '#666' }}>alba.garcia.ochoa@estudiantat.upc.edu</span></p>           
          </div>
          <div style={{ flex: 1, paddingLeft: '10px', textAlign: 'left' }}>
              <p>Eva Jiménez Vargas <span style={{ fontSize: '12px', color: '#666' }}>eva.jimenez.vargas@estudiantat.upc.edu</span></p>
              <p>Ricardo Luque Echevarría <span style={{ fontSize: '12px', color: '#666' }}>ricardo.luque@estudiantat.upc.edu</span></p>
              <p>Roger Martínez Gilibets <span style={{ fontSize: '12px', color: '#666' }}>roger.martinez.gilibets@estudiantat.upc.edu</span></p>
              <p>Lluc Palou Masmartí <span style={{ fontSize: '12px', color: '#666' }}>lluc.palou@estudiantat.upc.edu</span></p>
              <p>Benet Ramió Comas  <span style={{ fontSize: '12px', color: '#666' }}>benet.ramio@estudiantat.upc.edu</span></p>          
          </div>
      </div>
      <div style={{ backgroundColor: '#0c4160ff', textAlign: 'center', padding: '10px 10px', maxWidth: '980px', margin: '0 auto', borderRadius: '5px', marginBottom:'20px'}}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <img src="/IM_LAIA.jpg" alt="Laia" style={{ width: '175px', height: '233px', margin: '5px 10px' }} />
          <img src="/IM_PAU.jpg" alt="Pau" style={{ width: '175px', height: '233px', margin: '5px 10px' }} />
          <img src="/IM_CARLOS.jpg" alt="Carlos" style={{ width: '175px', height: '233px', margin: '5px 10px' }} />
          <img src="/IM_MIREIA.jpg" alt="Mireia" style={{width: '175px', height: '233px', margin: '5px 10px' }} />
          <img src="/IM_ALBA.png" alt="Alba" style={{ width: '175px', height: '233px', margin: '5px 10px' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src="/IM_EVA.jpg" alt="Eva" style={{ width: '175px', height: '233px', margin: '0 10px' }} />
          <img src="/IM_RICARDO.jpg" alt="Ricardo" style={{width: '175px', height: '233px', margin: '0 10px' }} />
          <img src="/IM_ROGER.jpg" alt="Roger" style={{ width: '175px', height: '233px', margin: '0 10px' }} />
          <img src="/IM_LLUC.jpg" alt="Lluc" style={{ width: '175px', height: '233px', margin: '0 10px' }} />
          <img src="/IM_BENET.jpg" alt="Benet" style={{ width: '175px', height: '233px', margin: '0 10px' }} />
        </div>
      </div>
      <p> Tanmateix, la tutorització del projecte ha sigut proporcionada per:</p> 
      <div style={{ display: 'flex', justifyContent: 'space-between' , textAlign:'center', marginBottom:'30px'}}>
        <div style={{ flex: 1, paddingRight: '10px', textAlign: 'center' }}>
          Elisenda Bonet i Carné <span style={{ fontSize: '12px', color: '#666' }}>elisenda.bonet@upc.edu</span>
        </div>
        <div style={{ flex: 1, paddingLeft: '10px', textAlign: 'center' }}>
        Jose Adrian Rodriguez Fonollosa <span style={{ fontSize: '12px', color: '#666' }}>jose.fonollosa@upc.edu</span>
        </div>         
      </div>
      </div>
      <div style={{ height: '100px' }}></div>
    </div>
  );
};


{/* Color dels Botons */}
const theme = createTheme({
  palette: {
    primary: {
      main: orange[400], // Blue color from MUI palette
    },
    secondary: {
      main: orange[500], // Green color from MUI palette
    },
  },
});



{/* Props del Hover de les Imatges*/}
interface HoveredImageProps {
  src: string;
  alt: string;
  buttonLabel: string;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick?: () => void; // Permetre el click a la imatge
}

{/* Hover de les Imatges*/}
const HoveredImage: React.FC<HoveredImageProps> = ({ src, alt, buttonLabel, isHovered, onMouseEnter, onMouseLeave, onClick }) => {
  // Estat del Hover
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  return (
    <div style={{ position: 'relative', width: '300px', height: '300px', borderRadius: '8px', overflow: 'hidden', marginRight: 0 }} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick}>
      <Image
        src={src}
        alt={alt}
        layout="fill"
        objectFit="cover"
        style={{ 
          filter: `blur(${isHovered ? '2px' : '0'}) saturate(${isHovered ? '0.9' : '1'})`, // Enfosquir la imatge, i canviar el color
          transition: 'filter 0.5s ease', // Transició suau del filtre, 
          transform: `scale(${isHovered ? 1.05 : 1})`, // Aplicar un petit zoom quan el cursor és a sobre
          transition: 'transform 0.5s ease', 
        }}
      />
      <ThemeProvider theme={theme}>
      <Button
        variant="contained"
        color="primary"
        style={{
          color: 'white',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${(isHovered || isButtonHovered) ? 1 : 0})`,
          opacity: (isHovered || isButtonHovered) ? 1 : 0,
          transition: 'transform 0.3s ease, opacity 0.3s ease'
        }}
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
        onClick={(e) => {
          e.stopPropagation(); 
          onClick && onClick(); 
        }}
      >
        {buttonLabel}
      </Button>
      </ThemeProvider>
    </div>
  );
};

export default HoverImage;
