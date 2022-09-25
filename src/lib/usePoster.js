import React, { useState, useEffect } from 'react';
import loadingPoster from '../../src/assets/images/curtain-pic.jpeg';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const usePoster = ({ movie }) => {
  const [poster, setPoster] = useState(loadingPoster);
  const [posterError, setPosterError] = useState(null);

  const fetchPoster = async (movie) => {
    const url = `https://api.themoviedb.org/4/search/movie?api_key=${API_KEY}&language=en-US&query=${movie}&include_adult = false)}`;

    try {
      setPoster('./src/assets/images/curtain-pic.jpeg');

      const response = await fetch(url);

      const data = await response.json();

      const path = data.results[0].poster_path;

      const posterPath = `https://image.tmdb.org/t/p/w500${path}`;

      setPoster(posterPath);
    } catch (error) {
      setPosterError(error);
    }
  };

  useEffect(() => {
    fetchPoster(movie);
  }, [movie]);

  return { poster, fetchPoster, posterError };
};

export default usePoster;

// return the poster, or an error so I can refetch
