import React, { useEffect, useState } from "react";
import {
  getallmovie,
  addmovie,
  updateMovie,
  deleteMovie,
} from "../api-helpers/api-helpers";
import "./adminMovies.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    releaseDate: "",
    posterurl: "",
    price: "",
    featured: false,
    actors: "",
  });

  const fetchMovies = async () => {
    const data = await getallmovie();
    if (Array.isArray(data)) setMovies(data);
    else if (Array.isArray(data?.movies)) setMovies(data.movies);
    else setMovies([]);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async () => {
    if (isEditing) {
      await updateMovie(editId, {
        ...formData,
        actors: formData.actors.split(","),
      });
    } else {
      await addmovie({
        ...formData,
        actors: formData.actors.split(","),
      });
    }
    resetForm();
    fetchMovies();
  };

  const handleEdit = (movie) => {
    setIsEditing(true);
    setEditId(movie._id);
    setFormData({
      title: movie.title,
      description: movie.description,
      releaseDate: movie.releaseDate,
      posterurl: movie.posterurl,
      price: movie.price,
      featured: movie.featured,
      actors: movie.actors.join(","),
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this movie?")) return;
    await deleteMovie(id);
    fetchMovies();
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData({
      title: "",
      description: "",
      releaseDate: "",
      posterurl: "",
      price: "",
      featured: false,
      actors: "",
    });
  };

  return (
    <div className="admin-page">
      {/* HEADER */}
      <header className="admin-header">
        <h1>SilverSeats Admin</h1>
        <p>Movie Management Panel</p>
      </header>

      {/* FORM SECTION */}
      <section className="form-section">
        <h2>{isEditing ? "Update Movie" : "Add New Movie"}</h2>

        <div className="movie-form">
          <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
          <input name="posterurl" placeholder="Poster URL" value={formData.posterurl} onChange={handleChange} />
          <input name="releaseDate" placeholder="Release Date" value={formData.releaseDate} onChange={handleChange} />
          <input name="price" placeholder="Price" value={formData.price} onChange={handleChange} />
          <input name="actors" placeholder="Actors (comma separated)" value={formData.actors} onChange={handleChange} />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />

          <label className="checkbox">
            <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} />
            Featured
          </label>

          <div className="btn-group">
            <button onClick={handleSubmit}>
              {isEditing ? "Update Movie" : "Add Movie"}
            </button>
            {isEditing && (
              <button className="cancel" onClick={resetForm}>Cancel</button>
            )}
          </div>
        </div>
      </section>

      {/* TABLE SECTION */}
      <section className="table-section">
        <h2>Movie List</h2>

        <table className="movie-table">
          <thead>
            <tr>
              <th>Poster</th>
              <th>Title</th>
              <th>Price</th>
              <th>Description</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie._id}>
                <td>
                  <img src={movie.posterurl} alt={movie.title} />
                </td>
                <td>{movie.title}</td>
                <td>₹{movie.price}</td>
                <td>{movie.description}</td>
                <td>{movie.featured ? "Yes" : "No"}</td>
                <td>
                  <button onClick={() => handleEdit(movie)}>Edit</button>
                  <button className="danger" onClick={() => handleDelete(movie._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default MoviesPage;
