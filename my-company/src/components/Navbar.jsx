import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#333",
    color: "white",
  };

  const logoStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    margin: 0,
  };

  const navLinksStyle = {
    display: "flex",
    listStyle: "none",
    gap: "20px",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    padding: "8px 12px",
    borderRadius: "4px",
    transition: "background-color 0.3s",
  };

  const activeLinkStyle = {
    ...linkStyle,
    backgroundColor: "#555",
  };

  return (
    <nav style={navStyle}>
      <h1 style={logoStyle}>My Company</h1>
      <ul style={navLinksStyle}>
        <li>
          <Link to="/" style={linkStyle}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" style={linkStyle}>
            About
          </Link>
        </li>
        <li>
          <Link to="/services" style={linkStyle}>
            Services
          </Link>
        </li>
        <li>
          <Link to="/contact" style={linkStyle}>
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
