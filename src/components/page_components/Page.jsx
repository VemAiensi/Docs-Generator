import React, { useRef } from "react";
import html2canvas from "html2canvas";
import qrcode from "../../assets/qrcode.png";
import sample from "../../assets/out1.png";
import "./page.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

function Page(props) {
  const { titlePage, title, subtitle } = props;

  return titlePage ? (
    <div className="page">
      <div className="title">
        <div className="text">
          <h1>{title}</h1>
          <p>
            <em>{subtitle}</em>
          </p>
        </div>
        <div className="qr">
          <img src={qrcode} alt="Placeholder" />
        </div>
      </div>

      <div className="content">
        <section>
          <span>Overview</span>
          <p>
            Tackles about how queues work as well as terms related to queues and
            apply it on code
          </p>
        </section>
        <section>
          <span>Objectives</span>
          <ul>
            <li>Enqueue</li>
            <li>Dequeue</li>
          </ul>
        </section>
        <section className="output">
          <span>Sample Output</span>
          <div className="sOut">
            <img src={sample} alt="" />
          </div>
        </section>
      </div>

      <div className="pNum-right">1</div>
    </div>
  ) : (
    <div className="page">
      <div className="srcCodeTitle">
        <div className="line"></div>
        <span>Source Code</span>
        <div className="line"></div>
      </div>

      <SyntaxHighlighter language="java" style={oneLight}>
        System.out.print("Hello World")
      </SyntaxHighlighter>
    </div>
  );
}

export default Page;
