// src/pages/Instrucciones.jsx
import React from 'react';
import Portada from '../layouts/Portada';
import Texto from '../components/Texto';
import Boton from '../components/Boton';

const Instrucciones = () => {
  return (
    <Portada>
      <Texto content="¿Cómo se juega?" type="h1" />
      <Texto 
        content="Busca las dos palabras en la sopa de letras ¡Es muy sencillo!" 
        type="p" 
      />
      <Texto 
        content="Lee la historia y haz clic en la flecha para continuar con la historia" 
        type="p" 
      />
      <Boton 
        text="¡A leer!" 
        color="#7D50A6"
        route="/fabula" 
        aria-label="Ir a la fábula" 
      />
    </Portada>
  );
};

export default Instrucciones;
