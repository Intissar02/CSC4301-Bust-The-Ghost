import { createSlice } from '@reduxjs/toolkit';
import { calculateDistance, getColorBasedOnDistance, getDirection } from './utils';

// Function to update probabilities based on direction and color
function updateProbabilitiesWithDirectionAndColor(state, color, direction, x, y) {
  let totalProb = 0;
  
  state.grid.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      const cellDistance = calculateDistance(x, y, rowIndex, cellIndex);
      const cellDirection = getDirection(x, y, rowIndex, cellIndex);
      const distanceInfluence = sensorModel(cellDistance)[color];
      
      let directionInfluence = 0.5; 
      if (cellDirection === direction) directionInfluence = 1;

      cell.probability *= distanceInfluence * directionInfluence;
      totalProb += cell.probability;
    });
  });

  // Normalize probabilities
  state.grid.forEach(row => {
    row.forEach(cell => {
      cell.probability /= totalProb;
    });
  });
}

const initialState = {
  grid: Array.from({ length: 9 }, () => Array(12).fill({ color: 'white', probability: 1 / (9 * 12) })),
  ghostLocation: { x: Math.floor(Math.random() * 9), y: Math.floor(Math.random() * 12) },
  score: 20,
  attempts: 3,
  gameOver: false,
  win: false,
  showProbabilities: false,
  totalClicks: 0,
  directionHint: null,
};

// Sensor model based on distance
const sensorModel = (distance) => ({
  'red': distance === 0 ? 1.0 : 0.0,
  'orange': distance <= 2 && distance > 0 ? 0.9 : 0.0,
  'yellow': distance <= 4 && distance > 2 ? 0.7 : 0.0,
  'green': distance > 4 ? 0.5 : 0.0,
});

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    cell_clicked: (state, action) => {
      if (state.gameOver) return;

      const { x, y } = action.payload;
      const distance = calculateDistance(x, y, state.ghostLocation.x, state.ghostLocation.y);
      const color = getColorBasedOnDistance(distance);
      const direction = getDirection(x, y, state.ghostLocation.x, state.ghostLocation.y);

      state.grid[x][y].color = color; // feedback based on the color
      if (x === state.ghostLocation.x && y === state.ghostLocation.y) {
        state.directionHint = 'Here is the ghost';
      } else {
        // if not set the direction based on the ghost's relative position
        const direction = getDirection(x, y, state.ghostLocation.x, state.ghostLocation.y);
        state.directionHint = direction;
      }

      updateProbabilitiesWithDirectionAndColor(state, color, direction, x, y);

      state.score -= 1; // after one click a point is deducted 
      if (state.score <= 0) state.gameOver = true;
    },
    bustAttempt: (state, action) => {
      const { x, y } = action.payload;
      if (x === state.ghostLocation.x && y === state.ghostLocation.y) {
        state.win = true;
        state.gameOver = true;
      } else {
        state.attempts -= 1;
        if (state.attempts === 0) state.gameOver = true;
      }
    },
  RestartGame: (state) => {
      Object.assign(state, initialState);
      state.ghostLocation = { x: Math.floor(Math.random() * 9), y: Math.floor(Math.random() * 12) };
    },
   peep: (state) => {
      state.showProbabilities = !state.showProbabilities;
    },
  },
});

export const { cell_clicked, bustAttempt, RestartGame, peep } = gameSlice.actions;

export default gameSlice.reducer;
