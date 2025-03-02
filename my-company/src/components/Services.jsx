import React from "react";

function Services() {
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

  const serviceCardStyle = {
    padding: "20px",
    margin: "20px 0",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  const serviceHeadingStyle = {
    color: "#007bff",
    marginBottom: "10px",
  };

  const serviceTextStyle = {
    lineHeight: "1.6",
    color: "#444",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Our Services</h1>

      <div style={serviceCardStyle}>
        <h2 style={serviceHeadingStyle}>Technology Consulting</h2>
        <p style={serviceTextStyle}>
          Our expert consultants help you navigate the complex technology
          landscape and implement solutions that drive business growth.
        </p>
      </div>

      <div style={serviceCardStyle}>
        <h2 style={serviceHeadingStyle}>Market Analysis</h2>
        <p style={serviceTextStyle}>
          We provide comprehensive market research and analysis to help you
          understand your competitive landscape and identify opportunities.
        </p>
      </div>

      <div style={serviceCardStyle}>
        <h2 style={serviceHeadingStyle}>Product Development</h2>
        <p style={serviceTextStyle}>
          From concept to launch, our team guides you through the entire product
          development lifecycle with a focus on innovation and quality.
        </p>
      </div>
    </div>
  );
}

export default Services;
