import React from 'react';
import { useNavigate } from 'react-router-dom';

function Favorites() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const navigate = useNavigate();

  const removeFromFavorites = (imdbID) => {
    const updatedFavorites = favorites.filter((movie) => movie.imdbID !== imdbID);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    window.location.reload();
  };

  if (favorites.length === 0) {
    return <div>No favorite movies yet.</div>;
  }

  return (
    <div className="favorites">
      <h1>Favorite Movies</h1>
      <div className="movie-list">
        {favorites.map((movie) => (
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
              <button onClick={() => removeFromFavorites(movie.imdbID)}>
                Remove from Favorites
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
