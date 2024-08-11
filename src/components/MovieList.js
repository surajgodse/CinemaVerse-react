import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_KEY = 'f6cada62';
const BASE_URL = 'http://www.omdbapi.com/';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(BASE_URL, {
          params: {
            s: 'Marvel',
            apikey: API_KEY,
          },
        });
        setMovies(response.data.Search || []);
      } catch (error) {
        console.error('There was an error fetching the movies!', error);
        toast.error('There was an error fetching the movies!');
      }
    };

    fetchMovies();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          s: query,
          apikey: API_KEY,
        },
      });
      if (response.data.Search && response.data.Search.length > 0) {
        setMovies(response.data.Search);
      } else {
        toast.error('No movies found');
        setMovies([]);
      }
    } catch (error) {
      console.error('There was an error fetching the movies!', error);
      toast.error('There was an error fetching the movies!');
    }
  };

  const addToFavorites = (movie) => {
    const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!existingFavorites.find((fav) => fav.imdbID === movie.imdbID)) {
      localStorage.setItem('favorites', JSON.stringify([...existingFavorites, movie]));
      toast.success('Movie added to favorites!');
    } else {
      toast.info('Movie already in favorites');
    }
  };

  return (
    <div className="content">
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie">
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}
              alt={movie.Title}
            />
            <div className="movie-info">
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
              <button onClick={() => navigate(`/movie/${movie.imdbID}`)}>
                View Details
              </button>
              <button onClick={() => addToFavorites(movie)}>Add to Favorites</button>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}

export default MovieList;
