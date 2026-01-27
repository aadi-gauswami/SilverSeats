import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getallmovie } from "../api-helpers/api-helpers";
import "./style.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    const data = await getallmovie();

    if (Array.isArray(data)) {
      setMovies(data);
    } else if (Array.isArray(data?.movies)) {
      setMovies(data.movies);
    } else {
      setMovies([]);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <main className="main">
      <section className="hero">
        <h1>Now Showing</h1>
        <p>
          Choose from our latest blockbuster releases and enjoy cinema like
          never before.
        </p>
      </section>

      <section className="movie-grid">
        {movies.length === 0 ? (
          <p>No movies available</p>
        ) : (
          movies.map((movie) => (
            <div className="movie-card" key={movie._id}>
              <img
                src={movie.posterurl}
                alt={movie.title}
                onError={(e) =>
                  (e.target.src = "/default-movie.jpg")
                }
              />

              <p>{movie.title}<br/>
                ₹{movie.price}</p>

              <div className="button-wrapper">
                <Link to={`/book/${movie._id}`}>
                  <button>Book Now</button>
                </Link>
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
};

export default MoviesPage;
