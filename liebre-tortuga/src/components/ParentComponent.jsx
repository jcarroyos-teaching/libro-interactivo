
import React, { useState } from 'react';
import SopaDeLetras from './SopaDeLetras';
import TextoConPalabrasOcultas from './TextoConPalabrasOcultas';

const ParentComponent = () => {
  const [foundWords, setFoundWords] = useState([]);

  const handleWordFound = (word) => {
    setFoundWords([...foundWords, word]);
  };

  return (
    <div>
      <SopaDeLetras word1="example1" word2="example2" onComplete={() => console.log('Complete')} onWordFound={handleWordFound} />
      <TextoConPalabrasOcultas text="This is an example text with hidden words." hiddenWords={['example1', 'example2']} foundWords={foundWords} />
    </div>
  );
};

export default ParentComponent;