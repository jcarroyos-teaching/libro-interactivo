import React, { useState, useEffect } from 'react';

const TextoConPalabrasOcultas = ({ text, hiddenWords, foundWords }) => {
  const renderText = () => {
    let parts = text.split(new RegExp(`(${hiddenWords.join('|')})`, 'gi'));
    return parts.map((part, index) => {
      if (hiddenWords.includes(part.toLowerCase())) {
        return (
          <span
            key={index}
            style={{ textDecoration: foundWords.includes(part.toLowerCase()) ? 'underline' : 'none' }}
          >
            {foundWords.includes(part.toLowerCase()) ? part : '______'}
          </span>
        );
      }
      return part;
    });
  };

  return <div>{renderText()}</div>;
};

export default TextoConPalabrasOcultas;