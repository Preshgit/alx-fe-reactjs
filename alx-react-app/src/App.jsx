import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import WelcomeMessage from "./components/WelcomeMessage";
import MainContent from "./components/MainContent";
import Header from "./components/Header";
import Footer from "./components/Footer";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <WelcomeMessage />
      <MainContent />
      <Footer />
    </>
  );
}

export default App;
