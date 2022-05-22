import styles from './Keyboard.module.css';

const topRow = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
const middleRow = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
const bottomRow = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];

export const Keyboard = (props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        {topRow.map((letter) => {
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
        })}
      </div>
      <div className={styles.row}>
        {middleRow.map((letter) => {
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
        })}
      </div>
      <div className={styles.row}>
        {bottomRow.map((letter) => {
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
        })}
      </div>
    </div>
  );
};

//   return (
//     <div className={styles.holder}>
//       {letters.map((letter, index) => {
//         if (index < 9) {
//           return (
//             <button
//               key={letter}
//               onClick={props.onClick}
//               disabled={
//                 props.state != 'playing' || props.letters.includes(letter)
//               }
//               className={styles.row1}
//             >
//               {letter.toUpperCase()}
//             </button>
//           );
//         } else if (index < 19) {
//           return (
//             <button
//               key={letter}
//               onClick={props.onClick}
//               disabled={
//                 props.state != 'playing' || props.letters.includes(letter)
//               }
//               className={styles.row2}
//             >
//               {letter.toUpperCase()}
//             </button>
//           );
//         } else {
//           return (
//             <button
//               key={letter}
//               onClick={props.onClick}
//               disabled={
//                 props.state != 'playing' || props.letters.includes(letter)
//               }
//               className={styles.row3}
//             >
//               {letter.toUpperCase()}
//             </button>
//           );
//         }
//       })}
//     </div>
//   );
// };
