const jwt = require("jsonwebtoken");
const Movie = require("../model/movie");
const mongoose=require("mongoose");

const getallmovie = async (req, res) => {
  try {
    const movies = await Movie.find()
      .populate("admin", "username email"); // it show selected fields

    return res.status(200).json({ movies });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get movie by ID (with admin details)
const getmoviebyid = async (req, res) => {
  try {
    const id = req.params.id;

    // Validate ObjectId before querying
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid movie ID format" });
    }

    const movie = await Movie.findById(id).populate("admin", "username email");

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    return res.status(200).json({ movie });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



const addmovie = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const extracttoken = authHeader.split(" ")[1];
    if (!extracttoken || extracttoken.trim() === "") {
      return res.status(401).json({ message: "Token not found" });
    }

    // Verify token
    let adminid;
    try {
      const decoded = jwt.verify(extracttoken, process.env.SECRET_KEY);
      adminid = decoded.id;
    } catch (err) {
      return res.status(400).json({ message: `Invalid token: ${err.message}` });
    }

    const { title, description, releaseDate, posterurl, price, featured, actors } = req.body;
    if (!title || !description || !posterurl || !price) {
      return res.status(400).json({ message: "Invalid inputs" });
    }

    const movie = new Movie({
      title,
      description,
      releaseDate: new Date(releaseDate),
      posterurl,
      price,
      featured,
      actors,
      admin: adminid, 
    });

    await movie.save();

    return res.status(201).json({ message: "Movie created", movie });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// Delete a movie
const deletemovie = async (req, res) => {
  try {
    const id = req.params.id;
    const deletemovie = await Movie.findByIdAndDelete(id);

    if (!deletemovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    return res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};
// Update a movie
const updatemovie = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, releaseDate, posterurl, price, featured, actors } = req.body;

    // validate inputs
    if (!title || !description || !posterurl || !price ) {
      return res.status(400).json({ message: "Invalid inputs" });
    }

    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      {
        title,
        description,
        releaseDate: new Date(releaseDate),
        posterurl,
        price,
        featured,
        actors,
      },
      { new: true } // return updated document
    );

    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    return res.status(200).json({ message: "Movie updated successfully", movie: updatedMovie });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

module.exports = { addmovie, getallmovie, getmoviebyid, deletemovie ,updatemovie};
