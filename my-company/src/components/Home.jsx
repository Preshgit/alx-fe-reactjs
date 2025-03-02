import React from "react";

function Home() {
  const containerStyle = {
    textAlign: "center",
    padding: "40px 20px",
  };

  const headingStyle = {
    color: "#333",
    fontSize: "2.5rem",
    marginBottom: "20px",
  };

  const textStyle = {
    fontSize: "1.2rem",
    lineHeight: "1.6",
    color: "#555",
    maxWidth: "800px",
    margin: "0 auto",
  };

  const ctaButtonStyle = {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "30px",
    transition: "background-color 0.3s",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Welcome to Our Company</h1>
      <p style={textStyle}>
        We are dedicated to delivering excellence in all our services. With
        years of experience and a commitment to quality, we ensure that your
        needs are met with the highest standards.
      </p>
      <button style={ctaButtonStyle}>Learn More</button>
    </div>
  );
}

export default Home;
