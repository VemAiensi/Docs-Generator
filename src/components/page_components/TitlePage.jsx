import React from "react";
import qrcode from "../../assets/qrcode.png";

import Content from "./Content";

function TitlePage(props) {
  const { ref, title, subtitle, contents } = props;

  return (
    <div ref={ref} className="page">
      <div className="content">
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
        {contents.map((content, index) => {
          console.log(content);
          return (
            <Content
              key={index}
              title={content.title}
              type={content.type}
              desc={content.desc}
            ></Content>
          );
        })}

        <div className="pNum-right">1</div>
      </div>
    </div>
  );
}

export default TitlePage;
