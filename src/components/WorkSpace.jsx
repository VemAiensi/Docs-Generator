import React, { useRef } from "react";
import Page from "./page_components/Page";
import TitlePage from "./page_components/TitlePage";
function WorkSpace(props) {
  //Destructuring props
  const { pageRefs, title, subtitle, srcs } = props;

  // props.updateRefs([useRef(null)]);

  return (
    <div
      className="workspace"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "10px",
        overflow: "auto",
      }}
    >
      <TitlePage ref={pageRefs[0]} title={title} subtitle={subtitle} />
      {srcs.map((src, index) => (
        <Page key={index} src={src} />
      ))}
    </div>
  );
}

export default WorkSpace;
