import React from "react";
import qrcode from "../../assets/qrcode.png";
import sample from "../../assets/out1.png";
import Content from "./Content";

function TitlePage({ ref, title, subtitle }) {
  return (
    <div ref={ref} className="page">
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
        <Content></Content>
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
  );
}

export default TitlePage;
