// src/components/SopaDeLetras.test.jsx
import React from 'react';
import { render } from '@testing-library/react';
import SopaDeLetras from './SopaDeLetras';

const checkWordInGrid = (grid, word) => {
  const rows = grid.length;
  const cols = grid[0].length;

  // Check horizontally
  for (let row = 0; row < rows; row++) {
    const rowString = grid[row].join('');
    if (rowString.includes(word)) {
      return true;
    }
  }

  // Check vertically
  for (let col = 0; col < cols; col++) {
    let colString = '';
    for (let row = 0; row < rows; row++) {
      colString += grid[row][col];
    }
    if (colString.includes(word)) {
      return true;
    }
  }

  return false;
};

test('SopaDeLetras contains word1 and word2', () => {
  const word1 = 'TORTUGA';
  const word2 = 'LIEBRE';
  const { container } = render(<SopaDeLetras word1={word1} word2={word2} rows={10} cols={10} />);
  
  const grid = Array.from(container.querySelectorAll('div > div')).map(div => div.textContent);
  const grid2D = [];
  while (grid.length) grid2D.push(grid.splice(0, 10));

  expect(checkWordInGrid(grid2D, word1)).toBe(true);
  expect(checkWordInGrid(grid2D, word2)).toBe(true);
});