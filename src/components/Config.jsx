import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import "./config.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import FileInput from "./FileInput";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function Config(props) {
  //Destructuring form functions
  const [mainTitle, mainSubtitle, mainUrl, mainContents, mainSrc] =
    props.formFncs;

  const [url, setUrl] = useState("");
  function updateUrl(event) {
    setUrl(event.target.value);
  }

  const [title, setTitle] = useState("");
  function updateTitle(event) {
    setTitle(event.target.value);
    mainTitle(event.target.value);
  }

  const [subtitle, setSubtitle] = useState("");
  function updateSubtitle(event) {
    setSubtitle(event.target.value);
    mainSubtitle(event.target.value);
  }

  const [src, setSrc] = useState("");
  function updateSrc(event) {
    setSrc(event.target.value);
    mainSrc(event.target.value);
  }
  function updateSrcFromFile(newValue) {
    setSrc(newValue);
    mainSrc(newValue);
  }

  const [contents, setContents] = useState([...props.contents]);
  function appendContent() {
    console.log(contents.length);
    setContents([
      ...contents,
      { title: newContentTitle, type: newContentType, desc: newContentDesc },
    ]);
    mainContents([
      ...contents,
      { title: newContentTitle, type: newContentType, desc: newContentDesc },
    ]);
  }

  const [newContentTitle, setContentTitle] = useState("");
  function updateContentTitle(e) {
    setContentTitle(e.target.value);
  }
  const [newContentType, setContentType] = useState("");
  function updateContentType(e) {
    setContentType(e.target.value);
  }

  const [newContentDesc, setContentDesc] = useState("");
  function updateContentDesc(e) {
    setContentDesc(e.target.value);
  }

  async function generatePDF() {
    const divRef = props.pageRefs;

    const pdf = new jsPDF("p", "mm", "letter"); // Portrait, millimeters, A4
    const width = pdf.internal.pageSize.getWidth();
    const height = pdf.internal.pageSize.getHeight();

    //Acquiring all div references and adding it to the pdf
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
  }

  function deleteContent(index) {
    const updatedArray = contents.filter((_, i) => i !== index);
    console.log(index, updatedArray);
    setContents(updatedArray);
    mainContents(updatedArray);
  }

  return (
    <div className="config">
      <h1>PAGE CONTENTS</h1>
      <TextField label="Title" onChange={updateTitle} value={title} />
      <TextField label="Subtitle" onChange={updateSubtitle} value={subtitle} />
      <TextField label="URL" onChange={updateUrl} value={url} />

      <div>
        Existing Contents
        {contents.map((content, index) => {
          return (
            <div key={index}>
              <span>{content.title}</span>
              <Button onClick={() => deleteContent(index)}>
                <DeleteForeverIcon />
              </Button>
            </div>
          );
        })}
      </div>

      <FormControl>
        <InputLabel id="ct">Content Type</InputLabel>

        <Select
          labelId="ct"
          label="Content Type"
          onChange={updateContentType}
          value={newContentType}
        >
          <MenuItem value="list">List</MenuItem>
          <MenuItem value="img">Image</MenuItem>
          <MenuItem value="text">Text</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Content Title"
        onChange={updateContentTitle}
        value={newContentTitle}
      ></TextField>
      <TextField
        fullWidth
        label="Content Description"
        onChange={updateContentDesc}
        value={newContentDesc}
      ></TextField>

      <Button variant="contained" onClick={appendContent}>
        Add content
      </Button>

      <FileInput fnc={updateSrcFromFile}></FileInput>
      <span>File Content</span>
      <textarea onChange={updateSrc} value={src} />

      <Button variant="contained" onClick={generatePDF}>
        Export PDF
      </Button>
    </div>
  );
}
export default Config;
