import React, { useRef } from "react";
import html2canvas from "html2canvas";
import qrcode from "../assets/qrcode.png";
import sample from "../assets/out1.png";
import jsPDF from "jspdf";
import "./page.css";

const MyComponent = () => {
  const divRef = useRef(null);

  const generatePDF = () => {
    if (divRef.current) {
      const scale = 2; // Adjust scale for higher resolution

      html2canvas(divRef.current, { scale: scale })
        .then((canvas) => {
          const imgData = canvas.toDataURL("image/png");

          const pdf = new jsPDF("p", "mm", "letter"); // Portrait, millimeters, A4
          const width = pdf.internal.pageSize.getWidth();
          const height = pdf.internal.pageSize.getHeight();

          // Get canvas dimensions AFTER scaling
          const canvasWidth = canvas.width; // From html2canvas output
          const canvasHeight = canvas.height;

          // Calculate the available space on the PDF page (with margins)
          const availableWidth = width;
          const availableHeight = height;

          // Calculate the scaling factor to fit within the available space
          const scaleFactor = Math.min(
            availableWidth / canvasWidth, // Scale to fit width
            availableHeight / canvasHeight // Scale to fit height
          );

          // Calculate the image dimensions to maintain aspect ratio
          const imgWidth = canvasWidth * scaleFactor;
          const imgHeight = canvasHeight * scaleFactor;

          // Center the image
          const xPos = (width - imgWidth) / 2;
          const yPos = (height - imgHeight) / 2;

          pdf.addImage(imgData, "PNG", xPos, yPos, imgWidth, imgHeight);

          pdf.save("my-document.pdf");
        })
        .catch((error) => {
          console.error("Error generating PDF:", error);
        });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
      }}
    >
      <div ref={divRef} className="page">
        <div className="title">
          <div className="text">
            <h1>QUEUES</h1>
            <p>
              <em>Data Structures and Algoritthms - 2nd Sem A.Y. 2021-2022</em>
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
              Tackles about how queues work as well as terms related to queues
              and apply it on code
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
      <button onClick={generatePDF}>Export to PDF</button>
    </div>
  );
};

export default MyComponent;
