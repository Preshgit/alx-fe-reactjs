import React from "react";
import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setSubmitted(false);
    }, 3000);

    alert("Form submitted!");
  };

  const containerStyle = {
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto",
  };

  const headingStyle = {
    color: "#333",
    borderBottom: "2px solid #eee",
    paddingBottom: "10px",
  };

  const formStyle = {
    marginTop: "20px",
  };

  const inputStyle = {
    display: "block",
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "4px",
    border: "1px solid #ddd",
    fontSize: "1rem",
  };

  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "10px",
    transition: "background-color 0.3s",
  };

  const successStyle = {
    backgroundColor: "#d4edda",
    color: "#155724",
    padding: "10px",
    borderRadius: "4px",
    marginTop: "20px",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Contact Us</h1>

      <form style={formStyle} onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          style={{ ...inputStyle, minHeight: "150px" }}
          required
        />

        <button type="submit" style={buttonStyle}>
          Send Message
        </button>
      </form>

      {submitted && (
        <div style={successStyle}>
          Thank you for your message! We'll get back to you soon.
        </div>
      )}

      <div style={{ marginTop: "40px" }}>
        <h2>Our Contact Information</h2>
        <p>
          <strong>Address:</strong> 123 Business Street, City, Country
        </p>
        <p>
          <strong>Phone:</strong> +1 (555) 123-4567
        </p>
        <p>
          <strong>Email:</strong> info@mycompany.com
        </p>
      </div>
    </div>
  );
}

export default Contact;
