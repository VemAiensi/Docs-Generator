import React, { useRef, useEffect } from "react";
import QRCode from "qrcode";

function QRCodeComponent({ value }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (value) {
      // for display
      QRCode.toCanvas(
        canvasRef.current,
        value, //Value
        {
          width: 90, // Default size
          margin: 0, // Add margin around the QR Code
          color: {
            dark: "#000000", // Foreground color
            light: "#FFFFFF", // Background color
          },
          errorCorrectionLevel: "L", // Error correction level
        },
        (error) => {
          error && console.error("Error generating QR code:", error);
        }
      );
    }
  }, [value]);

  return <canvas ref={canvasRef} />;
}

export default QRCodeComponent;
