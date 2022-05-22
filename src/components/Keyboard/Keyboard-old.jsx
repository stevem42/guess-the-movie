import styles from './Keyboard.module.css';

const letters = [
  'q',
  'w',
  'e',
  'r',
  't',
  'y',
  'u',
  'i',
  'o',
  'p',
  'a',
  's',
  'd',
  'f',
  'g',
  'h',
  'j',
  'k',
  'l',
  'z',
  'x',
  'c',
  'v',
  'b',
  'n',
  'm',
];

export const Keyboard = (props) => {
  return (
    <div className={styles.holders}>
      {letters.map((letter, index) => {
        if (index < 9) {
          return (
            <button
              key={letter}
              onClick={props.onClick}
              disabled={
                props.state != 'playing' || props.letters.includes(letter)
              }
              className={styles.row1}
            >
              {letter.toUpperCase()}
            </button>
          );
        } else if (index < 19) {
          return (
            <button
              key={letter}
              onClick={props.onClick}
              disabled={
                props.state != 'playing' || props.letters.includes(letter)
              }
              className={styles.row2}
            >
              {letter.toUpperCase()}
            </button>
          );
        } else {
          return (
            <button
              key={letter}
              onClick={props.onClick}
              disabled={
                props.state != 'playing' || props.letters.includes(letter)
              }
              className={styles.row3}
            >
              {letter.toUpperCase()}
            </button>
          );
        }
      })}
    </div>
  );
};
