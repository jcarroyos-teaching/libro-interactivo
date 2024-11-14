import React, { useRef, useState, useEffect, useMemo } from 'react';
import TextoConPalabrasOcultas from './TextoConPalabrasOcultas';

const getRandomPosition = (rows, cols, wordLength, isVertical) => {
  const row = isVertical ? Math.floor(Math.random() * (rows - wordLength + 1)) : Math.floor(Math.random() * rows);
  const col = isVertical ? Math.floor(Math.random() * cols) : Math.floor(Math.random() * (cols - wordLength + 1));
  return { row, col };
};

const canPlaceWord = (grid, word, row, col, isVertical) => {
  for (let i = 0; i < word.length; i++) {
    const currentRow = isVertical ? row + i : row;
    const currentCol = isVertical ? col : col + i;
    if (currentRow >= grid.length || currentCol >= grid[0].length || 
        (grid[currentRow][currentCol] && grid[currentRow][currentCol] !== word[i])) {
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

const generateGrid = (rows, cols, words) => {
  const newGrid = Array.from({ length: rows }, () => Array(cols).fill(''));

  words.forEach(word => {
    let placed = false;
    while (!placed) {
      const isVertical = Math.random() < 0.5;
      const { row, col } = getRandomPosition(rows, cols, word.length, isVertical);
      if (canPlaceWord(newGrid, word, row, col, isVertical)) {
        placeWord(newGrid, word, row, col, isVertical);
        placed = true;
      }
    }
  });

  // Fill the rest of the grid with random letters in lowercase
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!newGrid[row][col]) {
        newGrid[row][col] = String.fromCharCode(97 + Math.floor(Math.random() * 26)); // a-z
      }
    }
  }

  return newGrid;
};

const SopaDeLetras = ({ word1, word2, text }) => {
  const rows = 7;
  const cols = 7;
  const words = useMemo(() => [word1.toLowerCase(), word2.toLowerCase()], [word1, word2]);
  const canvasRef = useRef(null);
  const [grid, setGrid] = useState([]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const cellSize = 30;

  useEffect(() => {
    const newGrid = generateGrid(rows, cols, words);
    setGrid(newGrid);
  }, [rows, cols, words]);

  useEffect(() => {
    if (grid.length > 0 && grid[0].length > 0) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      drawGrid(ctx);
    }
  }, [grid, selectedCells, foundWords]);

  const drawGrid = (ctx) => {
    ctx.clearRect(0, 0, cols * cellSize, rows * cellSize);
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const letter = grid[row][col];
        const x = col * cellSize;
        const y = row * cellSize;
        
        // Draw cell background if selected or part of a found word
        if (selectedCells.some(cell => cell.row === row && cell.col === col) ||
            foundWords.some(word => word.cells.some(cell => cell.row === row && cell.col === col))) {
          ctx.fillStyle = 'rgba(173, 216, 230, 0.6)'; // light blue
          ctx.fillRect(x, y, cellSize, cellSize);
        }

        ctx.strokeStyle = '#000';
        ctx.strokeRect(x, y, cellSize, cellSize); // Draw cell border

        ctx.fillStyle = '#000';
        ctx.fillText(letter, x + cellSize / 2, y + cellSize / 2); // Draw letter
      }
    }
  };

  const getCellAtPosition = (x, y) => ({
    row: Math.floor(y / cellSize),
    col: Math.floor(x / cellSize)
  });

  const handleMouseDown = (e) => {
    const { row, col } = getCellAtPosition(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setSelectedCells([{ row, col }]);
    setIsMouseDown(true);
  };

  const handleMouseMove = (e) => {
    if (isMouseDown) {
      const { row, col } = getCellAtPosition(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      const lastCell = selectedCells[selectedCells.length - 1];
      if (lastCell.row !== row || lastCell.col !== col) {
        setSelectedCells([...selectedCells, { row, col }]);
      }
    }
  };

  const handleMouseUp = () => {
    if (words && words.length > 0) {
      // Check if selected cells match any word
      const selectedWord = selectedCells.map(cell => grid[cell.row][cell.col]).join('');
      const reversedSelectedWord = selectedCells.map(cell => grid[cell.row][cell.col]).reverse().join('');
      if (words.includes(selectedWord) || words.includes(reversedSelectedWord)) {
        console.log(`Found word: ${selectedWord}`);
        setFoundWords([...foundWords, { word: selectedWord, cells: selectedCells }]);
      }
    }
    setSelectedCells([]);
    setIsMouseDown(false);
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        width={cols * cellSize}
        height={rows * cellSize}
        style={{ border: '1px solid black' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => setIsMouseDown(false)}
      />
      <TextoConPalabrasOcultas text={text} hiddenWords={words} foundWords={foundWords.map(fw => fw.word)} />
    </>
  );
};

export default SopaDeLetras;