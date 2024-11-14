import React from 'react';

const getRandomPosition = (rows, cols, wordLength, isVertical) => {
  const row = isVertical ? Math.floor(Math.random() * (rows - wordLength + 1)) : Math.floor(Math.random() * rows);
  const col = isVertical ? Math.floor(Math.random() * cols) : Math.floor(Math.random() * (cols - wordLength + 1));
  return { row, col };
};

const canPlaceWord = (grid, word, row, col, isVertical) => {
  for (let i = 0; i < word.length; i++) {
    const currentRow = isVertical ? row + i : row;
    const currentCol = isVertical ? col : col + i;
    if (grid[currentRow][currentCol] !== '' && grid[currentRow][currentCol] !== word[i]) {
      return false;
    }
  }
  return true;
};

const placeWord = (grid, word, row, col, isVertical) => {
  for (let i = 0; i < word.length; i++) {
    const currentRow = isVertical ? row + i : row;
    const currentCol = isVertical ? col : col + i;
    grid[currentRow][currentCol] = word[i];
  }
};

const generateGrid = (rows, cols, word1, word2) => {
  // Crear una grilla vacía
  const grid = Array.from({ length: rows }, () => Array(cols).fill(''));

  // Insertar la primera palabra en una posición aleatoria
  let isVertical1 = Math.random() < 0.5;
  let { row: row1, col: col1 } = getRandomPosition(rows, cols, word1.length, isVertical1);
  while (!canPlaceWord(grid, word1, row1, col1, isVertical1)) {
    isVertical1 = Math.random() < 0.5;
    ({ row: row1, col: col1 } = getRandomPosition(rows, cols, word1.length, isVertical1));
  }
  placeWord(grid, word1, row1, col1, isVertical1);

  // Insertar la segunda palabra en una posición aleatoria
  let isVertical2 = Math.random() < 0.5;
  let { row: row2, col: col2 } = getRandomPosition(rows, cols, word2.length, isVertical2);
  while (!canPlaceWord(grid, word2, row2, col2, isVertical2) || 
         (isVertical1 && isVertical2 && col1 === col2 && row2 >= row1 && row2 < row1 + word1.length) ||
         (!isVertical1 && !isVertical2 && row1 === row2 && col2 >= col1 && col2 < col1 + word1.length) ||
         (isVertical1 && !isVertical2 && col2 >= col1 && col2 < col1 + word1.length && row2 >= row1 && row2 < row1 + word1.length) ||
         (!isVertical1 && isVertical2 && col1 >= col2 && col1 < col2 + word2.length && row1 >= row2 && row1 < row2 + word2.length)) {
    isVertical2 = Math.random() < 0.5;
    ({ row: row2, col: col2 } = getRandomPosition(rows, cols, word2.length, isVertical2));
  }
  placeWord(grid, word2, row2, col2, isVertical2);

  // Rellenar el resto de la grilla con letras aleatorias
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === '') {
        grid[row][col] = letters[Math.floor(Math.random() * letters.length)];
      }
    }
  }

  return grid;
};

const SopaDeLetras = ({ word1, word2, rows = 7, cols = 7 }) => {
  const grid = generateGrid(rows, cols, word1, word2);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 30px)`, gap: '5px' }}>
      {grid.flat().map((letter, index) => (
        <div
          key={index}
          style={{
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #000',
            fontSize: '20px',
          }}
        >
          {letter}
        </div>
      ))}
    </div>
  );
};

export default SopaDeLetras;