import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import "./config.css";
function Config() {
  const [url, setUrl] = useState(null);

  function updateUrl(newUrl) {
    setUrl(newUrl);
  }

  function generatePDF() {
    alert("Hello PDF!");
  }

  const generatefDF = async () => {
    const pdf = new jsPDF("p", "mm", "letter"); // Portrait, millimeters, A4
    const width = pdf.internal.pageSize.getWidth();
    const height = pdf.internal.pageSize.getHeight();

    for (let index = 0; index < divRef.length; index++) {
      const divref = divRef[index];
      if (divref.current) {
        const scale = 2; // Adjust scale for higher resolution

        try {
          const canvas = await html2canvas(divref.current, { scale: scale });
          const imgData = canvas.toDataURL("image/png");

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

          // Add a new page if it's not the last div
          if (index < divRef.length - 1) {
            pdf.addPage("letter", "p");
          }
        } catch (error) {
          console.error("Error generating PDF:", error);
        }
      }
    }

    pdf.save("my-document.pdf");
  };

  return (
    <div className="config">
      <h1>CONFIGURATION</h1>
      <TextField label="URL" onChange={updateUrl} value={url} />
      <Button variant="contained" onClick={generatePDF}>
        Export PDF
      </Button>
    </div>
  );
}
export default Config;
