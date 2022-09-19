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
  const [gameState, setGameState] = useState(GAME_STATES.SETUP);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [guessCount, setGuessCount] = useState(MAX_GUESSES);
  const [path, setPath] = useState('');
  const [flash, setFlash] = useState('transparent');

  const hashWord = (word) => {
    let hash = '';
    for (const letter of word) {
      letter.toLowerCase() !== letter.toUpperCase()
        ? (hash += '_')
        : (hash += letter);
    }
    setHashed(hash);
  };

  const flashColor = (guess, gameEnd) => {
    if (!gameEnd) {
      if (guess) {
        setFlash('green');
      } else {
        setFlash('red');
      }

      setTimeout(() => {
        setFlash('transparent');
      }, 750);
    }
  };

  const setupGame = async () => {
    if (gameState === GAME_STATES.SETUP) {
      const getPoster = async () => {
        const poster = await fetchMovie(movie);
        console.log('POSTER - ', poster);

        // if (!poster) {
        //   alert('poster');
        //   playAgain();
        // }
        poster === null ? setPath('../noposter.png') : setPath(poster);
      };

      await getPoster();

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
      return false;
    } else if (guessCount === 0) {
      setGameState(GAME_STATES.LOST);
      return false;
    }
    return true;
  };

  useEffect(() => {
    setupGame();

    console.log('rendering');
    checkWin();
    console.log(movie);
    console.log(gameState);
  }, [hashed, guessCount, gameState, movie, path]);

  useEffect(() => {}, []);

  const checkLetter = (letter) => {
    let updatedWord = hashed;
    let guess, gameEnd;

    if (!movie.toLowerCase().includes(letter)) {
      setGuessCount(guessCount - 1);
      guess = false;
    } else {
      guess = true;
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
    gameEnd = movie === updatedWord || (guessCount === 1 && !guess);

    flashColor(guess, gameEnd);
  };

  const onLetterPress = (e) => {
    const letter = e.target.innerText.toLowerCase();
    setGuessedLetters([...guessedLetters, letter]);
    checkLetter(letter);
  };

  return (
    <div className="container">
      <div className="playContainer">
        <div
          className="poster-container"
          style={{ border: `5px solid ${flash}` }}
        >
          <img
            src={path}
            width="200"
            height="600"
            className={
              gameState === GAME_STATES.PLAYING
                ? 'poster-blur'
                : gameState === GAME_STATES.WON
                ? 'poster won'
                : 'poster lost'
            }
            alt="movie-poster"
          />
        </div>
      </div>

      {gameState === GAME_STATES.WON && (
        <div className="gameOver">
          <div className="winText safe">YOU WON!</div>
        </div>
      )}
      {gameState === GAME_STATES.LOST && (
        <div className="gameOver">
          <div className="winText danger">YOU LOST</div>{' '}
          <div>{`The Movie Was "${movie}"`}</div>
        </div>
      )}

      {/* <div>{movie}</div> */}
      {gameState === GAME_STATES.PLAYING ? (
        <div>
          <div>
            GUESSES LEFT :{' '}
            <span
              className={
                guessCount > 4 ? 'safe' : guessCount > 2 ? 'warning' : 'danger'
              }
            >
              {guessCount}
            </span>
          </div>
          <div className="hashed">{hashed}</div>

          <Keyboard
            onClick={onLetterPress}
            state={gameState}
            letters={guessedLetters}
          ></Keyboard>
        </div>
      ) : (
        <button className="playAgain" onClick={() => playAgain()}>
          Play Again?
        </button>
      )}
    </div>
  );
}

export default App;
