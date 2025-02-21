import React from "react";
import sample from "../../assets/out1.png";

function Content({ title, type, desc }) {
  function renderContent() {
    switch (type) {
      case "text":
        return (
          <section>
            <span>{title}</span>
            <p>{desc}</p>
          </section>
        );

      case "img":
        return (
          <section className="output">
            <span>{title}</span>
            <div className="sOut">
              <img src={sample} alt="" />
            </div>
          </section>
        );

      case "list":
        return (
          <section>
            <span>Objectives</span>
            <ul>
              <li>Enqueue</li>
              <li>Dequeue</li>
            </ul>
          </section>
        );
    }
  }

  return <>{renderContent()}</>;
}

export default Content;
