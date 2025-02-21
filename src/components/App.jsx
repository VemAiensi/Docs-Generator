import { useState, useRef, createRef } from "react";
import Config from "./Config";
import WorkSpace from "./WorkSpace";

function App() {
  const pageReferences = useRef([useRef(null)]);
  //title variables
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
    setUrl(newValue);
  }

  //Content Variables
  const [contents, setContents] = useState([
    { title: "Objectives", type: "text", desc: "Something Something" },
  ]);
  function updateContents(newValue) {
    setContents(newValue);
  }

  const [srcs, setSrc] = useState(['System.out.print("Hello World");']);
  function updateSrc(newValue) {
    function splitCode(code, maxLines) {
      const lines = code.split("\n");
      const parts = [];
      for (let i = 0; i < lines.length; i += maxLines) {
        parts.push(lines.slice(i, i + maxLines).join("\n"));
      }
      return parts;
    }

    const transformedCode = splitCode(newValue, 36);
    setSrc(transformedCode);

    //Create references depending on src length
    const pageLength = transformedCode.length;
    const references = Array.from({ length: pageLength + 1 }, () =>
      createRef()
    );
    pageReferences.current = references;
    console.log(references.length);
  }

  const functions = [
    updateTitle,
    updateSubtitle,
    updateUrl,
    updateContents,
    updateSrc,
  ];

  return (
    <>
      <WorkSpace
        pageRefs={pageReferences.current}
        title={title}
        subtitle={subtitle}
        contents={contents}
        srcs={srcs}
      />
      <Config
        pageRefs={pageReferences.current}
        contents={contents}
        formFncs={functions}
      />
    </>
  );
}

export default App;
