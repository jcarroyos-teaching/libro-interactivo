
import React from 'react';
import Fabula from '../layouts/Fabula';
import SopaDeLetras from '../components/Sopadeletras';

const PaginaFabula = () => {
  const text = "La liebre y la tortuga decidieron competir en una carrera.";

  return (
    <Fabula>
      <SopaDeLetras word1="liebre" word2="tortuga" text={text} />
    </Fabula>
  );
};

export default PaginaFabula;