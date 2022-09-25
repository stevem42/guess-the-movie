import styles from './Keyboard.module.css';
import GAME_STATES from '../../lib/gameStates';

const topRow = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
const middleRow = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
const bottomRow = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];

export const Keyboard = (props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        {topRow.map((letter) => {
          let correct = props.letters[letter];
          const inWord = letter in props.letters;

          return (
            <button
              key={letter}
              onClick={props.onClick}
              disabled={props.state != GAME_STATES.PLAYING || inWord}
              className={styles.row1}
              style={{
                backgroundColor: !inWord ? '' : correct ? 'green' : 'red',
              }}
            >
              {letter.toUpperCase()}
            </button>
          );
        })}
      </div>
      <div className={styles.row}>
        {middleRow.map((letter) => {
          let correct = props.letters[letter];
          const inWord = letter in props.letters;
          return (
            <button
              key={letter}
              onClick={props.onClick}
              disabled={props.state != GAME_STATES.PLAYING || inWord}
              className={styles.row2}
              style={{
                backgroundColor: !inWord ? '' : correct ? 'green' : 'red',
              }}
            >
              {letter.toUpperCase()}
            </button>
          );
        })}
      </div>
      <div className={styles.row}>
        {bottomRow.map((letter) => {
          let correct = props.letters[letter];
          const inWord = letter in props.letters;
          return (
            <button
              key={letter}
              onClick={props.onClick}
              disabled={props.state != GAME_STATES.PLAYING || inWord}
              className={styles.row3}
              style={{
                backgroundColor: !inWord ? '' : correct ? 'green' : 'red',
              }}
            >
              {letter.toUpperCase()}
            </button>
          );
        })}
      </div>
    </div>
  );
};
