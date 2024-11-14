// src/pages/Instrucciones.jsx
import React from 'react';
import Portada from '../layouts/Portada';
import Texto from '../components/Texto';
import Boton from '../components/Boton';

const Instrucciones = () => {
  return (
    <Portada>
      <Texto content="Instrucciones" type="h1" />
      <Texto content="Aquí van las instrucciones para usar la aplicación." type="p" />
      <Texto content="Aquí van las instrucciones para usar la aplicación." type="p" />
      <Boton text="A leer" color="green" route="/pagina-1" />
      
    </Portada>
  );
};

export default Instrucciones;