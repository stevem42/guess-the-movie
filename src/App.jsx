import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { movieList } from './lib/movieList';

function App() {
  const GAME_STATES = Object.freeze({
    PLAYING: 'playing',
    WON: 'won',
    LOST: 'lost',
    SETUP: 'setup',
  });

  const [movie, setMovie] = useState(
    movieList[Math.floor(Math.random() * movieList.length)]
  );
  const [hashed, setHashed] = useState('');

  const [gameState, setGameState] = useState('setup');

  console.log(gameState);

  const [count, setCount] = useState(0);

  const [data, setData] = useState('');

  const letters = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];

  const hashWord = (word) => {
    let hashed = '';

    for (const letter of word) {
      letter.toLowerCase() !== letter.toUpperCase()
        ? (hashed += '_')
        : (hashed += letter);
    }

    setHashed(hashed);
  };

  const setupGame = () => {
    if (gameState === 'setup') {
      hashWord(movie);
      setGameState(GAME_STATES.PLAYING);
    }
  };

  const checkWin = () => {
    if (hashed === movie) {
      setGameState(GAME_STATES.WON);
      //alert('YOU WON');
      console.log('WIN');
    }
  };

  useEffect(() => {
    console.log(movie);
    setupGame();
    checkWin();
    console.log(hashed);
  }, [hashed]);

  const checkLetter = async (letter) => {
    let updatedWord = hashed;

    let index = 0;
    for (let char of movie) {
      if (letter === char.toLowerCase()) {
        updatedWord =
          updatedWord.substring(0, index) +
          char +
          updatedWord.substring(index + 1);
      }
      index++;
      console.log(updatedWord);
    }
    setHashed(updatedWord);
  };

  const onLetterPress = async (e) => {
    const letter = e.target.innerText;

    checkLetter(letter);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {gameState === 'won' && <div>WON</div>}
        <div className="letters">{hashed}</div>

        <div>{movie}</div>
        <hr />
        <hr />

        <div className="holder">
          {letters.map((letter, index) => (
            <button className="letters" key={letter} onClick={onLetterPress}>
              {letter}
            </button>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
