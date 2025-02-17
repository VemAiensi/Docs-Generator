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
