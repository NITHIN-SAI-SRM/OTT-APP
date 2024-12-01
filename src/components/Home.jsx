import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [watchlist, setWatchlist] = useState([]);
  const [addedMovieId, setAddedMovieId] = useState(null);
  const [messageVisible, setMessageVisible] = useState(false);
  const [newMovie, setNewMovie] = useState({
    title: "",
    description: "",
    imageUrl: "",
    watchUrl: "",
    trailerUrl: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/movies")
      .then((response) => {
        setMovies(response.data);
        setFilteredMovies(response.data);
      })
      .catch((error) => console.error("Error fetching movies:", error));

    axios
      .get("http://localhost:5000/watchlist")
      .then((response) => setWatchlist(response.data))
      .catch((error) => console.error("Error fetching watchlist:", error));
  }, []);

  const addToWatchlist = (movie) => {
    if (!watchlist.some((item) => item.id === movie.id)) {
      axios
        .post("http://localhost:5000/watchlist", movie)
        .then((response) => {
          setWatchlist((prev) => [...prev, response.data]);
          setAddedMovieId(movie.id);
          setMessageVisible(true);
          setTimeout(() => setMessageVisible(false), 3000);
        })
        .catch((error) => console.error("Error adding to watchlist:", error));
    } else {
      alert("Movie is already in the watchlist!");
    }
  };

  const watchTrailer = (url) => window.open(url, "_blank");
  const watchNow = (url) => window.open(url, "_blank");

  const handleSearch = (query) => {
    setSearchQuery(query);
    setFilteredMovies(
      movies.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const addMovie = () => {
    axios
      .post("http://localhost:5000/movies", {
        ...newMovie,
        id: Date.now().toString(),
      })
      .then((response) => {
        setMovies((prev) => [...prev, response.data]);
        setFilteredMovies((prev) => [...prev, response.data]);
        setNewMovie({
          title: "",
          description: "",
          imageUrl: "",
          watchUrl: "",
          trailerUrl: "",
        });
      })
      .catch((error) => console.error("Error adding movie:", error));
  };

  const deleteMovie = (id) => {
    axios
      .delete(`http://localhost:5000/movies/${id}`)
      .then(() => {
        setMovies((prev) => prev.filter((movie) => movie.id !== id));
        setFilteredMovies((prev) => prev.filter((movie) => movie.id !== id));
      })
      .catch((error) => console.error("Error deleting movie:", error));
  };

  const deleteMovieByTitle = (title) => {
    const movieToDelete = movies.find((movie) => movie.title === title);
    if (movieToDelete) {
      deleteMovie(movieToDelete.id);
    } else {
      alert("Movie not found!");
    }
  };

  const buttonStyle = (bgColor) => ({
    backgroundColor: bgColor,
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  });

  return (
    <div style={{ backgroundColor: "#181818", color: "#fff", minHeight: "100vh" }}>
      <Navbar searchQuery={searchQuery} handleSearch={(e) => handleSearch(e)} />
      <div style={{ padding: "20px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h2>Add a New Movie</h2>
          <input
            type="text"
            placeholder="Title"
            value={newMovie.title}
            onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
            style={{ marginRight: "10px", padding: "5px" }}
          />
          <input
            type="text"
            placeholder="Description"
            value={newMovie.description}
            onChange={(e) =>
              setNewMovie({ ...newMovie, description: e.target.value })
            }
            style={{ marginRight: "10px", padding: "5px" }}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newMovie.imageUrl}
            onChange={(e) =>
              setNewMovie({ ...newMovie, imageUrl: e.target.value })
            }
            style={{ marginRight: "10px", padding: "5px" }}
          />
          <input
            type="text"
            placeholder="Watch URL"
            value={newMovie.watchUrl}
            onChange={(e) =>
              setNewMovie({ ...newMovie, watchUrl: e.target.value })
            }
            style={{ marginRight: "10px", padding: "5px" }}
          />
          <input
            type="text"
            placeholder="Trailer URL"
            value={newMovie.trailerUrl}
            onChange={(e) =>
              setNewMovie({ ...newMovie, trailerUrl: e.target.value })
            }
            style={{ marginRight: "10px", padding: "5px" }}
          />
          <button onClick={addMovie} style={buttonStyle("#4caf50")}>
            Add Movie
          </button>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <h2>Delete a Movie by Title</h2>
          <input
            type="text"
            placeholder="Enter movie title"
            value={newMovie.title}
            onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
            style={{ marginRight: "10px", padding: "5px" }}
          />
          <button
            onClick={() => deleteMovieByTitle(newMovie.title)}
            style={buttonStyle("#e74c3c")}
          >
            Delete Movie
          </button>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <div
                key={movie.id}
                style={{
                  backgroundColor: "#222",
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
                  overflow: "hidden",
                  transition: "transform 0.3s",
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                <img
                  src={movie.imageUrl}
                  alt={movie.title}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderBottom: "2px solid #444",
                    objectFit: "cover",
                    maxHeight: "350px",
                  }}
                />
                <div style={{ padding: "15px" }}>
                  <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#fff" }}>
                    {movie.title}
                  </h3>
                  <p
                    style={{
                      color: "#bbb",
                      fontSize: "14px",
                      marginBottom: "15px",
                    }}
                  >
                    {movie.description || "No description available"}
                  </p>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      onClick={() => watchNow(movie.watchUrl)}
                      style={buttonStyle("#f7b731")}
                    >
                      Watch Now
                    </button>
                    <button
                      onClick={() => watchTrailer(movie.trailerUrl)}
                      style={buttonStyle("#ff6348")}
                    >
                      Watch Trailer
                    </button>
                    <button
                      onClick={() => addToWatchlist(movie)}
                      style={buttonStyle("#3498db")}
                    >
                      Add to Watchlist
                    </button>
                    <button
                      onClick={() => deleteMovie(movie.id)}
                      style={buttonStyle("#e74c3c")}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: "#bbb", textAlign: "center" }}>No movies found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
