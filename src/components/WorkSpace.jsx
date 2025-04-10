import React, { useRef, useEffect } from "react";
import Page from "./page_components/Page";
import TitlePage from "./page_components/TitlePage";
function WorkSpace(props) {
  //Destructuring props
  const { pageRefs, title, subtitle, srcs, contents, url, srcLang } = props;

  return (
    <div className="workspace">
      <TitlePage
        ref={pageRefs[0]}
        title={title}
        subtitle={subtitle}
        contents={contents}
        url={url}
      />
      {srcs.map((src, index) => (
        <Page
          key={index}
          ref={pageRefs[index + 1]}
          src={src}
          lang={srcLang}
          truncate={index === 8 && true}
        />
      ))}
    </div>
  );
}

export default WorkSpace;
