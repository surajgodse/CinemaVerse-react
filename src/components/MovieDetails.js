import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_KEY = 'f6cada62';
const BASE_URL = 'http://www.omdbapi.com/';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(BASE_URL, {
          params: {
            i: id,
            apikey: API_KEY,
          },
        });
        setMovie(response.data);
      } catch (error) {
        console.error('There was an error fetching the movie details!', error);
        toast.error('There was an error fetching the movie details!');
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details">
      <h1>{movie.Title}</h1>
      <img 
        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'} 
        alt={movie.Title} 
        className="movie-poster"
      />
      <div className="details">
        <div className="details-container">
          <div className="details-row">
            <p><strong>Year:</strong> {movie.Year}</p>
          </div>
          <div className="details-row">
            <p><strong>Genre:</strong> {movie.Genre}</p>
          </div>
          <div className="details-row">
            <p><strong>Director:</strong> {movie.Director}</p>
          </div>
          <div className="details-row">
            <p><strong>Actors:</strong> {movie.Actors}</p>
          </div>
          <div className="details-row">
            <p><strong>Plot:</strong> {movie.Plot}</p>
          </div>
          <div className="details-row">
            <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default MovieDetails;
