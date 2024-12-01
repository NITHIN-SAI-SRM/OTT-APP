import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Watchlist from "./components/Watchlist";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      
      <main style={{ minHeight: "calc(100vh - 120px)" }}> {/* Content spacing */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route
            path="*"
            element={<div style={{ textAlign: "center", padding: "50px", color: "#fff" }}>404 - Page Not Found</div>}
          />
        </Routes>
      </main>
      <Footer /> {/* Common Footer */}
    </Router>
  );
};

export default App;
