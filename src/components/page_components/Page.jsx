import React from "react";
import "./page.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

function Page(props) {
  return (
    <div className="page">
      <div className="srcCodeTitle">
        <div className="line"></div>
        <span>Source Code</span>
        <div className="line"></div>
      </div>

      <SyntaxHighlighter language="java" style={oneLight}>
        {props.src}
      </SyntaxHighlighter>
    </div>
  );
}

export default Page;
