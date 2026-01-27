import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getallmovie } from "../api-helpers/api-helpers";
import "./style.css";

const HomePage = () => {
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

  // Show only featured or first 10 movies
  const featuredMovies = movies
    .filter((movie) => movie.featured)
    .slice(0, 10);

  return (
    <main className="main">
      <section className="hero">
        <h1>Experience Cinema Like Never Before</h1>
        <p>Book tickets. Grab your seat!</p>
      </section>

      <section className="movie-grid">
        {featuredMovies.length === 0 ? (
          <p>No featured movies available</p>
        ) : (
          featuredMovies.map((movie) => (
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

      <section className="more">
        <Link to="/movies">
          <button>Show More</button>
        </Link>
      </section>
    </main>
  );
};

export default HomePage;
