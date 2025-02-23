import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import WelcomeMessage from "./components/WelcomeMessage";
import MainContent from "./components/MainContent";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserProfile from "./components/UserProfile";
import Counter from "./components/Counter";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <WelcomeMessage />
      <MainContent />
      <Counter />
      <UserProfile
        name="Precious"
        age="25"
        bio="Loves traveling and exploring different cultures"
      />
      <Footer />
    </>
  );
}

export default App;
