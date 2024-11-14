import React, { useState, useEffect } from 'react';
import Fabula from '../layouts/Fabula';
import SopaDeLetras from '../components/Sopadeletras';
import Ilustracion from '../components/Ilustracion';
import Boton from '../components/Boton';
import TextoConPalabrasOcultas from '../components/TextoConPalabrasOcultas'; // Import the component
import data from '../data/fabula.json';

const PaginaFabula = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [currentData, setCurrentData] = useState(data[0]);
  const [foundWords, setFoundWords] = useState([]);

  useEffect(() => {
    setCurrentData(data[currentIndex]);
    setFoundWords([]); // Reset found words when the index changes
  }, [currentIndex]);

  const handleCompletion = () => {
    setCompleted(true);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    setCompleted(false);
  };

  const handleWordFound = (word) => {
    setFoundWords((prevFoundWords) => [...prevFoundWords, word.toLowerCase()]);
  };

  return (
    <Fabula>
      <SopaDeLetras word1={currentData.word1} word2={currentData.word2} onComplete={handleCompletion} onWordFound={handleWordFound} />
      <TextoConPalabrasOcultas text={currentData.text} hiddenWords={[currentData.word1, currentData.word2]} foundWords={foundWords} />
      {completed && (
        <>
          <Ilustracion src={currentData.illustration} alt="Illustration" />
          <Boton text="Siguiente" route="#" onClick={handleNext} />
        </>
      )}
    </Fabula>
  );
};

export default PaginaFabula;