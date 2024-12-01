import React from "react";

const Navbar = ({ searchQuery, handleSearch }) => {
  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "bold",
    padding: "10px 15px",
    transition: "color 0.3s",
  };

  const hoverLinkStyle = {
    ...linkStyle,
    color: "#f7b731", // Highlight color on hover
  };

  return (
    <header
      style={{
        backgroundColor: "#111",
        padding: "10px 0",
        margin: "0",
        position: "sticky",
        top: "0",
        zIndex: "100",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "#f7b731",
            textTransform: "uppercase",
            letterSpacing: "2px",
          }}
        >
          CINE NEST +
        </div>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <a
            href="/"
            style={linkStyle}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = hoverLinkStyle.color)
            }
            onMouseLeave={(e) => (e.currentTarget.style.color = linkStyle.color)}
          >
            Home
          </a>
          <a
            href="/watchlist"
            style={linkStyle}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = hoverLinkStyle.color)
            }
            onMouseLeave={(e) => (e.currentTarget.style.color = linkStyle.color)}
          >
            My Watchlist
          </a>
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)} // Pass input value to parent handler
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              outline: "none",
              fontSize: "16px",
              color: "#000",
              width: "200px",
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;