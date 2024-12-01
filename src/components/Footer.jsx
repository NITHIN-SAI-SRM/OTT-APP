import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#111",
        padding: "20px 0",
        marginTop: "auto",
        color: "#fff",
        textAlign: "center",
        fontSize: "14px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        <p style={{ margin: "0" }}>© 2024 CINE NEST+, All Rights Reserved.</p>
        <p style={{ margin: "5px 0 0" }}>
          Made with ❤️ for movie enthusiasts.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
