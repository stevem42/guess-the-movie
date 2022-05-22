import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { fetchMovie } from './lib/getMovie';

import { movieList } from './lib/movieList';
import { Keyboard } from './components/Keyboard/Keyboard';

function App() {
  const GAME_STATES = Object.freeze({
    PLAYING: 'playing',
    WON: 'won',
    LOST: 'lost',
    SETUP: 'setup',
  });

  const MAX_GUESSES = 6;

  const [movie, setMovie] = useState(
    movieList[Math.floor(Math.random() * movieList.length)]
  );
  const [hashed, setHashed] = useState('');
  const [gameState, setGameState] = useState('setup');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [guessCount, setGuessCount] = useState(MAX_GUESSES);
  const [path, setPath] = useState('');

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
        !poster && playAgain();
        setPath(poster);
      };

      getPoster();

      hashWord(movie);
      setGameState(GAME_STATES.PLAYING);
    }
  };

  const playAgain = () => {
    setGuessedLetters([]);
    setGuessCount(MAX_GUESSES);
    setMovie(movieList[Math.floor(Math.random() * movieList.length)]);
    setGameState(GAME_STATES.SETUP);
  };

  const checkWin = () => {
    if (hashed === movie) {
      setGameState(GAME_STATES.WON);
    } else if (guessCount === 0) {
      setGameState(GAME_STATES.LOST);
    }
  };

  useEffect(() => {
    setupGame();

    checkWin();
  }, [hashed, guessCount, gameState, movie, path]);

  const checkLetter = async (letter) => {
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
    }

    setHashed(updatedWord);
  };

  const onLetterPress = async (e) => {
    const letter = e.target.innerText.toLowerCase();
    setGuessedLetters([...guessedLetters, letter]);
    checkLetter(letter);
  };

  return (
    <div className="container">
      <img
        src={path}
        className={gameState === GAME_STATES.PLAYING ? 'poster-blur' : 'poster'}
        alt="movie-poster"
      />

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
        <div>
          <div>GUESSES LEFT : {guessCount}</div>
          <div className="hashed">{hashed}</div>

          <Keyboard
            onClick={onLetterPress}
            state={gameState}
            letters={guessedLetters}
          ></Keyboard>
        </div>
      )}
    </div>
  );
}

export default App;
