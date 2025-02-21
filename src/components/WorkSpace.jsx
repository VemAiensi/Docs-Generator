import React, { useRef } from "react";
import Page from "./page_components/Page";
import TitlePage from "./page_components/TitlePage";
function WorkSpace(props) {
  //Destructuring props
  const { pageRefs, title, subtitle, srcs, contents } = props;

  // props.updateRefs([useRef(null)]);

  return (
    <div className="workspace">
      <TitlePage
        ref={pageRefs[0]}
        title={title}
        subtitle={subtitle}
        contents={contents}
      />
      {srcs.map((src, index) => (
        <Page key={index} ref={pageRefs[index + 1]} src={src} />
      ))}
    </div>
  );
}

export default WorkSpace;
