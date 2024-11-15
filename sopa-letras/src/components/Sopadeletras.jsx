import React, { useRef, useState, useEffect, useMemo } from 'react';

const getRandomPosition = (rows, cols, wordLength, isVertical) => {
  const row = isVertical ? Math.floor(Math.random() * (rows - wordLength + 1)) : Math.floor(Math.random() * rows);
  const col = isVertical ? Math.floor(Math.random() * cols) : Math.floor(Math.random() * (cols - wordLength + 1));
  return { row, col };
};

const canPlaceWord = (grid, word, row, col, isVertical) => {
  if (!grid || !grid.length || !grid[0].length) return false;
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
  if (!rows || !cols || !words || !words.length) return [];
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

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!newGrid[row][col]) {
        newGrid[row][col] = String.fromCharCode(97 + Math.floor(Math.random() * 26)); 
      }
    }
  }

  return newGrid;
};

const SopaDeLetras = ({ word1, word2, onComplete, onWordFound = () => {}, setButtonVisible }) => {
  const rows = 7;
  const cols = 7;
  const words = useMemo(() => [word1.toLowerCase(), word2.toLowerCase()], [word1, word2]);
  const canvasRef = useRef(null);
  const [grid, setGrid] = useState([]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [completed, setCompleted] = useState(false);
  const cellSize = 30;

  useEffect(() => {
    const newGrid = generateGrid(rows, cols, words);
    setGrid(newGrid);
    setSelectedCells([]);
    setFoundWords([]);
    setCompleted(false);
  }, [rows, cols, words, word1, word2]);

  useEffect(() => {
    if (grid.length > 0 && grid[0].length > 0) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      drawGrid(ctx);
    }
  }, [grid, selectedCells, foundWords]);

  useEffect(() => {
    if (foundWords.length === words.length) {
      setCompleted(true);
      onComplete();
      setButtonVisible(true);
    }
  }, [foundWords, words, onComplete, setButtonVisible]);

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
        
        if (selectedCells.some(cell => cell.row === row && cell.col === col) ||
            foundWords.some(word => word.cells.some(cell => cell.row === row && cell.col === col))) {
          ctx.fillStyle = 'rgba(173, 216, 230, 0.6)';
          ctx.fillRect(x, y, cellSize, cellSize);
        }

        ctx.strokeStyle = '#000';
        ctx.strokeRect(x, y, cellSize, cellSize);

        ctx.fillStyle = '#000';
        ctx.fillText(letter, x + cellSize / 2, y + cellSize / 2);
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
      const selectedWord = selectedCells.map(cell => grid[cell.row][cell.col]).join('');
      const reversedSelectedWord = selectedCells.map(cell => grid[cell.row][cell.col]).reverse().join('');
      if (words.includes(selectedWord) || words.includes(reversedSelectedWord)) {
        setFoundWords([...foundWords, { word: selectedWord, cells: selectedCells }]);
        onWordFound(selectedWord);
      }
    }
    setSelectedCells([]);
    setIsMouseDown(false);
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const { row, col } = getCellAtPosition(touch.clientX - canvasRef.current.getBoundingClientRect().left, touch.clientY - canvasRef.current.getBoundingClientRect().top);
    setSelectedCells([{ row, col }]);
    setIsMouseDown(true);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    if (isMouseDown) {
      const touch = e.touches[0];
      const { row, col } = getCellAtPosition(touch.clientX - canvasRef.current.getBoundingClientRect().left, touch.clientY - canvasRef.current.getBoundingClientRect().top);
      const lastCell = selectedCells[selectedCells.length - 1];
      if (lastCell.row !== row || lastCell.col !== col) {
        setSelectedCells([...selectedCells, { row, col }]);
      }
    }
  };

  const handleTouchEnd = () => {
    handleMouseUp();
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        width={cols * cellSize}
        height={rows * cellSize}
        style={{ border: '1px solid black', touchAction: 'none' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => setIsMouseDown(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={() => setIsMouseDown(false)}
      />
    </>
  );
};

export default SopaDeLetras;