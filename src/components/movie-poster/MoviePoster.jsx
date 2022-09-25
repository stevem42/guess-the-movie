import React from 'react';
import GAME_STATES from '../../lib/gameStates';
import styles from './MoviePoster.module.css';

export const MoviePoster = ({ gameState, flash, poster }) => {
  return (
    <div className={styles.playContainer}>
      <div
        className={styles.posterContainer}
        style={{ border: `5px solid ${flash}` }}
      >
        <img
          src={poster}
          width="100%"
          height="100%"
          className={
            gameState === GAME_STATES.PLAYING
              ? styles.posterBlur
              : gameState === GAME_STATES.WON
              ? styles.poster + ' won'
              : styles.poster + ' lost'
          }
          alt="movie-poster"
        />
      </div>
    </div>
  );
};

// states: setup, playing, won, lost;
