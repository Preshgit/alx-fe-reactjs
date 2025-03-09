import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import formikForm from "./components/formikForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <formikForm onSubmit={(values) => console.log(values)} />
    </>
  );
}

export default App;
