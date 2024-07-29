import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cell_clicked, bustAttempt, RestartGame, peep } from './gameSlice';
import styles from './Game.module.css';
import WelcomePopup from './WelcomePopup'; // Import your popup component

const Game = () => {
  const dispatch = useDispatch();
  const { grid, showProbabilities, score, attempts, gameOver, win, directionHint } = useSelector((state) => state.game);
  const [showCongratulations, setShowCongratulations] = useState(false);

  const handleCellClick = (x, y) => {
    if (!gameOver) {
      dispatch(cell_clicked({ x, y }));
    }
  };

  const handleBustAttempt = (x, y) => {
    if (!gameOver && attempts > 0) {
      dispatch(bustAttempt({ x, y }));
    }
  };

  // Function to find the cell with the highest probability
  const findHighestProbabilityCell = () => {
    let maxProbability = 0;
    let cellCoords = { x: 0, y: 0 };

    grid.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (cell.probability > maxProbability) {
          maxProbability = cell.probability;
          cellCoords = { x: rowIndex, y: cellIndex };
        }
      });
    });

    return cellCoords;
  };

  const handleCongratulations = () => {
    setShowCongratulations(true);
  };

  return (
    <main className={styles.main}>
      <div className={styles.gridContainer}>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.row}>
            {row.map((cell, cellIndex) => (
              <div
                key={cellIndex}
                className={styles.cell}
                style={{ backgroundColor: cell.color }}
                onClick={() => handleCellClick(rowIndex, cellIndex)}
              >
                {showProbabilities && (
                  <span className={styles.probability}>
                    {cell.probability.toFixed(2)}
                  </span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.sidePanel}>
        {/* WelcomePopup with message positioned next to the grid */}
        <WelcomePopup />
        
        <div className={styles.directionHint}>
          Direction: {directionHint || 'Unknown'}
        </div>
        <div className={styles.controls}>
          <button
            className={styles.button}
            onClick={() => dispatch(peep())}
          >
           Peep
          </button>
          <button
            className={styles.button}
            onClick={() =>
              handleBustAttempt(
                findHighestProbabilityCell().x,
                findHighestProbabilityCell().y
              )
            }
            disabled={attempts <= 0 || gameOver}
          >
            Bust
          </button>
          <button
            className={styles.button}
            onClick={() => dispatch(RestartGame())}
          >
            Restart Game
          </button>
          <div className={styles.info}>
            <div>Score: {score}</div>
            <div>Attempts Left: {attempts}</div>
            {/* Game over message */}
            {gameOver && (
              <div
                className={`${styles.gameOverMessage} ${
                  win ? styles.winMessage : styles.lossMessage
                }`}
              >
                {win
                  ? 'Congratulations, you have found the ghost'
                  : 'Game over, try again'}
              </div>
            )}
            {/* Congratulations message */}
            {gameOver && win && !showCongratulations && (
              <button
                className={styles.button}
                onClick={handleCongratulations}
              >
                Show Congratulations
              </button>
            )}
            {/* Display the congratulations message */}
            {showCongratulations && (
              <div className={styles.congratulationsMessage}>
                Congratulations!
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Game;
