import { useState, useRef, createRef, useEffect } from "react";
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
    { title: "Hello World", type: "text", desc: "ggness" },
  ]);
  function updateContents(newValue) {
    console.log("Update: ", newValue);
    setContents([...newValue]);
    // console.log("New Length: ", contents.length);
  }
  useEffect(() => {
    console.log("Updated Contents:", contents);
  }, [contents]);

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

    const transformedCode = splitCode(newValue, 33);
    setSrc(transformedCode);

    //Create references depending on src length
    const pageLength = transformedCode.length;
    const references = Array.from({ length: pageLength + 1 }, () =>
      createRef()
    );
    pageReferences.current = references;
    console.log(references.length);
  }

  const [srcLanguage, setSrcLanguage] = useState("java");
  function updateSrcLanguage(newValue) {
    setSrcLanguage(newValue);
  }

  const functions = [
    updateTitle,
    updateSubtitle,
    updateUrl,
    updateContents,
    updateSrc,
    updateSrcLanguage,
  ];

  return (
    <>
      <WorkSpace
        pageRefs={pageReferences.current}
        title={title}
        subtitle={subtitle}
        contents={contents}
        srcs={srcs}
        url={url}
        srcLang={srcLanguage}
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
