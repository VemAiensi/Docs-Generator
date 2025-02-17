import React, { useRef } from "react";
import Page from "./page_components/Page";
import html2canvas from "html2canvas";
import qrcode from "../assets/qrcode.png";
import sample from "../assets/out1.png";
import jsPDF from "jspdf";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

function WorkSpace() {
  return (
    <div
      className="workspace"
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "10px",
        overflow: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Page titlePage={true} title={"QUEUES"} subtitle={"something"} />
        <Page title={"QUEUES"} subtitle={"something"} />
      </div>
    </div>
  );
}

export default WorkSpace;
