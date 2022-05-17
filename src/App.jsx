import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { movieList } from './lib/movieList';

function App() {
  const movie = movieList[Math.floor(Math.random() * movieList.length)];

  const [count, setCount] = useState(0);
  const [token, setToken] = useState(null);

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

  const checkLetter = async (letter) => {
    const guess = {
      token: token,
      letter: letter,
    };
    const response = await fetch('https://hangman-api.herokuapp.com/hangman', {
      method: 'PUT',
      body: JSON.stringify(guess),
    });
    const result = await response.json();
    console.log(result.correct);
    if (result.correct) {
      const updatedWord = data.split();
      const returnedWord = response.hangman.split();
      data.split().map((letter, i) => {
        if (returnedWord[i] != '_') {
          updatedWord[i] = returnedWord[i];
          setData(updatedWord);
        }
      });
    }
  };

  const apiGet = async () => {
    const response = await fetch('https://hangman-api.herokuapp.com/hangman', {
      method: 'POST',
    });
    console.log(response);
    const result = await response.json();
    console.log(result.token);
    setData(result.hangman);
    setToken(result.token);
    console.log(token);
  };

  const onLetterPress = async (e) => {
    const letter = e.target.innerText;
    if (movie.toLowerCase().includes(letter)) {
      console.log('TRUE');
    } else {
      console.log('FALSE');
    }

    await checkLetter(letter);
  };

  const word = 'hangman';

  // useEffect(() => {
  //   apiGet();
  //   console.log(typeof data);
  // }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!2</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
        <div className="theWord">{data}</div>
        <div>{token}</div>
        <div className="holder">
          {letters.map((letter, index) => (
            <button className="letters" key={letter} onClick={onLetterPress}>
              {letter}
            </button>
          ))}
        </div>
        <div>{movie}</div>
      </header>
    </div>
  );
}

export default App;
