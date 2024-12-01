import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar"; // Navbar imported and used
import Footer from "./Footer"; // Footer imported and used

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  // Fetch watchlist from the server
  useEffect(() => {
    axios
      .get("http://localhost:5000/watchlist")
      .then((response) => {
        setWatchlist(response.data);
      })
      .catch((error) => {
        console.error("Error fetching watchlist:", error);
      });
  }, []);

  // Remove a movie from the watchlist
  const removeFromWatchlist = (id) => {
    axios
      .delete(`http://localhost:5000/watchlist/${id}`)
      .then(() => {
        setWatchlist((prevWatchlist) =>
          prevWatchlist.filter((movie) => movie.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error removing from watchlist:", error);
      });
  };

  return (
    <div style={{ padding: "70px", backgroundColor: "#181818", color: "#fff" }}>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <h2 style={{ textAlign: "center", color: "#fff" }}>My Watchlist</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {watchlist.length > 0 ? (
          watchlist.map((movie) => (
            <div
              key={movie.id}
              style={{
                backgroundColor: "#222",
                borderRadius: "10px",
                padding: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
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
                  maxHeight: "200px",
                }}
              />
              <h3 style={{ color: "#fff" }}>{movie.title}</h3>
              <button
                onClick={() => removeFromWatchlist(movie.id)}
                style={buttonStyle("#e74c3c")}
              >
                Remove from Watchlist
              </button>
            </div>
          ))
        ) : (
          <p style={{ color: "#bbb", textAlign: "center" }}>
            Your watchlist is empty.
          </p>
        )}
      </div>

      
    </div>
  );
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

export default Watchlist;
