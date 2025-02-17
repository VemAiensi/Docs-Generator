import { useState, useRef, useEffect } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import Config from "./Config";
import WorkSpace from "./WorkSpace";
function App() {
  const [pageReferences, setRefs] = useState([useRef(null)]);
  function updateRefs(newValue) {
    setRefs(newValue);
  }

  const ref = useRef(null);

  const [title, setTitle] = useState("Title Here");
  function updateTitle(newValue) {
    setTitle(newValue);
  }
  const [subtitle, setSubtitle] = useState(
    "Subject Name - # Sem A.Y. 202#-202#"
  );
  function updateSubtitle(newValue) {
    setSubtitle(newValue);
  }

  const [url, setUrl] = useState("something");
  function updateUrl(newValue) {
    setUrl(newSValue);
  }

  const [srcs, setSrc] = useState([
    'System.out.print("Hello World");',
    "Hey yo!",
  ]);
  function updateSrc(newValue) {
    function splitCodeIntoParts(code, maxLines) {
      const lines = code.split("\n");
      const parts = [];
      for (let i = 0; i < lines.length; i += maxLines) {
        parts.push(lines.slice(i, i + maxLines).join("\n"));
      }
      return parts;
    }

    setSrc(splitCodeIntoParts(newValue, 36));
  }

  // useEffect(() => {}, [title]);

  return (
    <>
      <WorkSpace
        pageRefs={pageReferences}
        title={title}
        subtitle={subtitle}
        srcs={srcs}
      />
      <Config
        pageRefs={pageReferences}
        updateRefs={updateRefs}
        formFncs={[updateTitle, updateSubtitle, updateSrc]}
      />
    </>
  );
}

export default App;
