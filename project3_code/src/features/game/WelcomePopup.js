import React from 'react';
import styles from './WelcomePopup.module.css'; // Import CSS module for styling

const WelcomePopup = () => {
  return (
    <div className={styles.welcomePopup}>
      <div className={styles.backgroundImageContainer}>
        <div className={styles.message}>
          <p>
            Instructions:  Welcome to Bust the Ghost! Your goal is to find the ghost hiding in the grid.
            Click on the cells to get hints about the ghost's location. Use the color
            and direction hints to narrow down your search. Good luck!
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;
