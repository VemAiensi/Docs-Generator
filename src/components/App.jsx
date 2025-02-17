import { useState } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import Config from "./Config";
import WorkSpace from "./WorkSpace";
function App() {
  const [title, setTitle] = useState("Title Here");
  function updateTitle(newValue) {
    setTitle(newValue);
  }

  const [url, setUrl] = useState("something");
  function updateUrl(newValue) {
    setUrl(newSValue);
  }

  return (
    <>
      <WorkSpace />
      <Config />
    </>
  );
}

export default App;
