import React, { forwardRef } from "react";
import "./page.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

const Page = forwardRef((props, ref) => {
  return (
    <div ref={ref} className="page">
      <div className="srcCodeTitle">
        <div className="line"></div>
        <span>Source Code</span>
        <div className="line"></div>
      </div>

      <SyntaxHighlighter language={props.lang} style={oneLight}>
        {props.src}
      </SyntaxHighlighter>

      {props.truncate && (
        <div style={{ textAlign: "center", fontStyle: "italic" }}>
          View full source at the remote repository...
        </div>
      )}
    </div>
  );
});

export default Page;
