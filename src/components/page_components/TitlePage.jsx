import React from "react";
import qrcode from "../../assets/qrcode.png";
import QRCode from "./QRCode";
import Content from "./Content";

function TitlePage(props) {
  const { ref, title, subtitle, contents, url } = props;
  const [fontSize, setFontSize] = React.useState("3rem");

  React.useEffect(() => {
    if (title.length > 20) {
      setFontSize("2.5rem");
    } else {
      setFontSize("3rem");
    }
  }, [title]);

  return (
    <div ref={ref} className="page">
      <div className="content">
        <div className="title">
          <div className="text">
            <h1 style={{ fontSize }}>{title}</h1>
            <p>
              <em>{subtitle}</em>
            </p>
          </div>
          <div className="qr">
            <QRCode value={url} />
          </div>
        </div>
        <div className="details">
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
        </div>

        {/* <div className="pNum-right">1</div> */}
      </div>
    </div>
  );
}

export default TitlePage;
