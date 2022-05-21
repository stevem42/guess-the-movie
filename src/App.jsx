import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { fetchMovie } from './lib/getMovie';

import { movieList } from './lib/movieList';

function App() {
  const GAME_STATES = Object.freeze({
    PLAYING: 'playing',
    WON: 'won',
    LOST: 'lost',
    SETUP: 'setup',
  });

  const MAX_GUESSES = 5;

  const [movie, setMovie] = useState(
    movieList[Math.floor(Math.random() * movieList.length)]
  );
  const [hashed, setHashed] = useState('');

  const [gameState, setGameState] = useState('setup');

  const [guessedLetters, setGuessedLetters] = useState([]);

  const [correct, setCorrect] = useState(false);

  const [guessCount, setGuessCount] = useState(MAX_GUESSES);

  const [path, setPath] = useState('');

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
      const getPoster = async () => {
        const poster = await fetchMovie(movie);
        setPath(poster);
      };

      getPoster();
      hashWord(movie);
      setGameState(GAME_STATES.PLAYING);

      console.log(path);
    }
  };

  const playAgain = () => {
    setGuessedLetters([]);
    setGuessCount(MAX_GUESSES);
    setMovie(movieList[Math.floor(Math.random() * movieList.length)]);
    setGameState(GAME_STATES.SETUP);
  };

  const checkWin = () => {
    console.log(guessCount);
    if (hashed === movie) {
      setGameState(GAME_STATES.WON);
      console.log('WIN');
    } else if (guessCount === 0) {
      console.log('LOST');
      setGameState(GAME_STATES.LOST);
    }
  };

  useEffect(() => {
    console.log('IN UEFFECT');
    // console.log(movie);
    setupGame();

    console.log(hashed);
    checkWin();
  }, [hashed, guessCount, gameState, movie, path]);

  const checkLetter = async (letter) => {
    console.log('HERE');
    let updatedWord = hashed;

    if (!movie.toLowerCase().includes(letter)) {
      setGuessCount(guessCount - 1);
    }

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
    setGuessedLetters([...guessedLetters, letter]);
    console.log(guessedLetters);

    checkLetter(letter);
  };

  return (
    <div className="App">
      {console.log(gameState)}
      <header className="App-header">
        <img
          src={path}
          className={
            gameState === GAME_STATES.PLAYING ? 'poster-blur' : 'poster'
          }
          alt="logo"
        />
        {gameState === GAME_STATES.PLAYING && (
          <div>GUESSES LEFT : {guessCount}</div>
        )}
        {gameState === GAME_STATES.WON && (
          <div>
            <div>YOU WON</div>
            <button onClick={() => playAgain()}>Play Again?</button>
          </div>
        )}
        {gameState === GAME_STATES.LOST && (
          <div>
            <div>YOU LOST</div> <div>{`The Movie Was "${movie}"`}</div>
            <button onClick={() => playAgain()}>Play Again?</button>
          </div>
        )}

        {/* <div>{movie}</div> */}
        {gameState === GAME_STATES.PLAYING && (
          <div className="holder">
            <div className="letters">{hashed}</div>
            <div>
              {letters.map((letter) => (
                <button
                  className="letters"
                  key={letter}
                  onClick={onLetterPress}
                  disabled={
                    gameState === GAME_STATES.LOST ||
                    gameState === GAME_STATES.WON ||
                    guessedLetters.includes(letter)
                  }
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
