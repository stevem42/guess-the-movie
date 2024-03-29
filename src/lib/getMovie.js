//const dotenv = require('dotenv');
import axios from 'axios';

export const fetchMovie = async (title) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/4/search/movie?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }&language=en-US&query=${title}&include_adult = false)}`
    );

    const data = await response.json();

    const path = data.results[0].poster_path;

    return `https://image.tmdb.org/t/p/w500${path}`;
  } catch (error) {
    console.log(error);
  }
};
