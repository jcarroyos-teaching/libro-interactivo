import React, { useState, useEffect } from 'react';
import Fabula from '../layouts/Fabula';
import SopaDeLetras from '../components/Sopadeletras';
import Ilustracion from '../components/Ilustracion';
import Boton from '../components/Boton';
import TextoConPalabrasOcultas from '../components/TextoConPalabrasOcultas';
import data from '../data/fabula.json';

const PaginaFabula = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [currentData, setCurrentData] = useState(data[0]);
  const [foundWords, setFoundWords] = useState([]);

  useEffect(() => {
    setCurrentData(data[currentIndex]);
  }, [currentIndex]);

  const handleCompletion = () => {
    setCompleted(true);
  };

  const handleNext = () => {
    setFoundWords([]);
    setCompleted(false);
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % data.length;
      setCurrentData(data[newIndex]);
      return newIndex;
    });
  };

  const isLastIndex = currentIndex === data.length - 1;

  const handleWordFound = (word) => {
    const normalizedWord = word.toLowerCase();
    setFoundWords((prevFoundWords) => 
      prevFoundWords.includes(normalizedWord) ? prevFoundWords : [...prevFoundWords, normalizedWord]
    );
  };

  return (
    <Fabula>
      <SopaDeLetras 
        word1={currentData.word1} 
        word2={currentData.word2} 
        onComplete={handleCompletion} 
        onWordFound={handleWordFound} 
      />
      <TextoConPalabrasOcultas 
        text={currentData.text} 
        hiddenWords={[currentData.word1.toLowerCase(), currentData.word2.toLowerCase()]} 
        foundWords={foundWords} 
      />
      <Ilustracion src={currentData.illustration} alt="Illustration" />
      {completed && (
        <Boton text={isLastIndex ? "Reiniciar" : "Siguiente"} route={isLastIndex ? "/" : "#"} onClick={handleNext} />
      )}
    </Fabula>
  );
};

export default PaginaFabula;
