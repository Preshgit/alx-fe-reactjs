import React from "react";

function About() {
  const containerStyle = {
    padding: "20px",
    maxWidth: "900px",
    margin: "0 auto",
  };

  const headingStyle = {
    color: "#333",
    borderBottom: "2px solid #eee",
    paddingBottom: "10px",
  };

  const textStyle = {
    lineHeight: "1.6",
    fontSize: "1.1rem",
    color: "#444",
  };

  const sectionStyle = {
    marginTop: "30px",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>About Us</h1>
      <p style={textStyle}>
        Our company has been providing top-notch services since 1990. We
        specialize in various fields including technology, marketing, and
        consultancy.
      </p>

      <div style={sectionStyle}>
        <h2>Our Mission</h2>
        <p style={textStyle}>
          To deliver innovative solutions that exceed our clients' expectations
          and help them achieve their business goals.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2>Our Vision</h2>
        <p style={textStyle}>
          To be the leading provider of comprehensive business solutions,
          recognized for our excellence and integrity in all that we do.
        </p>
      </div>
    </div>
  );
}

export default About;
