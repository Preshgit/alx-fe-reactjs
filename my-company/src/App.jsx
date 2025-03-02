import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Navbar />
        <div style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
        <footer
          style={{
            textAlign: "center",
            padding: "20px",
            borderTop: "1px solid #eee",
            marginTop: "30px",
          }}
        >
          <p>© 2025 My Company. All rights reserved.</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
