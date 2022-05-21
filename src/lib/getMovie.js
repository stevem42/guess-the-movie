//const dotenv = require('dotenv');

export const fetchMovie = async (title) => {
  const response = await fetch(
    `https://api.themoviedb.org/4/search/movie?api_key=92416d0bd119ed7826aec676a310bcbd&language=en-US&query=${title}&include_adult = false)}`
  );

  const data = await response.json();

  const path = data.results[0].poster_path;

  return `https://image.tmdb.org/t/p/w500${path}`;
};
